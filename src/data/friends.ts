// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	{
		id: 2,
		title: "Mizuki Docs",
		imgurl: "http://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		desc: "Mizuki User Manual",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: ["Docs"],
	},
	{
		id: 3,
		title: "Vercel",
		imgurl: "https://avatars.githubusercontent.com/u/14985020?v=4&s=640",
		desc: "Develop. Preview. Ship.",
		siteurl: "https://vercel.com",
		tags: ["Hosting", "Cloud"],
	},
	{
		id: 4,
		title: "Tailwind CSS",
		imgurl: "https://avatars.githubusercontent.com/u/67109815?v=4&s=640",
		desc: "A utility-first CSS framework for rapidly building custom designs",
		siteurl: "https://tailwindcss.com",
		tags: ["CSS", "Framework"],
	},
	{
		id: 5,
		title: "TypeScript",
		imgurl: "https://avatars.githubusercontent.com/u/6154722?v=4&s=640",
		desc: "TypeScript is JavaScript with syntax for types",
		siteurl: "https://www.typescriptlang.org",
		tags: ["Language", "JavaScript"],
	},
	{
		id: 6,
		title: "React",
		imgurl: "https://avatars.githubusercontent.com/u/6412038?v=4&s=640",
		desc: "A JavaScript library for building user interfaces",
		siteurl: "https://reactjs.org",
		tags: ["Framework", "JavaScript"],
	},
	{
		id: 7,
		title: "GitHub",
		imgurl: "https://avatars.githubusercontent.com/u/9919?v=4&s=640",
		desc: "Where the world builds software",
		siteurl: "https://github.com",
		tags: ["Development", "Platform"],
	},
	{
		id: 8,
		title: "MDN Web Docs",
		imgurl: "https://avatars.githubusercontent.com/u/7565578?v=4&s=640",
		desc: "The web's most comprehensive resource for web developers",
		siteurl: "https://developer.mozilla.org",
		tags: ["Docs", "Reference"],
	},
	{
		id: 9,
		title: "韩小韩博客",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640",
		desc: "运气是计划之外的东西.",
		siteurl: "https://www.vvhan.com",
		tags: ["Blog"],
	},
	{
		id: 10,
		title: "CoolCat Network Studio",
		imgurl: "https://www.coolcat.cn/favicon.ico",
		desc: "专注于IT技术学习和分享，提供网站建设、网站设计与开发",
		siteurl: "https://www.coolcat.cn",
		tags: ["CNS"],
	},
	{
		id: 11,
		title: "yCENzh's Blog",
		imgurl: "https://ico.kucat.cn/get.php?url=https://fuwari.oh1.top",
		desc: "Ciallo～(∠・ω&lt; )⌒☆ ",
		siteurl: "https://fuwari.oh1.top",
		tags: ["Blog"],
	},
	{
		id: 12,
		title: "带我入坑网站的超级大坏比",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=3347510139&spec=5",
		desc: "Dmocken的免费推广位",
		siteurl: "https://phira.dmocken.top",
		tags: ["Blog"],
	},
	{
		id: 13,
		title: "Dahi Blog",
		imgurl: "https://oxs.dahi.icu/pic/avatar.png",
		desc: "時光流轉，願你有一天能與重要的人重逢",
		siteurl: "https://dahi.icu/",
		tags: ["Blog"],
	},
	{
		id: 14,
		title: "AlexMa's Blog",
		imgurl: "https://blog-backend.alexma.top/api/v2/objects/avatar/112zjnt1f3c2cf3prp.webp",
		desc: "Create things with love.",
		siteurl: "https://blog.alexma.top",
		tags: ["Blog"],
	},
	{
		id: 15,
		title: "Geekertao's Blog",
		imgurl: "https://obj.geekertao.top/geekertao.jpg",
		desc: "Geekertao's Blog",
		siteurl: "https://www.geekertao.com/",
		tags: ["Geekertao's Blog"],
	},
	{
		id: 16,
		title: "雨云",
		imgurl: "https://www.rainyun.com/favicon.ico",
		desc: "新一代云服务提供商",
		siteurl: "https://www.rainyun.com/home",
		tags: ["雨云"],
	},
	{
		id: 17,
		title: "Ad_closeNN 的小站",
		imgurl: "https://www.adclosenn.dev/assets/avatar.jpg",
		desc: "永远相信美好的事情即将发生",
		siteurl: "https://www.adclosenn.dev/",
		tags: ["Blog"],
	},
	{
		id: 18,
		title: "鈴奈咲桜のBlog",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
		desc: "愛することを忘れないで",
		siteurl: "https://blog.sakura.ink",
		tags: ["Blog"],
	}
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
