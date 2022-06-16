---
title: "【转载补充】48个实用的HTML特效代码！！！（推荐初学者使用）"
date: 2020-11-20 16:48:21
draft: flase
tag:
  - Js
  - HTML
categories:
  - Javaweb
---

1.忽视右键

```
<body>
　 或
<body style="overflow-y:hidden">
```
2.加入背景音乐
```
　 IE:<bgsound src="*.mid" loop=infinite>
　 NS:<embed src="*.mid" autostart=true hidden=true loop=true>
　 </embed>
　 *.mid你的背景音乐的midi格式文件
```
3.简单的window.open方法
```
　 <a href="#">文字或图片</a>
　 参数解释：
　 <SCRIPT LANGUAGE="javascript"> js脚本开始；
　 window.open 弹出新窗口的命令；
　 文件路径/文件名 弹出窗口的文件名；
　 newwindow 弹出窗口的名字（不是文件名），非必须，可用空代替；
　 width=400 窗口宽度；
　 height=300 窗口高度；
　 top=0 窗口距离屏幕上方的象素值；
　 left=0 窗口距离屏幕左侧的象素值；
　 toolbar=no 是否显示工具栏，yes为显示；
　 menubar，scrollbars 表示菜单栏和滚动栏。
　 resizable=no 是否允许改变窗口大小，yes为允许；
　 location=no 是否显示地址栏，yes为允许；
　 status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
　 </SCRIPT> js脚本结束
```
4.简单的页面加密
```
　 <script LANGUAGE="javascript">
　 <!--
　 function loopy(){
　　 var sWord ="";
　　 while(sWord!="login"){sWord=prompt("请输入你的登陆密码");}
　　 alert("登陆成功！");
　 }
　 loopy()
　 //-->
　 </script>
```
5.拉动页面时背景图不动
```
　 <style>
　 body{background-image:url(logo.gif);
　 background-repeat:no-repeat;background-position:center}
　 </style>
```
6.让浏览器在保存页面时保存失败
```
　 <NOSCRIPT><iframe src="*.html"></iframe></NOSCRIPT>
```
7.随机替换图片
```
　 <script>
　 document.write(<img src="img/+parseInt(Math.random()*(5))
　 +.gif"height="40" width="50">
　 </script>
　 图片文件名为0.gif 1.gif 2.gif 3.gif 4.gif
```
8.窗口定时关闭
```
　 先将如下代码网页文件的区：
　 <script language="javascript">
　 function closeit() { setTimeout("self.close()",10000) //毫秒 }
　 </script>
　 然后再在<body>标内加入如：<body>
```
9.网页自动关闭
```
　 <html>
　 <head>
　 <object id=closes type="application/x-oleobject"
　 classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11">
　 <param name="Command" value="Close">
　 </object>
　 </head>
　 <body>
　 这个窗口会在10秒过后自动关闭,而且不会出现提示.
　 </body>
　 </html>
```
10.网页自动刷新
```
　 在head部记入
　 <META HTTP-EQUIV="Refresh" content="20">
　 其中20为20秒后自动刷新，你可以更改为任意值。
```
11.网页自动转页
```
　 <META HTTP-EQUIV="Refresh" CONTENT="时间(秒);URL=地址">
```
12.保持layer在最前面，而不被Iframe、Object所覆盖
```
　 在Layer中再插Iframe 或 Object 设z-Index值
　 <div z-Index:2><object xxx></object> ＃ 前面
　 <div z-Index:1><object xxx></object> ＃ 后面
　 <div id="Layer2" style="position:absolute; top:40;width:400px;
　 height:95px;z-index:2"> height=100% width=100%>
　 <iframe width=0 height=0></iframe>
　 </div>
　 <div id="Layer1" style="position:absolute; top:50;width:200px;
　 height:115px;z-index:1">
　 <iframe height=100% width=100%></iframe>
　 </div>
```
13.返回上一页
```
　 <a href=javascript:history.back(1)>『返回上一页』</a>
```
14.关闭窗口
```
　 <a href=javascript:self.close()>『关闭窗口』</a>
```
15.关于iframe的透明背景
```
　 <IFRAME ID="iFrame1" SRC="iframe.htm"
　 allowTransparency="true"
　 style="background-color: green"></IFRAME>
```
16.彻底屏蔽鼠标右键
```
oncontextmenu="window.event.returnValue=false" 将彻底屏蔽鼠标右键
<table border oncontextmenu=return(false)><td>no</table> 可用于Table
```
17.取消选取、防止复制
```
 <body onselectstart="return false"> 
```
18.不准粘贴
```
onpaste="return false"
```
19. 防止复制
```
oncopy="return false;"
```
20. IE地址栏前换成自己的图标
```
<link rel="Shortcut Icon" href="favicon.ico">
```
21. 可以在收藏夹中显示出你的图标
```
<link rel="Bookmark" href="favicon.ico">
```
22. 关闭输入法
```
<input style="ime-mode:disabled">
```
23. 永远都会带着框架
```
<script language="JavaScript"><!--
if (window == top)top.location.href = "frames.htm"; //frames.htm为框架网页
// --></script>
```
24. 防止被人frame
```
<SCRIPT LANGUAGE=JAVASCRIPT><!--
if (top.location != self.location)top.location=self.location;
// --></SCRIPT>
```
25. 网页将不能被另存为
```
<noscript><iframe src=*.html></iframe></noscript>
```
26. 查看网页源代码
```
<input type=button value=查看网页源代码view-source:"+ "http://www.pconline.com.cn"">
```
27.删除时确认
```
<a href="javascript:if(confirm("确实要删除吗?"))location="boos.asp? &areyou=删除&page=1"">删除</a>
```
28.屏蔽功能键Shift,Alt,Ctrl
```
<script>
function look(){
if(event.shiftKey)
alert("禁止按Shift键!"); //可以换成ALT　CTRL
}
document.onkeydown=look;
</script>
```
29. 网页不会被缓存
```
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
或者<META HTTP-EQUIV="expires" CONTENT="0">
```
30.怎样让表单没有凹凸感？
```
<input type=text style="border:1 solid #000000">
或 <input type=text style="border-left:none; border-right:none; border -top:none; border-bottom: 1 solid #000000"></textarea>
```
31.不要滚动条?
```
让竖条没有:
<body style="overflow:scroll;overflow-y:hidden">
</body>
让横条没有:
<body style="overflow:scroll;overflow-x:hidden">
</body>
两个都去掉？更简单了
<body scroll="no">
</body>
```
32.怎样去掉图片链接点击后，图片周围的虚线？
```
<a href="#"><img src="logo.jpg" border=0></a>
```
33.电子邮件处理提交表单
```
<form name="form1" method="post" action="mailt****@***.com" enctype="text/plain">
<input type=submit>
</form>
```
34.在打开的子窗口刷新父窗口的代码里如何写？
```
window.opener.location.reload()

35.如何设定打开页面的大小
```
<body οnlοad="top.resizeTo(300,200);">
打开页面的位置<body οnlοad="top.moveBy(300,200);">
```
36.在页面中如何加入不是满铺的背景图片,拉动页面时背景图不动
```
<STYLE>
body
{background-image:url(logo.gif); background-repeat:no-repeat;
background-position:center;background-attachment: fixed}
</STYLE>
```
37. 检查一段字符串是否全由数字组成
```
<script language="Javascript"><!--
function checkNum(str){return str.match(//D/)==null}
alert(checkNum("1232142141"))
alert(checkNum("123214214a1"))
// --></script>
```
38. 获得一个窗口的大小
```
document.body.clientWidth; document.body.clientHeight
```
39. 怎么判断是否是字符

```
if (/[^/x00-/xff]/g.test(s)) alert("含有汉字");
else alert("全是字符");
```
40.TEXTAREA自适应文字行数的多少
```
<textarea rows=1 name=s1 cols=27>
</textarea>
```
41. 日期减去天数等于第二个日期
```
<script language=Javascript>
function cc(dd,dadd)
{
//可以加上错误处理
var a = new Date(dd)
a = a.valueOf()
a = a - dadd * 24 * 60 * 60 * 1000
a = new Date(a)
alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日")
} cc("12/23/2002",2)
</script>
```
42. 选择了哪一个Radio
```
<HTML><script language="vbscript">
function checkme()
for each ob in radio1
if ob.checked then window.alert ob.value
next
end function
</script><BODY>
<INPUT name="radio1" type="radio" value="style" checked>Style
<INPUT name="radio1" type="radio" value="barcode">Barcode
<INPUT type="button" value="check">
</BODY></HTML>
```
43.脚本永不出错
```
<SCRIPT LANGUAGE="JavaScript">
<!-- Hide function killErrors(){return true;} window.onerror = killErrors; // -->
</SCRIPT>
```
44.ENTER键可以让光标移到下一个输入框
```
    <script type="text/javascript">
      function focusNextInput(thisInput){
          var inputs = document.getElementsByTagName("input");
          for(var i = 0;i<inputs.length;i++){
            // 如果是最后一个，则焦点回到第一个
            if(i==(inputs.length-1)){
              inputs[0].focus();
              break;
            }else if(thisInput == inputs[i]){
              inputs[i+1].focus();
              break;
            }
          }
      }  
    </script>

```
45. 检测某个网站的链接速度：
```
把如下代码加入<body>区域中:
<script language=Javascript>
tim=1
setInterval("tim++",100)
b=1
var autourl=new Array()
autourl[1]="www.njcatv.net"
autourl[2]="javacool.3322.net"
autourl[3]="www.sina.com.cn"
autourl[4]="www.nuaa.edu.cn"
autourl[5]="www.cctv.com"
function butt(){
document.write("<form name=autof>")
for(var i=1;i<autourl.length;i++)
document.write("<input type=text name=txt"+i+" size=10 value=测试中

……> =》<input type=text
name=url"+i+" size=40> =》<input type=button value=GO

onclick=window.open(this.form.url"+i+".value)><br>")
document.write("<input type=submit value=刷新></form>")
}
butt()
function auto(url){
document.forms[0]["url"+b].value=url
if(tim>200)
{document.forms[0]["txt"+b].value="链接超时"}
else
{document.forms[0]["txt"+b].value="时间"+tim/10+"秒"} b++ }
function run(){for(var i=1;i<autourl.length;i++)document.write("<img src=http://"+autourl+"/"+Math.random()+" width=1 height=1 nerror=auto("http://"+autourl+"")>")}
run()</script>
```
46. 各种样式的光标
```
move ：移动标
auto：是系统自动的效果
hand：是大家所熟悉的手型。
crosshair：是十字型，就是小乌龟首页所用的样式。
text：是平时鼠标移动到文本上的样式。
wait：是等待的效果。
no-drop ：不可拖动光标
not-allowed ：无效光标
all-scroll ：三角方向标
default：是默认的那种效果。
help：是带问号的鼠标样式。
e-resize：是向右的箭头。
ne-resize：是向右上方的箭头。
n-resize：是向上的箭头。
nw-resize：是向左上方的箭头。
w-resize：是向左的箭关。
sw-resize：是向左下的箭头。
s-resize：是向下的箭头。
se-resize：是向右下方的箭头。
vertical-text ：水平I形光标
```
47、禁止鼠标右键，把Demo的图片全都设为表格的背景，表格的大小与图片的大小一样。这样做看起来是一样的，主要是防止鼠标经过图片时会出现另存的按钮。禁止鼠标右键的代码很简单：
```
<script LANGUAGE="JavaScript">
function click() { if (event.button==2)
{alert(呵呵，不好意思，你甭想使用右键下载图片：）); } } document.onmousedown=click
</script>
```
48、在网页的Head部分加入如下代码，这段代码的主要功能是屏蔽PrintScreen键，不断清空剪贴版，防止图片被用文件——另存为菜单另存。
```
<script language="javascript">
<!--
function testclip(){
try {
if(clipboardData.getData("Text")||clipboardData.getData("HTML")||clipboardData.getData("URL"))
{
null;
}
}
catch(e){
clipboardData.setData("Text","")
}
setTimeout("testclip()",500)
}
testclip();
//-->
</script>
```


[转载地址](https://www.cnblogs.com/qiuh/archive/2013/04/23/3038338.html)
```