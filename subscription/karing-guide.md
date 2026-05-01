# Karing 下载与使用教程｜免费的 Shadowrocket 替代客户端

> 本文对应 HTML 页面：[Karing 下载教程](../docs/pages/karing-guide.html) · 在线阅读：<https://www.aixiaobai168.com/pages/karing-guide>

Karing 是一个免费的跨平台代理客户端，兼容 Clash、V2Ray/V2Fly、sing-box、Shadowsocks、Sub 与 GitHub Subscriptions。它不是机场服务本身，也不会赠送节点；你仍然需要一个可用的机场订阅链接。适合想在 iPhone、安卓、Windows、Mac、Apple TV 上尽量使用同一套配置的用户。

---

## 目录

- [一、Karing 是什么](#一karing-是什么)
- [二、官方下载入口](#二官方下载入口)
- [三、导入机场订阅](#三导入机场订阅)
- [四、节点测速与连接测试](#四节点测速与连接测试)
- [五、iOS 使用注意](#五ios-使用注意)
- [六、Karing 和其它客户端怎么选](#六karing-和其它客户端怎么选)
- [七、常见问题](#七常见问题)

---

## 一、Karing 是什么

Karing 官方定位是 Clash-compatible proxy utility，主要特点：

- 兼容 Clash、V2Ray/V2Fly、sing-box、Shadowsocks、Sub、GitHub Subscriptions。
- 完整 Clash 配置可支持，部分 clash.meta 配置可支持。
- 使用 Flutter 构建，默认配备 sing-box 内核。
- 支持一套路由规则应用到多个订阅源。
- App Store 页面显示免费，支持 iPhone、iPad、Mac、Apple TV。

适合：

- 想找 iOS 免费代理客户端的新手；
- 已有 Clash / V2Ray / sing-box / SS 订阅链接的用户；
- 想在手机、电脑、Apple TV 上尽量统一配置的用户。

不适合：

- 没有任何订阅链接、只想装个 App 就直接使用的用户；
- 依赖 Shadowrocket / Stash 深度脚本、复杂覆写规则的老用户；
- 必须使用机场专属一键登录客户端的用户。

---

## 二、官方下载入口

优先使用官方来源，不建议从第三方网盘或二次打包站下载。

| 平台 | 下载方式 | 注意事项 |
| --- | --- | --- |
| iPhone / iPad / Apple TV | [App Store](https://apps.apple.com/us/app/karing/id6472431552) 搜索 `karing vpn` | 官方教程提示需要非中国大陆 App Store 账号 |
| iOS / tvOS 测试版 | [TestFlight](https://testflight.apple.com/join/RLU59OsJ) | 名额和可用状态可能变化 |
| Android | [Karing 官网](https://karing.app/) 或 [GitHub Releases](https://github.com/KaringX/karing/releases) | APK 安装需允许未知来源 |
| Windows / macOS / Linux | [GitHub Releases](https://github.com/KaringX/karing/releases) | 下载对应系统安装包 |

已核对信息：

- Karing 官网：<https://karing.app/>
- Karing 官方快速教程：<https://karing.app/quickstart/>
- GitHub Releases：<https://github.com/KaringX/karing/releases>
- App Store：<https://apps.apple.com/us/app/karing/id6472431552>

---

## 三、导入机场订阅

1. 在机场后台复制 Clash、sing-box、V2Ray、SS 或通用订阅链接。
2. 打开 Karing，点击左上角设置按钮。
3. 进入「添加配置」。
4. 打开「添加配置链接」。
5. 将订阅链接粘贴到输入框。
6. 点击右上角添加。
7. 回到主屏，等待订阅加载完成。

> 没有订阅链接时，请先看 [Clash 订阅与机场推荐指南](../docs/clash-subscription-guide.html)。

---

## 四、节点测速与连接测试

导入订阅后，建议先做一次延时检测：

1. 点击「延时检测」。
2. 等待每个节点显示延迟。
3. 优先选择延迟较低、地区适合的节点。
4. 如果节点旁边有错误提示，点开查看具体原因。
5. 点击连接开关。
6. 打开 Google、YouTube、ChatGPT 或其它常用网站测试。

新手建议先用自动选择或低延迟节点，不要一开始就改复杂分流规则。

---

## 五、iOS 使用注意

Karing 的优势之一是 iOS 端免费，但需要注意：

- App Store 页面显示免费，但能否搜索到取决于账号地区。
- 官方快速教程提示 iOS / tvOS 需要非中国大陆 App Store 账号。
- 如果 App Store 搜不到，可查看 TestFlight 是否仍可用。
- Apple TV 使用时，官方建议先在移动端添加配置，再通过扫码同步核心配置到 Apple TV。

不要绝对化理解「免费替代 Shadowrocket」：

- 如果只是导入订阅、选节点、连接使用，Karing 可以作为免费方案之一。
- 如果你依赖 Shadowrocket / Stash 的复杂脚本、覆写和规则生态，仍需按个人习惯选择。

---

## 六、Karing 和其它客户端怎么选

| 客户端 | 更适合谁 | 说明 |
| --- | --- | --- |
| Karing | 想要免费 iOS 方案、跨平台同步、多订阅统一管理 | 兼容多种配置格式，适合已有机场订阅的用户 |
| [UniClash](../docs/pages/uniclash-guide.html) | 杨帆云、尔湾云等支持 UniClash 的服务商用户 | 网站代码 + 账号密码登录，不需要手动导入订阅 |
| [FlClash](../docs/pages/flclash-guide.html) | Windows / Android / macOS 多设备用户 | 安卓和桌面端一致体验 |
| [Mihomo Party / Clash Party](../docs/pages/mihomo-party-guide.html) | 桌面端新手用户 | 适合 Windows / macOS / Linux |

如果你是从 Clash for Windows 迁移过来，不确定该选哪个客户端，可以先看 [CFW 停更后替代品对比](../docs/pages/clash-for-windows-alternative.html)。

---

## 七、常见问题

### Q1：Karing 免费吗？

官方快速教程写明 Karing 全平台免费，App Store 页面也显示 Free。后续如有变化，以官方页面为准。

### Q2：Karing 支持哪些订阅？

官网说明兼容 Clash、V2Ray/V2Fly、sing-box、Shadowsocks、Sub、GitHub Subscriptions，完整 Clash 配置可支持，部分 clash.meta 配置可支持。

### Q3：Karing 能替代 Shadowrocket 吗？

如果只需要导入订阅、选节点、连接使用，Karing 可以作为免费方案之一；如果依赖复杂脚本或已有 Shadowrocket 规则库，仍需按个人习惯选择。

### Q4：导入订阅后连不上怎么办？

先确认订阅没有过期，再刷新订阅、运行延时检测、换节点测试。如果所有节点都失败，回机场后台确认套餐状态和订阅格式。

### Q5：Karing 适合没有机场订阅的新手吗？

只安装客户端无法连接网络代理。没有订阅时，请先获取一个可用的 Clash、V2Ray 或 sing-box 订阅链接。

---

## 相关教程

- [Clash 订阅与机场推荐指南](../docs/clash-subscription-guide.html)
- [UniClash 下载教程](../docs/pages/uniclash-guide.html)
- [Clash for Windows 停更替代指南](../docs/pages/clash-for-windows-alternative.html)
- [Mihomo Party / Clash Party 教程](../docs/pages/mihomo-party-guide.html)
- [FlClash 下载教程](../docs/pages/flclash-guide.html)
- [手机科学上网教程](../docs/pages/mobile-guide.html)
