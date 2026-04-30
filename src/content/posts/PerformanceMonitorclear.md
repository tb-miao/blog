---
title: 【PerformanceMonitor】组件内存泄漏修复功能介绍
published: 2026-04-30
description: ' 【PerformanceMonitor】 组件添加内存泄漏修复功能介绍。'
image: 'api'
tags: ['内存泄漏修复']
category: '笔记'
draft: false 
pinned: false
---

## 内存泄漏修复功能概述

【PerformanceMonitor】 组件是一个用于监控网页性能的工具，能够实时显示页面加载时间和内存占用情况。然而，在长时间运行或频繁导航的情况下，原始版本存在潜在的内存泄漏风险。本文将详细介绍修复的内存泄漏问题及解决方案，这些修复方法不仅适用于 PerformanceMonitor 组件，也可以推广到其他的前端组件中。

## 潜在内存泄漏问题

### 1. **事件监听器未清理**
- 原始代码中注册的 `load`、`popstate` 和 swup 钩子事件监听器在页面卸载或组件被移除时未被清理
- 这些事件监听器会持续占用内存，导致浏览器内存占用不断增加

### 2. **定时器未清理**
- `setTimeout` 定时器没有清除机制
- 当组件被移除时，定时器可能仍然在后台运行

### 3. **闭包引用**
- 匿名函数和闭包可能导致内存泄漏
- 函数内部引用的变量无法被垃圾回收器回收

## 修复方案

### 1. **事件监听器管理**
- 使用具名函数替代匿名函数作为事件处理程序
- 添加 `cleanup()` 函数统一移除所有事件监听器
- 使用 `{ passive: true }` 优化性能

```javascript
function loadHandler() {
    logOnce('页面加载完成');
    scheduleUpdate();
}

window.addEventListener('load', loadHandler, { passive: true });
```

### 2. **定时器管理**
- 使用 `updateTimer` 变量跟踪定时器
- 在 `scheduleUpdate()` 中统一管理定时器，避免重复定时器
- 清理时调用 `clearTimeout()` 清除定时器

```javascript
function scheduleUpdate() {
    if (isCleanup) return;
    if (updateTimer) clearTimeout(updateTimer);
    updateTimer = setTimeout(updatePerformance, 100);
}
```

### 3. **Swup 钩子清理**
- 添加 `swupCleanup` 函数移除 swup 钩子
- 在 `page:view` 钩子中检查组件是否存在并清理

```javascript
if (typeof window.swup !== 'undefined' && window.swup.hooks) {
    window.swup.hooks.on('content:replace', swupHandler);
    swupCleanup = function() {
        if (window.swup && window.swup.hooks) {
            window.swup.hooks.off('content:replace', swupHandler);
        }
    };
}
```

### 4. **生命周期管理**
- 添加 `isCleanup` 标志防止清理后再次执行
- 监听 `beforeunload` 事件确保页面卸载时清理
- 使用 `MutationObserver` 监控 DOM 变化，当组件被移除时自动清理

```javascript
const observer = new MutationObserver(function(mutations) {
    for (let i = 0; i < mutations.length; i++) {
        if (!document.contains(perfMonitor)) {
            log('检测到组件移除');
            cleanup();
            observer.disconnect();
            break;
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
```

### 5. **调试日志优化**
- 添加日志节流机制，避免重复日志刷屏
- 使用 `logOnce()` 确保相同警告只显示一次
- 使用 `logDebounced()` 处理频繁更新的日志

```javascript
function log(...args) {
    if (!DEBUG) return;
    
    const key = args.join(' ');
    const now = Date.now();
    const lastTime = lastLogTime.get(key) || 0;
    
    if (now - lastTime < LOG_THROTTLE_MS) {
        return;
    }
    
    lastLogTime.set(key, now);
    console.log(LOG_PREFIX, ...args);
}
```

## 修复效果

### 1. **内存占用稳定**
- 页面长时间运行或频繁导航时，内存占用保持稳定
- 不会出现内存持续增长的情况

### 2. **资源自动清理**
- 页面卸载时自动清理所有资源
- 组件被移除时自动清理事件监听器和定时器

### 3. **日志清晰易读**
- 控制台日志更加清晰易读
- 避免重复信息刷屏

## 使用说明

### 启用调试日志

在 `PerformanceMonitor.astro` 文件中，将 `DEBUG` 变量设置为 `true` 即可启用调试日志：

```javascript
const DEBUG = true;
```

### 关闭调试日志

将 `DEBUG` 变量设置为 `false` 即可关闭调试日志：

```javascript
const DEBUG = false;
```

## 总结

通过以上修复，PerformanceMonitor 组件在保证功能正常的同时，有效解决了内存泄漏问题。修复后的组件能够在长时间运行或频繁导航的情况下保持稳定的内存占用，提升了网页的整体性能和用户体验。

