import type { CommitItem } from "../components/features/commits/types";

// GitHub 仓库信息
const GITHUB_OWNER = "tb-miao";
const GITHUB_REPO = "blog";

// 环境控制开关
// true: 开发环境模式 - 禁用 GitHub API 调用，使用静态数据
// false: 生产环境模式 - 启用 GitHub API 调用
const DISABLE_GITHUB_API = false;

// 缓存相关
const CACHE_TTL = 5 * 60 * 1000; // 缓存有效期 5 分钟
let commitCache: {
	data: CommitItem[];
	timestamp: number;
} | null = null;

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
	
	const colors = {
		reset: '\x1b[0m',
		pink: '\x1b[38;5;218m',
		green: '\x1b[32m',
		red: '\x1b[31m',
		blue: '\x1b[34m'
	};
	
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
		files: ["src/components/features/commits/CommitCard.astro"],
		tags: ["v1.2.9"]
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
		branch: "main",
		tags: ["v1.9.0"]
	}
];

// 延迟函数，用于控制请求频率
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 重试包装器
async function withRetry<T>(
	fn: () => Promise<T>,
	maxRetries: number = 3,
	initialDelay: number = 1000
): Promise<T> {
	let lastError: Error;
	
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;
			
			if (attempt < maxRetries) {
				const delayTime = initialDelay * Math.pow(2, attempt - 1);
				logWithTimestamp(`[Commits] 重试 ${attempt}/${maxRetries}，等待 ${delayTime}ms...`);
				await delay(delayTime);
			}
		}
	}
	
	throw lastError!;
}

// 从 GitHub API 获取 commit 数据（优化版）
export async function fetchCommits(): Promise<CommitItem[]> {
	// 检查开关设置
	if (DISABLE_GITHUB_API) {
		logWithTimestamp("[Commits] GitHub API 已禁用，使用静态 commit 数据");
		return fallbackCommitData;
	}
	
	// 检查是否在开发环境中（仅用于日志提示）
	let isDevelopment = false;
	
	try {
		isDevelopment = import.meta.env.DEV;
	} catch (error) {
		logWithTimestamp(`[Commits] 环境判断出错：${error}`, 'error');
		isDevelopment = false;
	}
	
	if (isDevelopment) {
		logWithTimestamp("[Commits] 开发环境模式，将调用 GitHub API");
	}
	
	// 检查缓存是否有效
	if (commitCache && Date.now() - commitCache.timestamp < CACHE_TTL) {
		logWithTimestamp(`[Commits] 使用缓存数据（剩余有效期：${Math.round((CACHE_TTL - (Date.now() - commitCache.timestamp)) / 1000)}s）`);
		return commitCache.data;
	}
	
	try {
		const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits`;
		
		logWithTimestamp(`[Commits] 正在从 GitHub API 获取 commit 数据`);
		
		// 使用重试机制获取 commit 列表
		const githubCommits = await withRetry(async () => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 15000);
			
			try {
				const response = await fetch(apiUrl, {
					signal: controller.signal,
					headers: {
						"Accept": "application/vnd.github.v3+json",
						"User-Agent": "tb-miao-blog"
					}
				});
				
				clearTimeout(timeoutId);
				
				if (!response.ok) {
					if (response.status === 403) {
						throw new Error(`GitHub API 速率限制 (${response.status})`);
					}
					throw new Error(`GitHub API 响应失败：${response.status} ${response.statusText}`);
				}
				
				const data = await response.json();
				
				if (!Array.isArray(data)) {
					throw new Error("GitHub API 返回的数据不是数组");
				}
				
				return data;
			} catch (error) {
				clearTimeout(timeoutId);
				
				// 特殊处理 fetch failed 错误
				if (error instanceof TypeError && error.message.includes('fetch failed')) {
					const cause = (error as any).cause;
					if (cause) {
						throw new Error(`网络请求失败：${cause.message || '未知网络错误'}`);
					}
					throw new Error(`网络请求失败：无法连接到 GitHub API，请检查网络连接`);
				}
				
				throw error;
			}
		}, 3, 2000);
		
		logWithTimestamp(`[Commits] 成功获取 ${githubCommits.length} 条 commit 数据`);
		
		// 只获取最新的 10 条 commit
		const limitedCommits = githubCommits.slice(0, 10);
		
		// 批量获取详细信息，控制请求频率
		const commits: CommitItem[] = [];
		
		for (let i = 0; i < limitedCommits.length; i++) {
			const commit = limitedCommits[i];
			
			try {
				// 在请求之间添加延迟，避免触发速率限制
				if (i > 0) {
					await delay(1500);
				}
				
				const detailData = await withRetry(async () => {
					const controller = new AbortController();
					const timeoutId = setTimeout(() => controller.abort(), 15000);
					
					try {
						const detailResponse = await fetch(commit.url, {
							signal: controller.signal,
							headers: {
								"Accept": "application/vnd.github.v3+json",
								"User-Agent": "tb-miao-blog"
							}
						});
						
						clearTimeout(timeoutId);
						
						if (!detailResponse.ok) {
							if (detailResponse.status === 403) {
								throw new Error(`GitHub API 速率限制 (${detailResponse.status})`);
							}
							throw new Error(`获取详情失败：${detailResponse.status} ${detailResponse.statusText}`);
						}
						
						return await detailResponse.json();
					} catch (error) {
						clearTimeout(timeoutId);
						
						// 特殊处理 fetch failed 错误
						if (error instanceof TypeError && error.message.includes('fetch failed')) {
							const cause = (error as any).cause;
							if (cause) {
								throw new Error(`网络请求失败：${cause.message || '未知网络错误'}`);
							}
							throw new Error(`网络请求失败：无法连接到 GitHub API，请检查网络连接`);
						}
						
						throw error;
					}
				}, 2, 3000);
				
				commits.push({
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
				});
				
			} catch (error) {
				logWithTimestamp(`[Commits Error] 处理 commit ${commit.sha?.slice(0, 7)} 时出错：${error}`, 'error');
				
				// 失败时使用简化数据
				commits.push({
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
				});
			}
		}
		
		// 更新缓存
		commitCache = {
			data: commits,
			timestamp: Date.now()
		};
		
		logWithTimestamp(`[Commits] 成功处理 ${commits.length} 条 commit 数据，已缓存`);
		
		return commits;
		
	} catch (error) {
		// 特殊处理 fetch failed 错误
		let errorMessage = error instanceof Error ? error.message : String(error);
		
		if (error instanceof TypeError && error.message.includes('fetch failed')) {
			const cause = (error as any).cause;
			if (cause) {
				errorMessage = `网络请求失败：${cause.message || '未知网络错误'}`;
			} else {
				errorMessage = `网络请求失败：无法连接到 GitHub API，请检查网络连接`;
			}
		}
		
		logWithTimestamp(`[Commits Error] 获取 GitHub commit 数据失败：${errorMessage}`, 'error');
		
		// 如果有缓存但已过期，仍然返回缓存数据
		if (commitCache) {
			logWithTimestamp("[Commits] 返回过期缓存数据");
			return commitCache.data;
		}
		
		return fallbackCommitData;
	}
}

// 导出一个函数以获取 commit 数据
export async function getCommitData(): Promise<CommitItem[]> {
	return await fetchCommits();
}

// 为了保持兼容性，仍然导出静态数据
export const commitData: CommitItem[] = fallbackCommitData;
