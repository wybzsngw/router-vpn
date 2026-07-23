# 用 Cursor 上线自己的网站：GitHub Pages + 自定义域名全流程

> 💡 通过邀请链接注册 Cursor，**首月 Pro / Pro+ / Ultra 立享 5 折**：
> [👉 立即注册（首月 5 折）](https://cursor.com/referral?code=Y3RXKKUGMJ2G)

**摘要**：手把手教你用 Cursor AI 写网站、用 GitHub Pages 免费托管、用 Cloudflare 注册域名并绑定——全程不需要懂代码，用 Cursor 和 AI 对话就能完成。

**关键词**：Cursor 写网站、GitHub Pages、自定义域名、Cursor 上线网站、Cursor GitHub、AI 建站

---

## 一、先说清楚成本（不骗人）

| 项目 | 费用 | 说明 |
| --- | --- | --- |
| GitHub 账号 | **免费** | GitHub Pages 公开仓库免费托管 |
| Cursor Pro | **首月 $10**（5 折后）→ 次月 $20 | 主力用 Sonnet 4.6 或 Codex 5.3，免费档的 Composer-2 不够用 |
| 域名（可选）| **约 ¥70–100 / 年** | 想用 `yourdomain.com` 就要买；用 `yourname.github.io` 完全免费 |
| Cloudflare（DNS / CDN） | **免费** | DNS 管理、CDN 加速 |

**结论**：只做技术展示的话，**一分钱不花**也能上线（`yourname.github.io` 免费子域名）。想用自己的域名，全年成本约 ¥70–300。

**为什么推荐 Cursor Pro 而不用免费版？**

Cursor 免费档默认走 Composer-2（它自家的快模型）。改个文字、调个样式没问题，但要做"规划结构 → 批量生成页面 → 调试模板 → 排查错误"这种跨多文件的完整任务，它会反复打转。

Pro 档解锁了真正的主力模型：

- **Claude Sonnet 4.6**：默认首选，写代码、改配置、读报错都稳，适合大部分场景
- **Codex 5.3（`gpt-5.3-codex`）**：写脚本、配置自动化、命令行任务一次过的概率更高
- **Claude Opus 4.7**：项目结构推倒重设计时再上，平时不用

首月 5 折只要 $10，建完站如果不想继续随时可以退订，完全不亏。

---

## 二、准备工作

### 2.1 注册 GitHub 账号

访问 [github.com](https://github.com) 注册账号（邮箱 + 密码即可），用你的英文名或昵称起一个 GitHub 用户名，这将成为你免费子域名的一部分：`https://你的用户名.github.io`。

### 2.2 安装并开通 Cursor

1. 下载安装 Cursor（支持 Windows / macOS / Linux）。
2. 通过邀请链接注册账号，首月 Pro 只需 $10：[👉 立即注册](https://cursor.com/referral?code=Y3RXKKUGMJ2G)
3. 开通后在 Cursor 设置里确认模型显示 **Claude Sonnet 4.6** 可用。

### 2.3 在 Cursor 里连接 GitHub 账号

Cursor 内置了 Git 和 GitHub 集成，不需要手动装 Git 命令行工具（macOS/Linux 通常已内置，Windows 在 Cursor 安装时会自动处理）。

在 Cursor 中：**菜单 → 文件 → 首选项 → 设置**，搜索「GitHub」，按提示完成 GitHub 账号授权（会弹出浏览器让你登录 GitHub 并授权 Cursor）。授权完成后，Cursor 的源代码管理面板就可以直接发布和同步仓库了。

---

## 三、用 Cursor 创建网站（不用写代码）

### 3.1 新建本地文件夹

在你电脑上建一个文件夹，比如 `my-website`，然后用 Cursor 打开它（**文件 → 打开文件夹**）。

### 3.2 用 Agent 模式让 Cursor 自己写代码

按 `Ctrl+L`（macOS：`Cmd+L`）打开 **Chat 面板**，把模式切到 **Agent**（默认就是 Agent）。模型在右下角下拉里选 **Claude Sonnet 4.6**。

Agent 模式和普通问答最大的区别是：它会自己创建文件、自己执行命令、看到报错自己改，你只负责描述要什么、在它弹窗时点"同意运行"。

把下面这段话发给它：

> 我想做一个个人展示网站，用纯 HTML/CSS，不要任何构建工具和 Node.js，直接放 GitHub Pages 就能跑。
>
> 帮我生成：
> 1. `index.html`：个人主页，包含自我介绍、技能、联系方式
> 2. `style.css`：现代简洁、响应式布局，色调清爽不花哨
> 3. `README.md`：项目说明
>
> 占位文字你随意写，我后面自己改。

Agent 会自己在左侧文件树里建好这三个文件，整个过程你不用复制粘贴任何代码。

### 3.3 让 Agent 持续帮你改内容

接下来想改什么，直接在 Chat 里说，例如：

> 把 index.html 里的自我介绍改成：我是一名摄影爱好者，喜欢旅行和记录生活……

或者选中 HTML 文件里的某段内容，按 **Cmd+K**（macOS）/ **Ctrl+K**（Windows）做"原地编辑"——只改选中的部分，比 Chat 更精准。

Agent 改完会用左侧差异视图展示给你，确认无误点接受即可。改错了或者觉得风格不对，再用一句话让它重做一遍，比手改快很多。

### 3.4 本地预览效果

**方法 A（推荐）**：在 Cursor 的扩展市场里安装 **Live Server** 插件，右键 `index.html` → Open with Live Server，浏览器自动打开预览。

**方法 B**：直接双击 `index.html` 文件，用浏览器打开查看效果。

---

## 四、通过 Cursor 界面推送到 GitHub（不用命令行）

不需要打开终端、不需要背命令，Cursor 的界面就能完成所有 Git 操作。

### 4.1 初始化本地仓库并发布到 GitHub

点击左侧 **源代码管理图标**（看起来像树枝分叉的图标，快捷键 `Ctrl+Shift+G`）：

1. 点击 **「初始化仓库」**（Initialize Repository）
2. 在消息框输入提交说明，例如：`网站首版`
3. 点击 **「提交」**（Commit）旁边的下拉箭头 → **「提交并推送」**
4. 第一次会弹出「发布分支」选项：选择 **「发布到 GitHub」** → 输入仓库名（例如 `my-website`）→ 选择「公开仓库」（Public）→ 确认

Cursor 会自动在你的 GitHub 账号下创建仓库并推送所有文件，不需要你手动操作任何命令行。

### 4.2 后续更新怎么推送

每次修改文件后，在源代码管理面板：

1. 在消息框输入更新说明（例如：`更新联系方式`）
2. 点击 **「提交并推送」**（Commit & Push）

就这两步，改了什么就推什么，GitHub 上会实时更新。

---

## 五、开启 GitHub Pages（免费托管上线）

推送完成后，在 GitHub 网站上：

1. 进入你刚创建的仓库（`github.com/你的用户名/my-website`）
2. 点击上方的 **Settings**（设置）标签
3. 左侧菜单找到 **Pages**
4. **Source** 选择 `Deploy from a branch`
5. **Branch** 选择 `main`，目录选 `/ (root)`
6. 点击 **Save**

等 1–2 分钟后，GitHub 会给你一个 URL：`https://你的用户名.github.io/my-website`

用这个 URL 就能访问你的网站了，完全免费，不需要服务器。

> 📝 如果仓库名就叫 `你的用户名.github.io`（格式完全一致），访问地址会直接是 `https://你的用户名.github.io`，更简洁。

---

## 六、注册域名（想要 yourname.com 的话）

如果想用自己的域名，推荐在 **Cloudflare Registrar** 注册，原因：价格透明无加价（成本价转售），DNS 管理与域名在同一个面板，后续绑定最省事。

### 6.1 在 Cloudflare 注册域名

1. 访问 [cloudflare.com](https://cloudflare.com) 注册免费账号
2. 左侧菜单 → **Domain Registration**（域名注册）→ 搜索你想要的域名
3. 选择 `.com`（约 $10/年）或其他后缀，结账付款
4. 注册完成后，该域名的 DNS 管理自动在 Cloudflare，无需额外配置

国内支付：Cloudflare 支持 Visa / Mastercard 双标卡、PayPal。如果有国内银行开通的 Visa 卡可以直接用。

---

## 七、绑定自定义域名到 GitHub Pages（重点：只用一套系统）

**正确做法**：域名 → Cloudflare DNS → GitHub Pages（托管）

不要同时开 Cloudflare Pages 和 GitHub Pages，这会造成两套系统并行、域名指向混乱。

### 7.1 GitHub 仓库设置自定义域名

1. 进入 GitHub 仓库 → **Settings → Pages**
2. 在 **Custom domain** 栏填入你的域名，例如 `www.yourdomain.com`
3. 点击 **Save**
4. 勾选 **Enforce HTTPS**

GitHub 会自动为你申请 SSL 证书（Let's Encrypt），等几分钟即可。

### 7.2 在 Cloudflare DNS 添加 CNAME 记录

登录 Cloudflare → 选中你的域名 → **DNS → 记录 → 添加记录**：

| 类型 | 名称 | 内容 | 代理状态 |
| --- | --- | --- | --- |
| CNAME | www | 你的用户名.github.io | **仅 DNS**（灰色云朵，不开代理！） |

> ⚠️ 重要：代理状态必须设为「**仅 DNS**」（灰色云朵），**不要**开启 Cloudflare 代理（橙色云朵）。
> 如果开启橙色云朵，Cloudflare 会代理流量，导致 GitHub 无法验证你的域名所有权，HTTPS 证书申请失败。

### 7.3 验证绑定成功

等 5–10 分钟 DNS 生效后：

- 访问 `https://www.yourdomain.com` 能看到你的网站
- 浏览器地址栏显示锁头图标（HTTPS 正常）
- GitHub Pages 设置页面显示「Your site is live at...」并无警告

### 7.4 根域名（yourdomain.com 不带 www）

如果同时想让 `yourdomain.com`（不带 www）也能访问，在 Cloudflare DNS 再添加：

| 类型 | 名称 | 内容 | 代理状态 |
| --- | --- | --- | --- |
| CNAME | @ | 你的用户名.github.io | **仅 DNS** |

并在 GitHub Pages 的 Custom domain 里填 `yourdomain.com`（不带 www），GitHub 会自动把带 www 和不带 www 都指向同一个页面。

---

## 八、用 Cursor 持续维护网站

网站上线只是开始，日常维护同样不用写代码——继续把 Agent 当成"会自己动手的实习生"用就行。

**添加新页面**：在 Chat 里说"加一个 `blog.html` 博客列表页，样式和首页保持一致"，Agent 自己建文件、自己写、自己提示你预览，确认后在源代码管理面板提交推送。

**修改样式**：直接描述效果，例如"把导航栏背景改成深蓝色、字号小一档、移动端折叠成汉堡菜单"，让 Agent 一次改完。

**排查问题**：网站显示不对？把现象描述给 Agent（最好附上截图或控制台报错），它会自己读相关文件、定位原因、改完跑预览验证。如果一次没修对，再说一句"还是不对，xx 元素位置偏了"，它会接着调，整个循环不用你动手。

**用得久一点的小技巧**：

- 在仓库根部放一份 `AGENTS.md`，写清楚约定（命名风格、色板、字体、文件组织），Agent 会自动遵守，省得每次重复在 prompt 里写
- 同一个项目里复杂改动用 Sonnet 4.6，写脚本和 CI 切 Codex 5.3，简单文案修改可以退回到 Composer 省点配额
- 遇到 Agent 反复卡同一个错（一般是它对版本理解错了），在 prompt 里**明确写版本号**，比如"按 11ty 3.x 的新 collections API 来"，比反复让它"再试一次"有效得多

**一个常用模板**：

```text
帮我在 index.html 里加一个作品展示区，网格布局，
每张卡片含图片、标题、描述，最多 6 个，
样式跟现有页面保持一致，改完跑一下预览。
```

---

## 相关教程

- [Cursor 国内使用完整教程（注册 / 模型 / Agent 功能）](../cursor-guide.md)
- [Cursor 通过 SSH 连接 Linux 远程开发](./cursor-ssh-linux.md)

---

### 🎁 准备开始用 Cursor？

通过邀请通道注册，**首月 Pro 仅需 $10**（原价 $20，5 折优惠）。Pro 档包含 Sonnet 4.6，完成这份教程绰绰有余；用完一个月后可随时取消。

[👉 立即开通（首月 5 折）](https://cursor.com/referral?code=Y3RXKKUGMJ2G)

> 邀请通道仅对首月生效，次月起恢复原价；可随时取消订阅。

<!-- char count: 6548 -->
