---
title: 看看你的网制作教程
published: 2026-01-28
description: '看看你的网制作教程，源码来自困'
image: ''
tags: ["API"]
category: '教程'
draft: false 
pinned: false
alias: look-you-inst
updated: 2026-01-28
---
# 开始
主页右上角那个就是，也是用api实现的
![](/images/look-you-inst/look-you-inst.png)

# 直接访问网页版
[直接点击这里](https://ip.haokun.me/)可以直接访问，或者你想访问[未经过优选的版本](https://ip.4848488.xyz/)

未优选过看连接来源ip还能看出是否ipv6优先

# 作为API使用
直接`get` `https://ip.haokun.me/?act=get_ip_info` 就行，会返回`json`

所有节点信息和数据中心信息都是指的cf的

示例请求:
```bash
curl "https://ip.haokun.me/?act=get_ip_info"
```

响应示例:
```json
{
  "ip": "0.0.0.0",
  "location": {
    "country": "JP",
    "region": "Tokyo",
    "city": "Tokyo"
  },
  "node": {
    "code": "NRT",
    "name": "东京",
    "iso": "jp"
  },
  "asn": 45102,
  "isp": {
    "name": "Shiodome Sumitomo Blog 1-9-2 TOKYO",
    "raw": "Shiodome Sumitomo Blog 1-9-2 TOKYO"
  },
  "rtt": 50
}
```

| 字段 | 类型 | 描述 |
| :--- | :--- | :--- |
| `ip` | String | 客户端连接到 Cloudflare 的 IP 地址 |
| `location.country` | String | 客户端所属国家/地区代码 |
| `location.region` | String | 客户端所属区域/州/省 |
| `location.city` | String | 客户端所属城市 |
| `node.code` | String | Cloudflare 数据中心三字码 (如 LAX, NRT, HKG) |
| `node.name` | String | 数据中心所在城市中文名 |
| `node.iso` | String | 所在国家/地区 ISO 代码 (用于显示国旗) |
| `asn` | Number | 自治系统号 (ASN) |
| `isp.name` | String | 识别后的 ISP 中文名称 |
| `isp.raw` | String | 原始 ISP 组织名称 |
| `rtt` | Number | 客户端到 Cloudflare 边缘节点的连接往返延迟 (ms)(http/3会返回0且修不了一点) |


# 开源
::github{repo="renleihaokun/cancanneed-network"}