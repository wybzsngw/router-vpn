# 回国加速专题路线图（ROADMAP）

回国加速专题（return-china）的迭代计划与待办，按优先级排序。每次内容上线后回来勾掉对应条目并补上线日期。

---

## 已上线

| 上线日期 | 内容 | 在线 URL | Markdown 源 |
|---------|------|---------|------------|
| 2026-05-13 | 回国加速主专题（v1.0 长文 + Malus 评测 + 横评 + Clash 反向分流 + 自建警示） | [/pages/return-china-guide](https://www.aixiaobai168.com/pages/return-china-guide) | [overview.md](./overview.md) |
| 2026-05-21 | 快帆联盟接入（CTA 卡 + 横评行 + 决策树） + 含蓄化合作披露文案 | （主专题内） | （主专题内） |
| 2026-05-21 | 2026 世界杯海外观看专题（CCTV5/央视频/咪咕，5 个联盟 CTA） | [/pages/return-worldcup-2026](https://www.aixiaobai168.com/pages/return-worldcup-2026) | [scenarios/worldcup-2026.md](./scenarios/worldcup-2026.md) |

---

## 待办（按 ROI 排序）

### ⭐⭐⭐ 高优先（5 月底前完成）

- [ ] **赛前 1 周「世界杯节点实测对照表」短文**
  - 时机：5 月底 / 6 月初发，赶在开幕前流量峰值
  - 内容：用真实测速数据对比 Malus、快帆、搬瓦工自建、DMIT 自建在不同地区的 1080P / 4K 直播延迟与速度
  - 联盟：挂全部 4 家（Malus + 快帆 + 搬瓦工 + DMIT），utm_campaign = `return_worldcup_benchmark`
  - 文件位置：`docs/pages/return-worldcup-benchmark.html` + `return-china/scenarios/worldcup-2026-benchmark.md`

### ⭐⭐⭐ 必做（7/19 决赛结束后）

- [ ] **世界杯专题 sitemap 优先级调整**
  - 把 `docs/sitemap.xml` 中 `return-worldcup-2026` 的 `priority` 从 **0.95 降回 0.8**
  - `changefreq` 从 **daily 改回 monthly**
  - 原因：赛事结束后不需要爬虫高频访问，节省爬虫预算给其他高活跃页面
  - 文件位置：`docs/sitemap.xml`

### ⭐⭐ 中优先（6 月底前完成）

- [ ] **央视频独立教程子页**
  - 文件：`docs/pages/yangshipin-overseas-guide.html`
  - 目标词：「央视频海外」「央视频海外无法播放」「海外用央视频」「央视频海外登录」
  - 内容：央视频独立深度教程（含海外 Apple ID 切国区下载、内容分级说明、AirPlay 投屏教程）
  - 联盟：挂 Malus + 快帆
  - 互导：与 worldcup 页、return-china-guide 主页双向链接

- [ ] **咪咕视频独立教程子页**
  - 文件：`docs/pages/migu-video-overseas-guide.html`
  - 目标词：「海外咪咕视频」「咪咕视频海外」「咪咕视频海外无法观看」「咪咕海外 VIP」
  - 内容：咪咕视频独立教程（含 4K HDR 播放教程、海外手机号注册解决方案、咪咕 VIP 支付方式）
  - 联盟：挂 Malus + 快帆

- [ ] **再申请 1–2 家联盟拓展 method 3 多样性**
  - 候选：Hong Kong VPS / 新加坡 VPS / Akile / RackNerd 等海外华人圈常见品
  - 目的：避免读者对搬瓦工 + DMIT 两家产生疲劳，增加 method 3 自建段 CTA 多样性
  - 申请后更新 `docs/analytics-events.js` 的 `VPS_AFFILIATE_DOMAINS` 白名单

### ⭐ 低优先（按数据反馈再决定是否做）

- [ ] **4 个国别落地页**
  - 候选：`return-worldcup-usa.html` / `return-worldcup-canada.html` / `return-worldcup-uk.html` / `return-worldcup-australia.html`
  - 目标长尾词：「美国看央视世界杯」「加拿大看世界杯中文」等
  - 前置条件：先看主 worldcup 页 GA4 数据，确认哪些国家流量最大，再决定优先做哪个
  - 维护成本：高（需要按国别更新转播台、节点延迟、套餐推荐）

- [ ] **小红书 / 知乎引流文**
  - 时机：赛前 1 周发
  - 关键：避开广告硬推措辞，导回 worldcup 页
  - 主账号：本站官方账号或合作 KOL

- [ ] **金融联盟接入（持牌机构）**
  - 候选：富途、老虎证券、长桥、Wise（持 SEC/FINRA/SFC/FCA 牌照）
  - 前置：先把 `docs/analytics-events.js` 的 `FINANCE_AFFILIATE_DOMAINS` 白名单填上
  - 落地页：独立海外华人开户/汇款教程（不要混入主专题）
  - 合规要求：必须独立成段 + 加风险提示

- [ ] **机票/酒店联盟接入**
  - 候选：Trip.com、Booking、Skyscanner、Agoda
  - 同样填 `TRAVEL_AFFILIATE_DOMAINS` 白名单
  - 露出位置：仅在 overview / 工具箱卡片露出，不在主线评测中混杂

---

## 内容原则（每篇新文都要遵守）

- ✅ 只推荐有合规主体、运营时间不少于 1 年的产品
- ✅ 评测客观，如实呈现产品的已知缺点与适用边界
- ✅ 所有联盟链接带 `rel="sponsored noopener"`，并通过 utm_content 区分位置
- ✅ 文章顶部含蓄披露合作关系，底部含「内容原则 / 合规声明」
- ✅ 涉及金融的文章必须独立成段并加风险提示
- ❌ 拒绝任何擦边或灰产推广（盗版直播源、违规账号共享、灰色支付通道、微信解封、接码、外区账号共享、会员租赁等）
- ❌ 不教用户违反平台 ToS 的操作（如多账号共享、刷流量、虚假地理位置注册等）
- ❌ 绝不推荐国内云服务器搭建代理（违反云厂商 ToS，会被工单封号）

## SEO 与 Analytics 规范

每篇新文上线前必须通过本地 SEO 自检：

```bash
node scripts/check-seo.js --file docs/pages/<new-page>.html
```

强制要求：

- `<title>` 显示宽度 50–65（中文按 2 算）
- `<meta description>` 字符数 150–160 且显示宽度 150–320
- 完整的 `og:*` / `twitter:*` / `canonical` / `keywords` / `robots` meta
- 至少 1 个 `application/ld+json` 结构化数据（Article + 可选 BreadcrumbList / SportsEvent）

每篇新文上线时必须同步：

1. `docs/sitemap.xml` 加入新 URL
2. `docs/analytics-events.js` 的 `SOURCE_MODULE_RULES` 增加 source_module 规则
3. 如有新联盟域名，加入 `RETURN_ACCELERATOR_DOMAINS` / `VPS_AFFILIATE_DOMAINS` / `TRAVEL_AFFILIATE_DOMAINS` / `FINANCE_AFFILIATE_DOMAINS` 白名单

## 联盟链接管理

| 联盟 | 主体 / 推广员 ID | 主域名 | 状态 |
|------|----------------|--------|------|
| Malus | `affid=A328344556F` | `getmalus.com` | ✅ 在用 |
| 快帆 | `a_aid=6a044b0c5acc0` | `kuaifan.co` / `af.kuaifan.club` | ✅ 在用 |
| 搬瓦工 BandwagonHost | `aff=81911` | `bandwagonhost.com` | ✅ 在用 |
| DMIT | `aff=22076` | `dmit.io` | ✅ 在用 |

UTM 命名规范：

- `utm_source` 固定 `aixiaobai168`
- `utm_medium` 固定 `affiliate`
- `utm_campaign` 按场景：`return_overview` / `return_worldcup` / 后续场景再加
- `utm_content` 精确到「位置 + 产品」，便于 GA4 漏斗按位置分析转化

---

**维护**：每次有新内容上线或下线时，回到本文件勾选/更新对应条目。
