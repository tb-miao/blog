/**
 * 图标加载管理器
 * 负责处理图标的加载状态显示
 * 支持开发环境下的动态图标加载
 */

// 开发环境下动态加载图标的缓存
const dynamicIconCache = new Map<string, string>();

/**
 * 在开发环境下动态加载图标
 */
async function loadIconDynamically(iconName: string): Promise<string | null> {
	// 先检查缓存
	if (dynamicIconCache.has(iconName)) {
		return dynamicIconCache.get(iconName) || null;
	}

	try {
		// 使用 Iconify API 动态加载图标
		const [prefix, name] = iconName.split(":");
		if (!prefix || !name) {
			console.warn(`[IconLoader] 无效的图标名称：${iconName}`);
			return null;
		}

		// 尝试从本地 JSON 加载（如果可用）
		const response = await fetch(
			`https://api.iconify.design/${prefix}/${name}.svg`,
			{
				mode: "cors",
			},
		);

		if (response.ok) {
			const svg = await response.text();
			// 确保支持 currentColor
			let processedSvg = svg;
			if (!svg.includes("currentColor") && !svg.includes('fill="')) {
				processedSvg = svg.replace("<svg", '<svg fill="currentColor"');
			}
			dynamicIconCache.set(iconName, processedSvg);
			return processedSvg;
		}
	} catch (error) {
		console.warn(`[IconLoader] 动态加载图标失败：${iconName}`, error);
	}

	return null;
}

/**
 * 预加载一组图标（用于开发环境）
 */
export async function preloadIcons(iconNames: string[]): Promise<void> {
	if (import.meta.env.PROD) return;

	const loadPromises = iconNames.map((name) => loadIconDynamically(name));
	await Promise.all(loadPromises);
	console.log(`[IconLoader] 已预加载 ${iconNames.length} 个图标`);
}

/**
 * 检查图标是否已缓存
 */
export function isIconCached(iconName: string): boolean {
	return dynamicIconCache.has(iconName);
}

/**
 * 获取缓存的图标 SVG
 */
export function getCachedIcon(iconName: string): string | null {
	return dynamicIconCache.get(iconName) || null;
}

export function initIconLoader() {
	// 初始化单个图标容器
	function initContainer(container: Element) {
		if (container.hasAttribute("data-icon-initialized")) return;
		container.setAttribute("data-icon-initialized", "true");

		const loadingIndicator = container.querySelector(
			"[data-loading-indicator]",
		) as HTMLElement;
		const iconElement = container.querySelector(
			"[data-icon-element]",
		) as HTMLElement;
		const iconName = iconElement?.getAttribute("icon");

		if (!loadingIndicator || !iconElement) return;

		// 检查图标是否已经加载
		function checkIconLoaded() {
			const hasContent =
				iconElement.shadowRoot && iconElement.shadowRoot.children.length > 0;

			if (hasContent) {
				showIcon();
				return true;
			}
			return false;
		}

		// 显示图标，隐藏加载指示器
		function showIcon() {
			loadingIndicator.style.display = "none";
			iconElement.classList.remove("opacity-0");
			iconElement.classList.add("opacity-100");
		}

		// 显示加载指示器，隐藏图标
		function showLoading() {
			loadingIndicator.style.display = "inline-flex";
			iconElement.classList.remove("opacity-100");
			iconElement.classList.add("opacity-0");
		}

		// 初始状态
		showLoading();

		// 监听图标加载事件
		iconElement.addEventListener("load", () => {
			showIcon();
		});

		// 监听图标加载错误
		iconElement.addEventListener("error", () => {
			// 保持显示 fallback
			if (iconName) {
				console.warn(`Failed to load icon: ${iconName}`);
			}
		});

		// 使用 MutationObserver 监听 shadow DOM 变化
		if (window.MutationObserver) {
			const observer = new MutationObserver(() => {
				if (checkIconLoaded()) {
					observer.disconnect();
				}
			});

			// 监听 iconify-icon 元素的变化
			observer.observe(iconElement, {
				childList: true,
				subtree: true,
				attributes: true,
			});

			// 设置超时，避免无限等待
			setTimeout(() => {
				observer.disconnect();
				if (!checkIconLoaded()) {
					// console.warn(`Icon load timeout: ${iconName}`);
				}
			}, 5000);
		}

		// 立即检查一次（可能已经加载完成）
		setTimeout(() => {
			checkIconLoaded();
		}, 100);
	}

	// 初始化页面上现有的图标
	document.querySelectorAll("[data-icon-container]").forEach(initContainer);

	// 监听新添加的图标
	if (window.MutationObserver) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const el = node as Element;
						if (el.hasAttribute?.("data-icon-container")) {
							initContainer(el);
						} else {
							el.querySelectorAll("[data-icon-container]").forEach(
								initContainer,
							);
						}
					}
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
}
