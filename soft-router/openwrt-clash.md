# 软路由翻墙教程 2026 — OpenWrt + OpenClash 科学上网

> 📄 本文对应 HTML 页面：[软路由教程](../docs/pages/soft-router-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/soft-router-guide>

2026 最新软路由科学上网教程。本文介绍如何在 OpenWrt 软路由上使用 OpenClash 实现全家设备自动翻墙，适用于需要绕过网络审查、访问国际互联网的用户。

---

## 📋 目录

- [一、方案概述](#一方案概述)
- [二、硬件推荐](#二硬件推荐)
- [三、OpenWrt 安装](#三openwrt-安装)
- [四、网络拓扑](#四网络拓扑)
- [五、安装 OpenClash](#五安装-openclash)
- [六、导入订阅](#六导入订阅)
- [七、运行模式](#七运行模式)
- [八、分流与规则](#八分流与规则)
- [九、DNS 配置](#九dns-配置)
- [十、性能优化](#十性能优化)
- [十一、故障排除](#十一故障排除)
- [十二、维护与更新](#十二维护与更新)

---

## 一、方案概述

### 什么是软路由？

软路由（Soft Router）是指使用通用 x86/ARM 硬件配合路由固件（如 OpenWrt）实现的路由功能，与传统的硬路由（购买成品路由器）相对。软路由通常性能更强、可定制性更高。

### 为什么选择 OpenWrt + OpenClash？

- **OpenWrt**：开源、稳定、可扩展的 Linux 路由系统，社区活跃，插件丰富
- **OpenClash**：基于 Clash 内核的 OpenWrt 插件，支持订阅、分流、TUN 等完整功能

### 方案优势

| 优势 | 说明 |
|------|------|
| **全家设备自动代理** | 手机、电脑、电视、智能家居等接入同一网络即可翻墙，无需每台设备单独配置 |
| **细粒度控制** | 按域名/IP 分流：国内直连、国外走代理、流媒体走特定节点 |
| **高性能** | x86 软路由性能远超普通硬路由，可跑满千兆甚至万兆带宽 |
| **统一管理** | 一处配置，全屋生效，便于维护 |

---

## 二、硬件推荐

### 推荐设备类型

1. **x86 迷你主机**（首选）
   - 常见型号：N100、N5105、J4125、J1900 等
   - 功耗低、体积小、性能足够
   - 建议选择双网口版本（WAN + LAN）

2. **旧电脑**
   - 闲置的台式机或笔记本
   - 加装双网卡或使用 USB 网卡实现双网口

3. **虚拟机**
   - 在 ESXi、Proxmox VE (PVE)、Hyper-V 等虚拟化平台上安装 OpenWrt
   - 适合已有 NAS 或服务器的用户

### 推荐配置

| 项目 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 2 核 | 4 核及以上 |
| 内存 | 2GB | 4GB 及以上 |
| 网口 | 双网口（WAN + LAN） | 双千兆或 2.5G |
| 存储 | 512MB | 1GB 及以上 |

---

## 三、OpenWrt 安装

### 1. 下载固件

- **官方 OpenWrt**：访问 [openwrt.org](https://openwrt.org/) 选择对应设备型号下载
- **ImmortalWrt**：国内用户推荐，预装更多中文支持，访问 [immortalwrt.org](https://immortalwrt.org/) 下载

x86 设备通常选择 `combined-ext4.img.gz` 或 `generic-ext4-combined.img.gz`。

### 2. 写入存储

**Windows 用户**：
- 使用 **Rufus** 或 **balenaEtcher** 将 `.img` 镜像写入 U 盘或硬盘
- 选择「原始磁盘镜像」模式

**Linux 用户**：
```bash
# 解压后写入 U 盘（替换 /dev/sdX 为实际设备）
gunzip openwrt-xxx.img.gz
sudo dd if=openwrt-xxx.img of=/dev/sdX bs=4M status=progress
```

### 3. 首次启动

1. 将 U 盘/硬盘插入设备，从该存储启动
2. 启动后默认无密码，建议首次登录后立即设置密码
3. 默认 LAN IP 多为 `192.168.1.1`，用网线连接电脑访问 `http://192.168.1.1`

### 4. 基本网络配置

- **作为主路由**：WAN 口接光猫/上级路由，LAN 口接交换机或设备
- **作为旁路由**：仅使用 LAN 口，关闭 DHCP，网关指向主路由

---

## 四、网络拓扑

### 模式一：软路由作为主路由

```
互联网 → 光猫 → [软路由 WAN] OpenWrt [LAN] → 交换机/设备
```

- 软路由负责拨号、NAT、DHCP
- 所有流量经软路由，OpenClash 可全局代理

### 模式二：软路由作为旁路由（旁路网关）

```
互联网 → 主路由 → 交换机 → 设备
                    ↓
              [旁路由 OpenWrt]（仅 LAN，同网段）
```

- 主路由负责拨号、DHCP
- 旁路由只做代理网关，不参与拨号
- 客户端需将网关设为旁路由 IP，或由主路由 DHCP 推送

**旁路由配置要点**：
- 旁路由 LAN IP：与主路由同网段（如主路由 `192.168.1.1`，旁路由 `192.168.1.2`）
- 旁路由网关：指向主路由 IP
- 旁路由 DHCP：关闭，由主路由分配

---

## 五、安装 OpenClash

### 1. 更新软件源

进入 **系统 → 软件包**，点击「更新列表」等待完成。

### 2. 安装依赖

在「软件包」中搜索并安装以下依赖（部分 OpenWrt 已预装）：

- `iptables`
- `dnsmasq-full`（需替换默认 dnsmasq）
- `coreutils`
- `coreutils-nohup`
- `bash`
- `curl`
- `ca-certificates`
- `ipset`
- `libcap`
- `libcap-bin`
- `kmod-tun`
- `kmod-inet-diag`

部分固件可通过 SSH 安装：

```bash
opkg update
opkg install iptables dnsmasq-full coreutils coreutils-nohup bash curl ca-certificates ipset libcap libcap-bin kmod-tun kmod-inet-diag
```

### 3. 下载 OpenClash ipk

访问 [OpenClash GitHub Releases](https://github.com/vernesong/OpenClash/releases)，根据 CPU 架构选择：

- **x86_64**：`luci-app-openclash_x.x.x_all.ipk` 或带 `x86_64` 的版本
- **ARM**：选择对应 arm64/armv7 版本

### 4. 安装

- **方式 A**：在「系统 → 软件包」中点击「上传软件包」，选择 ipk 文件安装
- **方式 B**：SSH 上传后执行：

```bash
opkg install /tmp/luci-app-openclash_xxx.ipk
```

### 5. 进入 OpenClash

安装完成后，在 **服务 → OpenClash** 中即可看到管理界面。

---

## 六、导入订阅

### 方式一：订阅链接（推荐）

1. 进入 **OpenClash → 配置管理 → 订阅管理**
2. 点击「添加」，填入订阅 URL
3. 点击「更新配置」下载节点列表
4. 在「配置订阅」中选择刚更新的配置，点击「使用配置」

### 方式二：手动上传 YAML

1. 从机场面板导出 Clash 配置（或使用订阅转换服务）
2. 在 **配置管理** 中点击「上传」，选择 `.yaml` 文件
3. 上传后选择该配置并「使用配置」

---

## 七、运行模式

### Fake-IP 模式 vs Redir-Host 模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **Fake-IP** | 用虚拟 IP 解析域名，减少 DNS 请求，降低延迟 | **推荐大多数用户**，兼容性好 |
| **Redir-Host** | 真实 DNS 解析，再根据 IP 分流 | 部分老旧应用、特殊场景 |

**建议**：默认使用 Fake-IP，若遇到某些应用异常再尝试 Redir-Host。

### TUN / Mixed 模式

- **TUN 模式**：接管系统网络栈，可代理所有流量（含 UDP、游戏流量）
- **Mixed 模式**：混合模式，兼顾兼容性与游戏加速

游戏加速、UDP 需求（如游戏、视频通话）建议开启 TUN 或 Mixed。

---

## 八、分流与规则

### 规则提供者（Rule Providers）

OpenClash 支持从远程加载规则集，常见规则：

- `geosite`：按域名分流（如 `geosite:geolocation-!cn` 表示非中国域名走代理）
- `geoip`：按 IP 分流
- 自定义规则：流媒体、AI 服务、游戏等

### 内置规则集

在 **规则设置** 中可启用：

- `GeoSite`：V2Ray 域名规则
- `GeoIP`：IP 归属规则

### 自定义规则示例

```yaml
# 流媒体走香港/日本节点
- DOMAIN-SUFFIX,netflix.com,流媒体
- DOMAIN-SUFFIX,openai.com,AI服务

# 游戏走低延迟节点
- DOMAIN-SUFFIX,steampowered.com,游戏
```

---

## 九、DNS 配置

### 基本设置

在 **OpenClash → DNS 设置** 中：

1. **本地 DNS 劫持**：建议开启，避免 DNS 泄露
2. **Fake-IP 范围**：默认 `198.18.0.1/16` 即可
3. **上游 DNS**：选择可靠的公共 DNS

### 推荐上游 DNS

| DNS | 地址 | 说明 |
|-----|------|------|
| Google | `8.8.8.8`、`8.8.4.4` | 稳定，国内可能较慢 |
| Cloudflare | `1.1.1.1`、`1.0.0.1` | 速度快，隐私较好 |
| DoH | `https://dns.google/dns-query` | 加密 DNS，防劫持 |

### 避免 DNS 泄露

- 开启「DNS 劫持」，确保所有 DNS 请求经 OpenClash 处理
- 使用 DoH/DoT 加密上游，防止运营商窥探
- 测试：访问 [dnsleaktest.com](https://dnsleaktest.com/) 检查是否泄露

---

## 十、性能优化

### 1. 硬件 offload（硬件加速）

在 **网络 → 防火墙** 或 **Turbo ACC** 中开启：

- **Flow Offloading**：流控加速，减轻 CPU 负担
- **Fullcone NAT**：改善游戏、P2P 兼容性

### 2. 连接跟踪调优

SSH 执行（根据内存调整）：

```bash
# 增大连接跟踪表大小（4GB 内存可设 65535）
echo 65535 > /proc/sys/net/netfilter/nf_conntrack_max
```

### 3. 其他建议

- 使用有线连接，避免 WiFi 瓶颈
- 节点选择：优先低延迟、高带宽节点
- 分流规则不宜过多，减少匹配开销

---

## 十一、故障排除

### OpenClash 无法启动

- 检查依赖是否完整安装（见第五节）
- 查看 **系统 → 系统日志** 或 OpenClash 日志
- 确认内核版本与 OpenClash 兼容

### 核心下载失败

- 网络问题：检查 OpenWrt 能否访问 GitHub
- 手动下载：从 [Clash Meta Releases](https://github.com/MetaCubeX/Clash.Meta/releases) 下载对应架构的 `clash-meta`，上传到 `/etc/openclash/core/`

### DNS 解析循环

- 关闭主路由或旁路由上的重复 DNS 劫持
- 确保 dnsmasq 与 OpenClash 的 DNS 端口不冲突（OpenClash 常用 53 或 7874）

### 客户端无法上网

- 检查客户端网关是否指向 OpenWrt（旁路由模式）
- 确认 OpenClash 已启动且运行模式正确
- 检查防火墙规则是否放行

### 查看日志

- **OpenClash 日志**：服务 → OpenClash → 日志
- **系统日志**：系统 → 系统日志

---

## 十二、维护与更新

### 订阅自动更新

在 **订阅管理** 中可设置自动更新间隔（如每日），或使用 Crontab：

```bash
# 每天凌晨 3 点更新
0 3 * * * /usr/share/openclash/openclash.sh
```

### 更新 OpenClash 核心

- 在 OpenClash 界面中点击「版本更新」下载新核心
- 或从 GitHub 手动下载替换

### 备份与恢复

- **系统备份**：系统 → 备份/升级 → 生成备份
- **配置备份**：导出 OpenClash 配置、订阅链接，保存到安全位置
- 重装后恢复：上传备份或重新导入订阅

---

**相关链接**：
- [OpenClash 项目](https://github.com/vernesong/OpenClash)
- [OpenWrt 官网](https://openwrt.org/)
- [Clash 配置说明](https://github.com/Dreamacro/clash/wiki/configuration)
