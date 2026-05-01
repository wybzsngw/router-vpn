# Mihomo Party 下载教程｜Clash Party 新手配置与 CFW 替代

> 本文对应 HTML 页面：[Mihomo Party 教程](../docs/pages/mihomo-party-guide.html) · 在线阅读：<https://www.aixiaobai168.com/pages/mihomo-party-guide>

Mihomo Party 现在官网显示为 **Clash Party**，旧名称仍是用户常搜关键词。它是基于 Mihomo 内核的桌面代理客户端，适合 Windows、macOS、Linux 用户从 Clash for Windows 迁移后继续使用 Clash / Mihomo 订阅。

---

## 目录

- [一、Mihomo Party / Clash Party 是什么](#一mihomo-party--clash-party-是什么)
- [二、官方下载入口](#二官方下载入口)
- [三、导入机场订阅](#三导入机场订阅)
- [四、节点选择与系统代理](#四节点选择与系统代理)
- [五、TUN 模式与 WebDAV 备份](#五tun-模式与-webdav-备份)
- [六、和其它客户端怎么选](#六和其它客户端怎么选)
- [七、常见问题](#七常见问题)

---

## 一、Mihomo Party / Clash Party 是什么

- 当前官网标题显示为 **Clash Party**。
- GitHub 最新 Release 核对版本为 `v1.9.4`。
- 支持 Windows、macOS、Linux。
- 适合从 CFW 迁移、偏好 Mihomo 内核、希望桌面端配置更直观的新手。
- 不适合主要使用手机、需要 iOS 客户端、或只想使用服务商账号一键登录的用户。

> 客户端不提供节点。没有订阅时，请先看 [Clash 订阅申请指南](../docs/clash-subscription-guide.html)。

---

## 二、官方下载入口

优先使用官网或 GitHub Releases：

| 平台 | 下载建议 | 说明 |
| --- | --- | --- |
| Windows 10/11 | 安装版或便携版 | 新手优先安装版 |
| Windows 7/8 | Win7 专用包 | Release 单独列出 |
| macOS | Intel / Apple Silicon PKG | 按芯片选择 |
| Linux | DEB / RPM | 按发行版与架构选择 |

官方入口：

- 官网：<https://mihomo.party/>
- 最新 Release：<https://github.com/mihomo-party-org/clash-party/releases/latest>

---

## 三、导入机场订阅

1. 在机场后台复制 Clash / Mihomo 订阅链接。
2. 打开 Mihomo Party / Clash Party。
3. 进入订阅或配置管理入口。
4. 粘贴订阅链接并保存。
5. 等待节点与规则加载完成。

> 不要把订阅链接填入延迟检测 URL 或连通性检测 URL，避免高频请求触发机场限制。

---

## 四、节点选择与系统代理

1. 导入订阅后先刷新配置。
2. 在代理组里选择延迟低、地区适合的节点。
3. 开启系统代理。
4. 用浏览器测试 Google、YouTube、ChatGPT 等常用网站。

如果网页仍然打不开，先检查订阅是否过期、节点是否可用，再看系统代理是否被其它客户端占用。

---

## 五、TUN 模式与 WebDAV 备份

TUN 模式适合需要接管更多系统流量的场景。普通网页访问优先使用系统代理即可；只有桌面应用或游戏客户端不走代理时，再考虑 TUN。

建议：

- Windows 首次开启 TUN 或服务模式时，可能需要管理员权限。
- 修改 TUN、DNS、覆写规则前，先备份当前配置。
- 多设备迁移配置时，可以关注 WebDAV 备份。

---

## 六、和其它客户端怎么选

| 客户端 | 更适合谁 | 说明 |
| --- | --- | --- |
| Mihomo Party / Clash Party | 桌面端新手、偏好 Mihomo 内核 | 适合 Windows / macOS / Linux |
| [FlClash](../docs/pages/flclash-guide.html) | Android + 桌面多设备用户 | 跨 Android / Windows / macOS / Linux |
| [Clash Verge Rev](../docs/pages/windows-guide.html) | 从 CFW 迁移的 Windows 主力用户 | 本站已有完整 Windows 教程 |
| [Karing](../docs/pages/karing-guide.html) | iOS 免费方案、跨平台订阅导入 | 更适合手机和 Apple TV 场景 |

---

## 七、常见问题

### Q1：Mihomo Party 和 Clash Party 是一个东西吗？

是同一项目的延续。官网目前显示 Clash Party，用户搜索中仍常用 Mihomo Party。

### Q2：它能直接使用 CFW 的订阅吗？

大多数 Clash / Mihomo 格式订阅可以直接导入。若机场提供多个格式，优先选 Clash 或 Mihomo 订阅。

### Q3：TUN 模式一定要开吗？

不一定。普通网页访问优先开启系统代理；需要接管更多桌面应用流量时再考虑 TUN。

### Q4：下载哪个 Windows 包？

Windows 10/11 新手优先下载安装版；Windows 7/8 需要选择 Release 中专门标注的 win7 包。

### Q5：没有订阅能用吗？

不能。客户端只负责导入配置和连接节点，不提供代理服务本身。

---

## 相关教程

- [FlClash 下载教程](../docs/pages/flclash-guide.html)
- [Clash for Windows 停更替代指南](../docs/pages/clash-for-windows-alternative.html)
- [Clash 订阅申请指南](../docs/clash-subscription-guide.html)
