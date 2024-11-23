---
title: vue主题命令
cover: /assets/images/1.jpg
icon: pen-to-square
date: 2022-01-12
category:
  - vue
tag:
  - vue
star: true
---
# 本地查看/发布

::: code-tabs

@tab pnpm

```bash
pnpm docs:dev --启动开发服务器
pnpm docs:build --构建项目并输出
pnpm docs:clean-dev --清除缓存并启动开发服务器
```

@tab yarn

```bash
yarn docs:dev --启动开发服务器
yarn docs:build --构建项目并输出
yarn docs:clean-dev --清除缓存并启动开发服务器
```

@tab:active npm

```bash
npm run docs:dev --启动开发服务器
npm run docs:build --构建项目并输出
npm run docs:clean-dev --清除缓存并启动开发服务器
```

:::


::: warning 如果你需要终止开发服务器，请点击终端，并连续两次按下 Ctrl + C。
:::
# 创建文章
<img :src="$withBase('/assets/images/navbar.png')" alt="vue主题命令" />

::: caution
图片要放到“/assets/images”目录下，并且图片名要和文章名一致！
:::

- [主题文档](https://theme-hope.vuejs.press/zh/guide/intro/intro.html)
