import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "公告喵~",

	// 公告内容
	content: `
## 🎉🎉 欢迎来到我的博客喵！本站2周年啦！
---
- 优化了背景图片， it's more beautiful!
- 优化了整体代码，修复了一些BUG，提高了性能。
---
`,
	// 是否允许用户关闭公告
	closable: false,

	link: {
		// 启用链接
		enable: false,
		// 链接文本
		text: "了解更多",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
