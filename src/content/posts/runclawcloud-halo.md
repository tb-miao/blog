---
title: 用clawcloud-run免费部署halo博客
published: 2025-10-19
pinned: false
description: "用clawcloud-run免费部署halo博客"
image: ""
tags: ["clawcloud-run","halo"]
category: 笔记
draft: false
---

# 简介
ClawCloud Run 是一个集成在线开发、测试和生产环境的云开发平台。只需单击几下，即可设置开发环境和数据库依赖项，从而显著降低复杂性。
> 目前注册可获赠5$，注册方式只支持 GitHub、Google
## 获得每月5$条件
- 首次注册赠送5$：有效期一个月
- 每个月赠送5$：注册账号后一个月内绑定 GitHub 账户，同时要求绑定的 GitHub 账户注册时间超过 180 天

:::tip
建议直接使用  *GitHub* 注册，免去绑定的步骤，当然也可以用其他邮箱注册再绑定 github
:::

## 计划
For every newly registered user, ClawCloud Run will offer a benefit of $5. The validity period of this complimentary amount is one month. If you bind your GitHub account within one month after registration, you will receive an additional $5 every month thereafter, and the validity period of this subsequent gift is also one month. 对于每一个新注册的用户，ClawCloud Run 将提供 5 美元的优惠。此赠品的有效期为一个月。如果您在注册后一个月内绑定 GitHub 账户，则此后每个月都会额外获得 5 美元，而这份后续礼物的有效期也是一个月。

To prevent resource wastage, ClawCloud Run reserves the right to manage resource allocation for users of the free plan. 为防止资源浪费，ClawCloud Run 保留为免费计划的用户管理资源分配的权利。

# Halo
> Halo 是一款开源的建站工具，专注于博客，同时也适合构建个人网站。它以其简洁、易用和强大的自定义能力而著称。
官网：https://www.halo.run/
## 部署
进入 claw 控制台，点击 `App Launchpad`，点击 `Create App`

容器信息如下：

Application Nmae：`halo` Image Name:

任选其一
```
halohub/halo:2.21.3
```
```
registry.fit2cloud.com/halo/halo:2.21.3
```

以下参数大小最大化利用，作为参考，根据自己情况调整
`Usage`：Fixed，`0.5C 1G` `Network`：`8090`，启用网络访问，设置自定义域名

`Environment Variables`：
```
JVM_OPTS=-Xmx900m -Xms256m
```

`Local Storage`：

`Capacity`：`6`
`Mount Path`：
```
/root/.halo2
```

### 总费用：

31 天：`0.16$/day*31day=4.96$`
确认无误，点击 `Deploy Application`部署即可

## 参考：
https://blog.seektao.cc/p/250412200248/#halo
