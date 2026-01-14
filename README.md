# 🌸 Mizuki  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.15.3-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

![Mizuki Preview](./README.webp)

<table>
  <tr>
    <td><img alt="" src="docs/image/1.webp"></td>
    <td><img alt="" src="docs/image/2.webp"></td>
    <td><img alt="" src="docs/image/3.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="docs/image/4.webp"></td>
    <td><img alt="" src="docs/image/5.webp"></td>
    <td><img alt="" src="docs/image/6.webp"></td>
  <tr>
</table>

一个现代化、功能丰富的静态博客模板，基于 [Astro](https://astro.build) 构建，具有先进的功能和精美的设计。

[**🖥️ 在线演示**](https://mizuki.mysqil.com/)
[**📝 用户文档**](https://docs.mizuki.mysqil.com/)
[**仓库地址**](https://github.com/matsuzaka-yuki/mizuki)
### 📝 内容管理

- **创建新文章：** `pnpm new-post <文件名>`
- **编辑文章：** 修改 `src/content/posts/` 中的文件
- **自定义页面：** 编辑 `src/content/spec/` 中的特殊页面
- **添加图片：** 将图片放在 `src/assets/` 或 `public/` 中

### 🚀 部署

将博客部署到任何静态托管平台：

- **Vercel：** 连接 GitHub 仓库到 Vercel
- **Netlify：** 直接从 GitHub 部署
- **GitHub Pages：** 使用包含的 GitHub Actions 工作流
- **Cloudflare Pages：** 连接您的仓库

- **环境变量配置（可选）：** 在 `.env` 文件或部署平台配置

```bash
# Umami API 密钥，用于访问 Umami 统计数据
# 如果在 config.ts 中启用了 Umami，建议在此配置 API 密钥
UMAMI_API_KEY=your_umami_api_key_here
# bcrypt 盐值轮数（10-14 推荐，默认 12）
BCRYPT_SALT_ROUNDS=12
```

部署前，请在 `src/config.ts` 中更新 `siteURL`。
**不建议**将 `.env` 文件提交到 Git，`.env` 应该仅在本地调试或构建使用。若要将项目在云平台部署，建议通过平台上的 `环境变量` 配置传入。

## 📝 文章前言格式

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新博客的第一篇文章。
image: ./cover.jpg
tags: [标签1, 标签2]
category: 前端
draft: false
pinned: false
password:  # 设置文章密码，留空则不设置密码
alias:  # 文章别名，留空则使用文件名
updated: 
---
```

![](https://avatars.githubusercontent.com/u/172878250?v=4)