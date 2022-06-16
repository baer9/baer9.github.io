---
title: "【转载】Malloc Free与New Delete"
date: 2020-10-19 13:53:21
draft: false
tag:
  - C++
  - 函数
categories:
  - 算法
---

在C语言中，我们已经熟悉利用malloc/free来管理动态内存，而在C++中，我们又有了新的工具：new/delete。你不禁会产生疑问—有了malloc/free为什么还要new/delete 呢？使用malloc/free和使用new/delete又有什么区别呢？首先来分析一下下面的代码片段：
```
class Object {
	public:
	Object() {
		cout << "Hello, I was born." << endl;
	}
	~Object() {
		cout << "Bye, I am died." << endl;
	}
	void Hello() {
		cout << "I am Object."<<endl;
	}
}
;
int main() {
	cout << " Using Malloc & Free... "<<endl;
	Object* pObjectA = (Object*)malloc(sizeof(Object));
	pObjectA->Hello();
	free pObjectA;
	cout << " Using New & Delete... "<<endl;
	Object* pObjectB = new Object;
	pObjectB->Hello();
	delete pObjectB;
	return 0;
}
```
代码运行的结果为：
```
UsingMalloc & Free...
I am Object.
Using New & Delete...
Hello, I was born.
I am Object. 
Bye, I am died.
```
通过结果我们可以得知：new/delete在管理内存的同时调用了构造和析构函数；而malloc/free仅仅实现了内存分配与释放。接下来，我们进行详细讨论。
malloc/free是C/C++语言的标准库函数，而new/delete是C++的运算符。它们都可用于申请动态内存和释放内存。由于malloc/free是库函数，所以需要对应的头文件库函数支持。对于非内置数据类型的对象，用malloc/free无法满足创建动态对象的要求。这是因为对象在创建的同时要自动执行构造函数，对象在消亡之前则要自动执行析构函数。由于malloc/free不是运算符，不受编译器的控制管辖，所以不能够把执行构造函数和析构函数的任务强加于malloc/free上。而new/delete就不同了，它们是保留字，是操作符，它们和“+”、“-”、“*”、“/”有着一样的地位。new不仅能完成动态内存分配，还能完成初始化工作，稳妥地构造对象；delete不仅
能完成内存的释放，还能进行对象的清理。举个形象的例子：通过new建造出来的是一栋房子，可以直接居住；而通过malloc申请到的仅仅是一块地皮，要想成为房子，还需要做出另外的努力。
malloc的语法是：
指针名=（数据类型）malloc（长度）; //（数据类型）表示指针
new的语法是:
指针名= new 类型(参数); // 单个对象
指针名= new 类型[个数]; // 对象数组
malloc函数返回的是void 类型，如果写成：ClassA p = malloc (sizeof(ClassA));，程序则无法通过编译，会抛出这样的错误信息：“不能将 void* 赋值给 ClassA * 类型变量”。所以必须通过 (ClassA ) 来进行强制转型。相较而言，new则不存在强制转型的问题，而且书写更为简单。总结起来，malloc与new之间的区别主要有以下几点：new是C++运算符，而malloc则是C标准库函数。通过new创建的东西是具有类型的，而malloc函数返回的则是void，需要进行强制
转型。new可以自动调用对象的构造函数，而malloc不会。new失败时会调用new_handler处理函数，而malloc失败则直接返回NULL。
free与delete之间的区别则只有以下两点：
delete是C++运算符，free是C标准库函数。
delete可以自动调用对象的析构函数，而malloc不会。
针对内置类型而言，因为没有对象的构造与析构，所以malloc/free除了需要强制转型之外，和new/delete所做的工作无异，用哪一个只是涉及个人喜好而已。
```
//declaring native type
int* i1 = new int;
delete i1;
int* i2 = (int*) malloc(sizeof(int));
free(i2);
//declaring native type array
char* c1 = new char[10];
delete[] c1;
char* c2 = (char*) malloc(sizeof(char)*10);
free(c2);
```
既然提到了malloc/free，不能不提一下realloc。使用realloc函数可以重新设置内存块的大小，而在C++中没有类似于realloc这样的替代品。如果出现上述需求，所做的就是，释放原来的内存，再重新申请。既然new/delete的功能不仅赶上而且超越了malloc/free，那为什么C++标准中没有把malloc/free淘汰出局呢？这是因为C++要遵守“对C兼容”的承诺，要让一些有价值的包含malloc/free函数库的C程序在C++中得到重用。所以，在C++中，new/delete和malloc/
free一直并存着。不过，将malloc/free和new/delete混合使用绝对不是什么好主意。Remember that, to new is C++; to malloc is C; and to mix them is sin. 如果用free来释放通过new创建的动态对象，或者用delete释放通过malloc申请的动态内存，其结果都是未定义的。换句话说，不能保证它会出现什么问题。如果程序在关键时刻就因为这个在重要客户面前出现问题，那么懊悔恐怕已经来不及了。
请记住：
（1） 不要企图用malloc/free 来完成动态对象的内存管理，应该用new/delete。
（2）请记住：new是C++的，而malloc是c的。如果混淆了它们，那将是件蠢事。所以new/delete必须配对使用，malloc/free也一样。