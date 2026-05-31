# Clash for Windows 停更怎么办｜2026 替代品对比与迁移指南

> 本文对应 HTML 页面：[CFW 替代方案](../docs/pages/clash-for-windows-alternative.html) · 在线阅读：<https://www.aixiaobai168.com/pages/clash-for-windows-alternative>

Clash for Windows（CFW）已经停更并删除公开仓库。旧版本短期还能打开，但不建议继续作为主力客户端。2026 年更稳妥的做法是迁移到仍在维护的客户端：Windows 桌面端首选 Clash Verge Rev；如果你更看重新手桌面端、安卓多设备、iOS 免费方案，可以再对比 Mihomo Party / Clash Party、FlClash、Karing、UniClash。

---

## 目录

- [一、Clash for Windows 发生了什么](#一clash-for-windows-发生了什么)
- [二、为什么不建议继续用 CFW](#二为什么不建议继续用-cfw)
- [三、先确认下载源，避开假冒官网](#三先确认下载源避开假冒官网)
- [四、2026 年替代客户端怎么选](#四2026-年替代客户端怎么选)
- [五、从 CFW 迁移到 Clash Verge Rev](#五从-cfw-迁移到-clash-verge-rev)
- [六、没有 Clash 订阅怎么办](#六没有-clash-订阅怎么办)
- [七、常见问题](#七常见问题)
- [八、相关教程](#八相关教程)

---

## 一、Clash for Windows 发生了什么

2023 年 11 月，Clash for Windows 开发者停止维护并删除 GitHub 仓库。最后广泛流通的公开版本是 `0.20.39`。

这意味着：

- 官方更新停止，后续没有安全补丁。
- 新协议、新系统适配、新内核特性不会再跟进。
- 市面上所谓「复活版」「增强版」「网盘版」来源不可控。

结论：**CFW 可以临时过渡，但不适合作为 2026 年的长期主力客户端。**

---

## 二、为什么不建议继续用 CFW

主要风险有三类：

1. **安全风险**：底层 Electron 和 Clash 核心不再更新，安全漏洞会持续累积。
2. **下载源风险**：官方仓库已删除，很多下载站会提供二次打包版本，可能夹带捆绑或恶意修改。
3. **兼容风险**：新系统、新协议、新规则集可能不再适配，后续排障成本会越来越高。

如果你只是为了延续「导入订阅 → 选节点 → 开系统代理」这个工作流，直接迁移到 Clash Verge Rev 更稳。

---

## 三、先确认下载源，避开假冒官网

下载前先看域名和仓库归属，不要直接点搜索广告。

| 项目 | 推荐来源 |
| --- | --- |
| Clash Verge Rev | <https://github.com/clash-verge-rev/clash-verge-rev/releases> |
| Clash Verge Rev 文档 | <https://www.clashverge.dev/> |
| Mihomo Party / Clash Party | <https://mihomo.party/> |
| FlClash | <https://github.com/chen08209/FlClash/releases> |

常见假冒特征：

- 搜索广告排在最前面。
- 域名像 `clash-windows`、`clash-vpn` 这类仿冒下载站。
- 页面宣称「独家版本」「复活版」「无需订阅」。
- 安装时要求关闭杀毒软件。
- 安装包来自不明网盘或压缩包站。

---

## 四、2026 年替代客户端怎么选

| 使用场景 | 推荐客户端 | 说明 |
| --- | --- | --- |
| 从 CFW 直接迁移 | [Clash Verge Rev](clash-verge-rev.md) | UI 和工作流最接近，订阅可平移 |
| 新手桌面端 | [Mihomo Party / Clash Party](../subscription/mihomo-party-guide.md) | 基于 Mihomo，适合 Windows / macOS / Linux |
| 多设备 Win + 安卓 + Mac | [FlClash](../subscription/flclash-guide.md) | Android 与桌面端体验更一致 |
| iPhone / 免费跨平台方案 | [Karing](../subscription/karing-guide.md) | 适合 iOS 免费方案和多端订阅导入 |
| 杨帆云 / 尔湾云用户 | [UniClash](../subscription/uniclash-guide.md) | 服务商账号一键登录，不需要手动导入订阅 |
| 路由器全屋代理 | [华硕路由器](../asus-router/asus-merlinclash-setup.md) / [软路由 OpenClash](../soft-router/openwrt-clash.md) | 不依赖每台设备单独安装客户端 |

新手建议：

- Windows 主力电脑：先用 Clash Verge Rev。
- Android + 桌面多设备：可以看 FlClash。
- iPhone 免费方案：可以看 Karing。
- 已经买了杨帆云 / 尔湾云：看 UniClash。

---

## 五、从 CFW 迁移到 Clash Verge Rev

### 1. 备份 CFW 订阅

在 CFW 的 Profiles 页面找到原来的订阅配置，右键复制订阅 URL。

如果你有本地 YAML、自定义规则或特殊端口设置，也建议先备份对应文件。

### 2. 下载 Clash Verge Rev

官方 Release：

<https://github.com/clash-verge-rev/clash-verge-rev/releases>

Windows 用户通常选择 `.exe` 安装程序。不要从不明下载站或网盘获取安装包。

### 3. 导入订阅

1. 打开 Clash Verge Rev。
2. 进入订阅 / Profiles 页面。
3. 粘贴旧 CFW 订阅链接。
4. 点击导入或更新。
5. 等待节点和规则加载完成。

### 4. 启用代理并测试

1. 切换到代理页面，选择一个可用节点。
2. 在设置中打开系统代理。
3. 打开浏览器访问 Google、YouTube、ChatGPT 等网站测试。

更完整的图文配置见：[Windows Clash Verge Rev 教程](clash-verge-rev.md)。

---

## 六、没有 Clash 订阅怎么办

Clash Verge Rev、Mihomo Party、FlClash、Karing 这类客户端本身不提供节点。你仍然需要一个机场订阅链接。

如果还没有订阅，先看：

- [Clash 订阅申请指南](../docs/clash-subscription-guide.html)
- [UniClash 下载教程](../subscription/uniclash-guide.md)（适合杨帆云 / 尔湾云用户）

---

## 七、常见问题

### Q1：CFW 的订阅在 Clash Verge Rev 里能直接用吗？

大多数情况下可以。只要机场提供 Clash 格式订阅，直接粘贴旧订阅链接导入即可。

### Q2：CFW 0.20.39 还能继续用吗？

技术上可能还能用，但不建议长期继续。项目已停止维护，下载源和安全补丁都不可控。

### Q3：Clash Verge Rev 和 CFW 在使用上有什么区别？

核心工作流接近：导入订阅、选择节点、开启系统代理。Clash Verge Rev 使用更现代的维护路线，适合替代 CFW。

### Q4：Mihomo Party 和 Clash Verge Rev 怎么选？

想低成本迁移 CFW，优先 Clash Verge Rev；更看重新手中文界面和桌面端体验，可以再看 [Mihomo Party / Clash Party](../subscription/mihomo-party-guide.md)。

### Q5：手机上也有替代方案吗？

Android 可以看 [FlClash](../subscription/flclash-guide.md) 或手机教程；iOS 可以看 [Karing](../subscription/karing-guide.md)、Shadowrocket、Stash 等方案。

---

## 八、相关教程

- [Windows Clash Verge Rev 教程](clash-verge-rev.md)
- [Mihomo Party / Clash Party 下载教程](../subscription/mihomo-party-guide.md)
- [FlClash 下载与使用教程](../subscription/flclash-guide.md)
- [Karing 下载与使用教程](../subscription/karing-guide.md)
- [UniClash 下载教程](../subscription/uniclash-guide.md)
- [Clash 订阅申请指南](../docs/clash-subscription-guide.html)
