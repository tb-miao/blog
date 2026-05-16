
<img src="./docs/images/1131.png" width = "350" height = "500" alt="Firefly" align=right />

<div align="center">

# 魔改版Astro Firefly博客。
> 一款清新美观的 Astro 静态博客主题模板
> 
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue)
![Astro](https://img.shields.io/badge/Astro-6.1.5-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
>
> [![Stars](https://img.shields.io/github/stars/CuteLeaf/Firefly?style=social)](https://github.com/CuteLeaf/Firefly/stargazers)
[![Forks](https://img.shields.io/github/forks/CuteLeaf/Firefly?style=social)](https://github.com/CuteLeaf/Firefly/network/members)
[![Issues](https://img.shields.io/github/issues/CuteLeaf/Firefly)](https://github.com/CuteLeaf/Firefly/issues)
> 


</div>


---

- 使用Git推送仓库前请先运行`pnpm check`。
- 使用 Firefly@`6.9.4` 版本。
- Git commits：
- `tags:[]` 语法用于添加标签，例如 `tags:[v1.2.0]` 会显示标签 `v1.2.0`。

## Trae AI 推荐：
1. 前端样式：Kimi-K2.5
2. 文章： Doubao-seed-1.8
3. Code: Qwen3.5-Plus


🚀 快速指南：
[**🖥️在线预览**](https://firefly.cuteleaf.cn/) /
[**📝使用文档**](https://docs-firefly.cuteleaf.cn/) /
[**🍀Firefly博客**](https://blog.cuteleaf.cn) 

⚡ 静态站点生成: 基于Astro的超快加载速度和SEO优化

🎨 现代化设计: 简洁美观的界面，支持自定义主题色

📱 移动友好: 完美的响应式体验，移动端专项优化

🔧 高度可配置: 大部分功能模块均可通过配置文件自定义

<img alt="firefly" src="./docs/images/1.webp" />
<img alt="Lighthouse" src="./docs/images/Lighthouse.png" />

## 📖 配置说明

> 📚 **详细配置文档**: 查看 [Firefly使用文档](https://docs-firefly.cuteleaf.cn/) 获取完整的配置指南


## ⚙️ 文章 Frontmatter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg  # 或使用 "api" 来启用随机封面图
tags: [Foo, Bar]
category: Front-end
draft: false
lang: zh-CN      # 仅当文章语言与 `siteConfig.ts` 中的网站语言不同时需要设置
pinned: false    # 置顶
comment: true    # 是否允许评论
---
```

## 🧞 指令

下列指令均需要在项目根目录执行：

| Command                    | Action                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖                               |
| `pnpm dev`                 | 在 `localhost:4321` 启动本地开发服务器        |
| `pnpm build`               | 构建网站至 `./dist/`            |
| `pnpm preview`             | 本地预览已构建的网站        |
| `pnpm check`               | 检查代码中的错误                 |
| `pnpm format`              | 使用Biome格式化您的代码                        |
| `pnpm new-post <filename>` | 创建新文章                                   |
| `pnpm astro ...`           | 执行 `astro add`, `astro check` 等指令    |
| `pnpm astro --help`        | 显示 Astro CLI 帮助                        |

## 🙏 致谢

非常感谢 [saicaca](https://github.com/saicaca) 开发的 [fuwari](https://github.com/saicaca/fuwari) 模板，Firefly 就是基于这个模板二次开发

### 技术栈

- [Astro](https://astro.build) 
- [Tailwind CSS](https://tailwindcss.com) 
- [Iconify](https://iconify.design)

### 灵感项目

- [fuwari](https://github.com/saicaca/fuwari)
- [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka)
- [astro-koharu](https://github.com/cosZone/astro-koharu)
- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki)

### 其他参考
- 博主`霞葉`的 [Bangumi 收藏](https://kasuha.com/posts/fuwari-enhance-ep2/) 页面组件
- 哔哩哔哩up主 `公公的日常` 的Q版 [流萤看板娘Spine切片数据](https://www.bilibili.com/video/BV1fuVzzdE5y) 

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tb-miao/blog&type=date&legend=top-left)](https://www.star-history.com/#tb-miao/blog&type=date&legend=top-left)


---

⭐ 如果您觉得这个项目有帮助，请考虑给它一个星标!

![](https://avatars.githubusercontent.com/u/172878250?v=4)


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
