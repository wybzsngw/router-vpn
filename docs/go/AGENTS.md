# /go 机场中转系统 · AI 操作手册

> 本手册供 AI（含 Composer 等较小模型）照做。**严格按步骤复制模板执行，不要自由发挥。**

## 这是什么

`/go/` 下是「机场注册中转页」。作用：用户访问 `https://www.aixiaobai168.com/go/<机场>/`，页面会按顺序探测多个入口（官方+备用），命中第一个可用的就自动跳转，并带上我们的邀请码。**仅对国内不易直接访问的机场使用**（当前：奈云 naiyun、魔戒 mojie）。

## 文件结构（不要新增其它文件类型）

```text
docs/go/
├── AGENTS.md          ← 本手册
├── airports.js        ← 唯一配置中心：所有机场入口 + 邀请码都在这
├── style.css          ← 共享样式（一般不用动）
├── naiyun/index.html  ← 壳页面（每个机场一个目录）
└── mojie/index.html   ← 壳页面
```

- **配置只在 `airports.js` 的 `PROVIDERS` 对象里。** 改入口、改邀请码 = 改这里。
- **每个机场一个目录 + 一个 `index.html` 壳。** URL 由目录名决定：`docs/go/mojie/` → `/go/mojie/`。

---

## 任务决策表

| 用户需求 | 去做哪一节 |
| --- | --- |
| 新增一个可中转的机场 | 任务 A |
| 改某机场的邀请码 | 任务 B |
| 增/改某机场的入口域名（备用线路失效了） | 任务 C |
| 把文档里某机场的直链改成走中转 | 任务 D |
| 验证改动是否正常 | 验证 |

---

## 任务 A：新增一个可中转的机场

假设机场标识为 `foo`，邀请码 `ABC123`。

**第 1 步**：在 `docs/go/airports.js` 的 `PROVIDERS` 对象里追加一项（放在最后一项后面，注意前一项末尾要有逗号）：

```js
    foo: {
      title: "机场中文名",
      defaultCode: "ABC123",
      entries: [
        { name: "官方入口",   probe: "https://foo-official.com/", url: "https://foo-official.com/register?code={code}" },
        { name: "备用入口 A", probe: "https://foo-backup.com/",   url: "https://foo-backup.com/register?code={code}" }
      ]
    }
```

规则：

- `probe` 填该入口的**域名根地址**（带结尾 `/`），用于探测可达性。
- `url` 填**完整注册地址**，邀请码位置一律写成 `{code}`（程序会自动替换）。
- 至少 1 个 entry，建议 2~3 个（官方 + 备用）。

**第 2 步**：新建壳页面 `docs/go/foo/index.html`，**完整复制**下面内容，只改 3 处：`<title>`、`<a href>`、邀请码。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <title>机场中文名 - 正在为您选择最优节点</title>
  <link rel="stylesheet" href="/go/style.css" />
</head>
<body>
  <noscript>
    请开启 JavaScript，或直接访问：
    <a href="https://foo-official.com/register?code=ABC123">机场中文名注册入口</a>
  </noscript>
  <script src="/go/airports.js"></script>
</body>
</html>
```

**第 3 步**：去 `任务 D` 把文档里该机场的链接指向 `/go/foo/`。

---

## 任务 B：改邀请码

只改 `docs/go/airports.js` 里对应机场的 `defaultCode`。例如把奈云邀请码改掉：

```js
    naiyun: {
      title: "奈云",
      defaultCode: "新邀请码",   // ← 只改这里
      ...
    }
```

> 同时建议把该机场壳页面 `index.html` 里 `<noscript>` 的 `href` 邀请码也同步更新（兜底用）。

---

## 任务 C：增 / 改入口域名

只改 `docs/go/airports.js` 里对应机场的 `entries` 数组。新入口加在前面优先级更高。`probe` 是域名根，`url` 是完整注册地址且邀请码写 `{code}`：

```js
      entries: [
        { name: "官方入口",   probe: "https://新域名.com/", url: "https://新域名.com/register?code={code}" },
        { name: "备用入口 A", probe: "https://旧域名.com/", url: "https://旧域名.com/register?code={code}" }
      ]
```

---

## 任务 D：把文档里的机场链接改成走中转

涉及文件（用搜索定位，不要漏）：

- `docs/clash-subscription-guide.html`
- `subscription/clash-subscription-guide.md`

替换规则：

| 原始直链（示例） | 改成 |
| --- | --- |
| HTML 里 `href="https://机场注册地址..."` | `href="/go/<机场>/"` |
| HTML 里 picker 脚本 `url:'https://机场注册地址...'` | `url:'/go/<机场>/'` |
| MD 里 `<https://机场注册地址...>` | `<https://www.aixiaobai168.com/go/<机场>/>` |

注意：

- HTML 用**相对路径** `/go/<机场>/`；MD 用**完整域名** `https://www.aixiaobai168.com/go/<机场>/`（因为 MD 在 GitHub 上也会被阅读）。
- 出站/中转链接必须保留 `rel="sponsored noopener"`（HTML 里）。
- 可以保留链接的**显示文字**（比如让用户看到邀请码），只改 `href`/`url`。

---

## 验证（改完必须做）

在仓库根目录起本地静态服务：

```powershell
python -m http.server 8000 --directory docs
```

然后逐项检查（新开一个终端）：

```powershell
curl.exe -s -o NUL -w "%{http_code}\n" http://localhost:8000/go/<机场>/
curl.exe -s http://localhost:8000/go/<机场>/ | findstr /C:"noindex" /C:"airports.js"
```

通过标准：

1. 第一条返回 `200`。
2. 第二条能同时输出 `noindex` 和 `airports.js` 两行。
3. 浏览器打开 `http://localhost:8000/go/<机场>/`，能看到“安全检查/正在选择最优入口”并最终跳转。

验证完关闭服务（用启动时返回的 PID）：`taskkill /PID <pid> /F`。

---

## 红线（绝对不要做）

1. **不要**把 `/go/` 下任何页面加进 `docs/sitemap.xml`。
2. **不要**删除壳页面里的 `<meta name="robots" content="noindex,nofollow" />`。
3. **不要**在 `docs/robots.txt` 里加 `Disallow: /go/`（会导致爬虫读不到 noindex，反而可能被裸链接索引）。
4. **不要**把当前好用的机场（扬帆云/尔湾云/疾风云/蓝胖云）改成中转——它们直链可用，保持原样。仅对“国内访问不畅”的机场做中转。
   - 大哥云（dage）原属直链机场，因官方域名频繁变更/入口被封，已于 2026-06 改为中转（`/go/dage/`），用泛域名多入口自动探测。
5. **不要**把邀请码硬编码进 `airports.js` 的 `url` 里——邀请码统一用 `defaultCode` + `{code}` 占位。
6. 邀请码归属：奈云 `rxkbocWK`、魔戒 `ItS1igEf`、大哥云 `1CAfWNQC`，**必须是我们自己的码**，不要改成别人的。
