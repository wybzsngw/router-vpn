# MerlinClash 安装与配置教程

> 📄 本文对应 HTML 页面：[华硕路由器教程](../docs/pages/asus-router-guide.html)

本教程介绍如何在已刷梅林固件的华硕路由器上安装并配置 MerlinClash，实现全屋透明代理与科学上网。MerlinClash 专为华硕梅林固件开发，支持多种代理协议，配置灵活，运行稳定。

---

## 📋 目录

- [一、MerlinClash 简介](#一merlinclash-简介)
- [二、软件中心准备](#二软件中心准备)
- [三、MerlinClash 离线安装](#三merlinclash-离线安装)
- [四、订阅导入与更新](#四订阅导入与更新)
- [五、节点选择与延迟测试](#五节点选择与延迟测试)
- [六、基本配置](#六基本配置)
- [七、状态监控](#七状态监控)

---

## 一、MerlinClash 简介

![Clash 界面](../docs/images/clash-interface.png)

**MerlinClash** 是专为华硕梅林固件开发的 Clash 插件，具有以下特点：

- **支持协议**：Shadowsocks、ShadowsocksR、VMess、Trojan、Hysteria、WireGuard
- **性能优异**：低延迟、高并发、内存占用少
- **规则引擎**：强大的分流规则系统
- **配置灵活**：支持订阅和自定义配置
- **稳定可靠**：长期运行不崩溃
- **图形界面**：提供 Web 管理界面，操作简单

> **版权声明**：MerlinClash 禁止转发国内网站，请自觉遵守官方版权声明。

---

## 二、软件中心准备

### 2.1 升级软件中心

安装 MerlinClash 前，需确保软件中心为最新版本：

1. 进入路由器管理界面
2. 进入 **软件中心**
3. 点击 **更新** 按钮，将软件中心升级到最新版本

![软件中心更新](../docs/images/software-center-update.png)

### 2.2 确认存储空间

确保路由器有足够存储空间安装插件，可在系统信息中查看可用空间。

---

## 三、MerlinClash 离线安装

### 3.1 下载 MerlinClash 插件

根据路由器型号选择对应版本：

| 版本 | 适用机型 |
|------|----------|
| **MC2_0.4.6 ARM64** | BE6500、BE88U/BE86U/BE96U/BE3600、AC86U、GT5300、AX68U/AX86U/AX88U/AX92U/AX11000、AX11000 pro/AX86U pro/AX88U pro、GT-AX6000、TX-AX6000、TUF-AX4200q、GS7、RAX80 等 |
| **MC2_0.4.6 ARM32** | BD4、AX3000/AX5400/AX6600/GT6、AX82U/AX56U/AX58U/AX1800、AX89X、RAX50 等 |

**下载来源**：

- **本项目**：
  - RT-AX86U PRO 等 ARM64 路由器：[MC2_0.4.6_ARM64.tar.gz](../docs/downloads/MC2_0.4.6_ARM64.tar.gz)（推荐）或 [MC2_0.3_ARM64.tar.gz](../docs/downloads/MC2_0.3_ARM64.tar.gz)
  - 建议在链接上右键，使用「链接另存为」下载
- **Telegram 频道**：[MerlinClash 下载频道](https://t.me/merlinclashcat)（需 Telegram 账号，可获取最新版本）

### 3.2 离线安装步骤

1. 进入 **软件中心** → **离线安装**
2. 点击 **选择文件**，选择下载的 MerlinClash 插件包（.tar.gz 格式）
3. 点击 **上传并安装**
4. 等待安装完成

![离线安装界面](../docs/images/offline-install.png)

### 3.3 启用 MerlinClash

1. 安装完成后，在软件中心找到 **MerlinClash**
2. 点击 **启动** 按钮
3. 等待插件启动完成

![MerlinClash 启动](../docs/images/merlinclash-start.png)

> **提示**：若安装失败，可尝试使用 Chrome 浏览器进行安装，并检查软件中心是否已升级、插件包是否完整、存储空间是否充足。

---

## 四、订阅导入与更新

### 4.1 申请 Clash 订阅

若尚未拥有 Clash 订阅，可参考：[申请 Clash 订阅指南](../../clash-subscription-guide.html)

### 4.2 配置订阅

1. 进入 MerlinClash 管理界面
2. 点击 **订阅设置**
3. 输入机场提供的 Clash 订阅链接
4. 点击 **更新订阅**
5. 等待节点更新完成

![订阅配置界面](../docs/images/subscription-config.png)

### 4.3 定期更新订阅

建议定期更新订阅以获取最新节点：

- 进入 **订阅设置** → 点击 **更新订阅**
- 可设置自动更新间隔（若插件支持）

---

## 五、节点选择与延迟测试

### 5.1 节点列表

更新订阅后，节点会出现在节点列表中，可按协议、地区等分类查看。

### 5.2 延迟测试

1. 在 MerlinClash 管理面板中找到 **节点** 或 **代理** 相关页面
2. 使用 **延迟测试** 或 **测速** 功能
3. 根据延迟结果选择延迟低、稳定性好的节点

### 5.3 节点选择策略

- **自动选择**：根据延迟自动选择最优节点
- **手动选择**：手动指定特定节点
- **负载均衡**：在多节点间分配流量（若支持）

---

## 六、基本配置

### 6.1 基本设置

1. 进入 MerlinClash 管理界面
2. 点击 **基本设置**
3. 配置以下参数：

| 参数 | 说明 | 建议 |
|------|------|------|
| **运行模式** | 透明代理 / 规则模式等 | 选择「透明代理」实现全屋代理 |
| **端口设置** | HTTP/SOCKS5 端口 | 保持默认（如 7890、7891）即可 |
| **DNS 设置** | 代理 DNS 配置 | 使用默认或按需自定义 |

![基本配置界面](../docs/images/basic-config.png)

### 6.2 分流规则配置

1. 点击 **规则设置** 或 **分流规则**
2. 选择合适的分流规则（国内直连、国外代理等）
3. 可自定义规则或使用预设规则

![规则配置界面](../docs/images/rules-config.png)

### 6.3 启用透明代理

确保透明代理功能已启用，这样连接路由器的所有设备将自动走代理，无需单独配置。

---

## 七、状态监控

### 7.1 运行状态

1. 进入 MerlinClash 管理界面
2. 查看 **运行状态**，确认显示「运行中」
3. 检查 **节点列表**，确认节点已加载

![运行状态界面](../docs/images/status-check.png)

### 7.2 连接测试

1. 在浏览器中访问 `https://www.google.com`
2. 检查是否能正常访问
3. 访问 `https://www.whatismyipaddress.com` 验证出口 IP 是否已改变

![网络测试结果](../docs/images/network-test.png)

### 7.3 管理面板功能

MerlinClash 管理面板通常提供：

- **节点管理**：查看、测试、切换节点
- **规则管理**：自定义分流规则
- **日志查看**：查看运行日志和错误信息
- **性能监控**：监控 CPU、内存使用情况

---

## 📚 参考资源

- [申请 Clash 订阅指南](../../clash-subscription-guide.html)
- [MerlinClash Telegram 下载频道](https://t.me/merlinclashcat)
- [Clash 官方文档](https://clash.gitbook.io/)
