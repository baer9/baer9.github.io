---
title: Win10无限刷新
comments: true
tags:
  - Win10
  - 默认应用
  - html
  - 注册表
  - 无限刷新
cover_picture: ./images/th.jpg
abbrlink: 685c7446
date: 2019-12-16 19:58:15
---

 QHQ-【问题描述】

​	 怎么样修复Win10系统 ，win10在选择默认应用就是更改不了，重置也没有反应，打开一个包含html文件的文件夹，桌面就无限刷新

<!-- more -->

------

# win10无限刷新

>  我在使用电脑的时候，忽然发现我打开一个文件夹，桌面在无限刷新，于是就检查一下，发现是包含.html的文件夹都会造成这个无限刷新的bug。于是寻找解决办法。有以下两种：

## **方法一：利用文件检查工具修复** 

右击开始图标（电脑左下角的小图标），出现下面界面，点击**管理员**的**Windows powerShell**：

![12.16.10](https://tva2.sinaimg.cn/large/006WrmUrly1g9ytsannp9j30ai0la759.jpg)

然后输入*sfc /scannow* ，回车运行。

![12.16.11](https://tvax2.sinaimg.cn/large/006WrmUrly1g9ytvwza4oj30e007k0t4.jpg)

## 方法二：即设置注册页来设置回到原始设置。

先**Win+R** 打开运行界面，输入**regedit**，确定运行。

![12.16.1](https://tva3.sinaimg.cn/large/006WrmUrly1g9ytjya8pkj30e907kmxj.jpg)

接着按着箭头所指一步步走。

![12.16.2](https://tvax1.sinaimg.cn/large/006WrmUrly1g9ytkdn24rj30fe08cwet.jpg)

![12.16.3](https://tva3.sinaimg.cn/large/006WrmUrly1g9ytknn600j30a809haaf.jpg)

![12.16.4](https://tva4.sinaimg.cn/large/006WrmUrly1g9ytkuy2yoj30ez0ir753.jpg)

![12.16.5](https://tvax4.sinaimg.cn/large/006WrmUrly1g9ytl18kv8j30fe0akabi.jpg)

![12.16.6](https://tva1.sinaimg.cn/large/006WrmUrly1g9ytl9pn6dj30fe0933zh.jpg)

![12.16.7](https://tvax1.sinaimg.cn/large/006WrmUrly1g9ytlfdl9bj30fe0huta0.jpg)

都是左击，然后确定。

![12.16.8](https://tvax2.sinaimg.cn/large/006WrmUrly1g9ytlld36qj30fe0hs76t.jpg)

选择**完全控制**，然后点击**确定**。

![12.16.9](https://tva2.sinaimg.cn/large/006WrmUrly1g9ytlr4idbj30fe0a3q3f.jpg)

之后就是确定，确定。。。（可能会反应一下，看自己电脑反应速度，我的是反应了两秒就好了），然后**重启**，即可。

------

## 补充：

如果第二点还没有反应，可以从**控制面板**→**程序**→**默认程序**→**设置默认程序**，自己再调整一下默认应用，也可以根据**文件后缀名**调整默认打开程序。

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.css">

<script src="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@1.1.0/dist/Meting.min.js"></script>
<div class="aplayer" data-id="515376752" data-server="netease" data-type="playlist" data-mode="random" data-autoplay="true"></div>
