# Astro Icon 故障排除指南

本文档说明如何解决 astro-icon 组件在开发环境中无法正确解析图标的问题。

## 问题现象

在开发环境中，图标可能无法正确显示，原因可能包括：
- 图标名称格式不正确
- 图标数据未生成或过期
- 组件初始化时机问题

## 解决方案

### 1. 重新生成图标数据

运行以下命令重新扫描项目中的图标使用并生成内联 SVG 数据：

```bash
pnpm icons
```

或

```bash
node scripts/generate-icons.js
```

### 2. 检查图标使用情况

运行以下命令检查项目中使用的图标，并识别未生成的图标：

```bash
pnpm check-icons
```

此命令会：
- 扫描所有源文件中的图标使用
- 对比已生成的图标数据
- 报告缺失的图标及其位置
- 检查图标名称格式问题

### 3. 图标名称格式规范

正确的图标名称格式为：`前缀：名称`

示例：
- ✅ `material-symbols:search`
- ✅ `fa7-solid:home`
- ✅ `mdi:flower-poppy`
- ❌ `material_symbols:search` (不应包含下划线)
- ❌ `material-symbols:Search` (名称应为小写)

支持的图标集：
- `material-symbols`
- `fa7-solid`
- `fa7-regular`
- `fa7-brands`
- `mdi`
- `simple-icons`
- `svg-spinners`

### 4. 在组件中使用图标

#### 在 Astro 组件中

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="material-symbols:search" class="text-xl" />
```

#### 在 Svelte 组件中

```svelte
<script lang="ts">
import Icon from "@/components/common/Icon.svelte";
</script>

<Icon icon="material-symbols:search" size="lg" />
```

### 5. 开发环境调试

在开发环境中，如果图标未找到，控制台会显示警告信息：

```
[Icon] 图标未找到：material-symbols:search。
请确保：
1. 图标名称格式正确（如 "material-symbols:search"）
2. 已在组件中使用该图标（会被自动扫描）
3. 运行 "pnpm icons" 重新生成图标数据
```

### 6. 常见问题

#### Q: 图标在开发环境不显示，但构建后正常？

A: 这是因为图标数据是在构建时生成的。在开发环境中：
1. 确保已运行 `pnpm icons` 生成图标数据
2. 每次添加新图标后都需要重新运行
3. 建议在 `pnpm dev` 之前先运行 `pnpm icons`

#### Q: 如何添加新的图标集？

A: 在 `scripts/generate-icons.js` 中的 `ICON_SETS` 对象添加新的图标集：

```javascript
const ICON_SETS = {
  // ...existing icon sets
  "new-icon-set": "@iconify-json/new-icon-set",
};
```

然后安装对应的包：

```bash
pnpm add -D @iconify-json/new-icon-set
```

#### Q: 图标显示为占位符？

A: 检查以下几点：
1. 图标名称是否正确
2. 图标是否已生成（运行 `pnpm check-icons`）
3. 查看控制台是否有警告信息
4. 检查 `src/constants/icons.ts` 中是否包含该图标

### 7. 自动化建议

建议在 `package.json` 的 `dev` 脚本前添加图标生成：

```json
{
  "scripts": {
    "dev": "node scripts/generate-icons.js && astro dev",
    "icons": "node scripts/generate-icons.js"
  }
}
```

这样可以确保每次启动开发服务器时都使用最新的图标数据。

## 技术实现

### 图标生成流程

1. **扫描阶段**：`generate-icons.js` 扫描所有 `.svelte` 和 `.astro` 文件
2. **提取阶段**：使用正则表达式提取图标名称
3. **加载阶段**：从 `@iconify-json/*` 包中加载图标数据
4. **转换阶段**：将图标数据转换为内联 SVG
5. **生成阶段**：生成 `src/constants/icons.ts` 文件

### Icon 组件工作原理

- **构建时**：图标 SVG 被内联到 `icons.ts` 文件中
- **运行时**：`Icon.svelte` 组件从 `icons.ts` 读取 SVG 并渲染
- **零延迟**：无需 API 请求，图标立即显示
- **降级处理**：如果图标不存在，显示占位符并记录警告

## 相关文件

- `scripts/generate-icons.js` - 图标生成脚本
- `scripts/check-icons.js` - 图标检查脚本
- `src/components/common/Icon.svelte` - 图标组件
- `src/constants/icons.ts` - 生成的图标数据
- `src/utils/icon-loader.ts` - 图标加载工具
