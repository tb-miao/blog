---
title: 入站指引
published: 2026-01-14
description: "入站指引，日志在这里。"
image: "https://t.alcy.cc/pc"
tags: ["入站指引"]
category: 入站指引
draft: true
pinned: true
updated: 2026-04-03
---
# 最近一周提交记录

<div id="github-commits-list">加载中...</div>



<script>
    async function loadWeeklyCommits() {
        try {
            const container = document.getElementById('github-commits-list');
            
            const response = await fetch('https://api.github.com/repos/tb-miao/blog/commits?per_page=30');
            
            if (!response.ok) {
                throw new Error('获取提交信息失败');
            }
            
            const commits = await response.json();
            
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            
            const weeklyCommits = commits.filter(commit => {
                const commitDate = new Date(commit.commit.author.date);
                return commitDate >= oneWeekAgo;
            });
            
            if (weeklyCommits.length === 0) {
                container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 24px; background: var(--card-bg); border-radius: 4px; border: 1px solid var(--line-color);">最近一周暂无提交记录</p>';
                return;
            }
            
            const commitsList = weeklyCommits.map(commit => {
                const sha = commit.sha.slice(0, 7);
                const message = commit.commit.message;
                const author = commit.commit.author.name;
                const date = new Date(commit.commit.author.date);
                const dateStr = date.toLocaleString("zh-CN", {
                    timeZone: "Asia/Shanghai",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                });
                const commitUrl = commit.html_url;
                
                return `
                    <div style="margin-bottom: 16px; padding: 12px; border-left: 3px solid var(--primary); background: var(--card-bg); border-radius: 4px; box-shadow: 0 1px 3px rgba(124, 247, 252, 1);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            ## 📔版本：<a href="${commitUrl}" target="_blank" style="color: var(--primary); font-weight: bold; text-decoration: none;">
                                ${sha}
                            </a>
                            ⏰日期：<span style="color: var(--text-secondary); font-size: 0.85em;">${dateStr} (UTC+8)</span>
                        </div>
                        <div style="margin-bottom: 6px; color: var(--text-primary); white-space: pre-wrap; word-break: break-word;">${message}</div>
                        <div style="color: var(--text-secondary); font-size: 0.85em;">
                            by <a href="https://github.com/tb-miao" target="_blank" style="color: var(--primary); text-decoration: none; font-weight: 500;">${author}</a>
                        </div>
                    </div>
                `;
            }).join('');
            
            container.innerHTML = commitsList;
            
        } catch (error) {
            console.error('获取提交信息失败:', error);
            const container = document.getElementById('github-commits-list');
            if (container) {
                container.innerHTML = '<p style="color: var(--text-primary); text-align: center; padding: 24px; background: var(--card-bg); border-radius: 4px; border: 1px solid var(--line-color);">加载失败，请稍后重试</p>';
            }
        }
    }
    
    function initWeeklyCommits() {
        if (window.location.pathname === '/posts/siteindex/') {
            loadWeeklyCommits();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWeeklyCommits);
    } else {
        initWeeklyCommits();
    }
    
    if (window.swup) {
        window.swup.hooks.on('page:view', initWeeklyCommits);
    } else {
        document.addEventListener('swup:enable', () => {
            window.swup.hooks.on('page:view', initWeeklyCommits);
        });
    }
</script>
