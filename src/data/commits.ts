import type { CommitItem } from "../components/features/commits/types";

// GitHub 仓库信息
const GITHUB_OWNER = "tb-miao";
const GITHUB_REPO = "blog";

// 生成带时间戳的日志函数
const logWithTimestamp = (message: string, level: 'log' | 'error' = 'log') => {
	const now = new Date();
	const timestamp = now.toLocaleString('zh-CN', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: 'Asia/Shanghai'
	});
	
	// 定义颜色代码
	const colors = {
		reset: '\x1b[0m',
		pink: '\x1b[38;5;218m', // 嫩粉色 ANSI 颜色代码
		green: '\x1b[32m',
		red: '\x1b[31m',
		blue: '\x1b[34m'
	};
	
	// 根据消息内容添加颜色
	let coloredMessage = message;
	if (message.includes('[Commits]')) {
		coloredMessage = `${colors.green}[Commits]${colors.reset}${colors.pink}${message.replace('[Commits]', '')}${colors.reset}`;
	} else if (message.includes('[Commits Error]')) {
		coloredMessage = `${colors.red}[Commits Error]${colors.reset}${colors.pink}${message.replace('[Commits Error]', '')}${colors.reset}`;
	}
	console[level](`${timestamp} ${coloredMessage}`);
};

// 静态数据作为 fallback
const fallbackCommitData: CommitItem[] = [
	{
		id: "1",
		hash: "a1b2c3d4e5f6",
		parentHashes: ["f6e5d4c3b2a1"],
		message: "feat: add commits page with GitHub-style design",
		author: "John Doe",
		date: "2026-04-10T14:30:00Z",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
		changes: {
			additions: 120,
			deletions: 15
		},
		files: ["src/pages/commits.astro", "src/components/features/commits/CommitCard.astro", "src/data/commits.ts"],
		branch: "main",
		tags: ["v1.2.0"]
	},
	{
		id: "2",
		hash: "f6e5d4c3b2a1",
		parentHashes: ["b9c8d7e6f5a4"],
		message: "fix: resolve responsive design issues on commits page",
		author: "Jane Smith",
		date: "2026-04-09T09:15:00Z",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JaneSmith",
		changes: {
			additions: 35,
			deletions: 20
		},
		files: ["src/components/features/commits/CommitCard.astro"]
	},
	{
		id: "3",
		hash: "b9c8d7e6f5a4",
		parentHashes: [],
		message: "chore: update commit data with more sample entries",
		author: "John Doe",
		date: "2026-04-08T16:45:00Z",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
		changes: {
			additions: 45,
			deletions: 5
		},
		files: ["src/data/commits.ts"],
		branch: "main"
	}
];

