# Clash 全平台翻墙指南

> 一站式 Clash 订阅申请与配置教程，覆盖路由器、软路由、Windows、Linux、macOS、Android、iOS。
>
> 🌐 **在线页面**：<https://mowei-ie.github.io/router-vpn/pages/index.html>

---

## 🗂️ 项目总览

### 在线教程（HTML 页面）

| 页面 | 说明 | 链接 |
|------|------|------|
| 全平台导航首页 | 所有教程入口 | [index.html](pages/index.html) |
| 订阅申请指南 | 机场推荐与对比 | [clash-subscription-guide.html](pages/clash-subscription-guide.html) |
| 华硕路由器教程 | 梅林固件 + MerlinClash | [asus-router-guide.html](pages/asus-router-guide.html) |
| 软路由教程 | OpenWrt + OpenClash / iKuai | [soft-router-guide.html](pages/soft-router-guide.html) |
| Windows 教程 | Clash Verge Rev | [windows-guide.html](pages/windows-guide.html) |
| Linux 教程 | GUI 桌面版 & 服务器版 | [linux-guide.html](pages/linux-guide.html) |
| macOS 教程 | ClashX Meta | [macos-guide.html](pages/macos-guide.html) |
| 手机教程 | Android & iOS | [mobile-guide.html](pages/mobile-guide.html) |

### 文档（Markdown）

| 分类 | 文档 |
|------|------|
| **订阅/机场** | [订阅申请指南](docs/subscription/clash-subscription-guide.md) |
| **华硕路由器** | [梅林固件刷机](docs/asus-router/asus-merlin-flash.md) · [MerlinClash 安装配置](docs/asus-router/asus-merlinclash-setup.md) · [高级功能](docs/asus-router/asus-advanced.md) |
| **软路由** | [OpenWrt + OpenClash](docs/soft-router/openwrt-clash.md) · [iKuai + 旁路由](docs/soft-router/ikuai-clash.md) |
| **Windows** | [Clash Verge Rev 教程](docs/windows/clash-verge-rev.md) · [系统代理配置](docs/windows/windows-proxy-settings.md) |
| **Linux** | [GUI 桌面版](docs/linux/clash-linux-gui.md) · [无 GUI 服务器版](docs/linux/clash-linux-headless.md) |
| **macOS** | [ClashX Meta 教程](docs/macos/clashx-meta.md) · [系统代理配置](docs/macos/macos-proxy-settings.md) |
| **手机** | [Android Clash Meta](docs/mobile/android-clash-meta.md) · [iOS Shadowrocket & Stash](docs/mobile/ios-shadowrocket.md) |
| **通用** | [故障排除](docs/common/troubleshooting.md) · [分流规则详解](docs/common/proxy-rules.md) · [术语表](docs/common/glossary.md) |
| **扩展** | [Tailscale ESXi 远程访问](docs/extras/tailscale-esxi-guide.md) · [统计服务部署](docs/extras/deployment-guide.md) |

### 项目结构

```
router-vpn/
├── README.md                 ← 你在这里
├── pages/                    # HTML 页面（对外发布 GitHub Pages）
│   ├── index.html            # 全平台导航首页
│   ├── clash-subscription-guide.html
│   ├── asus-router-guide.html
│   ├── soft-router-guide.html
│   ├── windows-guide.html
│   ├── linux-guide.html
│   ├── macos-guide.html
│   └── mobile-guide.html
├── docs/                     # Markdown 文档
│   ├── asus-router/          # 华硕路由器
│   ├── soft-router/          # 软路由
│   ├── windows/              # Windows
│   ├── linux/                # Linux
│   ├── macos/                # macOS
│   ├── mobile/               # 手机
│   ├── subscription/         # 订阅/机场
│   ├── common/               # 通用（故障排除/规则/术语）
│   └── extras/               # 扩展工具
├── downloads/                # 下载文件（插件包、工具等）
│   ├── MC2_0.4.6_ARM64.tar.gz
│   └── MC2_0.3_ARM64.tar.gz
├── images/                   # 截图资源（按平台分目录）
└── scripts/                  # 辅助脚本
```

### 下载文件

所有可供下载的文件（插件安装包、工具等）统一放在 `downloads/` 目录下：

