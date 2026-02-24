---
title: 入站指引
published: 2026-01-14
description: "入站指引，日志在这里。"
image: "https://t.alcy.cc/pc"
tags: ["入站指引"]
category: 入站指引
draft: false
pinned: true
---
## 更新记录

<script>
  // 自动从 GitHub 拉取三个仓库的提交记录，并按仓库分组展示
  const repos = [
    { owner: 'tb-miao', repo: 'blog', name: '该博客' },
    { owner: 'tb-miao', repo: 'status', name: 'AUNyaの网站监控' },
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

        // 过滤条件：1. 不超过三个月前 2. 只取最近5条
        const filteredCommits = data.filter(c => {
          if (!c.commit || !c.commit.author) return false;
          const commitDate = new Date(c.commit.author.date);
          return commitDate >= threeMonthsAgo;
        }).slice(0, 5);

        // 仅展示符合条件的提交
        filteredCommits.forEach(c => {
          if (!c.html_url) return;
          const li = document.createElement('li');
          li.innerHTML = `${new Date(c.commit.author.date).toLocaleString('zh-CN')}<br/>
                            <a href="${c.html_url}" target="_blank">${c.commit.message.split('\n')[0]}</a>`;
          listEl.appendChild(li);
        });

        if (!filteredCommits.length) listEl.innerHTML = '暂无三个月内的提交记录';
      } catch (e) {
        console.error(`获取 ${r.name} 提交失败`, e);
        document.getElementById(`list-${r.repo}`).innerHTML = '加载失败';
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

This message is used to verify that this feed (feedId:249017486179431424) belongs to me (userId:249015934064153600). Join me in enjoying the next generation information browser https://folo.is.