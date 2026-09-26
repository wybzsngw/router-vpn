# 用 Cursor Agent 排查 C 盘爆满：从 9 GB 剩余到一次释放 50 GB

**摘要**：一次真实的磁盘空间排障复盘。C 盘 300 GB 只剩 9 GB，系统频繁弹「磁盘空间不足」。我没有手动装 TreeSize 逐个文件夹点，而是把问题丢给 Cursor Agent——它自动跑 PowerShell 扫描、定位大文件、给出按风险分级的清理方案。我按建议关闭了系统休眠（`powercfg -h off`），**一次释放约 51 GB**，效果立竿见影。本文记录完整协作流程，方便你复用。

**关键词**：Cursor Agent、C 盘满了、磁盘清理、hiberfil.sys、休眠文件、Windows 磁盘空间、PowerShell 扫描大文件、Temp 临时文件

---

## 起因：C 盘 97% 满了，但不知道谁占的 {#cause}

典型症状：

- 资源管理器里 C 盘标红，剩余空间个位数 GB
- Windows 更新、软件安装开始失败
- 你大概知道该「清一下」，但不知道**从哪清、清多少、会不会删错**

传统做法：装 SpaceSniffer / TreeSize，自己一层层点。能用，但有两个问题：

1. **你得知道该看哪些目录**——`AppData`、`ProgramData`、根目录隐藏文件，新手容易漏
2. **看到占用不等于知道能不能删**——WinSxS、hiberfil.sys、Cursor 数据库，删错了要么系统坏、要么软件丢数据

这次我换了一条路：**只描述症状，让 Cursor Agent 自己取证、排序、给方案；写入类操作（关休眠、删文件）仍由我在管理员终端手动执行。**

---

## 第一步：怎么跟 Agent 说 {#prompt}

在 Cursor 里打开 **Agent 模式**（需要能跑终端），输入类似下面这句即可：

> C 盘空间快没有了，帮我分析一下占用情况，给出安全的清理建议。

就这一句话。不需要提前列命令，不需要指定工具。Agent 会自己：

1. 查各盘符总容量与剩余空间
2. 扫描 C 盘一级目录体积
3. 深入 `Users`、`AppData`、`ProgramData` 等常见大户
4. 找出超过 1 GB 的单文件
5. 按「释放量 × 风险」排出优先级

### 协作边界（建议一开始就约定）{#contract}

| 动作类型 | 谁来做 |
| --- | --- |
| 只读扫描（`Get-PSDrive`、列目录大小） | Agent 自动跑 |
| 删除文件、关休眠、改注册表 | **你**在管理员 PowerShell 手动执行 |
| 不确定能不能删的项 | Agent 标注风险，你决定 |

这和「修 Windows 系统」那篇教程里的协议一样：**Agent 负责探测与推理，人负责执行与兜底。**

---

## Agent 做了什么：自动取证链路 {#agent-workflow}

Agent 第一轮通常会跑这些（你不需要记，了解即可）：

```powershell
# 1) 各盘符空间概览
Get-PSDrive C | Select-Object Name,
  @{N='UsedGB';E={[math]::Round($_.Used/1GB,2)}},
  @{N='FreeGB';E={[math]::Round($_.Free/1GB,2)}},
  @{N='TotalGB';E={[math]::Round(($_.Used+$_.Free)/1GB,2)}}

# 2) C 盘一级目录体积
Get-ChildItem C:\ -Directory -Force -ErrorAction SilentlyContinue |
  ForEach-Object { ... 递归统计 ... } |
  Sort-Object SizeGB -Descending

# 3) 常见大户路径
# AppData\Local\Temp、Roaming、ProgramData、Program Files ...

# 4) C 盘根目录大文件（>1 GB）
Get-ChildItem C:\ -Recurse -File -Force -ErrorAction SilentlyContinue |
  Where-Object { $_.Length -gt 1GB } |
  Sort-Object Length -Descending
```

完整递归扫描 C 盘可能要 1～3 分钟，Agent 会自动等待。你看到的应该是一份**带数字、带路径、带优先级**的报告，而不是「试试磁盘清理」这种空话。

---

## 我的机器上查到了什么 {#findings}

> 以下为真实扫描结果（2026-08）。你的数字会不同，但**大户类型**高度相似。

### 总览

| 盘符 | 总容量 | 剩余 | 使用率 |
| --- | --- | --- | --- |
| **C:** | ~300 GB | **~9 GB** | **~97%** |
| D: | ~650 GB | ~130 GB | ~80% |
| E: | ~480 GB | ~140 GB | ~70% |

C 盘是系统盘；D/E 还有余量——说明问题不是「硬盘太小」，而是**东西堆错了地方**。

