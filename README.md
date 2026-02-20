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

一个通知系统，支持欢迎通知和自定义通知。

### 默认欢迎通知

页面加载完成后会自动显示欢迎通知，默认配置如下：

```javascript
{
  enable: true,                    // 是否启用欢迎通知
  title: '欢迎访问”AUNyaの小窝“',                // 通知标题
  message: '页面加载完成，祝您浏览愉快！',  // 通知内容
  type: 'success',                 // 通知类型: 'info' | 'success' | 'warning' | 'error'
  duration: 7000,                  // 显示时长（毫秒）
  closable: true,                  // 是否显示关闭按钮
  delay: 500                       // 延迟显示时间（毫秒）
}
```

### 自定义欢迎通知

在任意页面的 `<script>` 标签中或浏览器控制台中修改配置：

```javascript
<script>
	function showAboutNotification() {
		if (window.notification) {
			window.notification.show({
				title: '欢迎访问“关于”',
				message: '关于页面加载完成！',
				type: 'success',
				duration: 7000,
				closable: true
			});
		}
	}

	showAboutNotification();

	document.addEventListener('astro:page-load', () => {
		if (window.location.pathname.includes('/about')) {
			showAboutNotification();
		}
	});
</script>
```

### 手动调用通知 API

- 敬请期待。

### 通知类型说明

| 类型 | 颜色 | 图标 | 适用场景 |
|------|------|------|----------|
| `info` | 主题色 | 圆圈 i | 一般信息提示 |
| `success` | 绿色 | 对勾 | 成功操作提示 |
| `warning` | 橙色 | 三角形 | 警告提示 |
| `error` | 红色 | 叉号 | 错误提示 |

### 注意事项

- 欢迎通知在每次会话中只显示一次（存储在 `sessionStorage` 中）
- 通知支持堆叠显示，多条通知会自动调整位置
- 通知系统与页面加载动画联动，在加载完成后显示

### 文件结构

| 文件路径 | 作用说明 |
|----------|----------|
| `src/components/widget/Notification.astro` | 通知系统核心组件，包含通知的 UI 样式、动画效果和 `NotificationManager` 类的实现，负责通知的创建、显示、关闭和堆叠管理 |
| `src/utils/notify.ts` | 通知系统的 TypeScript 工具模块，导出 `notify` 对象，提供类型安全的 API 封装，方便在其他组件或脚本中调用 |

![](https://avatars.githubusercontent.com/u/172878250?v=4)