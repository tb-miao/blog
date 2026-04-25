import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
	{
		title: "韩小韩博客",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640",
		desc: "运气是计划之外的东西.",
		siteurl: "https://www.vvhan.com",
		tags: ["Blog"],
		weight: 7,
		enabled: true,
	},
	{
		title: "CoolCat Network Studio",
		imgurl: "https://www.coolcat.cn/favicon.ico",
		desc: "专注于IT技术学习和分享，提供网站建设、网站设计与开发",
		siteurl: "https://www.coolcat.cn",
		tags: ["CNS"],
		weight: 6,
		enabled: true,
	},
	{
		title: "yCENzh's Blog",
		imgurl: "https://ico.kucat.cn/get.php?url=https://fuwari.oh1.top",
		desc: "Ciallo～(∠・ω&lt; )⌒☆ ",
		siteurl: "https://fuwari.oh1.top",
		tags: ["Blog"],
		weight: 5,
		enabled: true,
	},
	{
		title: "带我入坑网站的超级大坏比",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=3347510139&spec=5",
		desc: "Dmocken的免费推广位",
		siteurl: "https://phira.dmocken.top",
		tags: ["Blog"],
		weight: 4,
		enabled: true,
	},
	{
		title: "Dahi Blog",
		imgurl: "https://oxs.dahi.icu/pic/avatar.png",
		desc: "時光流轉，願你有一天能與重要的人重逢",
		siteurl: "https://dahi.icu/",
		tags: ["Blog"],
		weight: 3,
		enabled: true,
	},
	{
		title: "AlexMa's Blog",
		imgurl: "https://blog-backend.alexma.top/api/v2/objects/avatar/112zjnt1f3c2cf3prp.webp",
		desc: "Create things with love.",
		siteurl: "https://blog.alexma.top",
		tags: ["Blog"],
		weight: 2,
		enabled: true,
	},
	{
		title: "Geekertao's Blog",
		imgurl: "https://obj.geekertao.top/geekertao.jpg",
		desc: "Geekertao's Blog",
		siteurl: "https://www.geekertao.com/",
		tags: ["Geekertao's Blog"],
		weight: 1,
		enabled: true,
	},
	{
		title: "雨云",
		imgurl: "https://www.rainyun.com/favicon.ico",
		desc: "新一代云服务提供商",
		siteurl: "https://www.rainyun.com/home",
		tags: ["雨云"],
		weight: 1,
		enabled: true,
	},
	{
		title: "Ad_closeNN 的小站",
		imgurl: "https://adclosenn.top/assets/avatar.jpg",
		desc: "Ad_closeNN 的小站，时不时会刷新一些野生东西",
		siteurl: "https://adclosenn.top",
		tags: ["Blog"],
		weight: 1,
		enabled: true,
	},
	{
		title: "鈴奈咲桜のBlog",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
		desc: "愛することを忘れないで",
		siteurl: "https://blog.sakura.ink",
		tags: ["Blog"],
		weight: 1,
		enabled: true,
	},
	{
		title: "Uapis",
		imgurl: "https://uapis.cn/favicon.svg",
		desc: "免费、稳定、快速的公共 Api",
		siteurl: "https://uapis.cn/",
		tags: ["Api"],
		weight: 1,
		enabled: true,
	},
	{
		title: "困",
		imgurl: "https://avatars.githubusercontent.com/u/119118549?v=4",
		desc: "过客而已，就像不曾存在过",
		siteurl: "https://blog.haokun.me/",
		tags: ["Blog"],
		weight: 1,
		enabled: true,
	},
]

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
