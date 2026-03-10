# Clash 分流规则配置详解

本文介绍 Clash 分流规则的概念、类型、策略组及常用配置方法，帮助你自定义代理规则。

---

## 一、分流规则概念

### 1.1 什么是分流规则

**分流规则**是指根据请求的目标（域名、IP、进程等）决定流量走向的配置。每条规则包含：

- **匹配条件**：如域名、IP、关键词等
- **动作**：直连（DIRECT）、代理（PROXY）、拒绝（REJECT）等

### 1.2 为什么需要规则

- **节省流量**：国内网站直连，不走代理
- **提高速度**：国内直连延迟更低
- **精准代理**：仅对需要翻墙的流量走代理
- **流媒体分流**：Netflix、ChatGPT 等走专用节点

### 1.3 规则模式 vs 全局模式

| 模式 | 说明 |
|------|------|
| **规则模式** | 按规则匹配，未命中则走默认策略（通常为直连或代理） |
| **全局模式** | 所有流量走代理，忽略规则 |

---

## 二、规则类型

Clash 支持的规则类型如下：

| 类型 | 格式 | 示例 |
|------|------|------|
| **DOMAIN** | 精确匹配域名 | `DOMAIN,google.com,Proxy` |
| **DOMAIN-SUFFIX** | 匹配域名及其子域名 | `DOMAIN-SUFFIX,google.com,Proxy` |
| **DOMAIN-KEYWORD** | 域名包含关键词 | `DOMAIN-KEYWORD,google,Proxy` |
| **DOMAIN-REGEX** | 正则匹配域名 | `DOMAIN-REGEX,^.*\.google\.com$,Proxy` |
| **IP-CIDR** | IP 段匹配 | `IP-CIDR,192.168.0.0/16,DIRECT` |
| **IP-CIDR6** | IPv6 段匹配 | `IP-CIDR6,::1/128,DIRECT` |
| **GEOIP** | 按国家/地区 | `GEOIP,CN,DIRECT` |
| **PROCESS-NAME** | 按进程名（部分平台） | `PROCESS-NAME,chrome,Proxy` |
| **MATCH** | 兜底规则 | `MATCH,Proxy` |

### 常用规则说明

- **DOMAIN-SUFFIX**：最常用，如 `DOMAIN-SUFFIX,youtube.com,Proxy` 匹配 `youtube.com` 及 `www.youtube.com` 等
- **GEOIP,CN**：中国 IP 直连，需配合 GeoIP 数据库（MMDB）
- **MATCH**：必须放在最后，作为未匹配流量的默认策略

---

## 三、策略组

策略组用于对节点进行分组和选择，常见类型如下：

### 3.1 select（手动选择）

用户手动选择使用的节点或子策略组。

```yaml
proxy-groups:
  - name: "节点选择"
    type: select
    proxies:
      - 香港节点
      - 美国节点
      - 日本节点
      - DIRECT
```

### 3.2 url-test（自动测速）

按延迟自动选择最快节点。

```yaml
proxy-groups:
  - name: "自动选择"
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 香港节点
      - 美国节点
      - 日本节点
```

### 3.3 fallback（故障转移）

按顺序尝试，直到可用节点。

```yaml
proxy-groups:
  - name: "故障转移"
    type: fallback
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 香港节点
      - 美国节点
      - 日本节点
```

### 3.4 load-balance（负载均衡）

在多个节点间轮询或按权重分配流量。

```yaml
proxy-groups:
  - name: "负载均衡"
    type: load-balance
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 香港节点
      - 美国节点
```

---

## 四、常用规则集

规则集（Rule Provider）可从远程或本地加载规则，常用来源：

| 来源 | 说明 | 适用场景 |
|------|------|----------|
| **blackmatrix7/ios_rule_script** | 规则多、分类细 | 通用分流 |
| **Loyalsoldier** | 经典规则集 | 简洁、稳定 |
| **ACL4SSR** | 多版本分流 | 流媒体、游戏等 |
| **DivineEngine** | 规则丰富 | 精细分流 |

### 示例：使用 blackmatrix7 规则集

