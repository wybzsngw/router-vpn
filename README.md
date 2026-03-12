# Clash 全平台科学上网教程 — 翻墙指南 2026

[![GitHub Pages](https://img.shields.io/badge/在线阅读-GitHub%20Pages-blue?style=flat-square&logo=github)](https://mowei-ie.github.io/router-vpn/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Last Updated](https://img.shields.io/badge/更新日期-2026--03-orange?style=flat-square)]()

> **2026 年最新 Clash 科学上网配置教程** — 一站式覆盖 华硕路由器（MerlinClash）、软路由（OpenWrt + OpenClash）、iStoreOS（PassWall/SSR-Plus/Are-u-ok）、Windows（Clash Verge Rev）、macOS（ClashX Meta）、Linux、Android、iOS 全平台。含订阅申请、机场推荐、节点配置、分流规则、TUN 模式、旁路由、ESXi 虚拟化等进阶内容。
>
> 🌐 **在线文档地址**：<https://mowei-ie.github.io/router-vpn/>

**关键词**: Clash教程, 科学上网, 翻墙教程, VPN, 代理, Clash Verge Rev, OpenClash, PassWall, MerlinClash, 华硕路由器翻墙, 软路由翻墙, iStoreOS, 机场推荐, Clash订阅

---

## 🗂️ 项目总览

本项目是一个开源的 Clash 全平台科学上网配置教程集合，以 Markdown 文档为主，同时提供在线 HTML 阅读入口：

- 在线文档地址：<https://mowei-ie.github.io/router-vpn/>
- GitHub 项目主页：<https://github.com/EI-ie/router-vpn>

### 文档（Markdown）

| 分类 | 文档 |
| ------ | ------ |
| **订阅/机场** | [订阅申请指南](subscription/clash-subscription-guide.md) |
| **华硕路由器** | [梅林固件刷机](asus-router/asus-merlin-flash.md) · [MerlinClash 安装配置](asus-router/asus-merlinclash-setup.md) · [高级功能 / Fancyss 补充](asus-router/asus-advanced.md) |
| **软路由** | [OpenWrt + OpenClash](soft-router/openwrt-clash.md) · [iKuai + 旁路由](soft-router/ikuai-clash.md) |
| **iStoreOS** | [iStoreOS + iStore 插件（Are-u-ok）专题](istoreos/istoreos-guide.md) |
| **Windows** | [Clash Verge Rev 教程](windows/clash-verge-rev.md) · [系统代理配置](windows/windows-proxy-settings.md) |
| **Linux** | [桌面版安装](linux/clash-linux-install-guide.md) · [无 GUI 服务器版](linux/clash-linux-headless-guide.md) |
| **macOS** | [ClashX Meta 教程](macos/clashx-meta.md) · [系统代理配置](macos/macos-proxy-settings.md) |
| **手机** | [Android Clash Meta](mobile/android-clash-meta.md) · [iOS Shadowrocket & Stash](mobile/ios-shadowrocket.md) |
| **通用** | [故障排除](common/troubleshooting.md) · [分流规则详解](common/proxy-rules.md) · [术语表](common/glossary.md) |
| **使用场景** | [ChatGPT 注册使用教程](docs/pages/chatgpt-guide.html) · [Netflix 解锁观看教程](docs/pages/netflix-guide.html) |
| **扩展** | [Tailscale ESXi 远程访问](extras/tailscale-esxi-guide.md) · [统计服务部署](extras/deployment-guide.md) |

### 文档目录

| 目录 | 说明 |
| ------ | ------ |
| `asus-router/` | 华硕路由器相关文档 |
| `soft-router/` | 软路由相关文档 |
| `istoreos/` | iStoreOS 与 iStore 插件专题 |
| `windows/` | Windows 相关文档 |
| `linux/` | Linux 相关文档 |
| `macos/` | macOS 相关文档 |
| `mobile/` | Android / iOS 相关文档 |
| `subscription/` | 订阅与机场相关文档 |
| `common/` | 通用说明、术语、故障排除 |
| `extras/` | 扩展玩法与附加内容 |

### 下载文件

所有可供下载的文件（插件安装包、工具等）统一放在 `docs/downloads/` 目录下：

| 文件 | 说明 | 下载 |
| ------ | ------ | ------ |
| MC2_0.4.6_ARM64.tar.gz | MerlinClash ARM64 版（推荐） | [下载](docs/downloads/MC2_0.4.6_ARM64.tar.gz) |
| MC2_0.4.6_ARM32.tar.gz | MerlinClash ARM32 版（新增） | [下载](docs/downloads/MC2_0.4.6_ARM32.tar.gz) |
| MC2_0.3_ARM64.tar.gz | MerlinClash ARM64 旧版 | [下载](docs/downloads/MC2_0.3_ARM64.tar.gz) |
| fancyss_hnd_full.tar.gz | Fancyss HND Full 示例离线包 | [下载](docs/downloads/fancyss_hnd_full.tar.gz) |

> 将来新增的下载文件也请放入此目录，并在对应专题文档中补充使用说明。

---

## 🚀 如何阅读本项目

本仓库的定位是一个多平台 Clash 使用文档集合。`README.md` 只负责介绍项目整体结构、提供入口导航，以及说明各类文档放在哪里；具体平台的操作步骤、截图说明、固件/插件细节，应进入各自的专题文档维护。

如果你是第一次进入本项目，建议按下面顺序阅读：

1. 先看 [订阅申请指南](subscription/clash-subscription-guide.md)，明确订阅、节点和客户端的关系
2. 再根据自己的设备类型，进入对应平台文档
3. 遇到通用问题时，查看 [故障排除](common/troubleshooting.md)、[分流规则详解](common/proxy-rules.md) 和 [术语表](common/glossary.md)

## 🧭 快速导航

### 按设备类型选择

| 设备类型 | Markdown 文档 |
| ------ | ------ |
| 华硕路由器 | [梅林固件刷机](asus-router/asus-merlin-flash.md) · [MerlinClash 安装配置](asus-router/asus-merlinclash-setup.md) · [高级功能](asus-router/asus-advanced.md) |
| 软路由 | [OpenWrt + OpenClash](soft-router/openwrt-clash.md) · [iKuai + 旁路由](soft-router/ikuai-clash.md) |
| iStoreOS | [iStoreOS + iStore 插件（Are-u-ok）专题](istoreos/istoreos-guide.md) |
| Windows | [Clash Verge Rev 教程](windows/clash-verge-rev.md) · [系统代理配置](windows/windows-proxy-settings.md) |
| Linux | [桌面版安装](linux/clash-linux-install-guide.md) · [无 GUI 服务器版](linux/clash-linux-headless-guide.md) |
| macOS | [ClashX Meta 教程](macos/clashx-meta.md) · [系统代理配置](macos/macos-proxy-settings.md) |
| 手机 | [Android Clash Meta](mobile/android-clash-meta.md) · [iOS Shadowrocket & Stash](mobile/ios-shadowrocket.md) |

### 按内容类型选择

| 内容类型 | 入口 |
| ------ | ------ |
| 订阅与机场 | [订阅申请指南](subscription/clash-subscription-guide.md) |
| 平台实操 | 进入 `asus-router/`、`soft-router/`、`windows/`、`linux/`、`macos/`、`mobile/` |
| 通用问题 | [故障排除](common/troubleshooting.md) · [分流规则详解](common/proxy-rules.md) · [术语表](common/glossary.md) |
| 使用场景 | [ChatGPT 教程](docs/pages/chatgpt-guide.html) · [Netflix 解锁](docs/pages/netflix-guide.html) |
| 扩展玩法 | [Tailscale ESXi 远程访问](extras/tailscale-esxi-guide.md) · [统计服务部署](extras/deployment-guide.md) |
| 在线阅读 | <https://mowei-ie.github.io/router-vpn/> |

## 📝 文档组织原则

- `README.md`：只保留项目介绍、目录结构、导航入口和维护说明
- 平台专属内容：放入对应目录，例如华硕路由器内容统一放在 `asus-router/`
- 下载文件：统一放在 `docs/downloads/`，避免散落在各目录

这样做的好处是：

- 首页更适合新读者快速了解项目全貌
- 各平台文档职责单一，便于后续维护和更新
- 在线阅读入口与仓库文档可以分别维护，职责更清晰

## 📦 下载说明

下载文件统一放在 `docs/downloads/`。如需某个平台专用安装包，请优先进入该平台文档查看上下文说明，再下载对应文件。

当前仓库内已提供的文件：

| 文件 | 说明 | 下载 |
| ------ | ------ | ------ |
| MC2_0.4.6_ARM64.tar.gz | MerlinClash ARM64 版（推荐） | [下载](docs/downloads/MC2_0.4.6_ARM64.tar.gz) |
| MC2_0.4.6_ARM32.tar.gz | MerlinClash ARM32 版（新增） | [下载](docs/downloads/MC2_0.4.6_ARM32.tar.gz) |
| MC2_0.3_ARM64.tar.gz | MerlinClash ARM64 旧版 | [下载](docs/downloads/MC2_0.3_ARM64.tar.gz) |
| fancyss_hnd_full.tar.gz | Fancyss HND Full 示例离线包 | [下载](docs/downloads/fancyss_hnd_full.tar.gz) |

> 华硕路由器相关的安装、ARM32/ARM64 适配机型、Fancyss 平台选择、使用步骤、刷回官方固件等说明，应以 `asus-router/` 下的文档为准，不再在 `README.md` 中展开。

---

## ⭐ 为什么选择本教程

- **全平台覆盖**：从路由器到手机，从 Windows 到 Linux，一个仓库搞定所有设备
- **持续更新**：跟踪 Clash 生态最新变化（Clash Verge Rev、iStoreOS 24.10 等）
- **中文友好**：全部中文编写，图文并茂，适合新手入门
- **开源免费**：所有文档和代码完全开源，欢迎贡献和反馈

## ⚠️ 免责声明

本教程仅供学习和研究使用，请遵守当地法律法规。使用本教程所产生的任何后果，作者不承担任何责任。请合理使用网络资源，尊重他人的知识产权。

## 📞 技术支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

1. 优先查看 [故障排除](common/troubleshooting.md)
2. 根据设备类型进入对应平台文档查找专题说明
3. 查阅 [Clash官方文档](https://clash.gitbook.io/)
4. 提交 [Issue](https://github.com/EI-ie/router-vpn/issues) 到项目仓库

---

## 📝 版本更新说明

### v2.4 (2026年3月)

- ✅ 新增 ChatGPT 注册使用教程、Netflix 解锁观看教程
- ✅ 首页新增「使用场景」板块
- ✅ 统一全站导航栏

### v2.3 (2026年3月)

- ✅ 全站 SEO 优化：结构化数据、FAQPage、长尾关键词、sitemap 完善
- ✅ 新增 iStoreOS 科学上网完整专题（Are-u-ok 插件、ESXi 部署、旁路由）
- ✅ 新增 Clash 订阅申请指南（机场推荐与价格对比）

### v2.2 (2026年3月)

- ✅ 将首页 README 调整为项目总览与导航入口
- ✅ 移除华硕路由器专题实操内容，改为指向对应专题文档

### 计划更新

- 🔄 添加所有操作的图片详解
- 🔄 添加更多路由器型号支持
- 🔄 增加视频教程链接
- 🔄 优化配置文件模板

---

**最后更新**: 2026年3月  
**版本**: v2.4  
**作者**: Router VPN Team

### 参考资源

- [在线页面](https://mowei-ie.github.io/router-vpn/)
- [Clash 官方文档](https://clash.gitbook.io/)
- [iStoreOS 官方文档](https://doc.linkease.com/zh/guide/istoreos/)
- [Are-u-ok 第三方插件](https://github.com/AUK9527/Are-u-ok)

> 平台专属下载地址、固件链接和第三方资源，请在对应专题文档中查看。如果觉得本项目有帮助，欢迎 Star 支持！