### 占用排行榜（按「单项可释放量」排序）

| 排名 | 项目 | 约占用 | 类型 | 可释放？ |
| --- | --- | --- | --- | --- |
| 1 | `C:\hiberfil.sys` | **~51 GB** | 休眠/快速启动文件 | ✅ 关休眠即可删 |
| 2 | Cursor `state.vscdb` + 备份 | **~33 GB** | 编辑器状态库 | ⚠️ 需先退出 Cursor |
| 3 | `AppData\Local\Temp` | **~17 GB** | 临时文件 | ✅ 一般可清 |
| 4 | 剪映专业版缓存 | ~7 GB | 应用缓存 | ✅ 应用内清理 |
| 5 | Chrome 本地数据 | ~6 GB | 浏览器缓存/AI 模型 | ✅ 浏览器内清理 |
| 6 | 腾讯系缓存 | ~8 GB | 应用缓存 | ✅ 客户端内清理 |
| 7 | Windows 系统 | ~28 GB | 含 WinSxS 等 | ⚠️ 只用系统工具 |

### 关键发现：`hiberfil.sys` 占了 51 GB {#hiberfil}

C 盘根目录有一个隐藏系统文件：

```text
C:\hiberfil.sys    ~51 GB
```

它是 Windows 为**休眠（Hibernate）和快速启动（Fast Startup）**预留的文件，大小通常与物理内存相关。我的机器内存约 128 GB，所以这个文件特别大。

很多人（包括我）日常根本不用休眠——台式机直接关机或睡眠就够了——但这个文件会**默默占着几十 GB 不动**。

Agent 报告里把它标为「最大单项、风险低、一条命令释放」，我优先处理了它。

---

## 我实施的第一刀：关闭系统休眠 {#fix-hibernate}

以**管理员身份**打开 PowerShell 或 CMD，执行：

```powershell
powercfg -h off
```

执行后：

- `C:\hiberfil.sys` 会被删除
- **休眠功能关闭**
- **快速启动也会关闭**（Win10/11 默认靠 hiberfil 实现）

我这边实测：**C 盘一次多出约 51 GB 可用空间**，从 9 GB 涨到约 60 GB，效果非常明显。

### 如何确认生效 {#verify-hibernate}

```powershell
# 文件应不存在或体积极小
Get-Item C:\hiberfil.sys -Force -ErrorAction SilentlyContinue

# 查看当前睡眠/休眠能力
powercfg /a
```

### 如果以后想恢复休眠 {#restore-hibernate}

```powershell
powercfg -h on
```

会重新生成 `hiberfil.sys`，再次占用空间——只有你真的需要「休眠到硬盘」时才开。

---

## 后续可做的清理（按优先级）{#cleanup-plan}

关休眠解决燃眉之急后，Agent 还给了一份**分级清单**。你可以分批做，不必一次全清。

### ⭐⭐⭐ 低风险、收益高

**1. 清理用户 Temp（约 17 GB）**

先关闭正在运行的程序，再执行：

```powershell
Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
```

也可在 Windows **设置 → 系统 → 存储 → 临时文件** 里勾选清理。

**2. 开启「存储感知」**

设置 → 系统 → 存储 → 打开**存储感知**，让系统自动清理临时文件和回收站。

**3. Windows 磁盘清理**

开始菜单搜索「磁盘清理」→ 选 C 盘 → 「清理系统文件」→ 勾选 Windows 更新残留、临时文件等。

### ⭐⭐ 中等风险，注意前置条件

**4. Cursor 状态库膨胀（约 33 GB）**

路径示例：

```text
%APPDATA%\Cursor\User\globalStorage\state.vscdb        (~23 GB)
%APPDATA%\Cursor\User\globalStorage\state.vscdb.backup (~10 GB)
```

`state.vscdb` 存对话历史、插件状态等，长期使用会膨胀到异常大小。

建议顺序：

1. **完全退出 Cursor**（托盘图标也要关）
2. 可先删 `.backup` 文件（旧备份，风险较低）
3. 主库若仍过大，在 Cursor 设置里清理历史，或查阅官方文档做数据库压缩
4. **操作前备份整个 `globalStorage` 文件夹**

**5. 应用缓存（剪映 / Chrome / 微信 QQ 等）**

在各自软件设置里找「清理缓存」，比手动删文件夹更安全。

### ⭐ 可选：卸载不常用软件

Agent 还会列出 `Program Files` 里的大户（Visual Studio、VMware、Office 组件等）。不用的可以卸载，或把安装路径改到 D 盘（需重装时选自定义路径）。

---