```yaml
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Reject/Reject.yaml"
    path: ./rules/reject.yaml
    interval: 86400

  direct:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax.yaml"
    path: ./rules/direct.yaml
    interval: 86400

  proxy:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Global/Global.yaml"
    path: ./rules/proxy.yaml
    interval: 86400

rules:
  - RULE-SET,reject,REJECT
  - RULE-SET,direct,DIRECT
  - RULE-SET,proxy,Proxy
  - MATCH,Proxy
```

---

## 五、自定义规则示例

### 5.1 国内直连

```yaml
rules:
  - GEOIP,CN,DIRECT
  - DOMAIN-SUFFIX,cn,DIRECT
  - DOMAIN-KEYWORD,baidu,DIRECT
  - DOMAIN-KEYWORD,taobao,DIRECT
```

### 5.2 国外代理

```yaml
rules:
  - DOMAIN-SUFFIX,google.com,Proxy
  - DOMAIN-SUFFIX,youtube.com,Proxy
  - DOMAIN-SUFFIX,twitter.com,Proxy
  - DOMAIN-SUFFIX,github.com,Proxy
```

### 5.3 Netflix 专用节点

```yaml
proxy-groups:
  - name: "Netflix"
    type: select
    proxies:
      - 香港解锁
      - 美国解锁
      - 日本解锁
      - 自动选择

rules:
  - DOMAIN-SUFFIX,netflix.com,Netflix
  - DOMAIN-SUFFIX,netflix.net,Netflix
  - DOMAIN-KEYWORD,netflix,Netflix
```

### 5.4 ChatGPT 专用节点

```yaml
proxy-groups:
  - name: "ChatGPT"
    type: select
    proxies:
      - 美国节点
      - 日本节点
      - 自动选择

rules:
  - DOMAIN-SUFFIX,openai.com,ChatGPT
  - DOMAIN-SUFFIX,chat.openai.com,ChatGPT
  - DOMAIN-SUFFIX,chatgpt.com,ChatGPT
  - DOMAIN-SUFFIX,api.openai.com,ChatGPT
```

### 5.5 广告拦截

```yaml
rules:
  - GEOIP,CN,DIRECT
  - DOMAIN-SUFFIX,adservice.google.com,REJECT
  - DOMAIN-KEYWORD,ad,REJECT
  - DOMAIN-SUFFIX,doubleclick.net,REJECT
  - RULE-SET,reject,REJECT
  # ... 其他规则
  - MATCH,Proxy
```

---

## 六、规则优先级

### 6.1 匹配顺序

规则按**从上到下**依次匹配，**先命中先执行**，不再继续匹配。

### 6.2 建议顺序

1. 直连规则（国内、局域网）
2. 拒绝规则（广告、恶意域名）
3. 流媒体等专用规则
4. 代理规则（国外网站）
5. **MATCH** 兜底（必须放在最后）

### 6.3 MATCH 的作用

`MATCH` 是兜底规则，匹配所有未命中前面规则的流量。通常放在最后：

```yaml
rules:
  - GEOIP,CN,DIRECT
  - RULE-SET,reject,REJECT
  - RULE-SET,proxy,Proxy
  - MATCH,Proxy   # 未匹配的走代理
```

若希望未匹配的直连，可改为 `MATCH,DIRECT`。

---

## 七、DNS 与规则配合

### 7.1 fake-ip 模式

- **原理**：Clash 返回虚假 IP（如 `198.18.0.0/16`），在连接时再按规则解析真实 IP
- **优点**：减少 DNS 泄露，规则匹配更快
- **缺点**：部分应用可能不兼容（如 P2P、某些游戏）

### 7.2 redir-host 模式

- **原理**：先解析真实 IP，再按规则匹配
- **优点**：兼容性好
- **缺点**：部分场景下 DNS 可能泄露

### 7.3 配置示例

```yaml
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip   # 或 redir-host
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - https://1.1.1.1/dns-query
    - https://dns.google/dns-query
```

### 7.4 对规则的影响

- **fake-ip**：规则主要基于域名匹配，`GEOIP` 在连接阶段生效
- **redir-host**：DNS 解析后的 IP 可直接用于 `IP-CIDR`、`GEOIP` 等规则

---

*更多规则配置可参考 Clash 官方文档或社区规则集。*
