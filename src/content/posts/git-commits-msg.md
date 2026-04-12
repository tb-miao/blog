---
title: Git commits 自动添加后缀或前缀
published: 2026-04-12
description: '使用 prepare-commit-msg Hook 自动添加后缀或前缀'
tags: ['git']
category: '教程'
draft: true 
pinned: false
---
# 前提：
1. 已安装 Git
2. 有一个已经初始化完成的 Git 仓库

# 步骤：
1. 在`.git`文件夹中的`Hook`文件夹中创建`prepare-commit-msg`文件

2. 编写内容：

2.1 添加前缀：

```bash
#!/bin/sh
# 自动添加前缀
PREFIX="[博客] "

# 读取原提交消息
MSG=$(cat "$1")

# 如果不是合并提交且不是修改提交，添加前缀
if [ "$2" != "merge" ] && [ "$2" != "commit" ]; then
    echo "${PREFIX}${MSG}" > "$1"
fi
```

2.2 添加后缀:

```bash
#!/bin/sh
# 自动添加后缀
SUFFIX="
---
Signed-off-by: Your Name <email@example.com>"

# 读取原提交消息
MSG=$(cat "$1")

# 如果不是合并提交，添加后缀
if [ "$2" != "merge" ]; then
    echo "${MSG}${SUFFIX}" > "$1"
fi
```

3. 相同时添加？：

```bash
#!/bin/sh
PREFIX="[博客] "
SUFFIX="
---
Co-authored-by: Bot <bot@example.com>"

MSG=$(cat "$1")

if [ "$2" != "merge" ] && [ "$2" != "commit" ]; then
    echo "${PREFIX}${MSG}${SUFFIX}" > "$1"
fi
```

4. 根据分支名自动添加前缀?:
```bash
#!/bin/sh
# 根据分支名添加前缀

# 获取当前分支名
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# 根据分支设置前缀
case "$BRANCH" in
    feature/*) PREFIX="[Feature] " ;;
    bugfix/*)  PREFIX="[Fix] " ;;
    hotfix/*)  PREFIX="[Hotfix] " ;;
    main|master) PREFIX="[Release] " ;;
    *) PREFIX="" ;;
esac

MSG=$(cat "$1")

if [ -n "$PREFIX" ] && [ "$2" != "merge" ] && [ "$2" != "commit" ]; then
    echo "${PREFIX}${MSG}" > "$1"
fi
```

## 注意事项：
1. 在 Windows 上，Git Bash 会自动处理 .git/hooks/ 中的脚本。确保：
- 使用 Git Bash 或 WSL 运行
- 脚本文件使用 LF 换行符（不是 CRLF）
- 可以用以下命令设置权限：

```bash
git update-index --chmod=+x .git/hooks/prepare-commit-msg
```

## 测试
```bash
git commit -m "测试提交"
# 实际消息会变成: "[博客] 测试提交"
```