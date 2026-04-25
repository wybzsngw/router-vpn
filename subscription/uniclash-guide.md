# UniClash 下载与使用教程 2026 — 网站代码与安装排障

> 📄 本文对应 HTML 页面：[UniClash 教程](../docs/pages/uniclash-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/uniclash-guide>

UniClash 是部分机场服务商提供的官方/定制 Clash 客户端，登录界面会要求填写"网站代码 + 邮箱 + 密码"。它不是开源 Clash 的全平台通用版本，每家服务商都有自己的网站代码。本文按"先注册账号 → 再下载客户端"的正确顺序，整理已确认支持的两家机场（杨帆云、尔湾云）的全流程。

---

## 📋 目录

- [一、UniClash 是什么](#一uniclash-是什么)
- [二、哪些机场支持 UniClash](#二哪些机场支持-uniclash)
- [三、UniClash 正确使用顺序（6 步）](#三uniclash-正确使用顺序6-步)
- [四、网站代码怎么填](#四网站代码怎么填)
- [五、Windows / Mac / Android 安装登录](#五windows--mac--android-安装登录)
- [六、登录后界面与节点切换](#六登录后界面与节点切换)
- [七、UniClash vs Clash Verge / OpenClash](#七uniclash-vs-clash-verge--openclash)
- [八、打不开 / 登录不上 / 全节点无信号排查](#八打不开--登录不上--全节点无信号排查)
- [九、常见问题 FAQ](#九常见问题-faq)

---

## 一、UniClash 是什么？

- **本质**：服务商提供的官方/定制 Clash 客户端，绑定服务商账号体系。
- **特点**：登录后即可一键连接，不需要手动导入订阅链接。
- **限制**：只能连接对应服务商的节点；并非所有机场都提供 UniClash。
- **适合**：已经在杨帆云 / 尔湾云这类机场买了套餐、只想登录账号即用的新手。
- **不适合**：想自己导入多个订阅、改规则、玩 TUN 模式 → 请使用 [Clash Verge Rev](../windows/clash-verge-rev.md)、[MerlinClash](../asus-router/asus-merlinclash-setup.md)、OpenClash 等通用客户端。

> ⚠️ **不要把 UniClash 理解成"所有机场通用的官方 Clash"**，每家的下载页、网站代码、可用线路都不一样。

---

## 二、哪些机场支持 UniClash？

截至 2026 年 4 月，本站**已确认**同时提供官方 UniClash 下载页 + 网站代码的机场：

| 服务商 | 网站代码 | 注册入口 | 客户端下载 | 支持平台 |
|--------|---------|---------|----------|---------|
| **杨帆云** | `yangfan` | [注册杨帆云](https://yawtt.net/register?code=BnJcjUjE) | [杨帆云 UniClash 下载](https://tusmartchat.com/uniclash.html) | Android / Windows / Mac |
| **尔湾云** | `erwan` | [注册尔湾云](https://ewanwtt.net/auth/register?code=EGi8tb) | [尔湾云 UniClash 下载](https://tusmartchat.com/uniclash-erwan.html) | Android / Windows / Mac |

### 方案 A：杨帆云 UniClash

- AI 解锁能力强：已验证可解锁 ChatGPT / Claude / Gemini 等主流 AI。
- 家宽专线 + 中转双线，年付七折，支持私人定制。
- 操作两步：① [注册杨帆云](https://yawtt.net/register?code=BnJcjUjE)；② [下载杨帆云 UniClash](https://tusmartchat.com/uniclash.html)。

![杨帆云 UniClash 官方下载页](../docs/images/uniclash/download-yangfan.png)

### 方案 B：尔湾云 UniClash

- 套餐梯度清晰，官方明确要求填写网站代码 `erwan`。
- 操作两步：① [注册尔湾云](https://ewanwtt.net/auth/register?code=EGi8tb)；② [下载尔湾云 UniClash](https://tusmartchat.com/uniclash-erwan.html)。

![尔湾云官网"推荐使用 UniClash 客户端"区块](../docs/images/uniclash/download-erwan-block.png)

> 💡 **为什么先注册再下载？** UniClash 登录界面要求"网站代码 + 邮箱 + 密码"，没有对应服务商账号即使装了客户端也无法登录；如果误点"使用默认站点"，原账号和购买记录就找不到了。

---

## 三、UniClash 正确使用顺序（6 步）

按以下 6 步操作即可顺利登录使用，不要跳过注册和购买直接下载客户端：

1. **选服务商**：[杨帆云](https://yawtt.net/register?code=BnJcjUjE) 或 [尔湾云](https://ewanwtt.net/auth/register?code=EGi8tb)。
2. **注册账号**：点上面的服务商名称跳到注册页，填邮箱和密码。
3. **购买套餐**：付款后登录服务商官网确认账号有有效套餐和剩余流量。
4. **下载客户端**：杨帆云走 <https://tusmartchat.com/uniclash.html>，尔湾云走 <https://tusmartchat.com/uniclash-erwan.html>。
5. **填写网站代码**：杨帆云填 `yangfan`，尔湾云填 `erwan`，看到绿色 ✓ 和服务商名再继续。
6. **输入邮箱密码登录**：用刚刚注册的服务商账号（不是本站账号），登录后点中间电源按钮即可连接。

> ⚠️ **不要随手点"使用默认站点"**：那不是杨帆云或尔湾云的账号体系，点了就会找不到购买记录。

---

## 四、网站代码怎么填？

打开 UniClash 后第一步就是填网站代码。**正确填写后，输入框右侧会显示绿色对勾和服务商名称**（"扬帆云"或"尔湾云"），这时再继续输入邮箱密码登录。

| 服务商 | 网站代码 | 输入正确后显示 |
|--------|---------|---------------|
| 杨帆云 | `yangfan` | ✅ 扬帆云 |
| 尔湾云 | `erwan` | ✅ 尔湾云 |

| ![网站代码 yangfan](../docs/images/uniclash/login-yangfan.png) | ![网站代码 erwan](../docs/images/uniclash/login-erwan.png) |
|:---:|:---:|
| 杨帆云：填 `yangfan`，绿色 ✓ 后显示"扬帆云" | 尔湾云：填 `erwan`，绿色 ✓ 后显示"尔湾云" |

### 填写要点

- 只在 App 弹出"网站代码"输入框时填；不弹则直接输邮箱密码登录。
- 账号密码用**对应服务商官网**的，不是本站账号。
- **不要点"使用默认站点"**：那是另一个账号体系。

![不知道网站代码弹窗：使用默认站点会找不到原账号和购买记录](../docs/images/uniclash/default-site-warning.png)

> 🚨 **误用默认站点怎么办？** 退出登录 → 重新打开 UniClash → 重新输入正确的网站代码（`yangfan` 或 `erwan`），原账号和套餐就回来了。

---

## 五、Windows / Mac / Android 安装登录

三大平台都从对应服务商的下载页直接下载安装包，**不要从第三方网盘或二次打包站下载**。

### Android

1. 打开 [杨帆云 UniClash 下载页](https://tusmartchat.com/uniclash.html) 或 [尔湾云 UniClash 下载页](https://tusmartchat.com/uniclash-erwan.html)。
2. 选 **下载 UniClash APK（线路一）**，速度慢就换线路二。
3. 提示"未知来源"时，去系统设置允许当前浏览器或文件管理器安装。
4. 下载页还提供 _改名 zip 版_，下载后把 `.zip` 改回 `.apk` 再安装。

### Windows（10 及以上）

1. 用 Chrome / Edge 下载；浏览器提示"通常不会下载"时点"保留"。
2. 双击 EXE 安装；若 Defender / 360 拦截，先关闭实时监控再装。
3. 下载页另有"EXE 改名 zip 版"，下载后改回 `.exe` 再运行。

### Mac

1. 先确认芯片：左上角苹果菜单 → **关于本机**。
   - "Apple M1/M2/M3" → 选 **Mac M 芯片版**
   - "Intel" → 选 **Mac Intel 版**
2. 下载 `.dmg` 后拖到"应用程序"。
3. 提示"无法验证开发者"：按住 **Control 单击** App 图标 → 打开。
4. 仍打不开：终端执行 `sudo xattr -cr /Applications/UniClash.app`。

> 📱 **iPhone 用户**：UniClash 目前只覆盖 Android / Windows / Mac，iOS 用户请使用 [Shadowrocket / Stash](../mobile/ios-shadowrocket.md)，需要外区 Apple ID 下载。

---

## 六、登录后界面与节点切换

登录成功后界面非常简单：中间一个大圆按钮控制连接，下方显示当前线路，底部三个 Tab 分别是"首页 / 商城 / 我的"。

| ![未连接](../docs/images/uniclash/idle-yangfan.png) | ![已连接](../docs/images/uniclash/connected-yangfan.png) |
|:---:|:---:|
| **未连接**：灰色电源按钮，提示"点击启动" | **已连接**：绿色按钮，下方显示当前节点 |

### 切换节点

1. 点底部"当前线路"那一栏的箭头，弹出"选择线路"面板。
2. 点右上角 **测速**，等延迟数字刷新出来。
3. 选延迟最低（一般 60–150 ms）的节点即可，点击后会自动切换。
4. 解锁 Netflix / ChatGPT 等流媒体优先选择带 `-NF` 标记的高级节点。

![选择线路：测速后挑延迟最低的节点](../docs/images/uniclash/nodes-list.png)

> 💡 **右上角"回退"按钮**：点亮时表示开启自动备用切换；如果只想固定某个节点，把它关掉。"规则"则用来切换全局/规则/直连模式。

---

## 七、UniClash vs Clash Verge / OpenClash

| 方案 | 优点 | 限制 | 推荐人群 |
|------|------|------|---------|
| **UniClash** | 登录账号即可用，无需手动导入订阅 | 绑定服务商生态，并非所有机场通用 | Windows / Mac / Android 新手 |
| [Clash Verge Rev](../windows/clash-verge-rev.md) | 多订阅 / 规则 / TUN 模式都灵活 | 需要理解系统代理、TUN、订阅链接 | 桌面端长期用户、多机场用户 |
| [MerlinClash](../asus-router/asus-merlinclash-setup.md) / OpenClash | 路由器全屋代理，一次配置全家用 | 排障成本更高 | 软路由、华硕梅林、旁路由用户 |
| [Shadowrocket / Stash](../mobile/ios-shadowrocket.md) | iPhone / iPad 端最常见 | 需要外区 Apple ID 下载 | iOS 用户 |

---

## 八、打不开 / 登录不上 / 全节点无信号排查

### Windows 打不开

- SmartScreen 安全警告 → 点"更多信息"→"仍要运行"。
- 双击没反应 → 换 Chrome / Edge 重新下载，临时关 360 / 电脑管家。
- 安装包打不开 → 右键属性 → 勾选"解除锁定"。
- Win7 / Win8 → UniClash 需要 Windows 10 及以上。

### Mac 打不开

- 无法验证开发者 → 按住 Control 单击 App → 打开。
- 无法检查恶意软件 → 系统设置 → 隐私与安全性 → 仍要打开。
- 磁盘映像打不开 → 先拖到"应用程序"，仍失败执行 `sudo xattr -cr /Applications/UniClash.app`。
- M 芯片不要下 Intel 版本。

### 登录后没有节点 / 全节点无信号

1. 检查是否登录的是**正确的服务商账号**。
2. 检查网站代码：杨帆云 `yangfan`，尔湾云 `erwan`。
3. 服务商官网确认套餐没过期、流量没用完。
4. 更新到最新 UniClash，再测速换低延迟节点。
5. 换手机热点测试，排除运营商或路由器 DNS 异常。

仍异常 → 去服务商官网首页查看公告，或在右下角联系在线客服；路由器全屋代理用户额外检查 MerlinClash / OpenClash 插件版本兼容性。

---

## 九、常见问题 FAQ

### Q1：UniClash 网站代码填什么？

按服务商填。杨帆云填 `yangfan`，尔湾云填 `erwan`。如果 App 没提示网站代码，直接用服务商账号邮箱密码登录即可。

### Q2：UniClash 支持 iPhone / iPad 吗？

目前两家下载页都**只提供 Android / Windows / Mac**。iOS 用户请改用 [Shadowrocket / Stash](../mobile/ios-shadowrocket.md)，需要外区 Apple ID 下载。

### Q3：UniClash 和 Clash Verge Rev 哪个更适合新手？

买的是支持 UniClash 的机场（杨帆云 / 尔湾云）就用 UniClash 更省心；用多个机场或要改规则、开 TUN 模式 → [Clash Verge Rev](../windows/clash-verge-rev.md) 更灵活。

### Q4：UniClash 登录成功但没有节点怎么办？

先确认：服务商账号正确 + 网站代码正确 + 套餐未过期 + 还有剩余流量。再更新客户端 + 测速选低延迟节点。

### Q5：可以从第三方网盘下载 UniClash 吗？

不建议。UniClash 涉及账号登录和网络代理，请优先走服务商官方下载页，避免下载到二次打包或被植入广告 / 后门的版本。

### Q6：之前点了"使用默认站点"，账号找不到了怎么办？

退出登录，重新打开 UniClash，把网站代码改回 `yangfan` 或 `erwan`，再用原邮箱密码登录即可。原服务商账号和套餐数据都还在。

---

## 相关文档

- [Clash 订阅申请指南](clash-subscription-guide.md)：机场对比、套餐价格、节点解锁能力
- [Windows Clash Verge Rev 教程](../windows/clash-verge-rev.md)：通用桌面客户端
- [手机翻墙教程](../mobile/android-clash-meta.md)：Android Clash Meta + iOS Shadowrocket
- [华硕路由器 MerlinClash](../asus-router/asus-merlinclash-setup.md)：路由器全屋代理

---

> 📌 本文只做客户端使用说明与下载入口整理，请以服务商官网公告为准。
