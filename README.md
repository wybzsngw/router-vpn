# Clash 全平台科学上网教程 — 翻墙指南 2026

[![在线阅读](https://img.shields.io/badge/📖_在线阅读-主站-0ea5e9?style=for-the-badge)](https://www.aixiaobai168.com/)
[![GitHub stars](https://img.shields.io/github/stars/EI-ie/router-vpn?style=for-the-badge&logo=github&color=f59e0b)](https://github.com/EI-ie/router-vpn/stargazers)
[![License](https://img.shields.io/badge/license-Apache_2.0-10b981?style=for-the-badge)](LICENSE)
[![Last Updated](https://img.shields.io/badge/更新-2026.04-7c4dff?style=for-the-badge)]()

> **一站式 Clash 全平台科学上网教程** — 覆盖华硕路由器 MerlinClash、软路由 OpenWrt + OpenClash、iStoreOS PassWall、Windows Clash Verge Rev、macOS ClashX Meta、Linux、Android、iOS。含订阅申请、机场推荐、ChatGPT 注册、Netflix 解锁、节点配置、分流规则、TUN 模式、旁路由等完整教程。
>
> 🌐 **在线文档**：<https://www.aixiaobai168.com/>  ·  ⭐ 觉得有用？**Star 一下支持我们！**

---

## 🧭 快速开始

**第一步**：获取 Clash 订阅 → [订阅申请指南（机场推荐与价格对比）](subscription/clash-subscription-guide.md)

**第二步**：选择你的设备，按教程配置 👇

### 路由器 / 软路由（全屋翻墙）

| 设备 | 教程 |
|------|------|
| 华硕路由器 | [梅林刷机](asus-router/asus-merlin-flash.md) → [MerlinClash 配置](asus-router/asus-merlinclash-setup.md) → [高级功能 / Fancyss](asus-router/asus-advanced.md) |
| 软路由 OpenWrt | [OpenWrt + OpenClash 完整教程](soft-router/openwrt-clash.md) |
| 软路由 iKuai | [iKuai + 旁路由方案](soft-router/ikuai-clash.md) |
| iStoreOS | [iStoreOS 科学上网专题（PassWall / SSR-Plus / Are-u-ok）](istoreos/istoreos-guide.md) |
| 旁路由 | [旁路由设置教程 — 部分设备精准翻墙](https://www.aixiaobai168.com/pages/bypass-router-guide) |

### 电脑 / 手机（单设备翻墙）

| 设备 | 教程 |
|------|------|
| Windows | [Clash Verge Rev 教程](windows/clash-verge-rev.md) · [系统代理配置](windows/windows-proxy-settings.md) · [CFW 替代方案](https://www.aixiaobai168.com/pages/clash-for-windows-alternative) |
| macOS | [ClashX Meta 教程](macos/clashx-meta.md) · [系统代理配置](macos/macos-proxy-settings.md) |
| Linux | [桌面版](linux/clash-linux-install-guide.md) · [无 GUI 服务器版](linux/clash-linux-headless-guide.md) |
| Android | [Clash Meta for Android](mobile/android-clash-meta.md) |
| iOS | [Shadowrocket & Stash](mobile/ios-shadowrocket.md) |

### 使用场景教程

| 场景 | 教程 |
|------|------|
| ChatGPT | [ChatGPT 注册与使用教程（中国用户）](https://www.aixiaobai168.com/pages/chatgpt-guide) |
| ChatGPT Plus 充值 | [ChatGPT Plus / Go 充值与支付指南](https://www.aixiaobai168.com/pages/chatgpt-plus-guide) |
| OpenAI API | [OpenAI API 申请与计费指南](https://www.aixiaobai168.com/pages/openai-api-guide) |
| Netflix | [Netflix 解锁观看教程](https://www.aixiaobai168.com/pages/netflix-guide) |

### 通用参考

- [故障排除](common/troubleshooting.md)　·　[分流规则详解](common/proxy-rules.md)　·　[术语表](common/glossary.md)
- [Tailscale ESXi 远程访问](extras/tailscale-esxi-guide.md)

---

## ✨ 为什么选择本教程

- **全平台覆盖** — 从路由器到手机，一个仓库解决所有设备的翻墙需求
- **持续更新** — 跟踪 Clash 生态最新变化（Clash Verge Rev 2.x、iStoreOS 24.10 等）
- **中文友好** — 全中文图文教程，适合新手入门
- **在线阅读** — 除 Markdown 外还提供 [精美的在线文档](https://www.aixiaobai168.com/)，手机也能舒适阅读
- **开源免费** — 所有内容完全开源，欢迎贡献和反馈

---

## 📂 仓库结构

```
├── asus-router/     华硕路由器（梅林 + MerlinClash + Fancyss）
├── soft-router/     软路由（OpenWrt + OpenClash、iKuai 旁路由）
├── istoreos/        iStoreOS 科学上网专题
├── windows/         Windows（Clash Verge Rev）
├── linux/           Linux（桌面 + 服务器）
├── macos/           macOS（ClashX Meta）
├── mobile/          Android + iOS
├── subscription/    订阅申请 & 机场推荐
├── common/          故障排除、分流规则、术语表
├── extras/          Tailscale、部署指南等扩展
├── docs/            在线文档（HTML）& 静态资源
│   ├── pages/       各教程的 HTML 页面
│   ├── images/      截图 & 封面图
│   └── downloads/   离线安装包
└── scripts/         自动化脚本
```

## 📦 离线安装包

| 文件 | 说明 |
|------|------|
| [MC2_0.4.6_ARM64.tar.gz](docs/downloads/MC2_0.4.6_ARM64.tar.gz) | MerlinClash ARM64 版（推荐） |
| [MC2_0.4.6_ARM32.tar.gz](docs/downloads/MC2_0.4.6_ARM32.tar.gz) | MerlinClash ARM32 版 |
| [MC2_0.3_ARM64.tar.gz](docs/downloads/MC2_0.3_ARM64.tar.gz) | MerlinClash ARM64 旧版 |
| [fancyss_hnd_full.tar.gz](docs/downloads/fancyss_hnd_full.tar.gz) | Fancyss HND Full 离线包 |

---

## 🔎 IndexNow 提交

站点已预留 IndexNow 所需的根目录 key 文件：

- `docs/cecc9e5f37a34ece8705857a3a31b0ca.txt`

如果 Cloudflare Pages 发布的是 `docs/` 目录，那么线上可访问地址应为：

- `https://www.aixiaobai168.com/cecc9e5f37a34ece8705857a3a31b0ca.txt`

手动提交方式：

```bash
node scripts/indexnow-submit.js
```

只提交单个或少量规范 URL：

```bash
node scripts/indexnow-submit.js --url https://www.aixiaobai168.com/pages/chatgpt-guide --url https://www.aixiaobai168.com/clash-subscription-guide
```

脚本会默认读取 `docs/sitemap.xml`，并向 `https://api.indexnow.org/indexnow` 发送批量提交。

---

## 📝 更新日志

### v2.5（2026 年 4 月）

- 全站 URL 切换至 clean URL，修复 Google 索引问题
- 蓝胖云套餐信息完善（分档定价 + 设备同时在线数）
- 全站 LCP 性能优化

### v2.4（2026 年 3 月）

- 新增 ChatGPT 注册使用教程、Netflix 解锁观看教程
- 首页新增「使用场景」板块
- 自定义域名 `www.aixiaobai168.com` 上线（Cloudflare Pages）

### v2.3（2026 年 3 月）

- 全站 SEO 优化：结构化数据、sitemap、Open Graph
- 新增 iStoreOS 科学上网完整专题
- 新增 Clash 订阅申请指南（机场推荐与价格对比）

---

## ⚠️ 免责声明

本教程仅供学习和研究使用，请遵守当地法律法规。使用本教程所产生的任何后果，作者不承担任何责任。

## 📞 反馈与贡献

- 遇到问题？查看 [故障排除](common/troubleshooting.md) 或提交 [Issue](https://github.com/EI-ie/router-vpn/issues)
- 想贡献内容？欢迎提交 Pull Request
- 参考资源：[Clash 文档](https://clash.gitbook.io/) · [iStoreOS 文档](https://doc.linkease.com/zh/guide/istoreos/) · [Are-u-ok 插件](https://github.com/AUK9527/Are-u-ok)

---

**在线文档**：<https://www.aixiaobai168.com/>　|　**版本**：v2.5　|　**最后更新**：2026 年 4 月
