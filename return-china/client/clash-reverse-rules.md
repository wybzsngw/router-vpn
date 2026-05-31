# Clash 反向分流配置与一键规则集

> 📄 配套规则集文件：[`docs/return-china-rules.yaml`](../../docs/return-china-rules.yaml)
> 🌐 GitHub Raw 一键引用：`https://raw.githubusercontent.com/mowei-ie/router-vpn/main/docs/return-china-rules.yaml`

如果你已经在用 Clash Verge Rev / Mihomo Party / OpenClash 翻墙出国，**不需要换客户端、也不需要重做配置**，只要在现有配置里额外加一组"回国节点"和一段反向分流规则，就能让国内服务（爱奇艺、B 站、网易云、央视频、国服游戏、钉钉等）走回国节点，海外网站继续走你原有的出国代理，互不干扰。

本文提供本站长期维护的现成规则集，省去你手动收集上百个国内域名的麻烦。

---

## 一、它解决什么问题（与不能解决什么）

✅ **能解决**：基于 IP 地理封锁的访问限制——「该地区暂不支持播放」「网络异常」、网易云灰色歌曲、12306/学信网拒绝海外 IP 等。

❌ **不能解决**：

- **DRM 与客户端检测**：部分独家剧集、综艺会检测客户端是否国行版本、运营商网络，仅切 IP 不够
- **账号本身限制**：海外注册的微信/支付宝账号、海外手机号绑定的国内服务，功能从注册起就受限
- **版权库差异**：B 站、网易云海外版与国内版内容库本就不同

分流只是把你的网络出口"切回中国大陆"，能力边界到此为止。

---

## 二、前置条件

1. 已有一个支持自定义规则的 Clash 内核客户端（Clash Verge Rev / Mihomo Party / OpenClash / ClashMetaForAndroid 等）
2. 已有一个**回国节点**，来源二选一：
   - 商业回国加速器导出的节点（部分加速器支持，见 [综述第三节](../overview.md)）
   - 自建海外 CN2 GIA VPS + Hysteria2/Trojan 节点（见 [综述第七节](../overview.md)）
3. 你原有的"翻墙出国"订阅与规则保持不动

> ⚠️ 注意：商业加速器（Malus / 快帆等）多数是封闭 App，**不一定提供可导入 Clash 的节点链接**。如果你的加速器不支持导出节点，本方案不适用，请直接用它自带的 App。

---

## 三、一键引用规则集（推荐）

在你的 Clash 配置文件中加入 `rule-providers` 和对应 `rules`：

```yaml
# 1) 先确保有一个"回国"策略组，proxies 填你的回国节点
proxy-groups:
  - name: "🇨🇳回国"
    type: select
    proxies:
      - 回国节点A
      - 回国节点B
      - DIRECT

# 2) 引用本站维护的回国规则集
rule-providers:
  return-china:
    type: http
    behavior: classical
    format: yaml
    url: "https://raw.githubusercontent.com/mowei-ie/router-vpn/main/docs/return-china-rules.yaml"
    path: ./ruleset/return-china.yaml
    interval: 86400   # 每天自动更新一次

# 3) 在 rules 顶部加入规则集引用 + 兜底
rules:
  - RULE-SET,return-china,🇨🇳回国
  - GEOSITE,category-games-cn,🇨🇳回国   # 国服游戏（域名分散，用 GEOSITE 兜底）
  # ……此处保留你原有的"翻墙出国"规则……
  - GEOSITE,cn,🇨🇳回国                  # 其余国内站点兜底（可选）
  - GEOIP,CN,🇨🇳回国                    # 国内 IP 兜底（可选）
  - MATCH,你的出国策略组
```

规则集只包含**明确的国内服务域名**（视频/音乐/游戏/办公/社交/电商/政务）。`GEOSITE`/`GEOIP` 是规则集格式不支持的类型，需要像上面那样**单独写在主配置的 rules 里**做兜底。

---

## 四、不想用在线规则集？手动内联版

如果你不想依赖 GitHub Raw（例如担心更新或网络问题），可以直接把核心域名内联进 rules：

```yaml
rules:
  # 国服游戏
  - GEOSITE,category-games-cn,🇨🇳回国
  # 视频
  - GEOSITE,bilibili,🇨🇳回国
  - GEOSITE,iqiyi,🇨🇳回国
  - GEOSITE,youku,🇨🇳回国
  - DOMAIN-SUFFIX,v.qq.com,🇨🇳回国        # 腾讯视频
  - GEOSITE,mgtv,🇨🇳回国
  - DOMAIN-SUFFIX,yangshipin.cn,🇨🇳回国    # 央视频
  - DOMAIN-SUFFIX,miguvideo.com,🇨🇳回国    # 咪咕
  - DOMAIN-SUFFIX,cmvideo.cn,🇨🇳回国
  # 音乐
  - GEOSITE,netease-music,🇨🇳回国
  - GEOSITE,qqmusic,🇨🇳回国
  # 通用兜底
  - GEOSITE,cn,🇨🇳回国
  - GEOIP,CN,🇨🇳回国
  # 以下保留你原有的"翻墙出国"规则
  - GEOSITE,geolocation-!cn,出海代理
  - MATCH,DIRECT
```

> GeoSite 分类名（`category-games-cn`、`bilibili`、`tencent-video` 等）来自 Mihomo / v2ray-rules-dat 上游，Clash Verge Rev 与 Mihomo Party 默认数据源均包含这些子集。

---

## 五、4 个常踩的坑

1. **规则顺序**：回国规则必须放在 `GEOSITE,cn` 与你原有的 `MATCH` 之前，否则会被提前匹配走错策略组。
2. **规则集 behavior 要写对**：本规则集是 `classical`，引用时 `behavior` 必须填 `classical`，填成 `domain` 会加载失败。
3. **回国策略组里别只放一个节点**：建议多放几个回国节点 + `DIRECT`，方便在节点拥堵时手动切换。
4. **DNS 污染**：少数情况下需要给国内域名指定国内 DNS（如 `223.5.5.5`）走回国节点解析，避免解析到海外 CDN 节点。Mihomo 的 `dns.nameserver-policy` 可按域名指定。

---

## 六、验证是否生效

1. 开启分流后，浏览器访问 <https://www.ip138.com/>
2. 再打开 B 站 / 央视频，检查它识别到的 IP 是否为**中国大陆**
3. 同时访问 Google，确认它仍走**海外**出口（说明出国规则没被破坏）
4. 国服游戏可在客户端连接日志里观察对应域名是否命中 `🇨🇳回国` 策略组

---

## 七、规则集维护说明

- 本规则集托管在 [`docs/return-china-rules.yaml`](../../docs/return-china-rules.yaml)，跟随主流国内服务域名变动持续更新
- 你用 `rule-providers` 在线引用时，`interval: 86400` 会让客户端每天自动拉取最新版
- 发现遗漏或失效的域名，欢迎到 [GitHub 仓库](https://github.com/mowei-ie/router-vpn) 提 Issue / PR

---

## 八、规划中的配套内容

- Shadowrocket（iOS）回国分流配置写法
- ClashMetaForAndroid / FlClash 的规则集导入差异
- 各平台 GeoSite/GeoIP 数据源差异说明

---

**相关阅读**：[回国加速综述](../overview.md) · [海外看 2026 世界杯专题](../scenarios/worldcup-2026.md) · [返回专题首页](../README.md)
