// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "AUNya_Services_Status",
		title: "AUNya_Services_Status",
		description: "一个基于uptimerobot API的服务状态监控面板",
		image: "",
		category: "web",
		techStack: ["react","vue","typescript"],
		status: "completed",
		liveDemo: "https://github.com/tb-miao/status",
		sourceCode: "https://github.com/tb-miao/status",
		startDate: "2026-01-01",
		endDate: "2026-01-27",
		featured: true,
		tags: ["react","vue","typescript"],
		visitUrl: "https://github.com/tb-miao/status",
	},
		{
		id: "Windows-time-synchronization",
		title: "Windows-time-synchronization",
		description: "Windows-time-synchronization , Windows 时间同步工具",
		image: "",
		category: "desktop",
		techStack: ["python"],
		status: "in-progress",
		liveDemo: "https://github.com/tb-miao/Windows-time-synchronization",
		sourceCode: "https://github.com/tb-miao/Windows-time-synchronization",
		startDate: "2026-03-14",
		endDate: "2026-03-15",
		featured: true,
		tags: ["python"],
		visitUrl: "https://github.com/tb-miao/Windows-time-synchronization",
	}
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