// 从 GitHub API 获取 commit 数据
export async function fetchCommits(): Promise<CommitItem[]> {
	// 检查是否在开发环境中
	let isDevelopment = false;
	
	try {
		isDevelopment = import.meta.env.DEV;
		logWithTimestamp(`[Commits]环境判断: import.meta.env.DEV = ${isDevelopment}`);
	} catch (error) {
		logWithTimestamp(`[Commits]环境判断出错: ${error}`, 'error');
		// 如果环境变量获取失败，默认使用开发环境模式
		isDevelopment = true;
	}
	
	// 额外检查：如果是本地开发环境，直接使用静态数据
	const isLocalDevelopment = isDevelopment || process.env.NODE_ENV === 'development';
	logWithTimestamp(`[Commits]最终环境判断: isLocalDevelopment = ${isLocalDevelopment}`);
	
	// 在开发环境中，直接使用静态数据，避免 TLS 证书验证问题
	if (isLocalDevelopment) {
		logWithTimestamp("[Commits]在开发环境中，使用静态 commit 数据");
		return fallbackCommitData;
	}
	
	try {
		// 构建 GitHub API URL
		const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits`;
		
		logWithTimestamp(`[Commits]正在从 GitHub API 获取 commit 数据: ${apiUrl}`);
		
		// 发送请求，添加超时设置
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
		
		try {
			const response = await fetch(apiUrl, {
				signal: controller.signal,
				headers: {
					"Accept": "application/vnd.github.v3+json"
				}
			});
			
			clearTimeout(timeoutId);
			
			if (!response.ok) {
				logWithTimestamp(`[Commits Error]GitHub API 响应失败: ${response.status} ${response.statusText}`, 'error');
				throw new Error(`[Commits Error]GitHub API 响应失败: ${response.status} ${response.statusText}`);
			}
			
			// 解析响应数据
			const githubCommits = await response.json();
			
			if (!Array.isArray(githubCommits)) {
				logWithTimestamp("[Commits Error]GitHub API 返回的数据不是数组", 'error');
				throw new Error("[Commits Error]GitHub API 返回的数据不是数组");
			}
			
			logWithTimestamp(`[Commits]成功获取 ${githubCommits.length} 条 commit 数据`);
			
			// 限制获取的 commit 数量，避免过多请求
			const limitedCommits = githubCommits.slice(0, 10);
			
			// 转换为 CommitItem 格式
			const commits: CommitItem[] = await Promise.all(
				limitedCommits.map(async (commit: any) => {
					try {
						// 获取详细的 commit 信息以获取文件变更
						const detailResponse = await fetch(commit.url, {
							signal: controller.signal,
							headers: {
								"Accept": "application/vnd.github.v3+json"
							}
						});
						
						if (!detailResponse.ok) {
							logWithTimestamp(`[Commits Error]获取 commit 详情失败: ${detailResponse.status} ${detailResponse.statusText}`, 'error');
							// 失败时使用默认值
						return {
							id: commit.sha,
							hash: commit.sha,
							parentHashes: commit.parents?.map((p: any) => p.sha) || [],
							message: commit.commit?.message || "(无提交信息)",
							author: commit.commit?.author?.name || "Unknown",
							date: commit.commit?.author?.date || new Date().toISOString(),
							avatar: commit.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${commit.commit?.author?.name || "Unknown"}`,
							changes: {
								additions: 0,
								deletions: 0
							},
							files: [],
							branch: "main"
						};
						}
						
						const detailData = await detailResponse.json();
						
						return {
								id: commit.sha,
								hash: commit.sha,
								parentHashes: commit.parents?.map((p: any) => p.sha) || [],
								message: commit.commit?.message || "(无提交信息)",
								author: commit.commit?.author?.name || "Unknown",
								date: commit.commit?.author?.date || new Date().toISOString(),
								avatar: commit.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${commit.commit?.author?.name || "Unknown"}`,
								changes: {
									additions: detailData.stats?.additions || 0,
									deletions: detailData.stats?.deletions || 0
								},
								files: detailData.files?.map((file: any) => file.filename) || [],
								branch: "main"
							};
					} catch (error) {
						logWithTimestamp(`[Commits Error]处理 commit 数据时出错: ${error}`, 'error');
						// 失败时使用默认值
						return {
								id: commit.sha,
								hash: commit.sha,
								parentHashes: commit.parents?.map((p: any) => p.sha) || [],
								message: commit.commit?.message || "(无提交信息)",
								author: commit.commit?.author?.name || "Unknown",
								date: commit.commit?.author?.date || new Date().toISOString(),
								avatar: commit.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${commit.commit?.author?.name || "Unknown"}`,
								changes: {
									additions: 0,
									deletions: 0
								},
								files: [],
								branch: "main"
							};
					}
				})
			);
			
			return commits;
		} catch (error) {
			clearTimeout(timeoutId);
			throw error;
		}
	} catch (error) {
		logWithTimestamp(`[Commits Error]获取 GitHub commit 数据失败: ${error}`, 'error');
		// 失败时使用静态数据
		return fallbackCommitData;
	}
}

// 导出一个函数以获取 commit 数据
export async function getCommitData(): Promise<CommitItem[]> {
	return await fetchCommits();
}

// 为了保持兼容性，仍然导出静态数据
export const commitData: CommitItem[] = fallbackCommitData;
