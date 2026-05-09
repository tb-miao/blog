---
title: 给你的Astro博客添加开发者工具提示信息功能
published: 2026-05-09
description: '在你的Astro博客中添加开发者工具提示信息功能，提示用户按本站规定合法使用开发者工具。'
image: '/images/blogdevtoolswarning/img.png'
tags: [devtoolsWarning]
category: '教程'
draft: false 
pinned: false
---

## 什么是开发者工具提示信息功能？

开发者工具提示信息功能是一种当用户按下快捷键打开浏览器开发者工具时，自动弹出提示信息的功能。这个功能可以：

1. **提醒用户合法使用开发者工具**
2. **保护网站内容不被随意复制**
3. **展示网站使用条款**
4. **提升用户体验**

## 功能特点

- ✅ 支持所有主流浏览器（Chrome、Firefox、Edge、Safari）
- ✅ 响应式设计，适配各种屏幕尺寸
- ✅ 支持暗色模式
- ✅ 自定义提示信息内容
- ✅ 可配置显示时长
- ✅ 仅在首次打开开发者工具时显示
- ✅ 不影响正常开发工作

## 实现原理

该功能通过监听键盘事件来检测用户是否按下了打开开发者工具的快捷键，当检测到快捷键时，动态创建一个提示框并显示给用户。

主要监听的快捷键包括：

- `F12` - 所有浏览器通用
- `Ctrl+Shift+I` - 检查元素
- `Ctrl+Shift+J` - 打开控制台
- `Ctrl+Shift+C` - 元素选择器
- `Cmd+Option+I` - Mac系统
- `Cmd+Option+J` - Mac系统
- `Cmd+Option+C` - Mac系统

## 完整代码实现

### 1. 创建组件文件

在你的Astro博客项目中创建一个新的组件文件：

```astro 
// features/DevToolsWarning.astro
---
import { siteConfig } from "@/config";

const devtoolsWarning = siteConfig.devtoolsWarning || false;
---

<script is:inline define:vars={{ devtoolsWarning }}>
  (function () {
    const style = document.createElement("style");
    style.textContent = `
    #devtools-warning {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-150px);
      background: var(--card-bg, #fff);
      color: var(--text-primary, #1f2937);
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 999999;
      font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
      min-width: 320px;
      max-width: 400px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      border: 1px solid var(--line-divider, rgba(0,0,0,0.05));
    }

    :root.dark #devtools-warning {
      background: var(--card-bg, #1f2937);
      color: var(--text-primary, #f9fafb);
      border-color: var(--line-divider, rgba(255,255,255,0.1));
    }

    #devtools-warning.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    #devtools-warning.hide {
      transform: translateX(-50%) translateY(-150px);
      opacity: 0;
    }

    #devtools-warning-content {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    #devtools-warning-icon {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      background: #fbbf24;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
    }

    #devtools-warning-text {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      color: var(--text-primary, #1f2937);
    }

    :root.dark #devtools-warning-text {
      color: var(--text-primary, #f9fafb);
    }

    #devtools-warning-progress {
      height: 3px;
      background: var(--line-divider, rgba(0,0,0,0.05));
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    :root.dark #devtools-warning-progress {
      background: var(--line-divider, rgba(255,255,255,0.1));
    }

    #devtools-warning-progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: var(--primary, #6366f1);
      transform-origin: left;
      transform: scaleX(1);
    }

    #devtools-warning-progress-bar.animate {
      animation: shrink ${devtoolsWarning.time}s linear forwards;
    }

    @keyframes shrink {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
  `;
    document.head.appendChild(style);

    const warning = document.createElement("div");
    warning.id = "devtools-warning";
    warning.innerHTML = `
    <div id="devtools-warning-content">
      <div id="devtools-warning-icon">!</div>
      <div id="devtools-warning-text">${devtoolsWarning.message || "检测到开发者工具已打开"}</div>
    </div>
    <div id="devtools-warning-progress">
      <div id="devtools-warning-progress-bar"></div>
    </div>
  `;
    document.body.appendChild(warning);

    let hasShown = false;

    function showWarning() {
      if (hasShown) return;
      hasShown = true;
      const progressBar = warning.querySelector("#devtools-warning-progress-bar");
      warning.classList.add("show");
      progressBar.classList.add("animate");

      const onProgressComplete = () => {
        warning.classList.remove("show");
        warning.classList.add("hide");
        setTimeout(() => warning.remove(), 300);
      };
      progressBar.addEventListener("animationend", onProgressComplete, { once: true });
    }

    document.addEventListener("keydown", (e) => {
      if (hasShown) return;
      if (e.key === "F12") {
        showWarning();
        return;
      }
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "I") {
        showWarning();
        return;
      }
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "J") {
        showWarning();
        return;
      }
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "C") {
        showWarning();
        return;
      }
      if (e.metaKey && e.altKey && e.key.toUpperCase() === "I") {
        showWarning();
        return;
      }
      if (e.metaKey && e.altKey && e.key.toUpperCase() === "J") {
        showWarning();
        return;
      }
      if (e.metaKey && e.altKey && e.key.toUpperCase() === "C") {
        showWarning();
        return;
      }
    });
  })();
</script>
```

### 2. 配置文件设置

在你的配置文件中添加以下配置：
```typescript
// src/types/config.ts
	// 启用开发者工具提示信息
	devtoolsWarning: {
		enable: boolean; // 是否启用
		message?: string; // 提示信息内容，留空为默认
		time?: number; // 提示信息显示时间，单位秒
	};
```


```typescript
// siteConfig.ts
	// 启用开发者工具提示信息
	devtoolsWarning: {
		enable: true, // 是否启用
		message:
			"请按本站规定合法使用开发者工具", // 提示信息内容，留空为默认
		time: 2, // 提示信息显示时间，单位秒
	},
```

### 3. 在布局中使用组件

在你的主布局文件中引入并使用这个组件：

```astro
// src/layouts/MainGridLayout.astro
---
import DevToolsWarning from "@components/features/DevToolsWarning.astro";
---
<!-- {live2dModelConfig.enable && <Live2DWidget config={live2dModelConfig} />} -->
{siteConfig.devtoolsWarning?.enable && <DevToolsWarning />}
```

## 自定义配置

### 自定义提示信息

你可以通过修改配置文件中的 `message` 字段来自定义提示信息：

```typescript
devtoolsWarning: {
  enable: true,
  message: "你的自定义提示信息",
  time: 3
}
```

### 自定义显示时长

通过修改 `time` 字段来设置提示信息的显示时长（单位：秒）：

```typescript
devtoolsWarning: {
  enable: true,
  message: "提示信息",
  time: 5 // 显示5秒
}
```

### 禁用功能

如果你想暂时禁用这个功能，可以将 `enable` 设置为 `false`：

```typescript
devtoolsWarning: {
  enable: false
}
```
