---
title: "Java web 的form表单问题"
comments: true
cover_picture: ./images/th.jpg
abbrlink: 2ffe5c2d
date: 2019-12-19 16:29:36
---
 QHQ-【问题描述】今天做Java web项目的时候，里面一个功能让我form表单里面套表单了，但是里面的form 提交action中参数无效。直接action外层form，所以就记录下form表单的一些问题。
<!-- more -->

---

# Form表单提交数据（Java web）

java web 两个表单form怎么设置两个提交？也可以是一表单form，多提交。Acton只能有一个submit提交，在设置一个submit还是action外层form。

所以怎么来用两个submit来指向不同的响应呢？

## 一、使用formmethod和formaction属性

在使用<input></input>里面使用type="submit" formmethod="get" formaction=""即可。具体如下：

```java
<form action="query.do" method="post" align="center">
		<table border="1" align="center" text-align:center">
			<tr>
				<td><%=book.getBookName()%></td>
				<td><%=book.getPrice()%></td>
				<td><%=book.getAuthor()%></td>
				<td><%=book.getBr()%></td>
				<td><%=book.getCounts()%></td>
				<td>
					<form action="edit.do?Id=<%=book.getId()%>" method="get">
						<input type="text" id="counts" name="counts"width:50px" >
						<input type="hidden" id="Id" name="Id" value="<%=book.getId()%>"
							style="width: 0px"> <input type="submit"
							formmethod="get" formaction="edit.do?Id=<%=book.getId()%>"
							value="修改">//调用edit方法，方式为get，（也可以修改为post，看自己需要）
					</form>
					<tr>
				<td colspan="7"><input type="submit" value="查询" /></td>//调用qurry方法，方式为GET
			</tr>
		</table>
	</form>
```

## 二、设置不同函数，使用onclick属性

### 1、表单中设置两个提交按钮：加密、解密；点击后分别调用不同的方法

```java
<s:form id="Form" action="" namespace="/">
  <button onclick="encrypt()">加密<button>
  <button onclick="decrypt()">解密</button>
<s:form>
```

### 2、在不同的函数中设置要提交的地址

```html
<script>
//点击加密按钮调用此方法
function encrypt(){
  //跳转到encrypt.aciton
  document.getElementById("Form")
 .action="${pageContext.request.contextPath}/enAndDeAction_encrypt.action?";
  document.getElementById("Form").submit;
 }
  //点击加密按钮调用此方法
function decrypt(){
document.getElementById("Form")
.action="${pageContext.request.contextPath}/enAndDeAction_decrypt.action?";
document.getElementById("Form").submit;
 }
</script>
```

## 三、Form的Action路径问题

> 页面通过表单（form）想服务器提交数据的时候有两种形式，一个是POST,另一个是GET。两种的一个区别是GET会直接把数据附加在url的后面，而POST发送的数据放置在http包中。form的action属性就是提交数据的url地址，method属性可以指定是GET或POST。
>

> 需要注意的是如果采用GET方式，那么action url中参数都会被丢弃，提交时候只会把form中的数据拼接在url向服务器提交；但是POST的方式则不会这样，它会按照action指定的url进行提交数据，包含url后面跟着的参数和参数值
>

我遇到的是Form表单提交到servelet处理时遇到的问题： 

```java
（1）<form action="①？" method="②？"> 
      //表单的内容 
     </form>
```

（2）对应的处理用户请求的servlet类为Servlet.java，其中查询方法如下：

```java
private void query(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO 自动生成的方法存根
		req.setCharacterEncoding("UTF-8");// 解决POST方法的中文乱码问题
		t = req.getParameter("counts");
		// 1.调用CustomerDAO的getAll()方法
		List<User> books = bd.findAll();
		System.out.println(books);
		// 2.将Customer的集合放入request中
		req.setAttribute("books", books);
		// 3.转发页面到index.jsp(不能使用重定向)
		req.getRequestDispatcher("/book.jsp").forward(req, resp);
	}
```


（3）配置web.xml文件：	

```html
<servlet>
		<display-name>③Servlet</display-name>
		<servlet-name>Servlet</servlet-name>
		<servlet-class>com.qhq.servlet.Servlet</servlet-class>
</servlet>
<servlet-mapping>
	<servlet-name>③Servlet</servlet-name>
	<url-pattern>①*.do</url-pattern>
</servlet-mapping>
```

然后在query.jsp中应该是：

```java
<form action="①query.do" method="②Post">
```



这样的话query.jsp的url是http://localhost:8080/jsp/query.do

而Servlet.java的url是http://localhost:8080/jsp/Servlet

注:web.xml中③对应的两个servlet-name要一致；①中的url-pattern要与form表单中的action属性值一致。

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.css">

<script src="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@1.1.0/dist/Meting.min.js"></script>
<div class="aplayer" data-id="32957955" data-server="netease" data-type="song" data-mode="random" data-autoplay="true"></div>



参考连接如下：

[参考1](https://www.jb51.net/article/67279.htm)

[参考2](https://blog.csdn.net/qq_40774600/article/details/88888215)