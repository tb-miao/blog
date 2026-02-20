# 魔改版Astro Mizuki博客

![](./public/images/astroblog-index/astroblog-index.png)



- 使用mizuki@7.6.5版本
- 主题配置文件在`src/config.ts`

[原主题仓库地址](https://github.com/matsuzaka-yuki/mizuki)

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

## Pages 页面加密格式---Markdown

```markdown
---
encrypted: false | true
password: "123456"
---
```

- 密码会存储在 sessionStorage 中，刷新页面无需重新输入。

## 🔔 通知系统配置

- 请访问：[通知系统文章](https://tbmiao.dpdns.org/posts/notification-mizuki-astro/)

![](https://avatars.githubusercontent.com/u/172878250?v=4)