| 文件 | 说明 | 下载 |
|------|------|------|
| MC2_0.4.6_ARM64.tar.gz | MerlinClash ARM64 版（推荐） | [下载](downloads/MC2_0.4.6_ARM64.tar.gz) |
| MC2_0.3_ARM64.tar.gz | MerlinClash ARM64 旧版 | [下载](downloads/MC2_0.3_ARM64.tar.gz) |

> 将来新增的下载文件也请放入此目录，MD 中使用相对路径引用，HTML 中使用 `../downloads/文件名` 引用。

---

## 📡 华硕路由器 Clash 实战教程

> 基于华硕 RT-AX86U PRO 的 Clash 全屋科学上网方案，
> 经过多天实践，踩了多个大坑，确实可行的方案。

> 给大家个建议，不要过度相信网上的诸如 Exp-VPN、Pur-VPN 之类的知名 VPN，
> 这类厂商都十分容易被针对，这是非常深刻的教训，不要浪费自己的时间。
> 目前比较流行使用机场节点翻墙，经过实践，稳定可靠。
> 不论是官改的固件，还是梅林的固件，目前都已经十分成熟了，不要纠结官方的固件，
> 如果你实在纠结，后期还是可以重新刷回来的，华硕刷固件的稳定性真是没得说。

> 📖 详细拆分文档：[梅林刷机](docs/asus-router/asus-merlin-flash.md) · [MerlinClash 配置](docs/asus-router/asus-merlinclash-setup.md) · [高级功能](docs/asus-router/asus-advanced.md)

## 📋 目录

