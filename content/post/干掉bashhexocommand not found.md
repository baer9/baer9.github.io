---
title: "Hexo 博客回顾"
abbrlink: c1993ac1
date: 2019-11-25 12:12:21
comments: true
---


## 好久没动过 Hexo 博客了，都是在用halo博客,今天准备一起更新的时候输入 hexo new linving新建时，报错 bash: hexo: command not found，忽然不知道咋回事了,就想到前不断时间重置电脑了,可能一些配置都没有了,就检查一下,并完美解决了!

> 若是git也没有的,请先下载git,可以选择这个链接下载git(Git-2.26.0-64-bit)和node(node-v12.16.1-x64).

> https://www.lanzous.com/b00zckh7c
> 密码:7r7z

### 一、检查node和npm是否正常.不正常就先下载,若正常直接跳转第四步.

![image](https://tva1.sinaimg.cn/large/006WrmUrly1gd8ke2kqmoj30kp0chmxu.jpg)

### 二、选择node下载.

> 推荐https://nodejs.org/en/download/官网直接下载.

> 也可以选择上面的打包下载(git和node).下载和傻瓜式安装就可,安装完成时环境配置也一起好了.

> 我们可以看到环境变量中已经包含了E:\node\

![image](https://tvax3.sinaimg.cn/large/006WrmUrly1gd8mfypdx6j30ii0by0tg.jpg)

### 三、检查Node.js和npm版本

​	安装完node需重新打开git.下面是我重新打开后,想直接建立新文件,但是没有成功,但是node和npm都OK.

![image](https://tva3.sinaimg.cn/large/006WrmUrly1gd8lrxkm6tj30kp0chaal.jpg)

发现虽然有了版本信息又证明 nodejs 和 npm 是没有问题的，但还是没有建立成功,那么就应该是环境变量的配置问题了.



### 四、配置环境变量

【CTRL】+【E】打开文件资源管理器,在左侧栏中选择【此电脑】右键【属性】，依次选择【高级系统设置】-【环境变量】，选择系统变量 Path，将 `node_modules` 下的 `.bin` 文件路径添加到 Path 里面.

![image](https://tvax1.sinaimg.cn/large/006WrmUrly1gd8m3r3vxcj31co0po7ja.jpg)

环境变量添加好了之后重新打开 git 即可运行 hexo 命令 即可！

![image](https://tvax2.sinaimg.cn/large/006WrmUrly1gd8lvg32ckj30kp0chdg8.jpg)

### 五、如以上都不行,请卸载hexo重新安装.

运行命令 `npm install hexo-cli -g` 重新安装 hexo ！