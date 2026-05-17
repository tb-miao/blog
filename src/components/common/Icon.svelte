<script lang="ts">
/**
 * 统一的图标组件 - 构建时内联 SVG
 * 用于 Svelte 组件
 *
 * 图标在构建时由 scripts/generate-icons.js 自动扫描并内联
 * 无需运行时 API 请求，零延迟加载
 *
 * 因为如果使用@iconify/svelte搭配unplugin-icons的方式会导致使用方法繁琐了，所以改为这种预构建内联SVG的方式。
 */
import { getIconSvg, hasIcon } from "@/constants/icons";

interface Props {
	icon: string;
	class?: string;
	style?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	color?: string;
	showWarning?: boolean; // 开发环境下是否显示警告
}

let {
	icon,
	class: className = "",
	style = "",
	size = "md",
	color,
	showWarning = true, // 默认在开发环境显示警告
}: Props = $props();

// 尺寸映射
const sizeClasses: Record<string, string> = {
	xs: "text-xs",
	sm: "text-sm",
	md: "text-base",
	lg: "text-lg",
	xl: "text-xl",
	"2xl": "text-2xl",
};

const sizeClass = $derived(sizeClasses[size] || sizeClasses.md);
const colorStyle = $derived(color ? `color: ${color};` : "");
const combinedStyle = $derived(`${colorStyle}${style}`);
const combinedClass = $derived(`${sizeClass} ${className}`.trim());

// 获取内联 SVG
const svgContent = $derived(getIconSvg(icon));
const iconExists = $derived(hasIcon(icon));

// 开发环境警告
$effect(() => {
	if (import.meta.env.DEV && showWarning && !iconExists) {
		console.warn(
			`[Icon] 图标未找到：${icon}。\n` +
			`请确保：\n` +
			`1. 图标名称格式正确（如 "material-symbols:search"）\n` +
			`2. 已在组件中使用该图标（会被自动扫描）\n` +
			`3. 运行 "pnpm icons" 重新生成图标数据`
		);
	}
});
</script>

{#if iconExists && svgContent}
  <!-- 使用预加载的内联 SVG -->
  <span
    class="inline-icon inline-flex items-center justify-center {combinedClass}"
    style={combinedStyle}
    aria-hidden="true"
  >
    {@html svgContent}
  </span>
{:else}
  <!-- 回退：图标未找到时显示占位符 -->
  <span
    class="inline-icon inline-flex items-center justify-center {combinedClass}"
    style={combinedStyle}
    aria-hidden="true"
    title="Icon not found: {icon}"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    </svg>
  </span>
{/if}

<style>
  .inline-icon :global(svg) {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
</style>
