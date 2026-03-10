# macOS 系统代理配置指南

> 📄 本文对应 HTML 页面：[macOS 教程](../docs/pages/macos-guide.html)

本指南介绍 macOS 系统下各类代理配置方法，作为 [ClashX Meta 教程](./clashx-meta.md) 的补充，帮助您在不同场景下正确使用代理。

---

## 📋 目录

- [一、系统偏好设置代理](#一系统偏好设置代理)
- [二、终端代理](#二终端代理)
- [三、网络位置切换](#三网络位置切换)
- [四、Git / npm / pip 代理](#四git--npm--pip-代理)
- [五、代理自动配置 PAC](#五代理自动配置-pac)

---

## 一、系统偏好设置代理

### 图形界面配置

1. 打开 **系统设置**（System Settings）
2. 进入 **网络**（Network）→ 选择 **Wi-Fi** 或 **以太网**（Ethernet）
3. 点击当前连接右侧的 **详细信息**（Details）
4. 切换到 **代理**（Proxies）标签
5. 勾选需要使用的代理类型：
   - **网页代理 (HTTP)**：地址 `127.0.0.1`，端口 `7890`
   - **安全网页代理 (HTTPS)**：地址 `127.0.0.1`，端口 `7890`
   - **SOCKS 代理**：地址 `127.0.0.1`，端口 `7891`
6. 若需绕过本地地址，在 **忽略这些主机与域的代理设置** 中填入：`localhost, 127.0.0.1, *.local`
7. 点击 **好** 保存

![系统代理设置](../images/macos/system-proxy-settings.png)

### 通过 Clash 自动设置

使用 ClashX Meta 时，勾选 **设置为系统代理** 即可自动写入上述配置，无需手动设置。关闭 ClashX Meta 或取消勾选后，系统代理会自动恢复。

### 命令行查看当前代理

```bash
# 查看系统代理状态
scutil --proxy
```

---

## 二、终端代理

终端（Terminal、iTerm2 等）默认**不读取**系统代理，需通过环境变量配置。

### 常用环境变量

| 变量名 | 说明 |
|--------|------|
| `http_proxy` / `HTTP_PROXY` | HTTP 请求代理 |
| `https_proxy` / `HTTPS_PROXY` | HTTPS 请求代理 |
| `all_proxy` / `ALL_PROXY` | 通用代理（部分工具） |
| `no_proxy` / `NO_PROXY` | 不使用代理的地址，多个用逗号分隔 |

### 临时设置（当前会话）

```bash
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
export no_proxy="localhost,127.0.0.1,*.local"
```

### 持久化配置（.zshrc）

macOS 默认使用 Zsh，编辑 `~/.zshrc`：

```bash
nano ~/.zshrc
```

在文件末尾添加：

```bash
# Clash 代理（端口以 ClashX Meta 实际配置为准）
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
export no_proxy="localhost,127.0.0.1,*.local"
```

保存后执行：

```bash
source ~/.zshrc
```

或重新打开终端窗口。

### 使用 Bash 时

若使用 Bash，编辑 `~/.bash_profile` 或 `~/.bashrc`，添加相同内容。

### 取消代理

```bash
unset http_proxy https_proxy all_proxy no_proxy
```

---

## 三、网络位置切换

**网络位置**（Network Location）可保存多套网络配置（含代理），便于在「直连」与「代理」间快速切换。

### 创建网络位置

1. 打开 **系统设置** → **网络** → 点击顶部 **位置**（Location）下拉菜单
2. 选择 **编辑位置**（Edit Locations）
3. 点击 **+** 新建位置，命名如 `代理`、`直连`
4. 选择新位置，点击 **完成**
5. 进入 **Wi-Fi** 或 **以太网** → **详细信息** → **代理**，按需配置代理
6. 保存

### 切换位置

点击菜单栏 **Wi-Fi** 图标 → **位置** → 选择对应位置，即可快速切换。

![网络位置](../images/macos/network-location.png)

### 使用场景

- **直连**：国内办公、不翻墙时使用
- **代理**：需要访问境外服务时使用

---

## 四、Git / npm / pip 代理

### Git 代理

**全局代理：**

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

**仅对 GitHub 使用代理：**

```bash
git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy http://127.0.0.1:7890
```

**使用 SOCKS5：**

```bash
git config --global http.proxy socks5://127.0.0.1:7891
git config --global https.proxy socks5://127.0.0.1:7891
```

**取消 Git 代理：**

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### npm 代理

**设置代理：**

```bash
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```

**取消代理：**

```bash
npm config delete proxy
npm config delete https-proxy
```

**临时使用（单次安装）：**

```bash
npm install xxx --proxy http://127.0.0.1:7890
```

**或使用环境变量：**

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
npm install xxx
```

### pip 代理

**临时使用：**

```bash
pip install xxx -i https://pypi.org/simple --proxy http://127.0.0.1:7890
```

**环境变量（推荐）：**

在 `~/.zshrc` 中已设置 `http_proxy`、`https_proxy` 后，pip 会自动使用。

**配置 pip.conf（永久）：**

```bash
# 创建或编辑 ~/.pip/pip.conf
mkdir -p ~/.pip
nano ~/.pip/pip.conf
```

添加：

```ini
[global]
proxy = http://127.0.0.1:7890
```

---

## 五、代理自动配置 PAC

**PAC**（Proxy Auto-Config）是一种脚本，浏览器根据访问的 URL 动态决定是否使用代理，可实现「国内直连、国外走代理」的自动分流。

### PAC 文件示例

```javascript
function FindProxyForURL(url, host) {
    // 国内域名直连
    if (shExpMatch(host, "*.cn") || 
        shExpMatch(host, "*.baidu.com") ||
        shExpMatch(host, "*.taobao.com") ||
        shExpMatch(host, "*.qq.com")) {
        return "DIRECT";
    }
    // 其他走代理
    return "PROXY 127.0.0.1:7890; SOCKS5 127.0.0.1:7891";
}
```

### 使用 PAC

1. 将 PAC 文件保存为 `proxy.pac`，放在本地或托管到可访问的 URL
2. 打开 **系统设置** → **网络** → **Wi-Fi/以太网** → **详细信息** → **代理**
3. 勾选 **自动代理配置**（Automatic Proxy Configuration）
4. 填写 PAC 文件地址，如 `file:///Users/你的用户名/proxy.pac` 或 `http://xxx.com/proxy.pac`
5. 保存

### 注意事项

- 使用 ClashX Meta 的**规则模式**时，通常无需 PAC，Clash 已在服务端完成分流
- PAC 仅对**支持系统代理**的应用生效，终端等需单独配置
- PAC 规则过多可能影响性能，复杂分流建议依赖 Clash 规则

---

## 相关链接

- [ClashX Meta 教程](./clashx-meta.md)
- [macOS 教程](../docs/pages/macos-guide.html)

---

*文档最后更新：2025 年 3 月*