- [快速开始](#快速开始)
- [硬件准备](#硬件准备)
- [梅林固件刷机](#梅林固件刷机)
- [Clash安装配置](#clash安装配置)
- [高级功能配置](#高级功能配置)
- [监控与维护](#监控与维护)
- [故障排除](#故障排除)
- [安全与隐私](#安全与隐私)

## 🚀 快速开始

### 10分钟快速部署

如果您已经拥有华硕RT-AX86U PRO路由器，可以按照以下步骤快速部署Clash：

#### 第一步：刷入梅林固件
1. 下载[梅林固件](https://www.asuswrt-merlin.net/)
2. 进入路由器管理界面 → 系统管理 → 固件升级
3. 上传固件文件，等待刷机完成

#### 第二步：安装Clash
1. 进入软件中心，离线安装"meilin Clash"
2. 点击安装，等待安装完成

#### 第三步：配置透明代理
1. 进入Clash设置页面
2. 配置clash订阅
3. 启用透明代理功能，
4. 查看管理面板


#### 第四步：测试连接
1. 重启路由器
2. 访问Google、YouTube等网站
3. 检查IP地址是否已改变

### 完整配置时间
- **新手用户**: 30-60分钟
- **有经验用户**: 15-30分钟
- **专业用户**: 5-10分钟

### 所需工具
- 华硕RT-AX86U PRO路由器
- 电脑（Windows/Mac/Linux）
- 稳定的网络连接
- VPN服务商账号（可选）


## 🔧 硬件准备


### 推荐路由器型号
| 品牌 | 型号 | CPU | 内存 | 存储 | 价格区间 | 推荐指数 | 备注 |
|------|------|-----|------|------|----------|----------|------|
| 华硕 | RT-AX86U PRO | 博通四核2.0GHz | 1GB | 256MB | 900-1200元 | ⭐⭐⭐⭐⭐ | **推荐首选** |
| 华硕 | RT-BE86U | 博通四核2.6GHz | 2GB | 256MB | 2500-3000元 | ⭐⭐⭐⭐⭐ | Wi-Fi 7旗舰，极致性能 |
| 华硕 | RT-AX88U | 博通四核1.8GHz | 1GB | 256MB | 1200-1500元 | ⭐⭐⭐⭐⭐ | 8个LAN口 |
| 华硕 | RT-AC86U | 博通双核1.8GHz | 512MB | 128MB | 400-600元 | ⭐⭐⭐⭐ | **入门级推荐，性价比之选** |
| 小米 | AX6000 | IPQ5018 | 512MB | 128MB | 400-500元 | ⭐⭐⭐⭐ | 需刷OpenWrt |
| 网件 | R7800 | IPQ8065 | 512MB | 128MB | 300-400元 | ⭐⭐⭐⭐ | 需刷OpenWrt |

### 最低配置要求

- **CPU**: 双核1.5GHz 或更高性能
- **内存**: 512MB RAM 或更多（推荐1GB+）
- **存储**: 128MB Flash 或更多（推荐256MB+）
- **网络**: 千兆以太网接口
- **固件支持**: 支持第三方固件（梅林/OpenWrt）

### 华硕RT-AC86U 入门级推荐

![华硕RT-AC86U](images/asus-rt-ac86u.png)

| 规格项目 | 详细参数 | 说明 |
|---------|---------|------|
| **处理器** | 博通双核1.8GHz | 满足日常上网与轻度并发代理 |
| **内存** | 512MB | 入门配置，可运行MerlinClash |
| **存储** | 128MB Flash | 支持软件中心与常用插件 |
| **无线性能** | Wi‑Fi 5 (802.11ac)，AC2900 | 双频并发，覆盖中小户型 |
| **有线接口** | 1×1G WAN + 4×1G LAN | 适配千兆入户与NAS基础需求 |
| **USB接口** | 1×USB 3.0 + 1×USB 2.0 | 外接存储/下载等扩展 |
| **价格区间** | 400-600元 | 入门级高性价比 |

> **KoolCenter下载**：[RT‑AC86U 梅林固件](https://www.asusgo.com/firmware/download?devicename=rt-ac86u&firmware=merlin)

> 京东购买推荐：[RT‑AC86U 优惠购买链接](https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAS4JK1olXwQKU1ZVD00XA18IGlsWWgYGVVlbDUkWAF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2wPG18UWgAHVl9eFxJSXzI4WRkLFFlDDRs-DT1qZDV4chxmHntANFJROEonAG4IH1kTXAAAUm5tCEwnQgEIHl4VXA4LVm5cOEsRB2YMG10QVAMKVFhtD0seMz9QWQJFAlBLEAptOHsUM2gIEk8TL0dQQFgvOHsXM2w4G1oVXA8CVV1bCUsLA2oLG1oUQQYEUFdZCEwQB2sJElIlXwcDUFdtOJWZlwx8YRpdKWNeLwE_YDl-exfWlc8EIXEAVlZcGXtSVxVLTFpHLwZQXFlfATF1dzlBYwFhO3hsVgcGCjZTdWhxG1JJJgB4LxceOE4nBGkJKw)

#### 固件版本信息（RT‑AC86U）
- 版本通道：M 系列（梅林改版）
- 最近版本：
  - 386.10_0（2023-05-03），MD5：0071345e3bf5ebf7483b23edc8e846ec
  - 386.9_0（2023-05-03），MD5：8dfe976c18b66bf4de32fa38cf987668

> 注：以上为版本速览，更多版本与更新说明请以下载页为准。


### 为什么选择RT-AC86U？

1. 性价比高：同价位硬件规格领先，二手保有量大
2. 生态成熟：梅林固件与MerlinClash支持完善，资料充足
3. 部署简便：通过简单部署即可实现全屋代理
4. 适用场景：入门/中小户型、300‑500M 宽带更合适


### 华硕RT-AX86U PRO 详细规格

![华硕RT-AX86U PRO](images/asus-rt-ax86u-pro.png)

| 规格项目 | 详细参数 | 说明 |
|---------|---------|------|
| **处理器** | 博通四核2.0GHz | 强大的处理性能，支持高并发连接 |
| **内存** | 1GB DDR4 | 充足内存支持Clash运行 |
| **存储** | 256MB Flash | 大容量存储，支持安装更多插件 |
| **无线性能** | Wi-Fi 6 (802.11ax)，160MHz | 双频并发5700Mbps |
| **有线接口** | 1×2.5G (WAN/LAN) + 1×1G WAN + 4×1G LAN | 高速网络连接 |
| **USB接口** | 1×USB 3.2 Gen1 + 1×USB 2.0 | 支持外接存储设备 |
| **价格区间** | 900-1200元 | 性价比极高的高端路由器 |

> **KoolCenter下载**：[RT-AX86U PRO梅林固件](https://www.asusgo.com/firmware/download?devicename=rt-ax86u_pro&firmware=merlin)

> **京东购买推荐**：[京东自营RT-AX86U PRO路由器优惠购买链接](https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAS8JK1olXwABU19YDUgeA18IGloUXwAKVFlbC08nRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoWAWkAG1wTXgIdDRsBVXt_dCR_SBxKLmMDBBgKFk9XfzNvYV9TUQoyVW5eCUsTAWkJHVkTbTYCU24OZhtVRy3RncXD-IbW_MdtCXsXBWsBHlgVWgMCUltVOEwXCl9YQxlMDVlUHRoJOHsnAF8PG1IBW3RDBkpbensnA18LK1sUXQcLVF9eDE8WH28MGVoSVRoCUlpUDUgXB2oOHV8cbQQDVVpUOHvJjt92a1pLHXNiHBs5CElDdwYJxdalTHp1XVxfDFonWChjbD50WQ9YMiEEQC4VRypTGyBDXXJiOlxZC09XVTR7fAFyGVBiVjspSXsSM2gOGms)  
> 通过此链接购买可支持本项目持续更新，感谢支持！

#### 固件版本信息（RT‑AX86U PRO）
- 版本通道：A 系列（官改）、M 系列（梅林改版）
- 最新版本：102.4_0（2025-06-09），MD5：e2c2e89be8f59802a0a67a980b3a0f22
- 推荐版本：梅林改 388.8_4版本（2024-12-04）

> 注：以上为版本速览，更多版本与更新说明请以下载页为准。

### 为什么选择RT-AX86U PRO？

1. **性能强劲**：四核2.0GHz处理器，1GB内存，运行Clash毫无压力
2. **梅林固件支持**：完美支持第三方梅林固件，功能丰富
3. **稳定性好**：华硕品质保证，长期运行稳定
4. **扩展性强**：支持多种插件和自定义功能
5. **性价比高**：相比其他品牌同配置产品价格更实惠

#### 华硕RT-BE86U 高端旗舰推荐
![华硕RT-BE86U](images/RT-BE86U.png)
- 定位：Wi‑Fi 7 高端旗舰，面向高端与多设备并发场景


### 华硕RT-BE86U 详细规格

| 规格项目 | 详细参数 | 说明 |
|---------|---------|------|
| **处理器** | 博通高性能平台 | 面向Wi‑Fi 7的高并发、多客户端场景 |
| **内存** | 1GB+ DDR4 | 充足内存，适配多插件与并发连接 |
| **存储** | 256MB+ Flash | 可用于安装软件中心与扩展插件 |
| **无线性能** | Wi‑Fi 7 (802.11be) | 更高吞吐、更低时延、更强抗干扰 |
| **有线接口** | 2.5G高速口 + 多口千兆LAN | 满足多千兆宽带/NAS内网高速需求 |
| **USB接口** | USB 3.2 Gen1 | 支持外接存储/下载等扩展场景 |
| **固件支持** | 支持梅林固件 | 通过KoolCenter获取固件 |

> 固件下载：[KoolCenter RT‑BE86U Merlin](https://www.asusgo.com/firmware/download?devicename=rt-be86u&firmware=merlin)  
> 京东购买推荐：[RT‑BE86U 优惠购买链接](https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAS8JK1olXwABU19YDUgeA18IGloUVA8KUldaCUsnRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoWCmYAHVISXAYdDRsBVXtcVAlqbwFdJ2R9VylDARlUZDRJaShDUQoyVW5eCUsTAWkJHVkTbTYCU24OZhtVRy3RncXD-IbW_MdtCXsXBWsBHlgdVAAHUF9eOEwXCl9YQxlMDVlUHRoJOHsnAF8PG1IBW3RDBkpbensnA18LK1sUXQcLVF9eDE8WH28MGVoSVRoCUlpUDUgXB2oOHV8cbQQDVVpUOHvJjt99Hl4QJwZZUFdaWCNICxBSxdalTHRyVFpcDlonVC1hZDB3P1wGAiocUilMBy1YEgxeXQRcOlwZUDMSQWxsRl92BlpKKCwKfHsSM2gOGms)

### 为什么选择RT-BE86U？

1. **前沿无线**：Wi‑Fi 7标准，显著提升吞吐与并发表现
2. **高速有线**：提供2.5G高速口，适配多千兆与NAS应用
3. **梅林生态**：支持梅林固件，软件中心与插件扩展丰富
4. **稳定低时延**：优化游戏/影音/远程办公的时延与稳定性
5. **面向未来**：更长期的硬件生命周期，更适合高端/重度用户


#### 固件版本信息（RT‑BE86U）
- 版本通道：A 系列（官改）、M 系列（梅林改版）
- 最新版本：102.4_0（2025-06-08），MD5：10b719d0f3ef72216b215e9c54d25c16
- 历史版本：
  - 102.3_0（2025-01-31），MD5：9eb32d57c4a203bbf4f02f4ea51d6525
  - 102.2_2（2024-12-05），MD5：6b14ecaa773edc5620a933fe8532c9f3

> 注：以上为版本速览，更多版本与更新说明请以下载页为准。

## 🔄 梅林固件刷机

### 1. 梅林固件介绍

![梅林固件界面](images/merlin-firmware.png)

**梅林固件（ASUSWRT-Merlin）**是基于华硕官方固件的第三方增强版本，专为华硕路由器优化：

- **优点**: 
  - 基于华硕官方固件，稳定性极高
  - 保留所有官方功能，增加更多高级选项
  - 支持多种插件和自定义脚本
  - 社区活跃，更新及时
  - 完美支持Clash等代理工具

- **缺点**: 
  - 仅支持华硕路由器
  - 需要一定的技术基础

- **适用**: 华硕路由器用户，追求稳定性和功能性的用户

### 2. 刷机前准备

#### 检查路由器型号
确保您的路由器型号为RT-AX86U PRO，其他支持的型号包括：
- RT-AX88U、RT-AX86U、RT-AX68U
- RT-AC86U、RT-AC88U、RT-AC68U
- RT-AX56U、RT-AX58U、RT-AX82U
- TUF-AX3000、TUF-AX5400
- GT-AX6000、GT-AX11000

#### 下载梅林固件

**通过KoolCenter下载（推荐）**
下载链接位于设备说明的下方


**固件版本说明：**
- **版本通道**
  - **A 系列（官改）**：官方功能 + 插件支持，版本号形如 `102.x_y` 或 `388.x_y`
  - **M 系列（梅林改版）**：基于 ASUSWRT‑Merlin，版本节奏与 A 系列不完全同步
- **版本分支含义**
  - **102.x_\***：新平台/新内核分支，多见于 Wi‑Fi 7/BE 系列（如 `RT‑BE86U`），也正逐步覆盖部分 AX 机型（如 `RT‑AX86U PRO`）
  - **388.x_\***：Wi‑Fi 6/AX 系列主线分支（如 `RT‑AX86U PRO` 的梅林分支）
  - **384/386**：较老分支，仅老机型或历史版本保留
- **选择建议**
  - 新机或 BE 系列优先选择 `102.x_*`（如 `102.4_0`）
  - AX 机型如已有 `102.x_*` 官方/官改可优先；仅梅林分支时选择最新稳定的 `388.x_*`(我选择的388.8_4版本)
  - 升级前务必备份配置，并核验 MD5

> 完整版本清单与下载请参见对应机型章节与参考资源链接。

### 3. 刷机步骤

#### 第一步：进入路由器管理界面
1. 在浏览器中输入 `http://192.168.50.1` 或 `http://router.asus.com`
2. 使用管理员账号登录（用户名和密码都是自己设置的）

![路由器登录界面](images/router-login.png)

#### 第二步：固件双清（如果是新路由器不需要）
1. 进入【系统管理 】
2.【 恢复/导出/上传设置】，勾选恢复按钮旁的选择框，然后点击恢复按钮

![固件双清界面](images/backup-settings.png)

#### 第三步：上传梅林固件
1. 进入"系统管理" → "固件升级"
2. 点击"选择文件"，选择下载的梅林固件
3. 点击"上传"开始刷机

![固件升级界面](images/firmware-upload.png)

#### 第四步：等待刷机完成
- 刷机过程大约需要3-5分钟
- 期间请勿断电或重启路由器
- 路由器会自动重启

![刷机进度](images/flash-progress.png)


### 4. 验证刷机成功

#### 检查固件版本
1. 重新登录路由器管理界面
2. 查看"系统信息" → "固件版本"
3. 确认显示为梅林固件版本

![固件版本确认](images/firmware-version.png)

#### 检查软件中心
梅林固件新增的功能包括：
- 软件中心（Software Center）
- 络更多网工具
- 高级网络设置
- 自定义脚本支持

![软件中心界面](images/software-center.png)

## ⚙️ Clash安装配置

### 1. Clash介绍

![Clash界面](images/clash-interface.png)

**MerlinClash**是专为华硕梅林固件开发的Clash插件，具有以下特点：

- **支持协议**: Shadowsocks、ShadowsocksR、VMess、Trojan、Hysteria、WireGuard
- **性能优异**: 低延迟、高并发、内存占用少
- **规则引擎**: 强大的分流规则系统
- **配置灵活**: 支持订阅和自定义配置
- **稳定可靠**: 长期运行不崩溃
- **图形界面**: 提供Web管理界面，操作简单

### 2. 下载MerlinClash插件
————————————————————————————————————————————————

【MerlinClash禁止转发国内网站】,这是官方版权声明，请自觉遵守

————————————————————————————————————————————————
#### 从本项目
根据您的路由器型号选择对应版本：
   - **RT-AX86U PRO 等 ARM64 路由器**：下载 [MC2_0.4.6_ARM64.tar.gz](downloads/MC2_0.4.6_ARM64.tar.gz)（推荐）或 [MC2_0.3_ARM64.tar.gz](downloads/MC2_0.3_ARM64.tar.gz)
   - 在链接上点右键，使用“链接另存为”进行下载
   - 梅林Clash也可以通过 [Telegram下载频道](https://t.me/s/merlinclashfile) 获取最新版本（需有Telegram账号）

**支持的华硕路由器型号：**

- **ARM64版本 MC2_0.3**：
  支持
  - BE6500
  - BE88U/BE86U/BE96U/BE3600
  - AC86U/GT5300
  - AX68U/AX86U/AX88U/AX92U/AX11000
  - AX11000 pro/AX86U pro/AX88U pro/GT-AX6000
  - TX-AX6000/TUF-AX4200q/GS7
  - RAX80 等

- **ARM64版本 MC2_0.4.6**：
  支持
  - BE6500
  - BE88U/BE86U/BE96U/BE3600
  - AC86U/GT5300
  - AX68U/AX86U/AX88U/AX92U/AX11000
  - AX11000 pro/AX86U pro/AX88U pro/GT-AX6000
  - TX-AX6000/TUF-AX4200q/GS7
  - RAX80 等

- **ARM32版本 MC2_0.4.6**：
  支持
  - BD4
  - AX3000/AX5400/AX6600/GT6
  - AX82U/AX56U/AX58U/AX1800
  - AX89X
  - RAX50 等


### 3. 安装MerlinClash插件

#### 第一步：升级软件中心
1. 进入路由器管理界面
2. 进入"软件中心"
3. 点击"更新"按钮，升级软件中心到最新版本

![软件中心更新](images/software-center-update.png)

#### 第二步：离线安装MerlinClash
1. 进入"软件中心" → "离线安装"
2. 点击"选择文件"，选择下载的MerlinClash插件包
3. 点击"上传并安装"
4. 等待安装完成

![离线安装界面](images/offline-install.png)

#### 第三步：启用MerlinClash
1. 安装完成后，在软件中心找到"MerlinClash"
2. 点击"启动"按钮
3. 等待插件启动完成

![MerlinClash启动](images/merlinclash-start.png)

### 4. 配置MerlinClash

#### 基本配置
1. 进入MerlinClash管理界面
2. 点击"基本设置"
3. 配置以下参数：
   - **运行模式**: 选择"透明代理"
   - **端口设置**: 保持默认（7890、7891）
   - **DNS设置**: 使用默认DNS配置

![基本配置界面](images/basic-config.png)

#### 申请clash订阅

查看教程：<a href="https://mowei-ie.github.io/router-vpn/pages/clash-subscription-guide.html" target="_blank">申请 Clash 订阅指南</a>


#### 订阅配置
1. 点击"订阅设置"
2. 输入您的机场订阅链接
3. 点击"更新订阅"
4. 等待节点更新完成

![订阅配置界面](images/subscription-config.png)

#### 分流规则配置
1. 点击"规则设置"
2. 选择合适的分流规则
3. 可以自定义规则或使用预设规则

![规则配置界面](images/rules-config.png)

### 5. 测试连接

#### 检查MerlinClash状态
1. 进入MerlinClash管理界面
2. 查看"运行状态"，确认显示"运行中"
3. 检查"节点列表"，确认节点已加载

![运行状态界面](images/status-check.png)

#### 测试网络连接
1. 在浏览器中访问 `http://www.google.com`
2. 检查是否能正常访问
3. 访问 `https://www.whatismyipaddress.com` 验证IP地址

![网络测试结果](images/network-test.png)

### 6. 高级功能

#### 智能分流
MerlinClash支持智能分流功能：
- **游戏加速**：自动为游戏流量选择最优节点
- **流媒体解锁**：支持Netflix、YouTube等流媒体平台
- **广告屏蔽**：自动屏蔽广告域名
- **国内直连**：国内网站直接连接，提高访问速度

#### 管理面板
MerlinClash提供Web管理面板：
- **节点管理**：查看、测试、切换节点
- **规则管理**：自定义分流规则
- **日志查看**：查看运行日志和错误信息
- **性能监控**：监控CPU、内存使用情况

## 🎯 高级功能配置

### 1. 智能分流设置

#### 游戏加速
1. 进入MerlinClash管理界面
2. 点击"规则设置" → "游戏加速"
3. 选择游戏节点组
4. 启用游戏加速功能

![游戏加速配置](images/game-acceleration.png)

#### 流媒体解锁
1. 点击"规则设置" → "流媒体解锁"
2. 选择流媒体节点组
3. 配置支持的流媒体平台

![流媒体解锁配置](images/streaming-unlock.png)

#### 广告屏蔽
1. 点击"规则设置" → "广告屏蔽"
2. 启用广告屏蔽功能
3. 选择广告屏蔽规则

![广告屏蔽配置](images/ad-blocking.png)

### 2. 性能优化

#### 节点选择策略
- **自动选择**：根据延迟自动选择最优节点
- **手动选择**：手动指定特定节点
- **负载均衡**：在多节点间分配流量

#### 分流规则优化
- **国内直连**：国内网站直接连接，提高访问速度
- **国外代理**：国外网站通过代理访问
- **特殊规则**：为特定应用设置特殊规则

### 3. 监控与维护（简版）
- 核心要点：
  - 在管理界面查看运行状态与性能监控
  - 通过日志查看定位问题
  - 定期更新订阅与规则，关注CPU/内存
- 详细说明请参见下文：[监控与维护](#监控与维护)

## 📊 监控与维护

### 1. 日常维护

#### 定期检查
- **每周检查**：MerlinClash运行状态
- **每月更新**：订阅节点和规则
- **定期重启**：路由器定期重启保持稳定

#### 性能监控
1. 进入MerlinClash管理界面
2. 查看"性能监控"页面
3. 监控CPU、内存、网络使用情况

![性能监控界面](images/performance-monitor.png)

### 2. 日志分析
1. 进入MerlinClash管理界面
2. 点击"日志查看"
3. 分析错误信息和警告

![日志分析界面](images/log-analysis.png)

## 🔧 故障排除

### 1. 常见问题

#### 问题1：无法下载文件
**症状**：无法下载梅林固件或MerlinClash插件
**解决方案**：
1. 检查网络连接是否正常
2. 尝试使用VPN或代理访问
3. 使用备用下载链接
4. 联系网络服务提供商

#### 问题2：插件安装失败
**症状**：MerlinClash插件安装时出现错误
**解决方案**：
1. 确保软件中心已升级到最新版本
2. 检查插件包是否完整下载
3. 尝试重新下载插件包
4. 使用google浏览器进行安装---这个很重要
5. 检查路由器存储空间是否充足

#### 问题3：无法访问外网
**症状**：MerlinClash运行正常但无法访问外网
**解决方案**：
1. 检查MerlinClash运行状态
2. 验证节点是否可用
3. 检查分流规则设置
4. 检查流量是否超过限定，订阅是否到期
4. 重启MerlinClash服务

#### 问题4：速度慢
**症状**：网络连接速度很慢
**解决方案**：
1. 更换更快的节点
2. 调整分流规则
3. 检查网络带宽
4. 优化路由器性能

### 2. 调试方法

#### 检查运行状态
1. 进入MerlinClash管理界面
2. 查看"运行状态"页面
3. 检查各项指标是否正常

#### 查看日志信息
1. 点击"日志查看"
2. 分析错误信息和警告
3. 根据日志信息排查问题

#### 测试网络连接
1. 在浏览器中访问测试网站
2. 检查IP地址是否已改变
3. 验证代理是否生效

## 🔒 安全与隐私

### 1. 安全建议

#### 路由器安全
- **定期更新固件**：保持梅林固件为最新版本
- **修改默认密码**：更改路由器管理密码
- **启用防火墙**：使用路由器内置防火墙功能
- **关闭不必要服务**：关闭不需要的网络服务

#### MerlinClash安全
- **使用HTTPS**：在配置中使用HTTPS订阅链接
- **定期更新**：及时更新MerlinClash插件
- **监控日志**：定期查看运行日志
- **备份配置**：定期备份重要配置

### 2. 隐私保护

#### DNS泄露防护
MerlinClash内置DNS泄露防护功能：
- 自动使用代理DNS服务器
- 防止DNS查询泄露真实IP
- 支持自定义DNS服务器

#### 流量加密
- 所有代理流量都经过加密传输
- 支持多种加密协议
- 防止流量被监听和分析

### 3. 使用建议

#### 合法使用
- 遵守当地法律法规
- 不用于非法活动
- 合理使用网络资源

#### 性能优化
- 选择稳定的节点
- 定期清理日志文件
- 监控系统资源使用

## 📚 附录

### 1. 支持的路由器型号

#### ARM64版本（推荐）
- RT-AX86U PRO、RT-AX88U、RT-AX68U、RT-BE86U
- RT-AC86U、RT-AC88U、RT-AC68U
- TUF-AX3000、TUF-AX5400
- GT-AX6000、GT-AX11000

#### ARM32版本
- RT-AX3000、RT-AX5400、RT-AX6600
- RT-AX56U、RT-AX58U、RT-AX82U
- RT-AX89X、RAX50

### 2. 故障排除检查清单

- [ ] 路由器固件是否正确安装
- [ ] 软件中心是否已升级到最新版本
- [ ] MerlinClash插件是否正常安装
- [ ] 订阅链接是否正确配置
- [ ] 节点是否可用
- [ ] 分流规则是否正确设置
- [ ] 网络连接是否正常

### 3. 性能优化建议

#### 路由器优化
- 定期重启路由器保持稳定
- 保持固件为最新版本
- 合理设置Wi-Fi参数
- 监控CPU和内存使用情况

#### MerlinClash优化
- 选择稳定的节点
- 合理配置分流规则
- 定期更新订阅
- 监控运行状态

### 4. 常用操作

#### 重启MerlinClash
1. 进入MerlinClash管理界面
2. 点击"停止"按钮
3. 等待停止完成后点击"启动"

#### 更新订阅
1. 进入MerlinClash管理界面
2. 点击"订阅设置"
3. 点击"更新订阅"按钮

#### 查看日志
1. 进入MerlinClash管理界面
2. 点击"日志查看"
3. 查看运行日志和错误信息

---

## ⚠️ 免责声明

本教程仅供学习和研究使用，请遵守当地法律法规。使用本教程所产生的任何后果，作者不承担任何责任。请合理使用网络资源，尊重他人的知识产权。

## 📞 技术支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

1. 查看本文档的故障排除部分
2. 搜索相关技术论坛
3. 查看Clash官方文档
4. 提交Issue到项目仓库

---

## 📝 版本更新说明

### v2.1 (2025年9月)
- ✅ 更新 RT‑BE86U 与 RT‑AX86U PRO 固件版本信息（A/M 系列）
- ✅ 修正参考资源链接，指向正确机型下载页




### 计划更新
- 🔄 添加所有操作的图片详解
- 🔄 添加更多路由器型号支持
- 🔄 增加视频教程链接
- 🔄 优化配置文件模板

---

**最后更新**: 2025年9月  
**版本**: v2.1  
**作者**: Router VPN Team

### 参考资源
- [KoolCenter梅林固件下载（RT‑AX86U PRO）](https://www.koolcenter.com/fw/device/rt-ax86u_pro/merlin)
- [KoolCenter梅林固件下载（RT‑BE86U）](https://www.asusgo.com/firmware/download?devicename=rt-be86u&firmware=merlin)
- [撸猫云Clash文件频道](https://t.me/s/merlinclashfile)
- [梅林固件官方GitHub](https://github.com/RMerl/asuswrt-merlin.ng)
- [Clash官方文档](https://clash.gitbook.io/)
