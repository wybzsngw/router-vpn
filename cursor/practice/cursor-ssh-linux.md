# Cursor 远程开发实战：通过 SSH 连接 Linux（自建 + 云服务器通用篇）

> 💡 通过邀请链接注册 Cursor，**首月 Pro / Pro+ / Ultra 立享 5 折**：
> [👉 立即注册（首月 5 折）](https://cursor.com/referral?code=Y3RXKKUGMJ2G)

**摘要**：用 Cursor 通过 SSH 连接 Linux 服务器进行远程开发的完整教程，涵盖自建 Linux（树莓派 / 软路由 LXC / 本地虚拟机）和公有云 Linux（阿里云 / 腾讯云 / AWS）的通用配置：SSH Key 生成、免密登录、远程项目映射、终端打通、文件双向同步、远程跑 Composer Agent。

**关键词**：Cursor SSH、Cursor 远程开发、Cursor 连 Linux、Cursor 阿里云、Cursor 腾讯云、Cursor 树莓派、Cursor Remote SSH、Cursor 服务器开发

---

## 一、Cursor Remote-SSH 是什么（基于 VS Code Remote 协议）

Cursor 的远程开发能力建立在 **VS Code Remote - SSH** 协议之上。其核心原理是：本地只跑一个轻量级"客户端 UI"，真正的语言服务器、文件系统、终端进程全部在远端 Linux 机器上运行。用户体验上几乎与本地开发无异，但计算和 I/O 都在远端完成。

### 这对你意味着什么

- **编辑、语法高亮、自动补全** 都在远端上下文里执行，文件无需同步到本地
- **Cursor 的 Tab / Cmd+K / Chat / Composer** 同样可以操作远端目录下的文件
- **终端直接在远端 shell 里执行**，无需手动 SSH 再跑命令

### 使用场景速查

| 场景 | 是否适合 Remote-SSH |
| --- | --- |
| 本地开发资源不够（编译慢、内存少） | ✅ 适合 |
| 需要在 Linux 环境调试/部署但本机是 Windows/macOS | ✅ 适合 |
| 服务跑在远端，想直接改代码不走 CI | ✅ 适合 |
| 临时改一两行配置文件 | ⚠️ 可用，但 vim 更轻 |
| 远端机器本身在内网，无公网 IP | ⚠️ 需要跳板机或内网穿透方案 |

### 重要前提：远程机的网络与模型调用

用 Cursor Remote-SSH 开发时，**Tab 补全与 Cmd+K** 的模型推理请求实际上由 **本地 Cursor 进程**发起（通过本地网络出口走），这类功能与远端机器网络状态无关。

但如果你在远端终端里直接运行 Cursor 的 **Background Agent / Cloud Agent**，Agent 本身的 API 调用会从远端机器发出，**远端机器需要能访问外部模型 API 端点**。这是使用远端 Agent 时需要额外规划的一个点。

---

## 二、前置准备（SSH 客户端、Key 对、known_hosts）

### 2.1 本地环境检查

**macOS / Linux**：SSH 客户端通常已内置，直接验证：

```bash
ssh -V
# 期望：OpenSSH_9.x 或更新
```

**Windows**：Windows 10 1809+ 内置 OpenSSH 客户端，在 PowerShell 中运行：

```powershell
ssh -V
```

如果未安装，进入「设置 → 应用 → 可选功能」安装 OpenSSH 客户端；或使用 Git for Windows 附带的 OpenSSH。

### 2.2 生成 SSH Key（ed25519，当前推荐算法）

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# 提示路径时直接回车（默认 ~/.ssh/id_ed25519）
# 可以设置 passphrase，也可以留空（实验环境留空更方便）
```

> 不再推荐 `-t rsa -b 2048`：ed25519 在安全性和性能两个维度均优于 RSA 2048，且密钥文件更短。

生成完成后：

```bash
ls ~/.ssh/
# 应看到 id_ed25519（私钥）与 id_ed25519.pub（公钥）
cat ~/.ssh/id_ed25519.pub
# 复制这整行，后续章节需要把它写入远端机器的 authorized_keys
```

### 2.3 known_hosts 说明

首次 SSH 连接一台新主机时，客户端会显示：

```
The authenticity of host 'xxx.xxx.xxx.xxx' can't be established.
ED25519 key fingerprint is SHA256:XXXXXXXX.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 `yes` 确认后，该主机的指纹会写入 `~/.ssh/known_hosts`。Cursor Remote-SSH 扩展在后台建立连接时同样会触发此流程。**如果你自动化脚本或 CI 需要跳过此交互，在 `~/.ssh/config` 中对目标主机设置 `StrictHostKeyChecking no`（仅限已信任的内网环境）**。

---

## 三、自建 Linux 配置（树莓派 / 本地虚拟机 / LXC）

### 3.1 树莓派

**树莓派 OS（基于 Debian）默认 SSH 需手动启用**：

```bash
# 方式一：在 raspi-config 里开启
sudo raspi-config
# → Interface Options → SSH → Enable

# 方式二：在 boot 分区放空文件（无头安装时）
touch /boot/ssh  # 首次启动后自动启用 SSH 并删除此文件
```

开启后确认 SSH 监听状态：

```bash
sudo systemctl status ssh
sudo ss -tlnp | grep :22
```

获取树莓派本地 IP：

```bash
hostname -I
# 或查路由器 DHCP 分配表
```

**建议在路由器设置 DHCP 静态绑定**，把树莓派 MAC 地址绑定到固定 IP，避免重启后 IP 变化让 SSH 配置失效。

### 3.2 本地虚拟机（VMware / VirtualBox / UTM）

关键步骤：**确保虚拟机网卡模式可被宿主机 SSH 连接到**。

| 网卡模式 | 能否 SSH 连接 | 说明 |
| --- | --- | --- |
| NAT（默认） | ⚠️ 需端口转发 | 虚拟机在 NAT 后，需要在 VMware/VBox 设置端口转发 `host:2222 → guest:22` |
| 桥接模式 | ✅ 直连 | 虚拟机获取与宿主机同网段 IP，直接 `ssh user@vm-ip` |
| Host-Only | ⚠️ 仅宿主机 | 只有宿主机能访问，跨机器场景不适用 |

**推荐用桥接模式**：虚拟机设置中将网卡改为"桥接"，重启后 `ip addr` 看 IP：

```bash
ip addr show eth0
# 找 inet 后面的地址
```

### 3.3 LXC 容器（OpenWrt / Proxmox / 软路由）

LXC 容器在宿主机的内部 IP 通常为 `192.168.x.x` 段。如果从宿主机外部 SSH 进容器，需确认两点：

1. **LXC 容器已安装并启动 SSH 服务**：`apt install openssh-server && systemctl enable --now ssh`
2. **网络可达性**：若容器 IP 只在宿主内可达，需要从宿主机做端口转发，或直接在宿主机上 SSH 进去再跳转

ProxMox 场景下可以用内置的 Shell 直接进容器安装 SSH：

```bash
pct exec <容器ID> -- apt install openssh-server -y
pct exec <容器ID> -- systemctl enable --now ssh
```

---

## 四、云服务器配置（阿里云、腾讯云、AWS 通用）

无论哪家云厂商，上线一台可 SSH 的 Linux 实例的通用流程一致：

### 4.1 安全组 / 防火墙开放 22 端口

进入控制台 → 安全组规则（或 Security Group）→ 入方向（Inbound）→ 添加规则：

| 字段 | 值 |
| --- | --- |
| 协议 | TCP |
| 端口范围 | 22（或自定义端口） |
| 来源 IP | 你的本地公网 IP（最安全）或 `0.0.0.0/0`（调试期可用，上线后收紧） |

**实测建议**：生产服务器不要把 22 开放给 `0.0.0.0/0`，用来源 IP 白名单或改用非标端口（如 2222），能显著减少暴力破解日志噪声。

### 4.2 上传本地公钥到远端

有两种方式：

**方式 A — ssh-copy-id（本地已能连上时）**

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your-server-ip
```

**方式 B — 手动复制（控制台 web shell 或首次密码登录）**

```bash
# 在远端执行（先用密码登录或用控制台 web shell）
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "粘贴你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4.3 关闭密码登录（可选但推荐）

```bash
sudo nano /etc/ssh/sshd_config
# 找到以下行并修改
PasswordAuthentication no
PubkeyAuthentication yes
# 保存后重启 sshd
sudo systemctl restart sshd
```

确认在 SSH Key 可用之后再关闭密码登录，否则会把自己锁在门外。

### 4.4 确认连接正常

```bash
ssh -i ~/.ssh/id_ed25519 user@your-server-ip
# 成功后看到 shell 提示符即可
exit
```

---

## 五、SSH Key 免密登录

### 5.1 本地 SSH Config 配置（关键步骤）

在 `~/.ssh/config` 里为每台服务器建立别名，Cursor Remote-SSH 会读取这份配置：

```
Host my-rpi
  HostName 192.168.1.88
  User pi
  IdentityFile ~/.ssh/id_ed25519
  Port 22

Host my-cloud
  HostName your-server-ip
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519
  Port 22
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

字段说明：

- `Host`：别名，在 Cursor Remote-SSH 列表里显示的名字
- `HostName`：服务器 IP 或域名
- `User`：登录用户名
- `IdentityFile`：私钥路径
- `ServerAliveInterval` / `ServerAliveCountMax`：保活设置，防止长时间编辑后连接断开

配置完后本地验证：

```bash
ssh my-rpi
ssh my-cloud
```

不需要输密码直接进入 shell，说明免密登录配置正常。

### 5.2 跳板机（Bastion / Jump Host）场景

如果远端机器在私有网络，只有跳板机有公网 IP：

```
Host bastion
  HostName public-bastion-ip
  User ec2-user
  IdentityFile ~/.ssh/id_ed25519

Host private-server
  HostName 10.0.1.100
  User ubuntu
  ProxyJump bastion
  IdentityFile ~/.ssh/id_ed25519
```

Cursor Remote-SSH 会自动走 `ProxyJump` 透明建立连接，使用体验与直连无异。

---

## 六、Cursor 中添加 Remote 主机

Cursor 复用了 VS Code Remote 扩展的连接方式，进入远端主机的操作如下：

### 6.1 打开远程资源管理器

按 `Ctrl+Shift+P`（macOS：`Cmd+Shift+P`）打开命令面板，搜索并选择：

```
Remote-SSH: Connect to Host...
```

或者点击左下角状态栏的 **远程连接图标**（`><` 形状），再选「Connect to Host」。

### 6.2 选择或新增主机

- 如果 `~/.ssh/config` 已配置，列表会直接显示 `my-rpi`、`my-cloud` 等别名
- 选中目标主机后，Cursor 会在后台 SSH 连接并自动安装远端服务组件（`~/.cursor-server/`）
- 首次连接需要下载组件，耗时 1-3 分钟，此后缓存在远端，再次连接秒开

### 6.3 打开远端工作区

连接建立后，通过「文件 → 打开文件夹」选择远端目录，确认后 Cursor 的整个工作区（资源管理器、终端、AI 能力入口）都切换到远端上下文。

### 6.4 验证连接状态

左下角状态栏显示 `SSH: my-cloud` 即表示当前窗口工作在远端。终端里执行：

```bash
hostname && uname -a
```

看到服务器名称即确认无误。

---

## 七、远程项目目录与终端

### 7.1 目录结构建议

在远端机器上，建议用以下约定组织项目：

```
~/projects/
  my-api/         ← Git 项目，对应 GitHub 仓库
  my-scripts/     ← 独立运维脚本
  tmp/            ← 临时实验目录，不提交
```

在 Cursor 里打开 `~/projects/my-api` 后，所有文件操作（创建、编辑、保存）直接发生在远端，无需手动同步。

### 7.2 终端使用

Cursor 内置终端（`Ctrl+\`` 打开）在 Remote-SSH 模式下直接是远端 shell。常用日常操作：

```bash
# 查看日志
tail -f /var/log/nginx/access.log

# 重启服务
sudo systemctl restart my-app

# 快速 Git 操作
git pull && npm run build
```

**实测建议**：如果你习惯 tmux 或 screen，在远端启动它并在里面跑长任务（如编译、测试），即使 Cursor 断开连接，任务仍在后台跑。

### 7.3 文件权限陷阱

常见问题：用 root 创建了文件，普通用户登录后无法写入。

```bash
# 检查文件权限
ls -la ~/projects/my-api

# 递归修正权限（谨慎在生产使用）
sudo chown -R $USER:$USER ~/projects/my-api
```

在 Cursor 里保存文件时如果弹出"没有权限"，一般是这个原因。

---

## 八、远程跑 Composer Agent（注意：远程机需要外网才能调模型 API）

### 8.1 Agent 在 Remote-SSH 模式下的调用路径

在 Remote-SSH 会话里，**Tab 补全和 Cmd+K 的 API 请求走本地网络**（本地 Cursor 进程发起），不受远端网络影响。

但 **Background Agent / Cloud Agent** 是在 Cursor 云端基础设施上独立运行的，与 Remote-SSH 的连接性无关。如果你在远端终端里通过命令行方式调用类似功能，或者配置了本地 Agent 在远端机器上执行命令，则远端机器需要能访问外部网络。

**实测建议**：用 Remote-SSH 做远端开发时，主要用 Chat / Cmd+K / Tab 这三个入口（走本地网络），优先保证本地网络质量。如需在远端机器上直接调外部 API，提前做好网络规划。

### 8.2 可复用的 Composer 提示词（远端场景）

在 Remote-SSH 下，Composer 同样可以操作远端文件，下面是适合"在远端机器上跑部署脚本"的三段式提示词：

**任务**：

> 帮我在这台远端 Linux 机器上写一个部署脚本 `deploy.sh`，完成「拉取最新代码 → 安装依赖 → 构建 → 重启服务」全流程。

**约束**：

> 1. 脚本使用 `#!/bin/bash`，出错立即退出（`set -e`）  
> 2. 目标项目在 `~/projects/my-api`，构建命令为 `npm run build`  
> 3. 服务管理使用 systemd，单元名为 `my-api.service`  
> 4. 脚本末尾输出"Deploy done at $(date)"  
> 5. 不要硬编码任何密码或 token

**验收**：

> 脚本可以直接 `bash deploy.sh` 执行；执行成功后 `systemctl status my-api` 显示 active (running)；给出执行后的预期输出示例。

### 8.3 使用 Chat 做远端排障

在 Remote-SSH 工作区里，用 `@文件` 引用远端文件后再提问，Chat 会基于远端文件内容分析：

```
@nginx.conf 帮我检查这份 Nginx 配置有没有可能导致 502 的写法
```

Cursor 会读取远端 `nginx.conf` 的实际内容后再给出回答，不需要把文件复制到本地。

### 8.4 Remote-SSH + Agent 组合的合理边界

| 操作 | 可行性 | 说明 |
| --- | --- | --- |
| 用 Chat 分析远端日志文件 | ✅ 完全可行 | @引用远端文件，本地网络出口 |
| 用 Cmd+K 改远端代码 | ✅ 完全可行 | 同上 |
| 用 Composer 批量改远端多文件 | ✅ 完全可行 | 工作区在远端，操作自然落远端 |
| 用 Background Agent 在远端机器上跑长任务 | ⚠️ 需远端外网 | Agent 云端发起，远端机需能访问 API |

---

## 九、常见报错（Permission denied / Connection refused / Host key verification failed）

### Q1：Permission denied (publickey)

**现象**：`Permission denied (publickey,gssapi-keyex,gssapi-with-mic)` 或 `Permission denied (publickey)`

**根因**：服务器没有你的公钥，或公钥路径/权限有问题。

**排查步骤**：

```bash
# 1. 确认本地私钥可用
ssh-add -l
# 若无输出，执行 ssh-add ~/.ssh/id_ed25519

# 2. 在远端检查 authorized_keys
cat ~/.ssh/authorized_keys
# 确认包含你的公钥（公钥内容以 ssh-ed25519 开头）

# 3. 检查权限（关键）
ls -la ~/.ssh/
# .ssh 目录必须 700，authorized_keys 必须 600
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# 4. 开启详细日志确认
ssh -vvv user@host 2>&1 | grep -i "key\|auth"
```

**修复**：将本地公钥重新追加到远端 `authorized_keys`，并修正权限。

### Q2：Connection refused

**现象**：`ssh: connect to host xxx port 22: Connection refused`

**根因**：SSH 服务未启动，或端口不对（自定义端口），或防火墙/安全组未放行。

**排查步骤**：

```bash
# 在远端（通过云厂商 web shell 或 vnc 进入）
sudo systemctl status sshd
# 若未 active，启动：
sudo systemctl enable --now sshd

# 确认监听端口
sudo ss -tlnp | grep sshd

# 检查本地防火墙（若有 ufw）
sudo ufw status
sudo ufw allow 22/tcp
```

云服务器场景还需要在控制台安全组入方向规则里确认 22 端口已开放。

### Q3：Host key verification failed

**现象**：`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!` + `Host key verification failed.`

**根因**：服务器重装系统、更换 IP 或 IP 被复用，导致 `~/.ssh/known_hosts` 里的旧指纹与当前服务器不匹配。

**修复**：

```bash
# 方式 A：删除旧指纹（仅对该 IP）
ssh-keygen -R your-server-ip

# 方式 B：手动编辑 known_hosts 删除对应行
nano ~/.ssh/known_hosts
# 找到 your-server-ip 那行，删除

# 然后重新连接，输入 yes 接受新指纹
ssh user@your-server-ip
```

> 注意：如果你**不确定**服务器是否真的重装了，不要盲目接受新指纹——这个警告有时也出现在中间人攻击场景。确认服务器身份再操作。

---

## 相关教程

- [Cursor 国内使用完整教程（Pillar）](../cursor-guide.md)
- [Cursor + GitHub + Cloudflare 静态站实战](./cursor-build-static-site.md)

---

### 🎁 准备开始用 Cursor？

通过邀请通道注册，**首月 Pro / Pro+ / Ultra 立享 5 折**——相当于 Pro 仅需 $10、Pro+ 仅需 $30、Ultra 仅需 $100。

[👉 立即开通（首月 5 折）](https://cursor.com/referral?code=Y3RXKKUGMJ2G)

> 邀请通道仅对首月生效，次月起恢复原价；可随时取消订阅。

<!-- char count: 10753 -->
