---
title: 自定义CMD INFO
published: 2026-05-05
description: '自定义CMD INFO'
image: 'api'
tags: [CMD]
category: '随写'
draft: false 
pinned: false
---
# 自定义CMD INFO
## 1. 打开注册表编辑器
```bash
regedit
```
## 2. 导航到注册表路径
```bash
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor
```
## 3. 创建新的字符串值
```bash
"autorun"
```
> 输入bat命令即可。