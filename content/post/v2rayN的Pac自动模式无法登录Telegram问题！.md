---
title: "V2rayN的Pac自动模式无法登录Telegram问题！"
date: 2020-09-05 18:46:53
draft: false
tag:
  - v2rayN
  - Telegram
  - Win10
  - Pc
categories:
  - v2rayN
---

> 前言：本来全局模式无任何影响，但考虑到有时对国内网站的不友好，所以就换为Pac自动给模式了，但是Tg登录就出了问题。

小圆圈一直在转⬇
![image](//tva4.sinaimg.cn/large/006WrmUrgy1goew1xaj0yj30lq0i9t8w.jpg)

#### 解决方法:
- Settings→Advanced→Connection type→use custom proxy;
- hostname: 127.0.0.1 port:10808
- Save→Close