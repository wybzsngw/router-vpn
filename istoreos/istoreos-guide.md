# iStoreOS 科学上网完整专题

> 📄 本文对应 HTML 页面：[iStoreOS 专题页](../docs/pages/istoreos-guide.html)

本专题的核心目标：**在 iStoreOS 上实现科学上网**——通过 iStore 软件中心 + 第三方插件包 [Are-u-ok](https://github.com/AUK9527/Are-u-ok) 安装 PassWall / OpenClash / SSR-Plus 等代理工具，让局域网内设备无需逐一配置即可翻墙。

---

## 📋 目录

- [一、iStoreOS 是什么](#一istoreos-是什么)
- [二、支持设备与固件下载](#二支持设备与固件下载)
- [三、iStoreOS 安装（x86 物理机 / ESXi / PVE）](#三istoreos-安装x86-物理机--esxi--pve)
- [四、ESXi 专题：安装 iStoreOS 并代理虚拟机科学上网](#四esxi-专题安装-istoreos-并代理虚拟机科学上网)
- [五、科学上网插件安装（Are-u-ok）](#五科学上网插件安装are-u-ok)
- [六、旁路由最佳实践](#六旁路由最佳实践)
- [七、稳定性清单：DNS / IPv6 / 防火墙](#七稳定性清单dns--ipv6--防火墙)
- [八、常见坑与排查](#八常见坑与排查)
- [九、参考链接](#九参考链接)

---

## 一、iStoreOS 是什么

[iStoreOS](https://doc.linkease.com/zh/guide/istoreos/) 是基于 OpenWrt 开发的**开源免费路由兼存储系统**，由 LinkEase 推出。相比原生 OpenWrt，它提供了更友好的 Web 管理界面和 **iStore 软件中心**生态，降低了插件安装与维护门槛。

核心特性：

- **iStore 软件中心**：自动处理依赖，支持在线/离线安装（`.run` 格式）
- **网络向导**：支持主路由、旁路由等模式的一键配置
- **存储功能**：文件同步、RAID、私有网盘等 NAS 能力
- **三套 UI**：小白路由版 / iStoreNAS 桌面版 / 极客版，按需切换

官方文档：[doc.linkease.com/zh/guide/istoreos/](https://doc.linkease.com/zh/guide/istoreos/)  
官网：[site.istoreos.com](https://site.istoreos.com/)  
GitHub：[github.com/istoreos/istoreos](https://github.com/istoreos/istoreos)

---

## 二、支持设备与固件下载

> 来源：[iStoreOS 官方文档 - 安装](https://doc.linkease.com/zh/guide/istoreos/install.html)

### 支持设备列表

| 分类 | 支持设备 |
|---|---|
| **x86 通用** | x86 物理机、PVE、ESXi 8.0、VMware Workstation、Hyper-V、iKuai 爱快、UNRAID |
| **专用设备** | EasePi R1、EasePi ARS2 |
| **Rockchip** | R2S/R2C、R4S、R5S/R5C、R6S/R6C、R66S、R68S、H66K/H68K/H69K、H88K、莱因特 T68M |
| **其他 ARM** | 树莓派 Model 4、Radxa E20C/E52C、GL MT3000、小米 AX9000 |
| **Apple** | Apple Silicon M 系列（VMware Fusion） |

### 固件下载

固件统一放在 KoolCenter 下载站，按设备型号选择：

| 设备 | 下载地址 |
|---|---|
| **x86_64** | [fw.koolcenter.com/iStoreOS/x86_64/](https://fw.koolcenter.com/iStoreOS/x86_64/) |
| **R2S** | [fw.koolcenter.com/iStoreOS/r2s/](https://fw.koolcenter.com/iStoreOS/r2s/) |
| **R4S** | [fw.koolcenter.com/iStoreOS/r4s/](https://fw.koolcenter.com/iStoreOS/r4s/) |
| **R5S/R5C** | [fw.koolcenter.com/iStoreOS/r5s/](https://fw.koolcenter.com/iStoreOS/r5s/) |
| **R6S/R6C** | [fw.koolcenter.com/iStoreOS/r6s/](https://fw.koolcenter.com/iStoreOS/r6s/) |
| **R68S** | [fw.koolcenter.com/iStoreOS/r68s/](https://fw.koolcenter.com/iStoreOS/r68s/) |

> 固件文件通常为 `.img.gz` 格式（如 `istoreos-22.03.6-2024xxxx-x86-64-squashfs-combined.img.gz`），**不需要自行解压**（刷写工具会自动处理）。

---

## 三、iStoreOS 安装（x86 物理机 / ESXi / PVE）

### 3.1 x86 物理机安装

> 详细参考：[iStoreOS 官方 x86 安装教程](https://doc.linkease.com/zh/guide/istoreos/install_x86.html)

1. 从上方链接下载 x86_64 固件（`.img.gz`）
2. 使用 **Rufus** 或 **balenaEtcher** 将镜像写入 U 盘
3. 设置 BIOS 从 U 盘启动，引导进入 iStoreOS
4. 默认管理地址：`http://192.168.100.1`，用户名 `root`，密码 `password`
5. 通过网络向导完成 WAN/LAN 配置

### 3.2 VMware / PVE 虚拟机安装

基本流程与 x86 物理机相同，差异在于镜像格式转换：

- **PVE**：可直接使用 `.img.gz`，通过 `qm importdisk` 导入
- **VMware Workstation**：使用 StarWind V2V Converter 将 `.img` 转换为 `.vmdk`

### 3.3 ESXi 安装（详见下一节）

---

## 四、ESXi 专题：安装 iStoreOS 并代理虚拟机科学上网

这是一个高频场景：你有一台 ESXi 主机，希望在上面跑一个 iStoreOS 虚拟机作为软路由/旁路由，让 ESXi 上的其他虚拟机（Windows/Linux/NAS 等）都走它来科学上网。

### 4.1 镜像准备

1. 下载 x86_64 固件：[fw.koolcenter.com/iStoreOS/x86_64/](https://fw.koolcenter.com/iStoreOS/x86_64/)
2. 解压 `.img.gz` 得到 `.img` 文件
3. 使用 **StarWind V2V Converter** 将 `.img` 转换为 ESXi 兼容的 VMDK 格式
   - 转换后会生成两个文件：`istoreos.vmdk` 和 `istoreos-flat.vmdk`
4. 将两个 VMDK 文件上传到 ESXi 数据存储

### 4.2 创建虚拟机

1. ESXi → 创建/注册虚拟机 → 创建新虚拟机
2. 操作系统类型：**Linux** → **其他 Linux（64 位）**
3. CPU：2 核及以上；内存：2GB 及以上
4. **删除默认硬盘**，改为「添加现有硬盘」→ 选择上传的 `istoreos.vmdk`
5. 引导选项：**BIOS**（非 UEFI）
6. 网络适配器：
   - **网卡 1**（WAN）：连接到可访问外网的虚拟交换机 / 端口组
   - **网卡 2**（LAN）：连接到内部虚拟交换机（其他 VM 所在的端口组）
   - 适配器类型建议选 **VMXNET3**

### 4.3 基本网络配置

启动虚拟机后，通过控制台或浏览器（`http://192.168.100.1`）进入管理界面。

**作为主路由**：WAN 口拨号/DHCP，LAN 口为内部虚拟交换机提供网关和 DHCP。

**作为旁路由**（更常见）：只使用一个网口，与 ESXi 管理网络同网段；关闭 DHCP；网关指向物理主路由。需要科学上网的 VM 将网关设为 iStoreOS 的 IP。

### 4.4 让 ESXi 上的其他虚拟机走代理

**方法 A：修改 VM 网关（逐台设置）**

在需要科学上网的虚拟机中，将网关和 DNS 都改为 iStoreOS 的 IP。

**方法 B：通过 DHCP 统一推送（全自动）**

如果 iStoreOS 作为主路由并负责 DHCP，所有内部 VM 默认走它，无需额外配置。

**方法 C：虚拟交换机隔离**

在 ESXi 上创建一个**独立的内部虚拟交换机**（不绑物理网卡），iStoreOS 的 LAN 口连接这个交换机，需要代理的 VM 也连接这个交换机。iStoreOS 的 WAN 口连 ESXi 管理网络。这样形成 NAT 拓扑，内部 VM 的所有流量都必须经过 iStoreOS。

### 4.5 安装科学上网插件

虚拟机网络调通后，按「第五节」安装 PassWall / OpenClash 等插件，导入订阅即可。

---

## 五、科学上网插件安装（Are-u-ok）

> 来源：[AUK9527/Are-u-ok](https://github.com/AUK9527/Are-u-ok)，插件由 [bcseputetto](https://github.com/bcseputetto/Are-u-ok) 维护。

### 5.1 平台选择

先确认你的 iStoreOS 设备架构：

```bash
uname -m
```

| 平台 | 典型设备 | 仓库目录 |
|---|---|---|
| `aarch64`（cortex-a53） | 小米 AX3600/AX9000、红米 AX6000、EasePi ARS2 等 | [`apps/`](https://github.com/AUK9527/Are-u-ok/tree/main/apps) |
| `aarch64`（generic / Rockchip） | R2S/R4S/R5S/R6S/R68S 等 | 同 `apps/`（兼容） |
| `x86_64` | Intel/AMD PC、N100/J4125 小主机、ESXi/PVE 虚拟机 | [`x86/`](https://github.com/AUK9527/Are-u-ok/tree/main/x86) |

### 5.2 科学上网插件列表与下载（22.03）

#### aarch64_cortex-a53 平台（也兼容 aarch64_generic）

| 插件名 | 功能 | 下载 | 编译日期 |
|---|---|---|---|
| [PassWall](https://github.com/xiaorouji/openwrt-passwall) | 科学上网 | [PassWall_26.2.14](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/PassWall_26.2.14_aarch64_a53_all_sdk_22.03.7.run) | 2026-02-14 |
| [PassWall2](https://github.com/xiaorouji/openwrt-passwall2) | 科学上网 | [PassWall2_26.2.14](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/PassWall2_26.2.14_aarch64_a53_all_sdk_22.03.7.run) | 2026-02-14 |
| [SSR-Plus](https://github.com/fw876/helloworld) | 科学上网 | [SSR-Plus_190](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/SSR-Plus_190_aarch64_a53_all_sdk_22.03.7.run) | 2025-08-31 |
| [OpenClash](https://github.com/vernesong/OpenClash) | 科学上网 | [OpenClash_0.47.055](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/OpenClash_0.47.055+aarch64_core.run) | 2026-02-14 |

#### x86_64 平台

| 插件名 | 功能 | 下载 | 编译日期 |
|---|---|---|---|
| [PassWall](https://github.com/xiaorouji/openwrt-passwall) | 科学上网 | [PassWall_26.2.14](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/PassWall_26.2.14_x86_64_all_sdk_22.03.7.run) | 2026-02-14 |
| [PassWall2](https://github.com/xiaorouji/openwrt-passwall2) | 科学上网 | [PassWall2_26.2.14](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/PassWall2_26.2.14_x86_64_all_sdk_22.03.7.run) | 2026-02-14 |
| [SSR-Plus](https://github.com/fw876/helloworld) | 科学上网 | [SSR-Plus_190](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/SSR-Plus_190_x86_64_all_sdk_22.03.7.run) | 2025-08-31 |
| [OpenClash](https://github.com/vernesong/OpenClash) | 科学上网 | [OpenClash_0.47.055](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/OpenClash_0.47.055+x86_64_core.run) | 2026-02-14 |

#### 其他常用插件（两个平台均有提供）

| 插件名 | 功能 | ARM 下载 | x86 下载 |
|---|---|---|---|
| AdGuardHome | DNS / 广告拦截 | [下载](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/adguardhome.run) | [下载](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/adguardhome.run) |
| MosDNS | DNS 转发/分流 | [mosdns_5.3.3-4](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/mosdns_5.3.3-4_aarch64_a53_luci_1.6.11_all.run) | [mosdns_5.3.3-4](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/mosdns_5.3.3-4_x86_64_luci_1.6.11_all.run) |
| UnblockNeteaseMusic | 解锁网易云灰色歌曲 | [下载](https://github.com/AUK9527/Are-u-ok/raw/main/apps/all/unblockneteasemusic.run) | [下载](https://github.com/AUK9527/Are-u-ok/raw/main/x86/all/unblockneteasemusic.run) |

### 5.3 24.10 版本插件

24.10 版本的插件由社区维护者提供，入口与 22.03 分开：

- 爬梯插件：[`bcseputetto/Are-u-ok` 的 `iStoreOS_24.10` 发布](https://github.com/bcseputetto/Are-u-ok/releases/tag/iStoreOS_24.10)
- 其他插件：[`packages_24.10/README.md`](https://github.com/bcseputetto/Are-u-ok/blob/master/packages_24.10/README.md)

### 5.4 安装方法

#### 方法 A：iStore 手动安装（推荐）

1. 下载对应平台的 `.run` 文件到本地电脑
2. 打开 iStoreOS 管理界面 → **iStore 应用商店** → **手动安装**
3. 点击选择上传或直接拖放 `.run` 文件
4. 等待安装完成，刷新页面后在「已安装」或「服务」菜单中即可看到

#### 方法 B：终端命令安装

将 `.run` 文件上传到路由器（如通过 SCP 传到 `/tmp/upload/`），然后 SSH 执行：

```bash
sh /tmp/upload/PassWall_26.2.14_x86_64_all_sdk_22.03.7.run
```

#### 重要注意事项

> 以下注意事项来源于 [Are-u-ok 官方 README](https://github.com/AUK9527/Are-u-ok)：

- **不推荐 PassWall 系列和 SSR-Plus 同时安装**，部分软件包可能存在冲突
- 安装前推荐**删除所有自行添加的第三方软件源**，避免意外错误
- **部分依赖仍需通过 opkg 在线安装**——如果安装失败，先检查路由器自身的网络情况，**特别是旁路由模式下最容易出现网络问题**
- **再三注意需要路由器自身联网正常**

---

## 六、旁路由最佳实践

> 本节内容参考 iStoreOS 官方文档：[旁路由入门](https://doc.linkease.com/zh/guide/istoreos/practice/BypassRouter.html)，以及社区实践总结。请以官方文档为准。

### 6.1 什么是旁路由

旁路由本质上是一个"旁路网关"——它不负责拨号，只负责代理转发。局域网内的设备把**网关和 DNS 指向旁路由**，流量就会经过旁路由上的代理插件。

```
互联网 → 光猫/主路由（拨号、DHCP）→ 交换机/LAN
                                        ↓
                                   iStoreOS 旁路由（同网段，仅 LAN）
                                        ↑
                              需要科学上网的设备
                              （网关 = iStoreOS IP）
```

### 6.2 网络配置

1. **IP 地址**：与主路由同网段（如主路由 `192.168.1.1`，旁路由设为 `192.168.1.2`）
2. **子网掩码**：`255.255.255.0`
3. **网关**：指向主路由 IP（`192.168.1.1`）
4. **DNS**：可设为主路由 IP 或公共 DNS（`8.8.8.8`、`1.1.1.1`）
5. **关闭 DHCP**：由主路由继续提供 DHCP，避免冲突

### 6.3 防火墙配置

> 来源：[iStoreOS 旁路由官方文档](https://doc.linkease.com/zh/guide/istoreos/practice/BypassRouter.html)

在 iStoreOS 的 **网络 → 防火墙 → 自定义规则** 中添加：

```bash
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
```

在 **防火墙 → 常规设置** 中：
- 入站数据：**接受**
- 出站数据：**接受**
- 转发：**接受**

### 6.4 客户端设备如何使用

**方法 A：逐台设置网关（最简单）**

- Windows：网络适配器 → IPv4 → 网关改为 `192.168.1.2`，DNS 改为 `192.168.1.2`
- 手机/平板：Wi-Fi 高级设置 → 修改网关和 DNS
- 智能电视：静态 IP → 网关填 `192.168.1.2`

**方法 B：主路由 DHCP 推送网关**

在主路由的 DHCP 设置中，将网关（option 3）和 DNS（option 6）改为旁路由 IP，这样所有获取 DHCP 的设备都会自动走旁路由。

**方法 C：DHCP 标签分组（按需）**

只为特定 MAC / IP 范围推送旁路由网关，其他设备仍走主路由直连。

### 6.5 旁路由安装完科学上网插件后的验证

1. 先在旁路由本机测试：`ping google.com`
2. 再在客户端设备（已改网关）测试：浏览器打开 `google.com`
3. 检查 DNS 是否泄露：访问 [dnsleaktest.com](https://dnsleaktest.com/)

---

## 七、稳定性清单：DNS / IPv6 / 防火墙

- **DNS 劫持冲突**：主路由与旁路由不要同时劫持 53 端口。如果旁路由的代理插件（如 OpenClash）会接管 DNS，确保主路由不会再做二次劫持。
- **IPv6 泄露**：若不打算全链路接管 IPv6，建议在旁路由上关闭 IPv6，或在代理插件中明确 IPv6 策略，避免"IPv4 走代理、IPv6 直连"导致的地区判断异常。
- **MTU 问题**：虚拟化环境（ESXi/PVE）中如果遇到"能 ping 通但网页加载不全"，尝试将 iStoreOS 的 LAN/WAN 接口 MTU 降低到 1400–1480。

---

## 八、常见坑与排查

| 症状 | 常见原因 | 排查方向 |
|---|---|---|
| 插件安装失败 | 平台包不匹配 / 路由器无法联网下载依赖 | 确认 `uname -m` 与下载包平台一致；确认路由器能 `ping 8.8.8.8` |
| 安装成功但找不到入口 | 浏览器缓存 / LuCI 未刷新 | 清除浏览器缓存或 Ctrl+F5 强刷；重启路由器 |
| 能连但打不开网页 | DNS 劫持冲突 / DNS 解析循环 | 检查主路由和旁路由是否同时劫持 DNS |
| 部分设备能用部分不能 | 网关未正确指向旁路由 | 检查客户端的网关和 DNS 设置 |
| 流媒体地区异常 | IPv6 泄露 / DNS 泄露 | 关闭 IPv6 或启用代理插件的 DNS 接管 |
| ESXi VM 无法上网 | 虚拟交换机 / 端口组配置问题 | 确认 VM 网卡连接的端口组与 iStoreOS LAN 口相同 |

通用排查文档：
- [Clash 常见问题排查指南](../common/troubleshooting.md)
- [软路由 OpenWrt + OpenClash 教程（DNS/拓扑思路通用）](../soft-router/openwrt-clash.md)

---

## 九、参考链接

- iStoreOS 官方文档：[doc.linkease.com/zh/guide/istoreos/](https://doc.linkease.com/zh/guide/istoreos/)
- iStoreOS 安装指南：[doc.linkease.com/zh/guide/istoreos/install.html](https://doc.linkease.com/zh/guide/istoreos/install.html)
- iStoreOS x86 安装：[doc.linkease.com/zh/guide/istoreos/install_x86.html](https://doc.linkease.com/zh/guide/istoreos/install_x86.html)
- iStoreOS 旁路由最佳实践：[doc.linkease.com/zh/guide/istoreos/practice/BypassRouter.html](https://doc.linkease.com/zh/guide/istoreos/practice/BypassRouter.html)
- iStoreOS 官网：[site.istoreos.com](https://site.istoreos.com/)
- Are-u-ok（iStore 第三方插件包）：[github.com/AUK9527/Are-u-ok](https://github.com/AUK9527/Are-u-ok)
- Are-u-ok ARM 平台插件：[github.com/AUK9527/Are-u-ok/tree/main/apps](https://github.com/AUK9527/Are-u-ok/tree/main/apps)
- Are-u-ok x86 平台插件：[github.com/AUK9527/Are-u-ok/tree/main/x86](https://github.com/AUK9527/Are-u-ok/tree/main/x86)
- Are-u-ok 24.10 发布：[github.com/bcseputetto/Are-u-ok/releases/tag/iStoreOS_24.10](https://github.com/bcseputetto/Are-u-ok/releases/tag/iStoreOS_24.10)
- iStoreOS 固件下载（x86_64）：[fw.koolcenter.com/iStoreOS/x86_64/](https://fw.koolcenter.com/iStoreOS/x86_64/)
