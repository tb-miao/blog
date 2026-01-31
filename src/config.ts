import type {
	AnnouncementConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	FooterConfig,
	FullscreenWallpaperConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	ProfileConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// 移除i18n导入以避免循环依赖

// 定义站点语言
const SITE_LANG = "zh_CN"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。
const SITE_TIMEZONE = 8; //设置你的网站时区 from -12 to 12 default in UTC+8
export const siteConfig: SiteConfig = {
	title: "AUNyaの小窝",
	subtitle: "AUNya的碎碎念.",
	siteURL: "https://tbmiao.dpdns.org/", // 请替换为你的站点URL，以斜杠结尾
	siteStartDate: "2024-01-01", // 站点开始运行日期，用于站点统计组件计算运行天数

	timeZone: SITE_TIMEZONE,

	lang: SITE_LANG,

	themeColor: {
		hue: 345, // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
		fixed: true, // 对访问者隐藏主题色选择器
	},

	// 特色页面开关配置(关闭不在使用的页面有助于提升SEO,关闭后直接在顶部导航删除对应的页面就行)
	featurePages: {
		anime: false, // 番剧页面开关
		diary: false, // 日记页面开关
		friends: true, // 友链页面开关
		projects: true, // 项目页面开关
		skills: false, // 技能页面开关
		timeline: false, // 时间线页面开关
		albums: false, // 相册页面开关
		devices: false, // 设备页面开关
	},

	// 顶栏标题配置
	navbarTitle: {
		// 顶栏标题文本
		text: "AUNyaの小窝",
		// 顶栏标题图标路径，默认使用 public/assets/home/home.png
		icon: "assets/home/firefly.png",
	},

	bangumi: {
		userId: "your-bangumi-id", // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
		fetchOnDev: false, // 是否在开发环境下获取 Bangumi 数据（默认 false），获取前先执行 pnpm build 构建 json 文件
	},

	anime: {
		mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置
	},

	// 文章列表布局配置
	postListLayout: {
		// 默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
		// 注意：如果侧边栏配置启用了"both"双侧边栏，则无法使用文章列表"grid"网格（双列）布局
		defaultMode: "list",
		// 是否允许用户切换布局
		allowSwitch: true,
	},

	// 标签样式配置
	tagStyle: {
		// 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
		useNewStyle: true,
	},

	// 壁纸模式配置
	wallpaperMode: {
		// 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
		defaultMode: "banner",
		// 整体布局方案切换按钮显示设置（默认："desktop"）
		// "off" = 不显示
		// "mobile" = 仅在移动端显示
		// "desktop" = 仅在桌面端显示
		// "both" = 在所有设备上显示
		showModeSwitchOnMobile: "off",
	},

	banner: {
		// 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播
		src: {
			desktop: [
				//"/assets/desktop-banner/1.webp",
				//"/assets/desktop-banner/2.webp",
				//"/assets/desktop-banner/3.webp",
				//"/assets/desktop-banner/4.webp",
				//"/assets/desktop-banner/5.webp",
				//"/assets/desktop-banner/6.webp",
				"/assets/desktop-banner/7.webp"
			], // 桌面横幅图片
			mobile: [
				"/assets/mobile-banner/6.webp",
				"/assets/mobile-banner/7.webp",
			], // 移动横幅图片
		}, // 使用本地横幅图片

		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'

		carousel: {
			enable: true, // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片

			interval: 3, // 轮播间隔时间（秒）
		},

		waves: {
			enable: true, // 是否启用水波纹效果(这个功能比较吃性能)
			performanceMode: true, // 性能模式：减少动画复杂度(性能提升40%)
			mobileDisable: false, // 移动端禁用
		},

		// PicFlow API支持(智能图片API)
		imageApi: {
			enable: false, // 启用图片API
			url: "http://domain.com/api_v2.php?format=text&count=4", // API地址，返回每行一个图片链接的文本
		},
		// 这里需要使用PicFlow API的Text返回类型,所以我们需要format=text参数
		// 项目地址:https://github.com/matsuzaka-yuki/PicFlow-API
		// 请自行搭建API

		homeText: {
			enable: true, // 在主页显示自定义文本
			title: "你好", // 主页横幅主标题

			subtitle: [
				"你好",
				"咕咕嘎嘎",
			],
			typewriter: {
				enable: true, // 启用副标题打字机效果

				speed: 100, // 打字速度（毫秒）
				deleteSpeed: 50, // 删除速度（毫秒）
				pauseTime: 2000, // 完全显示后的暂停时间（毫秒）
			},
		},

		credit: {
			enable: false, // 显示横幅图片来源文本

			text: "Describe", // 要显示的来源文本
			url: "", // （可选）原始艺术品或艺术家页面的 URL 链接
		},

		navbar: {
			transparentMode: "semi", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
		},
	},
	toc: {
		enable: true, // 启用目录功能
		mode: "sidebar", // 目录显示模式："float" 悬浮按钮模式，"sidebar" 侧边栏模式
		depth: 2, // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
		useJapaneseBadge: false, // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
	},
	showCoverInContent: true, // 在文章内容页显示文章封面
	generateOgImages: false, // 启用生成OpenGraph图片功能,注意开启后要渲染很长时间，不建议本地调试的时候开启
	favicon: [
		// 留空以使用默认 favicon
		// {
		//   src: '/favicon/icon.png',    // 图标文件路径
		//   theme: 'light',              // 可选，指定主题 'light' | 'dark'
		//   sizes: '32x32',              // 可选，图标大小
		// }
	],

	// 字体配置
	font: {
		// 注意：自定义字体需要在 src/styles/main.css 中引入字体文件
		// 注意：字体子集优化功能目前仅支持 TTF 格式字体,开启后需要在生产环境才能看到效果,在Dev环境下显示的是浏览器默认字体!
		asciiFont: {
			// 英文字体 - 优先级最高
			// 指定为英文字体则无论字体包含多大范围，都只会保留 ASCII 字符子集
			fontFamily: "DouyinSansBold",
			fontWeight: "400",
			localFonts: ["DouyinSansBold.woff2"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
		cjkFont: {
			// 中日韩字体 - 作为回退字体
			fontFamily: "DouyinSansBold",
			fontWeight: "500",
			localFonts: ["DouyinSansBold.woff2"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
	},
	showLastModified: true, // 控制“上次编辑”卡片显示的开关
};
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	src: {
		desktop: [
			//"/assets/desktop-banner/1.webp",
			//"/assets/desktop-banner/2.webp",
			//"/assets/desktop-banner/3.webp",
			//"/assets/desktop-banner/4.webp",
			//"/assets/desktop-banner/5.webp",
			//"/assets/desktop-banner/6.webp",
			"/assets/desktop-banner/7.webp",
		], // 桌面横幅图片
		mobile: [
			"/assets/mobile-banner/6.webp",
			"/assets/mobile-banner/7.webp",
		], // 移动横幅图片
	}, // 使用本地横幅图片
	position: "center", // 壁纸位置，等同于 object-position
	carousel: {
		enable: true, // 启用轮播
		interval: 5, // 轮播间隔时间（秒）
	},
	zIndex: -1, // 层级，确保壁纸在背景层
	opacity: 0.8, // 壁纸透明度
	blur: 1, // 背景模糊程度
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		// 支持自定义导航栏链接,并且支持多级菜单,3.1版本新加
		{
			name: "友链",
			url: "/friends/",
			icon: "material-symbols:group",
		},
		{
			name: "我的",
			url: "/content/",
			icon: "material-symbols:person",
			children: [
				{
					name: "项目",
					url: "/projects/",
					icon: "material-symbols:developer-board",
				},
				{
					name: "关于",
					url: "/about/",
					icon: "material-symbols:person",
				},
			],
		},
		{
			name: "博客统计",
			url: "https://cloud.umami.is/analytics/us/share/pBFqYW1e5248KxEz",
			icon: "material-symbols:group",
			external: true,
		},
		{
			name: "监测统计",
			url: "https://cloud.umami.is/share/uldxG2QTnboi9OlF",
			icon: "material-symbols:group",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://avatars.githubusercontent.com/u/172878250?v=4", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "AUNya",
	bio: "是一个热爱二次元的小萌新~ ",
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
	},
	// 时间进度配置
	timeProgress: {
		enable: true, // 启用时间进度显示
		showYearProgress: true, // 显示年度进度
		showDayProgress: true, // 显示今日进度
		updateInterval: 60000, // 更新间隔（毫秒），默认1分钟
	},
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/3546708996786634",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/tb-miao",
		},
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// Permalink 固定链接配置
export const permalinkConfig: PermalinkConfig = {
	enable: false, // 是否启用全局 permalink 功能，关闭时使用默认的文件名作为链接
	/**
	 * permalink 格式模板
	 * 支持的占位符：
	 * - %year% : 4位年份 (2024)
	 * - %monthnum% : 2位月份 (01-12)
	 * - %day% : 2位日期 (01-31)
	 * - %hour% : 2位小时 (00-23)
	 * - %minute% : 2位分钟 (00-59)
	 * - %second% : 2位秒数 (00-59)
	 * - %post_id% : 文章序号（按发布时间升序排列，最早的文章为1）
	 * - %postname% : 文章文件名（slug）
	 * - %category% : 分类名（无分类时为 "uncategorized"）
	 *
	 * 示例：
	 * - "%year%-%monthnum%-%postname%" => "/2024-12-my-post/"
	 * - "%post_id%-%postname%" => "/42-my-post/"
	 * - "%category%-%postname%" => "/tech-my-post/"
	 *
	 * 注意：不支持斜杠 "/"，所有生成的链接都在根目录下
	 */
	format: "%postname%", // 默认使用文件名
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
	// 是否在主题切换时隐藏代码块以避免卡顿问题
	hideDuringThemeTransition: true,
};

export const commentConfig: CommentConfig = {
	enable: true, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	twikoo: {
		envId: "https://tw.tbmiao.dpdns.org/",
		lang: SITE_LANG,
	},
};

export const shareConfig: ShareConfig = {
	enable: true, // 启用分享功能。当设置为 false 时，分享组件将不会显示在文章区域，且不会加载分享组件使用的库
};

export const announcementConfig: AnnouncementConfig = {
	title: "公告呀~", // 公告标题
	content: "🎉🎉 欢迎来到我的博客喵！本站2周年啦！已添加新的节点欢迎访问！", // 公告内容
	closable: false, // 允许用户关闭公告
	link: {
		enable: false, // 启用链接
		text: "Learn More", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};

export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // 启用音乐播放器功能
	mode: "meting", // 音乐播放器模式，可选 "local" 或 "meting"
	meting_api:
		"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Meting API 地址
	id: "12631884339", // 歌单ID
	server: "netease", // 音乐源服务器。有的meting的api源支持更多平台,一般来说,netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
	type: "playlist", // 播单类型
};

export const footerConfig: FooterConfig = {
	enable: false, // 是否启用Footer HTML注入功能
	customHtml: "", // HTML格式的自定义页脚信息，例如备案号等，默认留空
	// 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
	// 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
	// FooterConfig.html 可能会在未来的某个版本弃用
};

/**
 * 侧边栏布局配置
 * 用于控制侧边栏组件的显示、排序、动画和响应式行为
 * sidebar: 控制组件在左侧栏和右侧栏,注意移动端是不会显示右侧栏的内容(unilateral模式除外),在设置了right属性的时候请确保你使用双侧(both)布局
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 侧边栏位置：单侧(unilateral)或双侧(both)
	position: "both",

	// 侧边栏组件配置列表
	components: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序（数字越小越靠前）
			order: 1,
			// 组件位置："top" 表示固定在顶部
			position: "top",
			// 所在侧边栏
			sidebar: "left",
			// CSS 类名，用于应用样式和动画
			class: "onload-animation",
			// 动画延迟时间（毫秒），用于错开动画效果
			animationDelay: 0,
		},
		{
			// 组件类型：公告组件
			type: "announcement",
			// 是否启用该组件（现在通过统一配置控制）
			enable: true,
			// 组件显示顺序
			order: 2,
			// 组件位置："top" 表示固定在顶部
			position: "top",
			// 所在侧边栏
			sidebar: "left",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 50,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 3,
			// 组件位置："sticky" 表示粘性定位，可滚动
			position: "sticky",
			// 所在侧边栏
			sidebar: "left",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 150,
			// 响应式配置
			responsive: {
				// 折叠阈值：当分类数量超过5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：线路切换组件
			type: "line-switch",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 4,
			// 组件位置
			position: "sticky",
			// 所在侧边栏
			sidebar: "left",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 200,
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 5,
			// 组件位置："sticky" 表示粘性定位
			position: "top",
			// 所在侧边栏
			sidebar: "left",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
			// 响应式配置
			responsive: {
				// 折叠阈值：当标签数量超过20个时自动折叠
				collapseThreshold: 20,
			},
		},
		{
			// 组件类型：站点统计组件
			type: "site-stats",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 5,
			// 组件位置
			position: "top",
			// 所在侧边栏
			sidebar: "right",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 200,
		},
		{
			// 组件类型：日历组件(移动端不显示)
			type: "calendar",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 6,
			// 组件位置
			position: "top",
			// 所在侧边栏
			sidebar: "right",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
		},
		{
			// 组件类型：网络检查组件
			type: "network-check",
			// 是否启用该组件
			enable: true,
			// 组件显示顺序
			order: 4,
			// 组件位置
			position: "top",
			// 所在侧边栏
			sidebar: "right",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 150,
		},
	],

	// 默认动画配置
	defaultAnimation: {
		// 是否启用默认动画
		enable: true,
		// 基础延迟时间（毫秒）
		baseDelay: 0,
		// 递增延迟时间（毫秒），每个组件依次增加的延迟
		increment: 50,
	},

	// 响应式布局配置
	responsive: {
		// 断点配置（像素值）
		breakpoints: {
			// 移动端断点：屏幕宽度小于768px
			mobile: 768,
			// 平板端断点：屏幕宽度小于1280px
			tablet: 1280,
			// 桌面端断点：屏幕宽度小于1280px
			desktop: 1280,
		},
		// 不同设备的布局模式
		//hidden:不显示侧边栏(桌面端)   drawer:抽屉模式(移动端不显示)   sidebar:显示侧边栏
		layout: {
			// 移动端：抽屉模式
			mobile: "sidebar",
			// 平板端：显示侧边栏
			tablet: "sidebar",
			// 桌面端：显示侧边栏
			desktop: "sidebar",
		},
	},
};

export const sakuraConfig: SakuraConfig = {
	enable: false, // 默认关闭樱花特效
	sakuraNum: 21, // 樱花数量
	limitTimes: -1, // 樱花越界限制次数，-1为无限循环
	size: {
		min: 0.5, // 樱花最小尺寸倍数
		max: 1.1, // 樱花最大尺寸倍数
	},
	opacity: {
		min: 0.3, // 樱花最小不透明度
		max: 0.9, // 樱花最大不透明度
	},
	speed: {
		horizontal: {
			min: -1.7, // 水平移动速度最小值
			max: -1.2, // 水平移动速度最大值
		},
		vertical: {
			min: 1.5, // 垂直移动速度最小值
			max: 2.2, // 垂直移动速度最大值
		},
		rotation: 0.03, // 旋转速度
		fadeSpeed: 0.03, // 消失速度，不应大于最小不透明度
	},
	zIndex: 100, // 层级，确保樱花在合适的层级显示
};

// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // 启用看板娘
	models: ["/pio/models/pio/model.json"], // 默认模型路径
	position: "left", // 默认位置在右侧
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	dialog: {
		welcome: "你好欢迎来到 AUNyaの小窝 ！", // 欢迎词
		touch: [
			"你在做什么？",
			"别碰我！",
			"变态！",
			"不要这样欺负我！",
		], // 触摸提示
		home: "点击这里返回首页！", // 首页提示
		skin: ["想看看我的新衣服吗？","这套新衣服真棒~"], // 换装提示
		close: "QWQ 下次见~", // 关闭提示
		link: "https://github.com/matsuzaka-yuki/Mizuki", // 关于链接
	},
};

// 导出所有配置的统一接口
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
	sakura: sakuraConfig,
	fullscreenWallpaper: fullscreenWallpaperConfig,
	pio: pioConfig, // 添加 pio 配置
	share: shareConfig, // 添加分享配置
} as const;

export const umamiConfig = {
	enabled: true, // 是否显示Umami统计
	apiKey: import.meta.env.UMAMI_API_KEY || "api_KM95wn9S07trPrzaQmFEYd8zEnzEJrWG", // API密钥优先从环境变量读取，否则使用配置文件中的值
	baseUrl: "https://api.umami.is", // Umami Cloud API地址
	scripts: `
<script defer src="https://cloud.umami.is/script.js" data-website-id="50cd57c4-1d49-4941-88d5-b1cce22ee6a1"></script>
  `.trim(), // 上面填你要插入的Script,不用再去Layout中插入
} as const;