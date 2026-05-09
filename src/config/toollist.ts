import type { ToolItem } from "../types/config";

// 工具列表页面配置
export const toolListPageConfig = {
	// 页面标题
	title: "工具列表",

	// 页面描述
	description: "我用过的工具吖~",

	// 是否显示搜索框
	showSearch: true,

	// 是否显示分类筛选
	showCategoryFilter: true,
};


// 工具列表配置
export const toolList: ToolItem[] = [
	//{
	//	title: "JSON 格式化",
	//	description: "在线 JSON 格式化、验证和美化工具",
	//	url: "https://jsonformatter.org/",
	//	icon: "https://jsonformatter.org/favicon.ico",
	//	tags: ["JSON", "格式化", "验证"],
	//	enabled: true,
	//},
    {
        title: "Visual Studio Code",
        description: "微软集成开发工具，超好用！！！",
        url: "https://code.visualstudio.com/",
        icon: "https://code.visualstudio.com/assets/favicon.ico",
        tags: ["开发工具"],
        enabled: true,
    },
    {
        title: "Trae CN",
        description: "好用。",
        url: "https://www.trae.cn",
        icon: "https://lf-cdn.trae.com.cn/obj/trae-com-cn/trae_website_prod_cn/favicon.png",
        tags: ["开发工具"],
        enabled: true,
    },
    {
        title: "Github Desktop",
        description: "Git桌面版？",
        url: "https://desktop.github.com/",
        icon: "https://github.githubassets.com/favicons/favicon.png",
        tags: ["开发工具"],
        enabled: true,
    },
    {
        title: "Potplayer",
        description: "视频播放器",
        url: "https://potplayer.tv/",
        icon: "/assets/images/tools-img/polplayer.ico",
        tags: ["视频播放器"],
        enabled: true,
    },
    {
        title: "Motrix Next",
        description: "A full-featured download manager — rebuilt from the ground up.",
        url: "https://github.com/AnInsomniacy/motrix-next",
        icon: "https://motrix-next.pages.dev/assets/logo.png",
        tags: ["下载工具"],
        enabled: true,
    },
    {
        title: "Geek Uninstaller",
        description: "卸载工具",
        url: "https://geekuninstaller.com/",
        icon: "https://geekuninstaller.com/favicon.ico",
        tags: ["卸载工具"],
        enabled: true,
    },
    {
        title: "闪电藤",
        description: "新一代文件传输助手，方便好用的文件传输助手",
        url: "https://lightningvine.zishu.life/",
        icon: "https://lightningvine.zishu.life/icon.png",
        tags: ["文件传输工具"],
        enabled: true,
    },
    {
        title: "Nuitka-GUI",
        description: "b站大佬开发的Nuitka Gui，bv号：435521282",
        url: "https://wwbtq.lanzoub.com/b0188b9e8b",
        icon: "https://images.bakstotre.com/assets/favicon.ico",
        tags: ["Nuitka-GUI"],
        enabled: true,
    },
    {
        title: "Watt Toolkit",
        description: "「Watt Toolkit」是一个开源跨平台的多功能 Steam 工具箱，也是Github加速器。",
        url: "https://steampp.net/",
        icon: "https://steampp.net/favicon.ico",
        tags: ["Steam+Github加速器"],
        enabled: true,
    },
    {
        title: "PCL 2",
        description: "我的世界Java版启动器~",
        url: "https://www.ifdian.net/a/LTCat",
        icon: "https://static.afdiancdn.com/favicon.ico",
        tags: ["PCL我的世界Java启动器"],
        enabled: true,
    },
    {
        title: "LiteMonitor",
        description: "一款轻量级、高度可定制的 Windows桌面和任务栏硬件性能监控工具，支持监测 CPU、GPU、内存、磁盘、网速、FPS 计数、插件扩展及内存清理。",
        url: "https://github.com/Diorser/LiteMonitor",
        icon: "https://litemonitor.cn/favicon.ico",
        tags: ["LiteMonitor"],
        enabled: true,
    },
    {
        title: "PhotoScape X Pro",
        description: "图片编辑器",
        url: "http://x.photoscape.org/",
        icon: "",
        tags: ["图片编辑器"],
        enabled: true,
    },
    {
        title: "Audacity",
        description: "Audacity 是一款易于使用的多轨音频编辑器和录音机，适用于 Windows、macOS、GNU/Linux 及其他操作系统。大胆是免费的， 开源软件。",
        url: "https://www.audacityteam.org/",
        icon: "https://www.audacityteam.org/favicon.ico",
        tags: ["音频音乐编辑器"],
        enabled: true,
    },
    {
        title: "BewlyCat",
        description: "基于BewlyBewly开发，由b站大佬开发。bv号：32487218",
        url: "https://github.com/keleus/BewlyCat",
        icon: "https://store-images.s-microsoft.com/image/apps.10160.4f0f020d-59a5-4490-bd7e-c9dc27b97c3f.c76c40e6-ec2c-40a5-a336-68812a08f274.2e15523f-f5f8-485e-b2e3-329bd72b4f99?mode=scale&h=100&q=90&w=100",
        tags: ["bilibili美化插件"],
        enabled: true,
    },
];

// 获取启用的工具列表
export function getEnabledTools(): ToolItem[] {
	return toolList.filter((tool) => tool.enabled !== false);
}



// 获取所有标签
export function getAllToolTags(): string[] {
	const tags = getEnabledTools().flatMap((tool) => tool.tags || []);
	return [...new Set(tags)].sort();
}
