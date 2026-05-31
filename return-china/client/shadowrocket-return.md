# iOS Shadowrocket 回国配置指南（2026）

> 📄 配套网页：[回国加速器完整指南](https://www.aixiaobai168.com/pages/return-china-guide)　·　📱 本文专注 **iOS iPhone / iPad Shadowrocket 客户端**

## 适合人群

- 已经在用 **Shadowrocket**（俗称"小火箭"）翻墙出国，想顺手把国内服务也打通
- 手边有"回国节点"（机场提供 / 自建大陆家宽出口），想用 Shadowrocket 的规则系统分流
- 不想另装一个 App，希望一套客户端同时管"出国"和"回国"

> ⚠️ **如果你没有回国节点**（即在大陆没有任何落地点，也没有机场的回国专线），本方案对你**不成立**。请直接用商业一键加速器：
>
> 👉 [Malus 加速器 · 首月 ¥9.9](https://getmalus.com/buy?affid=A328344556F&utm_source=github&utm_medium=affiliate&utm_campaign=client_shadowrocket&utm_content=top_no_node_malus)　｜　👉 [快帆 · 3 天免费试用](https://af.kuaifan.club/scripts/chm1f4?a_aid=6a044b0c5acc0&a_bid=b9bf8033&utm_source=github&utm_medium=affiliate&utm_campaign=client_shadowrocket&utm_content=top_no_node_kuaifan)

---

## 一、你需要准备什么

| 准备项 | 说明 |
|--------|------|
| **Shadowrocket App** | App Store 美区购买，约 $2.99；国区不售 |
| **回国节点** | 机场提供的回国专线 / 自建大陆家宽 Tailscale 出口节点（参考 [home-exit-node.md](../self-hosted/home-exit-node.md)） |
| **现有出国订阅（可选）** | 如果你已经在用出国机场订阅，直接在同一个 Shadowrocket 内兼容配置 |
| **iOS 15+** | Shadowrocket 最新版要求 |

---

## 二、方法 A：导入机场订阅（有回国专线的机场）

如果你的机场**有独立的回国线路订阅链接**（部分机场提供"回国专线"节点组），这是最简单的方式。

### 2.1 添加订阅

1. 打开 Shadowrocket → 右上角 **+** → 选 **Subscribe**
2. 粘贴机场提供的**回国专线订阅 URL**
3. 输入备注名（如"回国线路"）→ 点 Save → 右上角 Update 更新节点

### 2.2 配置分流（让国内服务走回国节点）

1. 进入 Shadowrocket → 底部 **Config**（配置）→ 找到当前生效的配置文件 → 右侧 **Edit** → **Rules**（规则）
2. 点右上角 **+** 添加规则，选类型 **RULE-SET**，填入本站维护的规则集地址：

   ```
   https://raw.githubusercontent.com/mowei-ie/router-vpn/main/docs/return-china-rules.yaml
   ```

   策略选你的**回国节点或节点组**，行为选 `classical`

3. 将此规则拖到规则列表**最上方**（优先级最高）

> ℹ️ Shadowrocket 对 `rule-provider` 格式的支持与 Clash 有差异——详见第四节"注意事项"。

### 2.3 开启代理并测试

1. 主屏幕右上角开关打开 VPN
2. 在代理选择页选到回国节点
3. 打开 Safari → 访问 <https://ip.cn/> 确认 IP 显示大陆归属地
4. 打开爱奇艺 / B 站 / 央视频验证视频播放

---

## 三、方法 B：手动添加单条回国节点

如果你已有一个**独立的回国节点链接**（Shadowsocks / VMESS / Trojan / VLESS 格式），可以手动添加：

### 3.1 添加节点

1. Shadowrocket → **+** → 选对应协议（SS / VMess / Trojan 等）
2. 填入服务器地址、端口、密码/UUID、加密方式
3. 备注填"🇨🇳 回国节点" 方便识别

### 3.2 使用"场景"功能分流（推荐）

Shadowrocket 的 **Scene**（场景）功能可以实现"国内流量 → 回国节点，其他流量 → 出国代理"：

1. 底部 **Setting**（设置）→ **Scene** → **+** 新建场景
2. 策略选「回国节点」，匹配条件选 **Rule-based**（基于规则）
3. 在 **Rules** 里手动添加以下常用国内域名规则（DOMAIN-SUFFIX 类型）：

   ```
   DOMAIN-SUFFIX,bilibili.com,回国节点
   DOMAIN-SUFFIX,iqiyi.com,回国节点
   DOMAIN-SUFFIX,youku.com,回国节点
   DOMAIN-SUFFIX,v.qq.com,回国节点
   DOMAIN-SUFFIX,yangshipin.cn,回国节点
   DOMAIN-SUFFIX,mgtv.com,回国节点
   DOMAIN-SUFFIX,music.163.com,回国节点
   DOMAIN-SUFFIX,y.qq.com,回国节点
   DOMAIN-SUFFIX,steam.com,回国节点
   DOMAIN-SUFFIX,game.qq.com,回国节点
   FINAL,出国代理节点
   ```

4. 或者，在 Shadowrocket 配置文件（`.conf`）的 `[Rule]` 段手动写入，详见 3.3

### 3.3 配置文件方式（进阶）

创建或编辑 `.conf` 配置文件，在 `[Rule]` 段最前面加：

```ini
[Rule]
# ---------- 回国规则（放在最前面，优先级最高）----------
# 视频
DOMAIN-SUFFIX,bilibili.com,回国节点
DOMAIN-SUFFIX,iqiyi.com,回国节点
DOMAIN-SUFFIX,youku.com,回国节点
DOMAIN-SUFFIX,v.qq.com,回国节点
DOMAIN-SUFFIX,yangshipin.cn,回国节点
DOMAIN-SUFFIX,migu.cn,回国节点
DOMAIN-SUFFIX,miguvideo.com,回国节点
DOMAIN-SUFFIX,mgtv.com,回国节点
# 音乐
DOMAIN-SUFFIX,music.163.com,回国节点
DOMAIN-SUFFIX,y.qq.com,回国节点
DOMAIN-SUFFIX,kugou.com,回国节点
DOMAIN-SUFFIX,kuwo.cn,回国节点
# 游戏
DOMAIN-SUFFIX,game.qq.com,回国节点
DOMAIN-SUFFIX,lol.qq.com,回国节点
DOMAIN-SUFFIX,mihoyo.com,回国节点
DOMAIN-SUFFIX,yuanshen.com,回国节点
# 办公
DOMAIN-SUFFIX,dingtalk.com,回国节点
DOMAIN-SUFFIX,aliwork.com,回国节点
DOMAIN-SUFFIX,wecom.tencent.com,回国节点
# 12306 / 银行
DOMAIN-SUFFIX,12306.cn,回国节点
DOMAIN-SUFFIX,alipay.com,回国节点
DOMAIN-SUFFIX,weixin.qq.com,回国节点
# 通用兜底
GEOIP,CN,回国节点
# ---------- 你原有的出国规则继续在后面 ----------
```

> ⚠️ 把 `回国节点` 替换为你在 Shadowrocket 里实际的节点备注名。

---

## 四、Shadowrocket 使用注意事项

### 4.1 Rule-Set 格式兼容性

Shadowrocket 的 Rule-Set 语法与 Clash `rule-provider` 的 `classical` 格式**不完全相同**：

- Clash 格式：每行 `DOMAIN-SUFFIX,example.com`
- Shadowrocket 格式：每行 `DOMAIN-SUFFIX,example.com,POLICY_NAME`

建议优先使用**手动规则**（方法 B 的 3.3）或等待 Shadowrocket 原生兼容。如果使用自动 Rule-Set，需确认你的 Shadowrocket 版本是否支持无策略的 `classical` 格式并在导入时单独指定策略。

### 4.2 与出国订阅共存

Shadowrocket 支持**多个订阅同时激活**，出国节点和回国节点可以并存：

- 出国订阅 + 回国节点/订阅同时存在是正常的
- 通过 **Rules**（规则）控制哪类流量走哪个节点，互不干扰
- 建议给回国节点单独建一个 **Proxy Group**（代理组），命名 "🇨🇳 回国"，方便切换

### 4.3 全局模式 vs 规则模式

- 使用**规则模式**（Proxy 列表选某节点，开启 Rule）才能做分流
- **全局模式**（Global）会把所有流量都走一个节点，不适合同时管出国+回国

---

## 五、不想折腾？一键加速器更省心

Shadowrocket 分流配置有一定门槛，如果你没有现成节点或不想手动维护规则，**商业回国加速器**是更省心的选择——下载 App、注册、开加速，三步搞定，不需要任何技术知识。

> 🎯 **Malus 加速器** — 本站长期主推，支持爱奇艺 / B 站 / 优酷 / 腾讯视频 / 网易云 / 国服游戏，iOS App 国区可直接下载，首月 ¥9.9 起
>
> **👉 [前往 Malus 注册 →](https://getmalus.com/buy?affid=A328344556F&utm_source=github&utm_medium=affiliate&utm_campaign=client_shadowrocket&utm_content=bottom_cta_malus)**

<!-- -->

> 🎯 **快帆加速器** — 多协议支持，3 天免费试用，支持 iOS / Android / Windows / macOS / 路由器
>
> **👉 [前往快帆 3 天免费试用 →](https://af.kuaifan.club/scripts/chm1f4?a_aid=6a044b0c5acc0&a_bid=b9bf8033&utm_source=github&utm_medium=affiliate&utm_campaign=client_shadowrocket&utm_content=bottom_cta_kuaifan)**

---

## 六、相关资源

- [回国加速完整指南（综述）](../overview.md)
- [Clash 反向分流 + 一键规则集](./clash-reverse-rules.md)（Android/桌面端 Clash 用户）
- [Android 回国配置](./android-return.md)
- [大陆家宽 Tailscale 出口节点教程](../self-hosted/home-exit-node.md)
- 规则集文件：[`docs/return-china-rules.yaml`](../../docs/return-china-rules.yaml)
