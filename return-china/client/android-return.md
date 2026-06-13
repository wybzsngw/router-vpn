# Android 手机回国加速配置指南（2026）

> 📄 配套网页：[回国加速器完整指南](https://www.aixiaobai168.com/pages/return-china-guide)　·　🤖 本文专注 **Android 设备**

## 适合人群

- 安卓手机已经用 **ClashMeta for Android / FlClash / sing-box** 翻墙出国，想同时打通国内服务
- 想用 Clash 内核的分流能力，一套配置同时管"出国 + 回国"
- 或者：完全是回国加速新手，想知道安卓上有哪些选择

---

## 一、安卓回国加速的三条路

| 方案 | 难度 | 适合谁 |
|------|------|--------|
| **A. 商业一键加速器 App** | ⭐ 下载即用 | 不想折腾、没有技术基础的用户 |
| **B. ClashMeta / FlClash + 回国节点** | ⭐⭐⭐ 需会用 Clash | 已在用 Clash 翻墙出国的进阶用户 |
| **C. 大陆家宽 Tailscale 客户端** | ⭐⭐⭐⭐ 需有大陆落地点 | 在大陆有常开设备的人 |

> 🎯 **没有技术基础，或者在大陆没有任何落地点** → 直接看 [第二节：商业加速器](#二商业一键加速器最省心推荐)，别在方案 B/C 上浪费时间。

---

## 二、商业一键加速器（最省心，推荐）

安装 App → 注册 → 开加速，无需任何配置。

### Malus 加速器

支持爱奇艺 / B 站 / 优酷 / 腾讯视频 / 网易云 / 国服游戏 / 钉钉 / 企业微信，Android APK 可从官网直接下载（Google Play 无上架）。

> 🎯 **Malus 加速器** · 首月 ¥9.9 起 · 支持 3–5 台设备同时使用
>
> **👉 [前往 Malus 官网下载 →](https://getmalus.com/buy?affid=A328344556F&utm_source=github&utm_medium=affiliate&utm_campaign=client_android&utm_content=malus_top_cta)**

**安装方式（Android）**：
1. 通过上方按钮前往 Malus 官网 → 点击 Android APK 下载
2. 安装时允许"未知来源"（设置 → 安全 → 安装未知应用）
3. 注册账号 → 选购套餐 → 首页选"视频线路" → 开启加速

### 快帆加速器

多协议支持，3 天免费试用，Google Play 有上架（部分地区）。

> 🎯 **快帆加速器** · 3 天免费试用 · iOS / Android / 路由器全覆盖
>
> **👉 [快帆 3 天免费试用 →](https://af.kuaifan.club/scripts/chm1f4?a_aid=6a044b0c5acc0&a_bid=b9bf8033&utm_source=github&utm_medium=affiliate&utm_campaign=client_android&utm_content=kuaifan_top_cta)**

---

## 三、方案 B：ClashMeta for Android / FlClash + 回国节点

如果你已经有 Clash 内核客户端和回国节点来源，可以在现有配置里直接追加回国分流规则，和翻墙出国互不干扰。

### 3.1 安装 Clash 内核客户端（二选一）

| 客户端 | 推荐程度 | 说明 |
|--------|---------|------|
| **FlClash** | ⭐⭐⭐⭐⭐ 首选 | UI 最现代，Material 3 设计，配置兼容性好，GitHub 持续维护 |
| **ClashMeta for Android (CMFA)** | ⭐⭐⭐⭐ | 老牌、稳定，适合从 Clash for Android 迁移过来的用户 |

两款均在 GitHub 发布 APK，需侧载安装：
- FlClash：[github.com/chen08209/FlClash/releases](https://github.com/chen08209/FlClash/releases)
- CMFA：[github.com/MetaCubeX/ClashMetaForAndroid/releases](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)

### 3.2 获得回国节点

回国节点来源二选一：
- **机场提供的回国专线**：联系你使用的机场，询问是否有双向（IEPL/IPLC 回国）线路，部分机场提供独立回国订阅链接
- **自建大陆家宽出口**：参考 [大陆家宽 Tailscale 出口节点教程](../self-hosted/home-exit-node.md)

> ⚠️ 商业加速器（Malus / 快帆等）多数是**封闭 App**，不提供可导入 Clash 的节点链接，不能走此方案。

### 3.3 添加回国规则集

在你的 Clash 配置文件（YAML）里加入本站维护的回国规则集，两步完成：

**步骤 1：在 `rule-providers` 块添加：**

```yaml
rule-providers:
  return-china:
    type: http
    behavior: classical
    format: yaml
    url: "https://raw.githubusercontent.com/mowei-ie/router-vpn/main/docs/return-china-rules.yaml"
    path: ./ruleset/return-china.yaml
    interval: 86400
```

**步骤 2：在 `rules` 块最前面添加（放在所有其他规则之前）：**

```yaml
rules:
  - RULE-SET,return-china,🇨🇳回国
  # --- 通用兜底（可选，放在 RULE-SET 后）---
  - GEOSITE,cn,🇨🇳回国
  - GEOIP,CN,🇨🇳回国,no-resolve
  # --- 你原有的出国规则继续在后面 ---
  - GEOSITE,google,出国代理
  - MATCH,出国代理
```

**步骤 3：新增代理组 `🇨🇳回国`：**

```yaml
proxy-groups:
  - name: "🇨🇳回国"
    type: select
    proxies:
      - 回国节点A
      - 回国节点B
      - DIRECT
```

> 完整配置示例和字段说明见：[Clash 反向分流配置指南](./clash-reverse-rules.md)

### 3.4 在 FlClash / CMFA 中导入配置

**FlClash**：
1. 底部导航 → **Profile（配置）** → **+** → 本地导入 / URL 导入
2. 点击导入的配置 → 确认激活
3. 主页开关打开 VPN → 在"🇨🇳回国"代理组选择对应回国节点

**CMFA**：
1. 主页 → **配置** → **+** → 从 URL 导入 / 本地文件导入
2. 长按配置 → **选为当前配置**
3. 主页 **Enable TUN** 开关打开 → 代理模式选 **Rule（规则）**

### 3.5 验证

1. 手机浏览器访问 <https://ip.cn/> → 应显示大陆 IP 归属地（前提是分流规则命中，且设备通过分流走了回国节点）
2. 打开爱奇艺 / B 站锁区内容验证
3. 同时打开 YouTube → 应走出国代理（验证出国分流未被破坏）

---

## 四、方案 C：Tailscale 客户端（有大陆落地点）

如果你在大陆有常开设备并已配置好 [Tailscale Exit Node](../self-hosted/home-exit-node.md)：

1. Google Play / APK 安装 **Tailscale** App
2. 登录同一个 Tailscale 账户
3. 进入 App → 点 **Exit Node** → 选择大陆那台设备
4. 所有流量从大陆家宽真实 IP 出网，锁区内容自然解锁

> ⚠️ Tailscale 方案走全局隧道，所有流量（包括海外流量）都绕回大陆，**会显著增加访问 Google / YouTube 等海外服务的延迟**。如果你需要同时流畅访问海外服务，建议用方案 B 的 Clash 分流，而不是 Tailscale 全局出口。

---

## 五、常见问题

**Q：ClashMeta / FlClash 安装包在哪下载？**
A：Google Play 没有，从 GitHub Releases 页下载 `.apk` 文件，侧载安装。CMFA 可以搜索"ClashMetaForAndroid"，FlClash 搜索"FlClash"找到官方仓库。

**Q：导入配置后国内视频还是看不了？**
A：检查三处：① 回国节点是否选择正确（代理组 "🇨🇳回国" 里要选一个真实的回国节点，不能选 DIRECT）；② ip.cn 查到的出口 IP 是否是大陆 IP；③ 规则集是否已成功下载（CMFA 里 Rule Providers 下拉刷新一下）。

**Q：用了回国配置后，YouTube / Google 打不开了？**
A：回国规则集放到了所有规则前面，但 `GEOIP,CN` 可能把某些 IP 匹配到了回国节点。检查 `rules` 中的顺序——出国分流规则应在 `GEOIP,CN,🇨🇳回国` 之前，或去掉 `GEOIP,CN,🇨🇳回国` 的兜底规则，只靠 `RULE-SET,return-china` 精确匹配。

**Q：Malus / 快帆 App 可以和 Clash 同时开吗？**
A：不可以。两个 VPN 应用都需要系统 VPN 权限，Android 同一时间只能有一个 VPN 连接活跃，开第二个会自动断开第一个。

---

## 六、相关资源

- [回国加速完整指南（综述）](../overview.md)
- [Clash 反向分流配置指南](./clash-reverse-rules.md)（含完整 YAML 示例）
- [iOS Shadowrocket 回国配置](./shadowrocket-return.md)
- [大陆家宽 Tailscale 出口节点教程](../self-hosted/home-exit-node.md)
- 规则集文件：[`docs/return-china-rules.yaml`](../../docs/return-china-rules.yaml)
