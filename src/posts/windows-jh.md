---
title: 一行命令永久激活Windows/Office
cover: /assets/images/windows-jh/2.webp
icon: pen-to-square
date: 2024-11-24 09:51:58
category:
  - 教程
tag:
  - 教程
star: true
sticky: true
---
## ==一行命令永久激活Win11,Win10，Office, 无需找激活码，无需下载安装；目前看到最最简单，安全，可靠的激活方法，开源免费，一直有效==
分享一个开源的 Windows 和 Office 激活脚本，使用很简单，目前已知的最简单方法。

该激活脚本目前已在 GitHub 上拥有 96K 点赞，安全可靠，无需下载软件，无需去找序列号，直接在控制台输入一条命令即可激活 Windows 10/11，Office。
## ==如何使用？==
## 1. Windows

### 联网情况下，以管理员模式启动PowerShell
点击开始，搜索栏搜索“Powershell", 点击以管理员身份运行
<img :src="$withBase('/assets/images/windows-jh/1.jpg')" alt="2">

### 复制以下命令到Powershell窗口, 回车

``` yaml
irm https://get.activated.win | iex
```

<img :src="$withBase('/assets/images/windows-jh/2.webp')" alt="2">

## 按1，数字许可证激活，HWID方式，永久激活Windows

## ==命令详解：==
::: details 请展开我
```yaml
[1] HWID       # 数字许可证永久激活Windows，需要联网
[2] Ohook      # 通过修改一个激活dll,实现离线永久激活Office
[3] KMS38      # KMS方式离线激活Windows/Server 漏洞激活到2038年
[4] Online KMS # KMS方式激活Windows/Server/Office 一次180天，到期自动续，需要联网

界面翻译：
     Activation Methods:

 [1] HWID        |  Windows           |   Permanent 永久
 [2] Ohook       |  Office            |   Permanent 永久
 [3] KMS38       |  Windows           |   Year 2038 到2038年
 [4] Online KMS  |  Windows / Office  |    180 Days 180天
 __________________________________________________

 [5] Check Activation Status 检查激活状态
 [6] Change Windows Edition 改Windows版本
 [7] Change Office Edition 改Office版本
 __________________________________________________

 [8] Troubleshoot 疑难排解
 [9] Extras 附加选项
 [H] Help 帮助
 [0] Exit 退出
 ______________________________________________________

      用键盘输入选择项，方括号中为可选项 [1,2,3,4,5,6,7,8,9,H,0] :
```
:::

### ==看到 Successful关闭窗口即可。==

<img :src="$withBase('/assets/images/windows-jh/3.jpg')" alt="2">

## 1.4 ==问题解决==
绝大多数情况以上方式就可以成功，对于不能成功的，尝试选3【KM38】方式
记得关闭防病毒
## 2. ==Office激活==


<img :src="$withBase('/assets/images/windows-jh/4.webp')" alt="2">

选择2，离线永久激活

如果不成功，选择4，这种方式每180天会再次自动激活。无需额外操作。
## 3. ==项目开源地址：==
Github开源地址(96K赞2024-9月18日)：

[https://github.com/massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)
