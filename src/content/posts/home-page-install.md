---
title: 搭建个人主页
published: 2025-10-25
tags: ["homepage"]
description: 搭建个人主页
image: "/images/home-page/502824092-7d394bbd-c4ed-4398-a551-104237f90c4e.png"
category: 笔记
draft: false
---

# 搭建个人主页

一个基于 Flask 的现代化个人主页应用，可展示您的 GitHub 个人信息、项目和技术栈，并支持多种部署方式。

## 🚀 功能特点

- ✨ **美观界面设计**：采用二次元+科技+渐变风格，支持自适应深色/浅色模式切换
- 📱 **完全响应式**：完美适配从手机到桌面的各种屏幕尺寸
- 🎨 **精美动画效果**：平滑的过渡和交互动画，提升用户体验
- 🔧 **快速详细配置**：通过简洁的 JSON 配置文件自定义个人信息和网页设置
- 📊 **GitHub 信息集成**：自动展示头像、名称、仓库数量、Stars 数量
- 📈 **活动数据可视化**：直观展示 GitHub 活动轨迹和趋势
- 📝 **技术栈展示**：自动分析并展示您常用的编程语言和技术
- 🔄 **最近项目展示**：自动获取并展示您最近有更新的 GitHub 项目
- 📜 **个性化介绍**：灵活的个人介绍内容配置方式

## 🛠️ 技术栈

- **后端**：Python 3.6+, Flask
- **前端**：HTML5, Tailwind CSS, JavaScript
- **数据可视化**：Chart.js
- **第三方集成**：GitHub API
- **部署选项**：GitHub Pages, Vercel, Netlify, PythonAnywhere, Heroku 等

## 📋 前提条件

- Python 3.6 或更高版本
- Git 版本控制系统
- GitHub 账号（可选，用于展示 GitHub 信息）
- 推荐使用虚拟环境进行开发

## 🚀 快速开始

### 1. 克隆仓库

```bash
# 克隆仓库到本地
git clone https://github.com/SRInternet/Home_Page.git
cd Home_Page
```

### 2. 安装依赖

```bash
# 使用 pip 安装所需依赖
pip install -r requirements.txt

# 或使用提供的部署脚本
bash deploy.sh install
```
:::tip
如遇到`This error originates from a subprocess, and is likely not a problem with pip. ERROR: Failed to build 'pyyaml' when getting requirements to build wheel`问题，请检查`requirements.txt`文件中各个依赖的版本，必须是最新版本。<br>
地址：
https://pypi.org/project/python-utils/
https://pypi.org/project/Markdown/
:::

### 3. 配置个人信息

编辑 `config.json` 文件，根据您的需求修改以下配置：

```json
{
  "github_url": "https://github.com/your-username",
  "dark_mode": "auto",
  "name": "Your Name",
  "bio": "Your Bio",
  "introduction_file": "Introduction.md",
  "theme": {
    "primary_color": "#6a11cb",
    "secondary_color": "#2575fc"
  }
}
```

### 4. 本地运行

```bash
# 直接运行
python app.py

# 或使用部署脚本
bash deploy.sh run
```

然后访问 http://localhost:5000 查看效果。

## 🎨 自定义个人介绍

有三种灵活的方式可以自定义个人介绍内容：

1. **GitHub README（推荐）**：在您的 GitHub 账号下创建一个与用户名同名的仓库，并在其中添加 README.md 文件
2. **本地 Introduction.md**：直接修改项目根目录下的 Introduction.md 文件
3. **配置文件指定**：在 config.json 中修改 `introduction_file` 字段，指向您自定义的 Markdown 文件

## 🚢 部署指南

### 方法一：使用 Vercel/Netlify 部署

1. 将代码推送到 GitHub 仓库
2. 注册 Vercel 或 Netlify 账号
3. 连接您的 GitHub 仓库
4. 按照平台指引完成部署配置

### 方法二：生成静态文件部署

```bash
# 直接运行构建脚本生成静态文件（HTML将直接生成在项目根目录）
python build_static.py

# 添加生成的文件并提交

git add index.html background.jpg

git commit -m 'Update static website'

# 将文件推送到 GitHub Pages 的 gh-pages 分支
git push origin master:gh-pages
```

### 方法三：使用支持 Flask 的平台

您也可以选择支持 Flask 的平台进行部署：
- PythonAnywhere
- Heroku
- Railway
- DigitalOcean App Platform

## 💻 命令行工具

项目提供了便捷的命令行工具 `deploy.sh` 来管理项目：

```bash
# 安装项目依赖
bash deploy.sh install

# 运行开发服务器
bash deploy.sh run

# 构建静态文件
# 注意：build_static.py 已更新，静态HTML直接生成在项目根目录
bash deploy.sh build

# 查看部署指南
bash deploy.sh deploy

# 查看帮助信息
bash deploy.sh help
```

## 🤖 自动编译配置

项目支持配置 GitHub Actions 自动编译功能，主要特点：

- 每天 UTC 时间 0 点（北京时间 8 点）自动运行编译脚本
- 自动将生成的静态文件提交到当前分支
- 支持在 GitHub 仓库的 Actions 页面手动触发运行

GitHub Actions 配置文件可参考[个人项目主页](https://github.com/SRInternet/SRInternet.github.io/blob/master/.github/workflows/build-deploy.yml)

## ⚙️ 配置详解

### config.json 字段说明

- `github_url`：您的 GitHub 个人主页 URL，用于获取您的公开信息
- `dark_mode`：深色模式设置（可选值：`auto` 跟随系统、`dark` 强制深色、`light` 强制浅色）
- `name`：您的名称（GitHub API 调用失败时的备选显示）
- `bio`：您的简介（GitHub API 调用失败时的备选显示）
- `introduction_file`：本地介绍文件路径
- `theme`：主题配色方案配置
  - `primary_color`：主色调（用于按钮、重点内容等）
  - `secondary_color`：辅助色调（用于渐变、次要强调等）

# Github仓库地址：
::github{repo="SRInternet/Home_Page"}
