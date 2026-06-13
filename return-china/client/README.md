# 客户端反向分流配置（占位）

本目录提供**通用 Clash / Mihomo / Shadowrocket 等客户端**的反向分流配置方法，让已经用过翻墙出国的用户能快速加上"回国"分流，互不干扰。

## 已上线文章

| 文件 | 平台 | HTML 在线 |
|------|------|-----------|
| [`clash-reverse-rules.md`](clash-reverse-rules.md) | Clash Verge Rev / Mihomo Party / OpenClash（桌面/软路由） | [/pages/return-china-guide#clash-reverse](https://www.aixiaobai168.com/pages/return-china-guide#clash-reverse) |
| [`shadowrocket-return.md`](shadowrocket-return.md) | iOS Shadowrocket（iPhone / iPad） | [/pages/shadowrocket-return](https://www.aixiaobai168.com/pages/shadowrocket-return) |
| [`android-return.md`](android-return.md) | Android FlClash / ClashMeta for Android | [/pages/android-return](https://www.aixiaobai168.com/pages/android-return) |

## 计划文章

| 文件 | 平台 | 状态 |
|------|------|------|
| `platform-difference.md` | 各平台 GeoSite/GeoIP 数据源差异对比 | 规划中 |

> ✅ 规则集已交付：[`docs/return-china-rules.yaml`](../../docs/return-china-rules.yaml)，
> GitHub Raw 一键引用 `https://raw.githubusercontent.com/mowei-ie/router-vpn/main/docs/return-china-rules.yaml`，
> 用法见 [`clash-reverse-rules.md`](clash-reverse-rules.md)。

## 核心资产：本站维护的回国分流规则集

> 这是一份**有壁垒、可持续维护**的核心资产，建议长期投入。

```yaml
proxy-groups:
  - name: "🇨🇳回国"
    type: select
    proxies: [回国节点1, 回国节点2, ..., DIRECT]

rules:
  # 国服游戏
  - GEOSITE,category-games@cn,🇨🇳回国
  # 视频
  - GEOSITE,bilibili,🇨🇳回国
  - GEOSITE,iqiyi,🇨🇳回国
  - GEOSITE,youku,🇨🇳回国
  - GEOSITE,tencent,🇨🇳回国
  - GEOSITE,mgtv,🇨🇳回国
  # 音乐
  - GEOSITE,netease-music,🇨🇳回国
  - GEOSITE,qqmusic,🇨🇳回国
  # 国内通用
  - GEOSITE,cn,🇨🇳回国
  - GEOIP,CN,🇨🇳回国
  - MATCH,DIRECT  # 或走出国代理
```

## 发布形式

1. 在 `docs/` 目录下提供 `return-china-rules.yaml` 文件
2. 提供 GitHub Raw 链接，让用户一键导入 Clash Verge / Mihomo Party
3. 通过 GitHub Actions 定期更新（本规则集为明确域名列表；GeoSite/GeoIP 分类由 Clash.Meta 内核默认加载的 MetaCubeX/meta-rules-dat 提供）
