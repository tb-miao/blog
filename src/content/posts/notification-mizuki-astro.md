---
title: 通知系统
description: 通知系统的配置和使用说明
published: 2026-02-20 15:55:00
image: '/images/notification/notification-1.png'
tags: ['本站博客通知系统']
category: '笔记'
draft: false 
pinned: false
updated: 2026-02-20
---

本博客创建了一个功能完善的通知系统，支持欢迎通知、自定义通知以及多种通知类型。

## 功能特性

- 🎉 **欢迎通知** - 页面加载完成后自动显示欢迎消息
- 🎨 **四种通知类型** - info、success、warning、error
- ⚡ **堆叠显示** - 多条通知自动堆叠，互不遮挡
- 🌙 **深色模式** - 完美适配深色主题
- 🔧 **灵活配置** - 支持自定义标题、内容、时长等参数
- 💾 **会话记忆** - 欢迎通知在会话期间只显示一次

## 默认欢迎通知

页面加载完成后会自动显示欢迎通知，默认配置如下：

```javascript
{
  enable: true,                    // 是否启用欢迎通知
  title: '欢迎访问',                // 通知标题
  message: '页面加载完成，祝您浏览愉快！',  // 通知内容
  type: 'success',                 // 通知类型
  duration: 7000,                  // 显示时长（毫秒）
  closable: true,                  // 是否显示关闭按钮
  delay: 500                       // 延迟显示时间（毫秒）
}
```

## 自定义欢迎通知

在任意页面的 `<script>` 标签中或浏览器控制台中修改配置：

已`info`页面为演示

```javascript
	// 使用 sessionStorage 记录是否已在此会话中显示过
	if (!sessionStorage.getItem('infoNotificationShown')) {
		if (window.notification) {
			window.notification.show({
				title: '欢迎访问“信息”',
				message: '信息页面加载完成！',
				type: 'success',
				duration: 7000,
				closable: true
			});
		}
		sessionStorage.setItem('infoNotificationShown', 'true');
	}

	// 监听页面切换回来
	document.addEventListener('astro:page-load', () => {
		if (window.location.pathname.includes('/info')) {
			if (!sessionStorage.getItem('infoNotificationShown')) {
				if (window.notification) {
					window.notification.show({
						title: '欢迎访问“信息”',
						message: '信息页面加载完成！',
						type: 'success',
						duration: 7000,
						closable: true
					});
				}
				sessionStorage.setItem('infoNotificationShown', 'true');
			}
		} else {
			// 离开 /info 页面时清除标记，以便下次切回时再显示
			sessionStorage.removeItem('infoNotificationShown');
		}
	});
```
## 通知 API

- 敬请期待。

## 通知类型

| 类型 | 颜色 | 图标 | 适用场景 |
|------|------|------|----------|
| `info` | 主题色 | 圆圈 i | 一般信息提示 |
| `success` | 绿色 | 对勾 | 成功操作提示 |
| `warning` | 橙色 | 三角形 | 警告提示 |
| `error` | 红色 | 叉号 | 错误提示 |

## 配置参数说明

### NotificationOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 通知标题（可选） |
| `message` | `string` | - | 通知内容（必填） |
| `type` | `string` | `'info'` | 通知类型 |
| `duration` | `number` | `7000` | 显示时长（毫秒） |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |

### WelcomeNotificationConfig

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `true` | 是否启用欢迎通知 |
| `title` | `string` | `'欢迎访问'` | 通知标题 |
| `message` | `string` | `'页面加载完成...'` | 通知内容 |
| `type` | `string` | `'success'` | 通知类型 |
| `duration` | `number` | `7000` | 显示时长（毫秒） |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `delay` | `number` | `500` | 延迟显示时间（毫秒） |

## 文件结构

| 文件路径 | 作用说明 |
|----------|----------|
| `src/components/widget/Notification.astro` | 通知系统核心组件，包含通知的 UI 样式、动画效果和 `NotificationManager` 类的实现，负责通知的创建、显示、关闭和堆叠管理 |
| `src/utils/notify.ts` | 通知系统的 TypeScript 工具模块，导出 `notify` 对象，提供类型安全的 API 封装，方便在其他组件或脚本中调用 |

## 注意事项

- 欢迎通知在每次会话中只显示一次（存储在 `sessionStorage` 中）
- 通知支持堆叠显示，多条通知会自动调整位置和层级
- 通知系统与页面加载动画联动，在加载完成后显示
- 深色模式下通知样式会自动适配

## 实际效果演示

打开浏览器控制台即可看到效果
