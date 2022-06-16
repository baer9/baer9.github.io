---
title: Apache和Nginx简单区分
comments: true
cover_picture: ./images/th.jpg
abbrlink: 4c8dcffc
date: 2020-01-14 18:44:12
---

 QHQ-【问题描述】web服务器该选择apache还是nginx



<!-- more -->

------

***\*一、apache与nginx的区别：\****

​     1、二者最核心的区别在于apache是同步多进程模型，一个连接对应一个进程；nginx是异步的，多个连接（万级别）可以对应一个进程 。nginx处理静态文件好,耗费内存少.但无疑apache仍然是目前的主流,有很多丰富的特性.所以还需要搭配着来.当然如果能确定nginx就适合需求,那么使用nginx会是更经济的方式。



​     2、nginx的负载能力比apache高很多。最新的服务器也改用nginx了。而且nginx改完配置能-t测试一下配置有没 有问题。



​     3、apache重启的时候发现配置出错了，会很崩溃，改的时候都会非常小心翼翼现在看有好多集群站，前端nginx抗并发，后端apache集群， 配合的也不错。



​     4、nginx处理动态请求是鸡肋，一般动态请求要apache去做，nginx只适合静态和反向。



​     5、从经验来看，nginx是很不错的前端服务器，负载性能很好，nginx，用webbench模拟10000个静态文件请求毫不吃力。 apache对php等语言的支持很好，此外apache有强大的支持网络，发展时间相对nginx更久，bug少但是apache有先天不支持多核心处理负载鸡肋的缺点，建议使用nginx做前端，后端用apache。大型网站建议用nginx自代的集群功能。



​    6、大部分情况下nginx都优于APACHE，比如说静态文件处理、PHP-CGI的支持、反向代理功能、前端 Cache、维持连接等等。在Apache+PHP（prefork）模式下，如果PHP处理慢或者前端压力很大的情况下，很容易出现Apache进程数 飙升，从而拒绝服务的现象。



​     7、Apache在处理动态有优势，Nginx并发性比较好，CPU内存占用低，如果rewrite频繁，那还是Apache吧！



​     8、一般来说，需要性能的web 服务，用nginx 。如果不需要性能只求稳定，那就apache 吧。



**二、apache与nginx优缺点比较**

1、nginx相对于apache的优点：

轻量级，同样web 服务，比apache 占用更少的内存及资源 ；
    抗并发，nginx 处理请求是异步非阻塞的，而apache 则是阻塞型的，在高并发下nginx 能保持低资源低消耗高性能 ；
    高度模块化的设计，编写模块相对简单 ；
    社区活跃，各种高性能模块出品迅速啊 ；
    Nginx本身就是一个反向代理服务器 ，Nginx支持7层负载均衡；Nginx可能会比apache支持更高的并发，
    nginx配置文件写的很简洁，正则配置让很多事情变得简单运行效率高，占用资源少，代理功能强大，很适合做前端响应服务器 ！

 2、apache 相对于nginx 的优点：  	

rewrite ，比nginx 的rewrite 强大 ；
    模块超多，基本想到的都可以找到 ；
    少bug ，nginx 的bug 相对较多 ；
    超稳定 ，Aapche依然是大部分公司的首先，因为其成熟的技术和开发社区已经 也是非常不错的性能。

 ***\*三、为什么现在 Nginx 才是 Web 服务器的首选\**** 

作为 Web 服务器：相比 Apache，Nginx 使用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。在高连接并发的情况下，Nginx是Apache服务器不错的替代品: Nginx在美国是做虚拟主机生意的老板们经常选择的软件平台之一. 能够支持高达 50,000 个并发连接数的响应, 感谢Nginx为我们选择了 epoll and kqueue 作为开发模型.
    Nginx作为负载均衡服务器: Nginx 既可以在内部直接支持 Rails 和 PHP 程序对外进行服务, 也可以支持作为 HTTP代理 服务器对外进行服务. Nginx采用C进行编写, 不论是系统资源开销还是CPU使用效率都比 Perlbal 要好很多.

​     作为邮件代理服务器: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器）, Last.fm 描述了成功并且美妙的使用经验.

​    Nginx 是一个安装非常的简单 , 配置文件非常简洁（还能够支持perl语法）, Bugs 非常少的服务器: Nginx 启动特别容易, 并且几乎可以做到7*24不间断运行，即使运行数个月也不需要重新启动. 你还能够不间断服务的情况下进行软件版本的升级 .

​      Nginx 配置简洁, Apache 复杂 ， Nginx 静态处理性能比 Apache 高 3倍以上 ， Apache 对 PHP 支持比较简单，Nginx 需要配合其他后端用，  Apache 的组件比 Nginx 多 。  现在 Nginx 才是 Web 服务器的首选 。

[链接](https://blog.csdn.net/sinat_34222970/article/details/54585684)

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.css">

<script src="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@1.1.0/dist/Meting.min.js"></script>
<div class="aplayer" data-id="26127161" data-server="netease" data-type="song" data-mode="random" data-autoplay="true"></div>

