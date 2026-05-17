# OpenAI API 申请与计费指南 2026 — API Key、充值与价格

> 📄 本文对应 HTML 页面：[OpenAI API 指南](../docs/pages/openai-api-guide.html)　·　🌐 在线阅读：<https://www.aixiaobai168.com/pages/openai-api-guide>

2026 OpenAI API 申请与计费完整指南：API Key 获取步骤、账户充值与按量计费详解、GPT-5.5、GPT-5.4、GPT-5.4 mini、Realtime、Image 等模型价格对比，说明 API 与 ChatGPT Plus/Go 的功能区别，专为中国用户与开发者编写。

---

## 📋 目录

- [一、Plus 和 API 的区别](#一plus-和-api-的区别)
- [二、申请 API 前需要准备什么](#二申请-api-前需要准备什么)
- [三、如何获取 OpenAI API Key](#三如何获取-openai-api-key)
- [四、API 是怎么计费的](#四api-是怎么计费的)
- [五、适合哪些人用 API](#五适合哪些人用-api)
- [六、常见问题 FAQ](#六常见问题-faq)

---

## 一、Plus 和 API 的区别

| 对比 | ChatGPT Plus | OpenAI API |
|------|-------------|------------|
| 性质 | 网页端会员订阅 | 开发者编程接口 |
| 价格 | 约 $20/月固定（地区价格不同） | 按 Token / 工具调用量计费 |
| 使用方式 | 浏览器/App 对话 | 通过代码调用 |
| 适合人群 | 普通用户 | 开发者、企业 |
| 是否独立 | 是，两者独立计费 | 是，两者独立计费 |

> ⚠️ 开了 Plus 不代表能免费用 API，反之亦然。

---

## 二、申请 API 前需要准备什么

1. **OpenAI 账号**：与 ChatGPT 共用同一账号，参考 [ChatGPT 注册教程](./chatgpt-guide.md)
2. **科学上网**：需稳定的海外节点访问 OpenAI 平台，优先使用美国、新加坡或服务商标注的 AI 解锁节点
3. **支付方式**：国际信用卡或虚拟信用卡，用于 API 充值

---

## 三、如何获取 OpenAI API Key

1. 访问 <https://platform.openai.com>，登录 OpenAI 账号
2. 点击左侧「API Keys」
3. 点击「Create new secret key」
4. **立即复制保存**（Key 只显示一次，关闭后无法再查看）
5. 在代码中使用：`Authorization: Bearer sk-xxx...`

> ⚠️ **安全提醒**：不要将 API Key 提交到 GitHub 或写在前端代码中。

---

## 四、API 是怎么计费的

OpenAI API 按 **Token** 或工具调用计费（1 个中文汉字约 1-2 个 Token）。以下为 OpenAI API 官方价格页面在 2026 年 5 月显示的标准处理价格，后续可能调整，请以下单页为准：

| 模型 | 输入价格 | 输出价格 | 说明 |
|------|---------|---------|------|
| GPT-5.5 | $5.00 / 1M tokens | $30.00 / 1M tokens | 旗舰模型，适合复杂编码和专业工作 |
| GPT-5.4 | $2.50 / 1M tokens | $15.00 / 1M tokens | 更低成本的专业工作模型 |
| GPT-5.4 mini | $0.75 / 1M tokens | $4.50 / 1M tokens | 轻量任务、子代理、低成本调用 |
| GPT-Realtime-2 | 文本 $4.00 / 1M tokens；音频 $32.00 / 1M tokens | 文本 $24.00 / 1M tokens；音频 $64.00 / 1M tokens | 实时语音与多模态交互 |
| GPT-Image-2 | 图像 $8.00 / 1M tokens；文本 $5.00 / 1M tokens | 图像 $30.00 / 1M tokens | 图像生成 |

> 💡 Batch API 可节省 50% 输入/输出费用；数据驻留或区域处理通常会有额外费用。Web Search 工具按调用计费，当前页面显示 $10 / 1k calls。

充值方式：在 <https://platform.openai.com/account/billing> 绑定信用卡，按需充值（最低 $5）。

---

## 五、适合哪些人用 API

- **独立开发者**：构建 AI 聊天机器人、内容生成工具
- **企业**：批量处理文本、客服自动化
- **研究人员**：大规模文本分析、实验
- **自动化爱好者**：结合 n8n、Make 等工具实现工作流自动化

---

## 六、常见问题 FAQ

**Q1：开了 Plus 还要单独充 API 吗？**

A：要。Plus 和 API 是两套独立的计费系统，互不影响。

**Q2：API Key 为什么只显示一次？**

A：这是 OpenAI 的安全设计。创建后必须当场复制保存，关闭窗口后无法再查看。如果丢失，需要重新创建。

**Q3：能否在前端直接调用 API？**

A：不建议。API Key 放在前端代码中会暴露，应放在后端服务器调用。

**Q4：中国用户容易卡在哪里？**

A：主要两个：一是网络问题（需科学上网），二是容易混淆 Plus 和 API 的关系（两者独立）。

**Q5：没有国际信用卡，能不能把账号交给第三方处理付款？**

A：不建议。API Key 一旦泄露可能被刷量，造成实际账单损失。API 充值建议优先自己操作；如果只是想用 GPT-5.5 / Codex 完成文档修改、代码开发、故障排查，可以考虑通过 Cursor IDE 订阅使用，不需要把 API Key 交给第三方。

---

📌 **相关教程**：[ChatGPT 注册](./chatgpt-guide.md) · [Plus 充值](./chatgpt-plus-guide.md) · [订阅申请](../subscription/clash-subscription-guide.md)

---

*本文档仅供学习参考，请遵守 OpenAI 使用条款与当地法律法规。*
