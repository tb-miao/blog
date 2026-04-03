---
title: 入站指引
published: 2026-01-14
description: "入站指引，日志在这里。"
image: "https://t.alcy.cc/pc"
tags: ["入站指引"]
category: 入站指引
draft: false
pinned: true
updated: 2026-04-03
---
# 更新记录

<style>
  #commit-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    max-width: 800px;
    margin: 0 auto;
  }
  
  #commit-container section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  #commit-container h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.25rem;
    border-bottom: 2px solid #007bff;
    padding-bottom: 0.5rem;
  }
  
  #commit-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  #commit-container li {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    flex-direction: column;
  }
  
  #commit-container li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .commit-date {
    display: block;
    font-size: 0.9rem;
    color: #007bff;
    margin-bottom: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .commit-message {
    line-height: 1.5;
    max-width: 100%;
    background-color: white;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #007bff;
  }
  
  .commit-message a {
    color: #333;
    text-decoration: none;
    display: block;
  }
  
  .commit-message a:hover {
    color: #007bff;
  }
  
  .commit-message p {
    margin: 0 0 0.5rem 0;
  }
  
  .commit-message p:last-child {
    margin-bottom: 0;
  }
</style>

<script type="module">
  // 引入 marked 库
  import { marked } from 'https://cdn.jsdelivr.net/npm/marked@16.4.2/lib/marked.esm.js';

  // 自动从 GitHub 拉取三个仓库的提交记录，并按仓库分组展示
  const repos = [
    { owner: 'tb-miao', repo: 'blog', name: '本站' },
    { owner: 'tb-miao', repo: 'Upbot-page', name: 'AUNyaの网站监控' },
  ];

  async function fetchCommits() {
    const container = document.getElementById('commit-container');
    if (!container) return;
    container.innerHTML = '正在加载...';

    // 清空容器，准备按仓库分组
    container.innerHTML = '';

    // 计算三个月前的日期
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    for (const r of repos) {
      const section = document.createElement('section');
      section.innerHTML = `<h2 id="${r.repo}"># ${r.name}</h2><ul id="list-${r.repo}">加载中…</ul>`;
      container.appendChild(section);

      try {
        const res = await fetch(`https://api.github.com/repos/${r.owner}/${r.repo}/commits?per_page=20`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('返回非数组');

        const listEl = document.getElementById(`list-${r.repo}`);
        listEl.innerHTML = '';

        // 过滤条件：1. 不超过三个月前 2. 只取最近10条
        const filteredCommits = data.filter(c => {
          if (!c.commit || !c.commit.author) return false;
          const commitDate = new Date(c.commit.author.date);
          return commitDate >= threeMonthsAgo;
        }).slice(0, 10);

        // 仅展示符合条件的提交
        filteredCommits.forEach(c => {
          if (!c.html_url) return;
          const li = document.createElement('li');
          // 只显示 commit message 的前 200 个字符，超过则截断并添加省略号
          const truncatedMessage = c.commit.message.length > 200 ? c.commit.message.substring(0, 200) + '...' : c.commit.message;
          const messageHtml = marked(truncatedMessage);
          li.innerHTML = `<span class="commit-date">${new Date(c.commit.author.date).toLocaleString('zh-CN')}</span>
                            <div class="commit-message"><a href="${c.html_url}" target="_blank">${messageHtml}</a></div>`;
          listEl.appendChild(li);
        });

        if (!filteredCommits.length && listEl) listEl.innerHTML = '暂无三个月内的提交记录';
      } catch (e) {
        console.error(`获取 ${r.name} 提交失败`, e);
        const errorEl = document.getElementById(`list-${r.repo}`);
        if (errorEl) errorEl.innerHTML = '加载失败';
      }
    }
  }

  // 页面可见时刷新
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) fetchCommits();
  });

  // 首次加载
  fetchCommits();
</script>
<div id="commit-container">加载中…</div>