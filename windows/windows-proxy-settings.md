# Windows 系统代理配置指南 2026

> 📄 本文对应 HTML 页面：[Windows 教程](../docs/pages/windows-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/windows-guide>

本指南介绍 Windows 系统下各类代理配置方法，作为 [Clash Verge Rev 教程](./clash-verge-rev.md) 的补充，帮助您在不同场景下正确使用代理。

---

## 📋 目录

- [一、系统代理设置](#一系统代理设置)
- [二、环境变量代理](#二环境变量代理)
- [三、浏览器代理插件](#三浏览器代理插件)
- [四、PowerShell / CMD 代理](#四powershell--cmd-代理)
- [五、Git 代理配置](#五git-代理配置)
- [六、WSL2 代理配置](#六wsl2-代理配置)

---

## 一、系统代理设置

### 图形界面配置

1. 按 `Win + I` 打开 **设置**
2. 进入 **网络和 Internet** → **代理**
3. 在 **手动设置代理** 下：
   - 开启「使用代理服务器」
   - 地址：`127.0.0.1`（Clash Verge Rev 默认）
   - 端口：`7897`（以 Clash 实际端口为准）

> 截图待补充：Windows 系统代理设置界面

### 通过 Clash 自动设置

使用 Clash Verge Rev 时，开启 **System Proxy** 开关即可自动写入系统代理，无需手动配置。关闭 Clash 或关闭 System Proxy 后，系统代理会自动恢复。

### 注册表路径（高级）

系统代理的注册表位置：

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings
```

- `ProxyEnable` = 1 表示启用
- `ProxyServer` = `127.0.0.1:7897`

---

## 二、环境变量代理

部分命令行工具（如 curl、pip、npm）不读取系统代理，需通过环境变量指定。

### 常用变量

| 变量名 | 说明 |
|--------|------|
| `HTTP_PROXY` | HTTP 请求代理 |
| `HTTPS_PROXY` | HTTPS 请求代理 |
| `ALL_PROXY` | 通用代理（部分工具） |
| `NO_PROXY` | 不使用代理的地址，多个用逗号分隔 |

### 临时设置（当前会话）

**PowerShell：**

```powershell
$env:HTTP_PROXY  = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"
$env:NO_PROXY    = "localhost,127.0.0.1,*.local"
```

**CMD：**

```cmd
set HTTP_PROXY=http://127.0.0.1:7897
set HTTPS_PROXY=http://127.0.0.1:7897
set NO_PROXY=localhost,127.0.0.1
```

### 永久设置（用户级）

1. 按 `Win + R`，输入 `sysdm.cpl`，回车
2. 切换到 **高级** 标签 → 点击 **环境变量**
3. 在「用户变量」中新建：
   - 变量名：`HTTP_PROXY`，变量值：`http://127.0.0.1:7897`
   - 变量名：`HTTPS_PROXY`，变量值：`http://127.0.0.1:7897`
   - 变量名：`NO_PROXY`，变量值：`localhost,127.0.0.1,*.cn`

4. 确定保存，**重新打开**终端生效

### 取消代理

```powershell
# PowerShell
Remove-Item Env:HTTP_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:HTTPS_PROXY -ErrorAction SilentlyContinue
```

```cmd
:: CMD
set HTTP_PROXY=
set HTTPS_PROXY=
```

---

## 三、浏览器代理插件

### SwitchyOmega（Chrome / Edge）

[Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) 是常用的代理切换扩展。

#### 1. 安装

- Chrome：打开 [Chrome 网上应用店](https://chrome.google.com/webstore) 搜索「SwitchyOmega」安装
- Edge：打开 [Edge 加载项](https://microsoftedge.microsoft.com/addons) 搜索安装

#### 2. 配置代理情景

1. 点击扩展图标 → **选项**
2. 新建情景模式 → 选择「代理服务器」→ 命名（如 `Clash`）
3. 协议：`HTTP` 或 `SOCKS5`（Clash 通常为 HTTP）
4. 代理服务器：`127.0.0.1`
5. 代理端口：`7897`（HTTP）或 `7891`（SOCKS5）
6. 保存

> 截图待补充：SwitchyOmega 配置界面

#### 3. 切换模式

- **直接连接**：不走代理
- **系统代理**：使用系统代理设置
- **Clash**（或您命名的情景）：使用该代理

可配合 **自动切换** 规则，实现按域名自动选择直连或代理。

---

## 四、PowerShell / CMD 代理

### PowerShell 会话内代理

```powershell
# 设置代理
$env:HTTP_PROXY  = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"

# 验证（需安装 curl 或使用 Invoke-WebRequest）
Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing
```

### CMD 会话内代理

```cmd
set HTTP_PROXY=http://127.0.0.1:7897
set HTTPS_PROXY=http://127.0.0.1:7897
curl https://api.ipify.org
```

### 持久化脚本（可选）

创建 `proxy-on.ps1`：

```powershell
$env:HTTP_PROXY  = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"
$env:NO_PROXY    = "localhost,127.0.0.1"
Write-Host "代理已开启"
```

创建 `proxy-off.ps1`：

```powershell
Remove-Item Env:HTTP_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:HTTPS_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:NO_PROXY -ErrorAction SilentlyContinue
Write-Host "代理已关闭"
```

在需要时执行 `.\proxy-on.ps1` 或 `.\proxy-off.ps1`。

---

## 五、Git 代理配置

### 全局代理

```bash
# HTTP/HTTPS 代理
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

# SOCKS5 代理（若使用 Clash SOCKS5 端口 7891）
git config --global http.proxy socks5://127.0.0.1:7891
git config --global https.proxy socks5://127.0.0.1:7891
```

### 仅对 GitHub 使用代理

```bash
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global https.https://github.com.proxy http://127.0.0.1:7897
```

### 取消 Git 代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 验证

```bash
git config --global --get http.proxy
git clone https://github.com/xxx/xxx.git  # 测试克隆
```

---

## 六、WSL2 代理配置

WSL2 使用独立网络，无法直接使用 Windows 的 `127.0.0.1`，需通过 Windows 主机 IP 访问。

### 获取 Windows 主机 IP

在 WSL2 中执行：

```bash
# 方法一：从 /etc/resolv.conf 获取
cat /etc/resolv.conf | grep nameserver | awk '{print $2}'

# 方法二：固定脚本（Windows 主机 IP 通常为 .2）
export WIN_HOST_IP=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
echo $WIN_HOST_IP
```

### 设置 WSL2 环境变量

在 `~/.bashrc` 或 `~/.zshrc` 末尾添加：

```bash
# Clash 代理（端口以实际为准）
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
export HTTP_PROXY="http://${hostip}:7897"
export HTTPS_PROXY="http://${hostip}:7897"
export ALL_PROXY="socks5://${hostip}:7891"
export NO_PROXY="localhost,127.0.0.1"
```

保存后执行 `source ~/.bashrc` 或重新打开终端。

### 让 Clash 允许局域网连接

Clash 配置中需开启 `allow-lan: true`，否则 WSL2 无法连接。Clash Verge Rev 可在设置中勾选「Allow LAN」。

### 测试

```bash
curl -x http://${hostip}:7897 https://api.ipify.org
# 或
curl https://api.ipify.org
```

### 仅当前会话使用

```bash
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
export HTTP_PROXY="http://${hostip}:7897"
export HTTPS_PROXY="http://${hostip}:7897"
```

---

## 相关链接

- [Clash Verge Rev 教程](./clash-verge-rev.md)
- [Windows 教程](../docs/pages/windows-guide.html)

---

*文档最后更新：2025 年 3 月*
