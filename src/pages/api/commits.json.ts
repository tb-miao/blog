import type { APIRoute } from "astro";
import { fetchCommits } from "../../data/commits";

export const GET: APIRoute = async () => {
	try {
		const commits = await fetchCommits();
		
		// 按日期排序，最新的在前
		const sortedCommits = [...commits].sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		
		return new Response(
			JSON.stringify({
				commits: sortedCommits,
				updatedAt: new Date().toISOString()
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache, no-store, must-revalidate",
					"Pragma": "no-cache",
					"Expires": "0"
				}
			}
		);
	} catch (error) {
		console.error("API: 获取 commit 数据失败:", error);
		
		return new Response(
			JSON.stringify({
				error: "获取提交记录失败",
				message: error instanceof Error ? error.message : "未知错误"
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}
};
