# 兔子API 客服 Q&A 知识库

这是一个可直接使用的静态客服知识库站点，当前已定制为兔子API 版本，适合客服、运营、售前和开发者支持团队统一整理常见问题。

在线访问地址：

- GitHub Pages: `https://henry0620-tuzi.github.io/-knowledge-base/`

## 文件结构

- `index.html`：知识库页面入口
- `styles.css`：页面样式
- `app.js`：搜索、筛选、复制等交互逻辑
- `data/qa-data.js`：知识库问答数据

## 如何使用

直接用浏览器打开 `index.html` 即可。

如果你想本地起一个简单服务，也可以在当前目录执行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`

## GitHub Pages 发布

仓库已包含 GitHub Pages 工作流：

- `.github/workflows/pages.yml`
- `.nojekyll`

如果仓库还没有自动发布，请在 GitHub 仓库设置中确认：

1. 进入 `Settings`
2. 打开 `Pages`
3. 在 `Build and deployment` 中将 `Source` 设为 `GitHub Actions`

完成后，推送到 `main` 分支会自动发布站点。

## 当前内容方向

当前样例已覆盖这些兔子API 客服高频场景：

- 模型与能力
- API 接入
- 计费与套餐
- 数据安全
- 知识库与 RAG
- 训练与定制
- 账户与权限
- 稳定性与报错
- 企业接入

## 如何维护问答

所有问答都在 `data/qa-data.js` 里，单条数据结构如下：

```js
{
  id: "TUZI-API-001",
  category: "API 接入",
  intent: "如何获取兔子API Key",
  keywords: ["兔子API Key", "密钥", "鉴权"],
  customerQuestions: [
    "兔子API Key 在哪里创建？",
    "怎么获取调用密钥？"
  ],
  answer: "您好，您通常可以在兔子API 控制台的 API 或开发者设置页面创建和管理 API Key...",
  escalation: "涉及组织级权限或控制台入口异常时，转平台支持排查。",
  updatedAt: "2026-06-04"
}
```

## 推荐维护方式

1. 先按兔子API 业务模块分类：模型、API、账单、权限、安全、RAG、训练、企业接入。
2. 每条问答尽量补充 3 到 5 个用户真实问法，包括报错码、英文术语和中文口语化提问。
3. 回答尽量统一语气，先解释原因，再给排查建议，最后补充下一步动作。
4. 对高风险场景补充升级规则，比如密钥泄露、账单争议、服务异常、数据合规和企业合同需求。

## 下一步可扩展

你后面如果需要，我可以继续帮你升级成这些版本：

1. 公司定制版：按兔子API 的真实产品名、套餐名、模型名和流程继续细化。
2. Excel / CSV 导出版：方便客服和运营同学持续维护。
3. AI 检索版：生成适合 RAG / 大模型问答的知识切片。
4. 后台管理版：支持新增、编辑、删除问答。
