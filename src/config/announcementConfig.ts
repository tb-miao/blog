import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "公告呀~",

	// 公告内容    （🎉🎉 欢迎来到我的博客喵！本站2周年啦！）
	content: `
# 🚧维护中...
- 本站正在进行大型维护，会出现无法访问或页面异常现象。
---
已修复’Commits‘页面的API问题，现在正常获取Git数据。
---
可以点击【[这里](https://github.com/tb-miao/blog/issues)】提交对网站的建议。
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
