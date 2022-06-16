---
title: Hexo主题的一些踩过的坑
abbrlink: 7cf57d5c
date: 2018-11-25 12:55:21
categories: 
   - hexo
---
## Hexo主题的一些踩过的坑

##### 一、主题选择问题

> 首先你需要在官网[hexo](https://hexo.io/themes/)选择你喜欢的主题。主要下载步骤有：[Hxeo+Github pages](https://www.jianshu.com/p/2afac1bc0af8)。

##### 二、绑定域名问题

> 每一次推送都会把你在setting设置的域名给覆盖，让你每一次都需要重新绑定一些域名，很麻烦。
>
> 所以我就上网搜索与尝试，找到解决方法，首先在你*hexo*根目录找到*source*目录，先新建*.txt*文件，在里面写入你要绑定的域名。再重命名为*CNAME*，删除后缀名。使其没有后缀名，类型为文件。![11.24.1](/images/11.24.1.png)
>
> 然后在*github*的*setting*里设置一次（保险设置一次，不设置也行）。

##### 三、主题内容更改

> 在这只说一些我自己碰到的，基本上一般的坑网上都有详细教程。
>
> ###### 3.1、标题，作者和文字的更换
>
> ​		 基本上在*hexo*的根目录下的*_config.yml*文件就可以更改了。![11.24.2](/images/11.24.2.png)
>
> 注意：冒号后面需要空一格，不然会报错。默认语言为*en*，中文为*zh—CN（有需要可以更改，一般不变）*。
>
> ###### 3.2、js特效的更换添加
>
> ​		  比如我的添加**点击显示文字**的特效：
>
> ​		  以我选择*miho*主题为例，先添加**点击显示文字**的*js*（目录为..\themes\miho\source\js\click_show_text.js**）click_show_text.js**：		
>
> ```
> var a_idx = 0;
> jQuery(document).ready(function($) {
>     $("body").click(function(e) {
>         var a = new Array
>         ("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");//文字自己填写所想要的
>         var $i = $("<span/>").text(a[a_idx]);
>         a_idx = (a_idx + 1) % a.length;
>         var x = e.pageX,
>         y = e.pageY;
>         $i.css({
>             "z-index": 5,
>             "top": y - 20,
>             "left": x,
>             "position": "absolute",
>             "font-weight": "bold",
>             "color": "#FF0000"
>         });
>         $("body").append($i);
>         $i.animate({
>             "top": y - 180,
>             "opacity": 0
>         },
> 			3000,
> 			function() {
> 			    $i.remove();
> 			});
>     });
>     setTimeout('delay()', 2000);
> });
> 
> function delay() {
>     $(".buryit").removeAttr("onclick");
> }
> 
> ```
>
> ​		  然后需要在..\themes\miho\layout\layout.ejs添加语句：
>
> 		 ` <!--单击显示文字-->
>	
>    	<script type="text/javascript" src="/js/click_show_text.js"></script> `
>
> ​		网上可以搜索自己喜欢的类型，步骤一样。

# 未完待续

