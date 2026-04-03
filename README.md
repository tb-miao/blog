# 魔改版Astro Mizuki博客

<img align='right' src='logo.png' width='200px' alt="Mizuki logo">

![](./public/images/astroblog-index/astroblog-index.png)



- 使用 mizuki@`9.0` 版本
- 主题配置文件在`src/config.ts`

[原主题仓库地址](https://github.com/matsuzaka-yuki/mizuki)

[中文文档](./README.zh.md)

## 命令
```
pnpm install
pnpm dev
```

## 📝 文章前言格式

```yaml
---
title: 文章标题
published:  # 文章发布时间
description:  # 文章描述
image: ./cover.jpg
tags: [""]
category: 
draft: false
pinned: false
encrypted: false  # 是否加密文章
password:  # 设置文章密码，留空则不设置密码
alias:  # 文章别名，留空则使用文件名
updated:  # 文章更新时间
---
```

### Pages 页面加密格式---Markdown

```markdown
---
encrypted: false | true
password: "123456"
---
```

- 密码会存储在 sessionStorage 中，刷新页面无需重新输入。

## 🔔 通知系统配置

- 由于更新版本，通知系统正在迁移。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tb-miao/blog&type=date&legend=top-left)](https://www.star-history.com/#tb-miao/blog&type=date&legend=top-left)



![](https://avatars.githubusercontent.com/u/172878250?v=4)