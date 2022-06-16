---
title: "Bat批量修改文件名"
date: 2020-12-14 16:56:32
draft: false
tag:
  - win10
  - bat
categories:
  - bat
---

# 1、新建文本文档
>写入<code> dir*.*/b >file.csv </code> 保存并更改为bat文件。
# 2、打开 **file.csv** 表格
>复制第一列文件名到第二列，选择第二列全部内容，<code>CTRL+F</code>替换想换的内容，在这是直接去除字符。
>![image](//tvax4.sinaimg.cn/large/006WrmUrly1glnghwrp6zj30xp0da785.jpg)

>如只想要其中的英文、汉字或数字可以移步第五步。
# 3、写入公式
> 用公式生成重命名的批处理命令
> ="ren "&A2&" "&B2
> 在存放文件的文件夹内新建一个记事本，将批处理命令粘贴到记事本，保存。
> 将后缀名txt修改为bat，双击
> 注意：ren后面有一个空格，不要漏掉
> 如果文件名中有空格，需要在公式中的文件名前后再加上一对半角引号，例如：
> ="ren """&A2&""" """&B2&"""" **可以选择直接使用这个！**
> ![image](//tvax3.sinaimg.cn/large/006WrmUrly1glngmwwqr3j30xr05odgl.jpg)
> 然后拖动公式应用整列，制作成下面的表格：
> ![image](//tvax2.sinaimg.cn/large/006WrmUrly1glngocjotmj30zw0fqq6c.jpg)

# 4、新建bat文件，一键完成
>复制第三列全面内容，与第一步相同，只需把第一步内容变更为复制内容即可。
>![image](//tvax1.sinaimg.cn/large/006WrmUrly1glngrna3m8j30ra0etqiy.jpg)

# 5、除去其中的数字
>做完以上的步骤，感觉文件名中还存有数字看着也不是很舒服，所有就多加一步除去其中的数字，因为文件名中的数字是随机的，所有就不能用查找替换了，但Excel里有一个<code>CTRL+E</code> 快速填充。
>在第三列插入一列，以方便提取第二列的关键字。然后输入英文、汉字或数字其中一种，再用<code>CTRL+E</code> 快速填充这一列。
>图片来源请[点击](http://www.ittribalwo.com/article/4159.html)
>![12](//tvax3.sinaimg.cn/large/006WrmUrly1glni369x91g30gm0e844c.gif)
>然后转入第三步。

# 另一种方法
>选择除去特定字符串，一步搞定
```
@echo off
Setlocal Enabledelayedexpansion
set "str=需要除去的特定字符串"
for /f "delims=" %%i in ('dir /b *.*') do (
set "var=%%i" & ren "%%i" "!var:%str%=!")
```
如：除去所有文件名中含有704的字符串(去除汉字和英文也OK!)
![image](//tva1.sinaimg.cn/large/006WrmUrly1glnhplh7e7j30a603k3yf.jpg)