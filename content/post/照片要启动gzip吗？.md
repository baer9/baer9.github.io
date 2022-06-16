---
title: 照片要启动gzip吗？
comments: true
abbrlink: 3e0fec4e
date: 2020-02-15 20:58:23
---

 QHQ-【问题描述】

图片要启用gzip压缩吗

<!-- more -->

------

今天在细看nginx配置的时候，发现一个httpGzip模块，图片到底需不需要启用[GZip](http://www.webkaka.com/blog/catalog.asp?tags=gzip)压缩？我搜索一下并总结，图片是不需要启用GZip压缩的（我已经启动全站加速及压缩，完全没必要）。今天，我把此问题写作成文，给大家分析一下为什么图片不需要启用GZip压缩。

**图片启用GZip压缩会适得其反**

一些开发者使用HTTP压缩那些已经本地已经压缩过的文件，而这些已经压缩过的文件再次被GZip压缩时，是不能提高性能的，表现在如下两个方面。

首先，HTTP压缩需要成本。Web服务器获得需要的内容，然后压缩它，最后将它发送到客户端。如果内容不能被进一步压缩，你只是在浪费CPU做无意义的任务。

其次，采用HTTP压缩已经被过压缩的东西并不能使它更小。事实上，添加标头，压缩字典，并校验响应体实际上使它变得更大，如下图所示：

![HTTP压缩过程](http://www.webkaka.com/blog/upload/2015/4/201504071807467506.gif)

HTTP压缩过程

你的网站实际上是这样做的吗？是的，它比你想象的更常见。

**PNG图片启用GZip压缩的后果**

下面这张是启用GZip压缩的PNG图片，看看它的标头信息：

![PNG图片启用GZip压缩的后果](http://www.webkaka.com/blog/upload/2015/4/201504071814136340.gif)

PNG图片启用GZip压缩的后果

不仅浪费了CPU，还增大了图片的体积，之前也写过一篇文章详细分析了《[图片GZip压缩后体积变大](http://www.webkaka.com/blog/archives/picture-and-gzip.html)》，这里再看看图片被GZip压缩的后果：

![GZip图片增大了体积](http://www.webkaka.com/blog/upload/2015/4/201504071816024886.gif)

GZip图片增大了体积

用一句话来结论，那就是图片启用GZip压缩，不仅浪费了CPU，还增大了体积，势必影响服务器性能，影响[网站速度](http://www.webkaka.com/)。图片要启用gzip压缩吗？绝对不要！

[参考一](https://blog.csdn.net/yu870646595/article/details/52052392)

