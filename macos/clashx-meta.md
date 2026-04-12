# macOS 翻墙教程 2026 — ClashX Meta 下载安装与科学上网配置

> 📄 本文对应 HTML 页面：[macOS 教程](../docs/pages/macos-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/macos-guide>

2026 最新 macOS 科学上网教程。本文指导您在 macOS 上使用 ClashX Meta 实现科学上网，适用于需要绕过网络审查、访问境外网站的场景。

---

## 📋 目录

- [一、软件介绍](#一软件介绍)
- [二、系统要求](#二系统要求)
- [三、下载安装](#三下载安装)
- [四、导入订阅](#四导入订阅)
- [五、启动代理](#五启动代理)
- [六、增强模式](#六增强模式)
- [七、代理模式](#七代理模式)
- [八、终端代理配置](#八终端代理配置)
- [九、与 Homebrew 协同](#九与-homebrew-协同)
- [十、Dashboard 面板](#十dashboard-面板)
- [十一、开机自启](#十一开机自启)
- [十二、常见问题](#十二常见问题)

---

## 一、软件介绍

### 什么是 ClashX Meta？

**ClashX Meta** 是 macOS 上基于 **Clash.Meta** 内核的图形化代理客户端，是原 **ClashX** 的继任者。ClashX 项目已停止维护，ClashX Meta 由社区持续更新，支持更多现代特性。

### 与 ClashX 的区别

| 特性 | ClashX | ClashX Meta |
|------|--------|-------------|
| **内核** | 原版 Clash | Clash.Meta |
| **维护状态** | 已停止 | 持续更新 |
| **TUN 增强模式** | 不支持 | 支持 |
| **协议支持** | 基础 | 更全（VLESS、Hysteria 等） |
| **规则引擎** | 基础 | 增强 |

### 为什么选择 ClashX Meta？

- **原生 macOS 体验**：菜单栏常驻，轻量简洁
- **Clash.Meta 内核**：支持更多协议和规则
- **增强模式（TUN）**：可接管终端等全部流量
- **开源免费**：代码透明，社区活跃

---

## 二、系统要求

| 项目 | 要求 |
|------|------|
| **操作系统** | macOS 10.15 (Catalina) 及以上 |
| **架构** | Apple Silicon (M1/M2/M3) 与 Intel 均支持 |
| **磁盘空间** | 约 50MB |

### 检查系统版本

```bash
# 在终端执行
sw_vers
```

输出中的 `ProductVersion` 需为 10.15 或更高。

---

## 三、下载安装

### 方法一：GitHub 发布页（推荐）

1. 打开 ClashX Meta 官方发布页：

   **https://github.com/MetaCubeX/ClashX.Meta/releases**

2. 在 **Assets** 区域选择适合您芯片的版本：
   - **ClashX.Meta-x.x.x-arm64.dmg** — Apple Silicon (M1/M2/M3)
   - **ClashX.Meta-x.x.x-x64.dmg** — Intel 芯片

3. 下载完成后，双击 `.dmg` 文件，将 ClashX Meta 拖入 **应用程序** 文件夹

> 截图待补充：ClashX Meta 下载与安装界面

### 方法二：Homebrew 安装

```bash
# 使用 Homebrew Cask 安装
brew install --cask clashx-meta
```

安装完成后，在 **应用程序** 或 **启动台** 中可找到 ClashX Meta。

### 首次启动安全提示

macOS 可能提示「无法验证开发者」。处理方式：

1. 打开 **系统设置** → **隐私与安全性**
2. 在「安全性」区域找到被阻止的应用提示
3. 点击 **仍要打开**，并在弹窗中再次确认

> 截图待补充：macOS 安全提示界面

---

## 四、导入订阅

### 1. 获取订阅链接

从您的机场/代理服务商获取 **订阅链接**（通常为 `https://xxx.com/api/v1/client/subscribe?token=xxx` 格式）。请妥善保管，不要泄露。

### 2. 通过菜单导入

1. 点击菜单栏的 ClashX Meta 图标（猫形图标）
2. 选择 **配置** → **远程配置文件** → **管理**
3. 点击 **添加**，粘贴订阅链接，命名后保存

> 截图待补充：ClashX Meta 导入订阅界面

### 3. 拖拽配置文件

若您有本地 `.yaml` 或 `.yml` 配置文件，可直接拖拽到 ClashX Meta 窗口，或放入 `~/.config/clash/` 目录。

### 4. 选择并更新配置

- 在 **配置** 子菜单中点击要使用的配置名称，使其生效
- 右键配置 → **更新** 可手动刷新订阅

---

## 五、启动代理

### 设置系统代理

1. 点击菜单栏 ClashX Meta 图标
2. 勾选 **设置为系统代理**（Set as System Proxy）

勾选后，系统代理将指向 Clash（默认 HTTP `127.0.0.1:7890`，SOCKS5 `127.0.0.1:7891`），支持系统代理的应用（如 Safari、Chrome）会自动走代理。

> 截图待补充：设置系统代理界面

### 增强模式（TUN）

若需终端、命令行工具等全部走代理，请开启 **增强模式**，详见 [六、增强模式](#六增强模式)。

---

## 六、增强模式

### 什么是增强模式？

**增强模式**（Enhanced Mode）即 **TUN 模式**，通过虚拟网卡接管系统全部网络流量，实现真正的全局代理。与仅设置系统代理不同，增强模式可让**终端、Git、npm、pip** 等不读取系统代理的工具也走代理。

### 启用增强模式

1. 点击菜单栏 ClashX Meta 图标
2. 选择 **增强模式** → **启用**

首次启用会要求输入**管理员密码**，用于创建虚拟网卡。

> 截图待补充：增强模式开关界面

### 注意事项

- **需要管理员权限**：创建 TUN 设备需 root
- **覆盖全部流量**：包括终端、系统更新等
- **DNS 可统一处理**：减少 DNS 泄露
- 若仅浏览网页，使用系统代理即可；若需终端走代理，建议开启增强模式

---

## 七、代理模式

在菜单栏 ClashX Meta 图标下，**代理模式** 可切换分流策略：

| 模式 | 说明 |
|------|------|
| **规则** (Rule) | 按规则分流：国内直连，国外走代理。**推荐日常使用** |
| **全局** (Global) | 所有流量走代理 |
| **直连** (Direct) | 所有流量直连，不走代理 |

> 截图待补充：代理模式切换界面

---

## 八、终端代理配置

若未开启增强模式，终端默认**不走**系统代理，需手动配置环境变量。

### 临时设置（当前会话）

```bash
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
```

### 持久化配置（.zshrc 或 .bash_profile）

**Zsh 用户**（macOS 默认）：

```bash
# 编辑 ~/.zshrc
nano ~/.zshrc
```

在文件末尾添加：

```bash
# ClashX Meta 代理（端口以实际配置为准）
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
export no_proxy="localhost,127.0.0.1,*.local"
```

保存后执行 `source ~/.zshrc` 或重新打开终端。

**Bash 用户**：

```bash
# 编辑 ~/.bash_profile
nano ~/.bash_profile
```

添加相同内容，保存后执行 `source ~/.bash_profile`。

### 快捷开关别名

若不想始终走代理，可添加别名便于切换：

```bash
# 在 ~/.zshrc 中添加
alias proxy-on='export http_proxy="http://127.0.0.1:7890" https_proxy="http://127.0.0.1:7890" all_proxy="socks5://127.0.0.1:7891"'
alias proxy-off='unset http_proxy https_proxy all_proxy'
```

使用方式：

```bash
proxy-on   # 开启代理
proxy-off  # 关闭代理
```

---

## 九、与 Homebrew 协同

Homebrew 安装软件时，若网络受限，可通过代理加速。

### 临时使用代理安装

```bash
export ALL_PROXY="http://127.0.0.1:7890"
brew install xxx
```

### 持久配置

在 `~/.zshrc` 中添加：

```bash
export ALL_PROXY="http://127.0.0.1:7890"
```

或仅对 Homebrew 使用代理（不推荐全局，可能影响国内源）：

```bash
# 仅当前会话
export HOMEBREW_ALL_PROXY="http://127.0.0.1:7890"
brew update
brew install xxx
```

### 取消代理

```bash
unset ALL_PROXY
unset HOMEBREW_ALL_PROXY
```

---

## 十、Dashboard 面板

### 内置 Dashboard

ClashX Meta 支持内置的 Clash 控制面板，用于查看节点、切换代理、查看日志等。

1. 点击菜单栏 ClashX Meta 图标
2. 选择 **Dashboard** 或 **打开控制面板**

默认地址通常为 `http://127.0.0.1:9090`（以实际配置为准）。

> 截图待补充：内置 Dashboard 界面

### 外部 Dashboard：Yacd

[Yacd](https://github.com/haishanh/yacd) 是更美观的第三方 Clash 面板。

1. 在 ClashX Meta 中确保 **External Controller** 已开启（默认 `127.0.0.1:9090`）
2. 访问 Yacd 在线版：**https://yacd.haishan.me**
3. 在页面中填写 API 地址：`http://127.0.0.1:9090`，点击连接

可查看节点延迟、切换节点、查看规则匹配等。

---

## 十一、开机自启

### 方法一：系统设置

1. 打开 **系统设置** → **通用** → **登录项**
2. 点击 **+**，在应用程序中找到 **ClashX Meta**，添加

> 截图待补充：登录项设置界面

### 方法二：应用内设置

部分版本的 ClashX Meta 在 **偏好设置** 或 **设置** 中提供「开机启动」选项，勾选即可。

---

## 十二、常见问题

### 1. 提示「无法验证开发者」或「已损坏」

macOS 对未公证应用会拦截。处理方式：

```bash
# 在终端执行（将路径替换为实际应用路径）
xattr -cr /Applications/ClashX\ Meta.app
```

或按 [三、下载安装](#三下载安装) 中「首次启动安全提示」操作。

### 2. 增强模式无法启用

- 确认已输入正确的**管理员密码**
- 检查是否被安全软件拦截
- 尝试重启 Mac 后再次启用

### 3. 配置文件格式错误

- 确认订阅链接有效，可复制到浏览器测试是否返回 YAML 内容
- 检查机场是否支持 Clash 格式（部分仅提供 V2Ray 等格式）
- 使用在线 YAML 校验工具检查语法

### 4. DNS 解析异常

若开启增强模式后部分网站无法访问：

- 在 Clash 配置中检查 `dns` 段，可尝试使用 `8.8.8.8`、`1.1.1.1` 等公共 DNS
- 或在系统 **网络** → **高级** → **DNS** 中手动添加 DNS 服务器

### 5. 端口被占用

若 7890、7891、9090 等端口被占用，需在配置文件中修改 `mixed-port`、`port`、`socks-port`、`external-controller` 等端口号。

### 6. 菜单栏图标不显示

- 检查 **系统设置** → **控制中心** → **菜单栏** 中是否隐藏了图标
- 重启 ClashX Meta

---

## 相关链接

- [ClashX Meta GitHub](https://github.com/MetaCubeX/ClashX.Meta)
- [macOS 系统代理配置指南](./macos-proxy-settings.md)
- [macOS 教程](../docs/pages/macos-guide.html)

---

*文档最后更新：2025 年 3 月*
