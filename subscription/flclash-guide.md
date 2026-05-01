# FlClash 下载与使用教程｜安卓与桌面端 ClashMeta 客户端

> 本文对应 HTML 页面：[FlClash 教程](../docs/pages/flclash-guide.html) · 在线阅读：<https://www.aixiaobai168.com/pages/flclash-guide>

FlClash 是基于 ClashMeta 的多平台代理客户端，官方仓库说明它 simple and easy to use、open-source and ad-free。它支持 Android、Windows、macOS、Linux，适合希望安卓手机和桌面端使用类似操作体验的用户。

---

## 目录

- [一、FlClash 是什么](#一flclash-是什么)
- [二、官方下载入口](#二官方下载入口)
- [三、导入机场订阅](#三导入机场订阅)
- [四、节点切换与连接测试](#四节点切换与连接测试)
- [五、Android 与桌面端注意事项](#五android-与桌面端注意事项)
- [六、备份恢复](#六备份恢复)
- [七、和其它客户端怎么选](#七和其它客户端怎么选)
- [八、常见问题](#八常见问题)

---

## 一、FlClash 是什么

- 基于 ClashMeta 的多平台代理客户端。
- 开源、无广告。
- 当前 GitHub Release 核对版本为 `v0.8.92`。
- 支持 Android、Windows、macOS、Linux。
- 适合 Android + 桌面多设备用户。
- 不适合 iPhone 用户、或只想使用机场账号一键登录的用户。

> FlClash 是客户端，不提供节点。你仍然需要 Clash / ClashMeta 订阅链接。

---

## 二、官方下载入口

优先使用 GitHub Releases：

| 平台 | 下载建议 | 说明 |
| --- | --- | --- |
| Android | 下载 APK | 新手机通常优先 arm64-v8a |
| Windows | 安装包或压缩包 | TUN / 服务模式可能需要权限 |
| macOS | Intel / Apple Silicon | 按芯片选择 |
| Linux | 对应系统包 | 按发行版和架构选择 |

官方入口：

- 仓库：<https://github.com/chen08209/FlClash>
- 最新 Release：<https://github.com/chen08209/FlClash/releases/latest>

---

## 三、导入机场订阅

1. 在机场后台复制 Clash / ClashMeta 订阅链接。
2. 打开 FlClash，进入配置或订阅入口。
3. 粘贴订阅链接并保存。
4. 刷新配置，等待节点列表加载完成。
5. 返回主界面准备选择节点。

没有订阅时，请先看 [Clash 订阅申请指南](../docs/clash-subscription-guide.html)。

---

## 四、节点切换与连接测试

1. 导入订阅后进入代理组。
2. 选择延迟低、地区适合的节点。
3. 开启连接或系统代理。
4. 用浏览器访问 Google、YouTube、ChatGPT 等网站测试。

如果只有部分网站打不开，优先检查规则模式和 DNS；如果所有节点都失败，先回机场后台确认套餐和订阅状态。

---

## 五、Android 与桌面端注意事项

- Android 安装 APK 时，需要允许当前浏览器或文件管理器安装未知来源应用。
- Android 开启 VPN 权限时，系统会弹出授权确认，选择允许后才能接管流量。
- Windows 桌面端若使用 TUN 或服务模式，可能需要管理员权限。
- macOS 首次打开非 App Store 应用时，可能需要在安全性设置中确认。

---

## 六、备份恢复

FlClash Release 说明中持续提到备份与恢复优化。多设备用户建议在修改配置、覆写规则或升级大版本前先备份，避免误删订阅和自定义规则。

建议：

- 升级客户端前保存订阅链接。
- 依赖自定义规则时，先导出或截图关键配置。
- 多设备迁移时，不要只依赖本地缓存。

---

## 七、和其它客户端怎么选

| 客户端 | 更适合谁 | 说明 |
| --- | --- | --- |
| FlClash | Android + 桌面多设备用户 | 跨 Android、Windows、macOS、Linux |
| [Mihomo Party / Clash Party](../docs/pages/mihomo-party-guide.html) | 桌面端新手 | 更偏 Windows / macOS / Linux |
| [Karing](../docs/pages/karing-guide.html) | iOS 免费方案、Apple TV 场景 | 更适合苹果生态用户 |
| [UniClash](../docs/pages/uniclash-guide.html) | 杨帆云、尔湾云用户 | 服务商账号一键登录 |

---

## 八、常见问题

### Q1：FlClash 免费吗？

官方仓库说明它开源且无广告。下载和使用客户端本身不等于提供节点，节点仍需机场订阅。

### Q2：FlClash 支持 iOS 吗？

当前官方 Release 主要列出 Android、Windows、macOS、Linux。iPhone 用户更适合看 [Karing](../docs/pages/karing-guide.html) 或 [手机教程](../docs/pages/mobile-guide.html)。

### Q3：FlClash 和 Clash Verge Rev 怎么选？

Windows 单设备且从 CFW 迁移，可优先看 Clash Verge Rev；如果你同时用 Android 和桌面端，FlClash 更值得比较。

### Q4：APK 下载哪个架构？

多数新 Android 手机可优先选择 arm64-v8a。旧设备不确定时，先查 CPU 架构再下载。

### Q5：导入订阅后全节点失败怎么办？

先确认订阅未过期、套餐有流量，再刷新订阅、换节点、检查系统 VPN 权限。

---

## 相关教程

- [Mihomo Party / Clash Party 教程](../docs/pages/mihomo-party-guide.html)
- [Clash for Windows 停更替代指南](../docs/pages/clash-for-windows-alternative.html)
- [手机科学上网教程](../docs/pages/mobile-guide.html)
