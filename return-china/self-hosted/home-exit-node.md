# 大陆家宽出口节点：用 Tailscale Exit Node 自建回国解锁（2026 正解版）

> 📄 配套专题：[回国加速完整指南](https://www.aixiaobai168.com/pages/return-china-guide)
>
> 本文是「自建回国节点」唯一技术正确的方案。如果你看过其它"买海外 VPS + CN2 GIA 就能自建回国看视频"的教程，请先读完第 1 节，那种说法是错的。

## 一、先讲清楚：这篇能做什么、不能做什么

**能做**：让身在海外的你，用**中国大陆家庭宽带的真实 IP** 访问国内服务，从而解锁爱奇艺 / 优酷 / 腾讯视频 / B站 / 央视频 / 咪咕 / 网易云音乐 / 国服游戏等**地理锁区**内容。

**不能做**：

- 不能在你"大陆没有任何落地点"的情况下凭空变出大陆 IP——那种情况请直接用[商业回国加速器](#六在大陆没有落地点直接用商业加速器)。
- 不能绕过 DRM、客户端国行检测、账号实名绑定等"非 IP 维度"的限制（这类限制任何方案都绕不过）。

### 为什么海外 VPS（CN2 GIA）做不到这件事

这是最关键、也最容易被带偏的一点：

- **锁区内容校验的是你的公网出口 IP 归属地**，平台只问一句"你这个 IP 是不是中国大陆的"。
- **海外 VPS 无论线路多优，公网 IP 仍然在海外**。CN2 GIA / 移动 CMI / 联通 9929 优化的只是"大陆 ↔ 海外服务器之间的链路质量（延迟、丢包）"，它**不会**把你的出口 IP 变成大陆 IP。
- 所以拿海外 VPS 去看央视频/爱奇艺锁区内容，结果和不用一样：依旧是"该内容仅限中国大陆地区观看"。

> ✅ **结论**：要"自建解锁锁区"，唯一前提是你在中国大陆有一个真实落地出口 IP。最合规、最现实的来源就是**你自己（或父母 / 亲友）家里的家庭宽带**。

## 二、前提条件清单

开工前请确认你具备以下条件，缺一不可：

| 条件 | 说明 |
|------|------|
| 大陆侧一处常开网络 | 自己家 / 父母家 / 公司，能长期联网 |
| 大陆侧一台常开设备 | 软路由、树莓派、NAS、N1 盒子、旧安卓手机、闲置电脑均可，功耗越低越适合 7×24 常开 |
| 大陆家宽有一定上行带宽 | 看 1080P 直播建议上行 ≥ 10 Mbps；电信/联通家宽上行通常 30–50 Mbps，足够 |
| 能远程操作大陆设备一次 | 首次安装配置需要在大陆设备上操作（可让家人协助，或用远程协助软件） |

> ℹ️ 家宽**没有公网 IP 也没关系**——Tailscale 自带 NAT 打洞（DERP 中继兜底），这正是它比 WireGuard 更适合家庭场景的原因。

## 三、方案 A（主推）：Tailscale Exit Node

Tailscale 基于 WireGuard，但把最麻烦的"打洞 / 密钥分发 / 公网 IP"都自动化了，是家庭场景下最省心的选择。免费版（Personal）支持 100 台设备、3 个用户，个人完全够用。

### 3.1 在大陆设备上安装并启用 Exit Node

以 Linux（软路由 / 树莓派 / NAS 容器）为例：

```bash
# 1. 安装 Tailscale（官方一键脚本）
curl -fsSL https://tailscale.com/install.sh | sh

# 2. 启动并声明自己为出口节点
#    --advertise-exit-node 把这台机器登记为可用出口
#    --accept-dns=false 避免接管 DNS（按需）
sudo tailscale up --advertise-exit-node

# 3. 开启 IP 转发（Exit Node 必须）
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
```

- **Windows**（旧电脑 / 工控机）：装客户端后，托盘图标 → Exit nodes → Run as exit node。
- **安卓**（旧手机）：装 Tailscale App → 设置里开启 "Run as exit node"，并在系统里关闭电池优化、保持常亮充电。
- **群晖 / 威联通 NAS**：套件中心或 Container Manager 安装 Tailscale，启用 exit node 选项。

### 3.2 在 Tailscale 管理后台批准这个出口节点

新登记的 exit node 默认**不会被启用**，需要管理员批准一次：

1. 登录 [login.tailscale.com](https://login.tailscale.com/) → Machines。
2. 找到大陆那台设备，右侧 `...` → **Edit route settings**。
3. 勾选 **Use as exit node** → Save。
4. 建议同时在该设备上点 `...` → **Disable key expiry**，避免密钥到期后节点掉线（家庭设备不方便频繁重新登录）。

### 3.3 在海外设备上启用"使用出口节点"

让你的海外手机/电脑把流量从大陆设备出网：

```bash
# Linux / macOS 命令行
tailscale up --exit-node=<大陆设备的-tailscale-ip 或 主机名> --exit-node-allow-lan-access
```

- **iOS / 安卓**：Tailscale App → 点 "Exit Node" → 选择大陆那台设备。
- **Windows / macOS GUI**：托盘/菜单栏图标 → Exit Node → 选择大陆设备。
- `--exit-node-allow-lan-access` 可让你同时访问海外本地局域网（打印机等），按需开启。

### 3.4 验证你现在用的是大陆 IP

启用后，在海外设备上打开：

- <https://www.ip.cn/> 或 <https://ip.skk.moe/> ——应显示你大陆家宽的归属地（如"中国 浙江 电信"）。
- 然后打开央视频 / 爱奇艺，锁区内容应可正常播放。

如果 IP 仍显示海外，检查：① 海外设备是否真的选中了 exit node；② 大陆设备的 `ip_forward` 是否生效；③ 后台是否已批准 exit node。

## 四、方案 B：WireGuard（大陆侧有公网 IP 时）

如果你的大陆家宽**有公网 IPv4 或 IPv6**（部分电信/联通宽带打电话给客服可申请），可以直接用原生 WireGuard，性能略优于经中继的 Tailscale：

- 大陆设备作为 WireGuard 服务端，监听 UDP 端口（在光猫/路由器上做端口映射）。
- 海外设备作为客户端，`AllowedIPs = 0.0.0.0/0, ::/0` 把全部流量走大陆出口。
- 大陆设备开启 `net.ipv4.ip_forward` 并配置 `iptables -t nat -A POSTROUTING ... -j MASQUERADE`。

> ⚠️ 没有公网 IP 时不要硬上 WireGuard，会卡在打洞上。直接用方案 A 的 Tailscale 更省事。

## 五、方案 C：frp（只想转发特定服务 / 端口）

如果你不需要"全局回国"，只想让海外访问大陆某个具体服务（例如 SSH 到家里的 NAS、访问家庭 Web 服务），用 [frp](https://github.com/fatedier/frp) 做端口转发即可，比建全局隧道更轻量。不过对"看视频解锁锁区"这类需要整条出网链路走大陆的场景，仍建议用方案 A。

## 六、在大陆没有落地点：直接用商业加速器

如果你在大陆**没有任何**可借用的网络/设备，上面三种自建方案对你都不成立，不要在这上面浪费时间和金钱。

商业回国加速器（Malus / 快帆 等）的本质，就是**运营商租用并维护了一批合规的大陆住宅/机房 IP 池**，相当于"按月租用别人维护好的大陆落地点"，省去你自建的全部成本和维护。选购参考见 [回国加速完整指南 · 商业加速器评测](https://www.aixiaobai168.com/pages/return-china-guide)。

## 七、海外 VPS 在这件事里的真实定位

为避免你买错，再明确一次：**海外 VPS（搬瓦工 / DMIT 等）不能解锁锁区内容**。它们的价值在另外两个方向：

- **翻墙出国**：身在大陆访问 Google / ChatGPT / GitHub，海外 VPS + CN2 GIA 优质线路正是为此而生。
- **低延迟中转（非锁区）**：海外访问不做地理封锁的大陆资源（SSH 国内服务器、企业内部系统、普通网站浏览），优质回国线路能降延迟、减丢包。

这两类需求的选购建议见[回国加速完整指南](https://www.aixiaobai168.com/pages/return-china-guide)第七节。

## 八、合规与边界

- 仅用于访问你**有权访问的合法内容**（自己付费/正常注册的账号），不要用于刷量、薅羊毛、违规营销。
- 用自家宽带做出口，流量与责任都在你自己名下，请遵守你所在国家/地区及中国大陆的相关法律法规。
- 出口设备会承载你的全部回国流量，注意设备安全（改默认密码、及时更新固件）。

---

📌 本文随实测持续更新。配置中遇到问题，可对照[回国加速完整指南](https://www.aixiaobai168.com/pages/return-china-guide)的 FAQ，或在仓库 Issue 区反馈。
