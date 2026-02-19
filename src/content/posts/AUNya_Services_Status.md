---
title: 服务状态监控面板上线啦！！
published: 2026-01-27
description: '一个基于uptimerobot API的服务状态监控面板，上线啦！！'
image: ''
tags: ['uptimerobot']
category: 'uptimerobot'
draft: false 
pinned: false
alias: status-panel
updated: 2026-01-30
---
# 服务状态监控面板

基于 UptimeRobot API 的现代化服务状态监控面板。

## 命令
```bash
npm install
npm run dev
npm run build
npm run preview
```
## 环境变量
请查看[.env.example](./.env.example)文件，设置必要的环境变量。

## 特性

- 🚀 **现代技术栈** - Vite + React 18 + TypeScript + TailwindCSS
- 📊 **数据可视化** - 可用率趋势图、响应时间图表（动态 Y 轴范围、主题适配 Tooltip）
- 🔔 **实时通知** - 浏览器通知（可开关）、页面标题状态提示
- 🌓 **主题切换** - 支持深色/浅色/跟随系统
- 📱 **响应式设计** - 完美适配移动端
- 🔍 **搜索筛选** - 按名称搜索、状态筛选（含暂停）、多种排序
- 📅 **时间范围** - 支持 30/60/90 天切换
- 📋 **故障历史** - 展示最近故障事件列表及原因（响应式布局）
- 🖼️ **嵌入模式** - 支持 iframe 嵌入其他页面
- 📲 **PWA 支持** - 可添加到桌面
- 🔤 **字体自适应** - 自动适配各平台最佳中文字体（苹方/微软雅黑等）
- 📈 **访问统计** - 集成umami统计
- ♿ **无障碍支持** - 键盘导航、屏幕阅读器支持、跳过链接
- 🔄 **智能刷新** - 显示最后更新时间、loading 状态、自动重试
- 🔐 **密码保护** - 支持通过环境变量配置访问密码，提供退出登录功能
- 🛡️ **人机验证** - 支持 hCaptcha 人机验证，增强安全性

## 密码保护

本项目支持通过环境变量配置密码保护功能：

```bash
# 启用密码保护
VITE_ENABLE_PASSWORD_PROTECTION=true

# 设置访问密码
VITE_PASSWORD=your-secure-password
```

### 退出登录功能

当密码保护启用时，用户可以通过以下方式退出登录：

1. **页面顶部退出按钮**：在网站顶部的导航栏中，点击红色的"退出登录"按钮
2. **自动跳转**：退出登录后会自动返回到密码输入页面
3. **会话清除**：退出登录会清除浏览器的认证会话

退出登录功能仅在密码保护启用时显示，不会影响正常访问体验。

## hCaptcha 人机验证

为了增强安全性，本项目支持集成 hCaptcha 人机验证：

### 配置步骤

1. **注册 hCaptcha 账户**：访问 [https://www.hcaptcha.com/](https://www.hcaptcha.com/) 注册账户
2. **创建站点**：在 hCaptcha 控制台创建新站点，获取站点密钥
3. **配置环境变量**：

```bash
# 启用 hCaptcha
VITE_ENABLE_HCAPTCHA=true

# 设置 hCaptcha 站点密钥
VITE_HCAPTCHA_SITE_KEY=your-hcaptcha-site-key

# 可选：设置服务端验证密钥（如需服务端验证）
VITE_HCAPTCHA_SECRET=your-hcaptcha-secret
```

### 功能特点

- **自动适配主题**：根据当前页面主题自动切换明暗模式
- **中文界面**：默认使用中文界面
- **错误处理**：完善的加载失败和验证错误处理
- **无障碍支持**：符合无障碍访问标准
- **响应式设计**：完美适配各种屏幕尺寸

### 使用说明

- 启用 hCaptcha 后，用户在输入密码前需要完成人机验证
- 验证通过后才能点击"验证并进入"按钮
- 如果验证失败或过期，需要重新完成验证
- 支持暗色主题，会自动适配当前页面主题

## 仓库地址
::github{repo="tb-miao/status"}

## 访问统计
地址：[https://cloud.umami.is/share/uldxG2QTnboi9OlF](https://cloud.umami.is/share/uldxG2QTnboi9OlF)