## 不建议手动删除的目录 {#dont-delete}

| 路径 | 原因 |
| --- | --- |
| `C:\Windows\WinSxS` | 组件存储，误删导致系统无法更新/修复；用系统自带清理 |
| `C:\Windows\System32` | 系统核心，任何手动删除都可能致命 |
| 正在使用的 `state.vscdb` | 需先完全退出 Cursor |
| 不认识的 `.sys` / `.dll` | 让 Agent 解释后再决定 |

Agent 的价值之一，就是在你问「这个能不能删」时，结合路径和文件作用给判断——比搜索零散帖子可靠。

---

## 可复用的 Agent 提示词 {#prompt-templates}

### 初次诊断

```text
C 盘空间不足，帮我分析占用情况，列出 Top 占用项，
按「可释放空间 × 风险」排序，给出清理步骤。
只读命令你可以自己跑，删除/修改类操作请让我手动执行。
```

### 清理后复查

```text
我刚执行了 powercfg -h off 和 Temp 清理，
请重新扫描 C 盘空间，确认释放效果，并建议下一步清理项。
```

### 针对某个大文件

```text
C 盘有个文件 C:\hiberfil.sys 占了 50 多 GB，这是什么？能删吗？怎么安全处理？
```

### 让 Agent 沉淀脚本

```text
把刚才的磁盘扫描命令整理成一个 PowerShell 脚本，
输出 C 盘总空间、Top 10 目录、超过 1GB 的文件列表，方便我以后定期运行。
```

---

## Agent 比「自己装工具」强在哪 {#agent-value}

| 维度 | 传统方式（TreeSize 等） | Cursor Agent |
| --- | --- | --- |
| 上手成本 | 要装软件、自己点目录 | 一句话描述症状 |
| 隐藏文件 | 容易漏 `hiberfil.sys`、pagefile | 会扫根目录系统文件 |
| 能不能删 | 要自己查 | 直接标注风险等级 |
| 优先级 | 只看到大小，不知道先清谁 | 按释放量+风险排序 |
| 可复用 | 每次重新点 | 可沉淀成 PowerShell 脚本 |
| 跨盘建议 | 一般不管 | 会对比 D/E 盘余量，建议迁移策略 |

Agent **不是替你点「磁盘清理」按钮**，而是当了一个「会跑命令的磁盘顾问」——尤其适合：

- 不知道 C 盘谁占的
- 看到大文件不敢删
- 想一次性拿到**排序好的行动清单**

---

## 长期习惯：别让 C 盘再爆满 {#habits}

1. **大项目、虚拟机、下载目录放 D/E 盘**——C 盘只留系统和常用软件
2. **每月让 Agent 跑一遍扫描脚本**——在 Temp、Cursor 数据库膨胀之前发现
3. **大内存机器重点检查 `hiberfil.sys`**——128 GB 内存 + 休眠开启 = 隐形 50 GB+
4. **pagefile 已在 D 盘的话保持**——别把虚拟内存也堆回 C 盘

---

## 本次结果小结 {#summary}

| 阶段 | C 盘剩余 | 做了什么 |
| --- | --- | --- |
| 排查前 | ~9 GB | Agent 全盘扫描 + 排序 |
| 关休眠后 | **~60 GB** | `powercfg -h off` |
| 若再清 Temp + 应用缓存 | 预估 +15～30 GB | 分批手动执行 |

**最大收获**：不是「删了多少文件」，而是建立了一套**可重复的 Cursor 协作流程**——下次 D 盘满了、某个盘异常，同样一句话让 Agent 先取证。

---

## 给读者的四条实操建议 {#advice}

1. C 盘标红时，**先让 Agent 扫描再动手**，不要凭感觉删 `Windows` 下的文件夹。
2. 内存 ≥ 32 GB 且不用休眠的机器，**优先检查 `hiberfil.sys`**，往往一条命令释放几十 GB。
3. 清理 Temp、Cursor 数据库前，**先关相关程序**，避免文件占用导致删不干净。
4. 排障结束后让 Agent **输出可复用扫描脚本**，下次定期跑一遍。

---

## 延伸阅读 {#related}

- [用 Cursor Agent 修 Windows 系统（安全中心 + 更新源实录）](./cursor-fix-windows-system.md)
- [Cursor 完整指南（注册 / 模型 / Agent）](../cursor-guide.md)
- [Cursor 通过 SSH 连接 Linux 远程开发](../practice/cursor-ssh-linux.md)

---

### 准备开始用 Cursor？ {#cta}

前往 [cursor.com](https://cursor.com) 官网注册即可开始，套餐与价格以官网当前显示为准，可随时取消订阅。
