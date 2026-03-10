# 科学上网术语表

本文按中文拼音顺序整理常用术语，便于查阅 Clash 相关文档和配置。

---

## A

**ACL4SSR**  
ACL4SSR 规则集，用于 Clash 的分流规则，包含多种场景的规则配置。

**机场**  
代理服务商的俗称，因其提供「起飞」（翻墙）能力而得名。机场通常提供订阅链接和节点服务。

---

## B

**BGP**  
Border Gateway Protocol，边界网关协议。BGP 线路通常指多线接入、路由质量较好的网络线路。

**Base64**  
一种编码方式，常用于订阅链接中传输节点信息。Clash 订阅有时会返回 Base64 编码的节点列表。

---

## C

**Clash**  
Dreamacro 开发的 Go 语言代理内核，支持多种协议和规则分流，是 Clash 系列客户端的基础。

**Clash Verge Rev**  
基于 Clash 的 Windows 客户端，支持 TUN、订阅管理、多配置等。

**Clash Meta**  
Clash 的增强分支，支持更多协议（如 Hysteria、TUIC、VLESS 等）和功能。

**ClashX Meta**  
macOS 上的 Clash Meta 客户端，支持系统代理和菜单栏控制。

**Clash Dashboard**  
Clash 的 Web 管理界面，用于查看连接、切换节点、查看日志等。常见实现如 Yacd。

**CN2**  
China Telecom Next Carrier Network，中国电信下一代承载网，通常指优质国际线路。

---

## D

**DNS 泄露**  
DNS 请求未经过代理，直接发往本地或公网 DNS，导致真实 IP 或访问记录暴露。

**DOMAIN**  
Clash 规则类型，精确匹配域名。

**DOMAIN-KEYWORD**  
Clash 规则类型，匹配域名中包含指定关键词的请求。

**DOMAIN-SUFFIX**  
Clash 规则类型，匹配域名及其子域名。

**订阅**  
通过订阅链接自动获取并更新代理节点配置的过程。

**订阅转换**  
将机场订阅格式转换为 Clash 等客户端所需格式的服务，常见于 Sub-Store 等工具。

**落地 IP**  
代理节点出口的 IP 地址，即访问目标网站时看到的 IP 地址。

---

## F

**翻墙**  
通过代理或 VPN 访问被封锁的网站或服务的通俗说法。

**fake-ip**  
Clash 的 DNS 增强模式之一，返回虚假 IP 以减少 DNS 泄露并加快规则匹配。

**分流规则**  
根据规则（域名、IP、关键词等）决定流量走向（直连、代理、拒绝）的配置。

---

## G

**GeoIP**  
根据 IP 地址判断地理位置的技术。Clash 的 GEOIP 规则用于按国家/地区分流。

**规则分流**  
根据预设规则将不同流量导向不同策略（直连、代理等）的行为。

---

## H

**Hysteria**  
基于 QUIC 协议的代理协议，常用于高带宽、低延迟场景。

---

## I

**IEPL**  
International Ethernet Private Line，国际以太网专线，通常指高质量专线线路。

**IPLC**  
International Private Leased Circuit，国际私有租赁线路，指跨境专线，延迟低、稳定性好。

**入口 IP**  
用户访问代理节点时连接的 IP 地址，即代理服务器的入口 IP。

---

## J

**节点**  
单个代理服务器，通常包含协议、地址、端口、密码等信息。

**节点选择**  
在多个节点中选择一个使用的过程，可通过手动选择或自动测速实现。

---

## K

**科学上网**  
通过代理或 VPN 访问被限制网络的通俗说法。

---

## M

**MATCH**  
Clash 兜底规则类型，匹配所有未命中前面规则的流量，必须放在规则列表最后。

**MerlinClash**  
华硕梅林固件上的 Clash 插件，用于在路由器上运行 Clash。

**MMDB**  
MaxMind 数据库格式，用于 GeoIP 查询，Clash 使用 MMDB 文件判断 IP 归属地。

---

## N

**OpenClash**  
OpenWrt 上的 Clash 插件，支持在路由器上运行 Clash 并提供 Web 管理界面。

---

## P

**PAC**  
Proxy Auto-Config，代理自动配置脚本，浏览器根据 PAC 规则决定是否使用代理。

**Proxy**  
代理，指代理服务器或代理策略。Clash 中常表示「走代理」的动作。

**策略组**  
Clash 中对节点进行分组和选择的配置，如 select、url-test、fallback、load-balance。

---

## R

**redir-host**  
Clash 的 DNS 增强模式之一，先解析真实 IP 再匹配规则，兼容性较好。

---

## S

**Shadowsocks**  
一种代理协议，成熟稳定，被广泛使用。

**Subscription URL**  
订阅链接，用于自动获取节点配置的 URL。

**Sub-Store**  
订阅管理工具，可对订阅进行转换、筛选、重命名等操作。

**系统代理**  
操作系统级别的代理设置，应用程序通过系统代理设置使用代理。

---

## T

**Trojan**  
一种伪装成 HTTPS 流量的代理协议，抗封锁能力强，常用于翻墙。

**TUN 模式**  
通过虚拟网卡接管系统流量，实现透明代理，无需应用单独配置代理。

**TUIC**  
基于 QUIC 的轻量代理协议，性能较好。

**中转**  
流量经过中间节点再转发到目标节点，常用于优化线路或绕过封锁。

---

## V

**VMess**  
V2Ray 的传输协议，灵活可配置，支持多种加密和传输方式。

**VLESS**  
VMess 的简化版本，去除了加密，依赖 TLS 等保证安全，性能更好。

**VPN**  
Virtual Private Network，虚拟专用网络。在翻墙语境中常泛指代理工具。

---

## W

**WireGuard**  
现代 VPN 协议，配置简单、性能高，部分机场支持 WireGuard 节点。

---

## Y

**Yacd**  
Yet Another Clash Dashboard，常用的 Clash Web 管理界面，可查看连接、切换节点等。

**YAML**  
Clash 配置文件的格式，使用缩进表示层级关系。

---

## Z

**直连**  
流量不经过代理，直接访问目标服务器。Clash 中常用 DIRECT 表示。

---

*术语表持续更新，如有遗漏请参考相关文档或社区。*
