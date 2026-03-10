# Clash 全平台翻墙指南

> 一站式 Clash 订阅申请与配置教程，覆盖路由器、软路由、Windows、Linux、macOS、Android、iOS。
>
> 🌐 **在线文档地址**：<https://mowei-ie.github.io/router-vpn/>

---

## 🗂️ 项目总览

本项目以 Markdown 文档为主，同时提供在线阅读入口：

- 在线文档地址：<https://mowei-ie.github.io/router-vpn/>

### 文档（Markdown）

| 分类 | 文档 |
| ------ | ------ |
| **订阅/机场** | [订阅申请指南](subscription/clash-subscription-guide.md) |
| **华硕路由器** | [梅林固件刷机](asus-router/asus-merlin-flash.md) · [MerlinClash 安装配置](asus-router/asus-merlinclash-setup.md) · [高级功能 / Fancyss 补充](asus-router/asus-advanced.md) |
| **软路由** | [OpenWrt + OpenClash](soft-router/openwrt-clash.md) · [iKuai + 旁路由](soft-router/ikuai-clash.md) |
| **Windows** | [Clash Verge Rev 教程](windows/clash-verge-rev.md) · [系统代理配置](windows/windows-proxy-settings.md) |
| **Linux** | [桌面版安装](linux/clash-linux-install-guide.md) · [无 GUI 服务器版](linux/clash-linux-headless-guide.md) |
| **macOS** | [ClashX Meta 教程](macos/clashx-meta.md) · [系统代理配置](macos/macos-proxy-settings.md) |
| **手机** | [Android Clash Meta](mobile/android-clash-meta.md) · [iOS Shadowrocket & Stash](mobile/ios-shadowrocket.md) |
| **通用** | [故障排除](common/troubleshooting.md) · [分流规则详解](common/proxy-rules.md) · [术语表](common/glossary.md) |
| **扩展** | [Tailscale ESXi 远程访问](extras/tailscale-esxi-guide.md) · [统计服务部署](extras/deployment-guide.md) |

### 文档目录

| 目录 | 说明 |
| ------ | ------ |
| `asus-router/` | 华硕路由器相关文档 |
| `soft-router/` | 软路由相关文档 |
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

## ⚠️ 免责声明

本教程仅供学习和研究使用，请遵守当地法律法规。使用本教程所产生的任何后果，作者不承担任何责任。请合理使用网络资源，尊重他人的知识产权。

## 📞 技术支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

1. 优先查看 [故障排除](common/troubleshooting.md)
2. 根据设备类型进入对应平台文档查找专题说明
3. 查阅 [Clash官方文档](https://clash.gitbook.io/)
4. 提交 Issue 到项目仓库

---

## 📝 版本更新说明

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
**版本**: v2.2  
**作者**: Router VPN Team

### 参考资源

- [在线页面](https://mowei-ie.github.io/router-vpn/)
- [Clash官方文档](https://clash.gitbook.io/)

> 平台专属下载地址、固件链接和第三方资源，请在对应专题文档中查看。
