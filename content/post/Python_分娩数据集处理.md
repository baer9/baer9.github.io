---
title: "Python_分娩数据集处理"
date: 2019-01-10T16:29:25+08:00
draft: false
tag:
  - 数据集处理
  - Python
  - 可视化操作
categories:
  - Python
---

# Python分娩数据集处理_2019
---

## 目录

[一、  简介](#_Toc42501022)

[1.1、数据集摘要](#_Toc42501023)

[1.2、资料来源](#_Toc42501024)

[1.2.1、网址:](#_Toc42501025)

[1.2.2、来源机构：](#_Toc42501026)

[1.2.3、分析前资料理解：](#_Toc42501027)

[1.3、分析目标及方法：](#_Toc42501028)

[二、  数据读取](#_Toc42501029)

[2.1、数据读取方法](#_Toc42501030)

[2.2、读取的结果](#_Toc42501031)

[2.3、数据简单概要描述](#_Toc42501032)

[三、  数据预处理](#_Toc42501033)

[3.1、分析数据现状，明确问题](#_Toc42501034)

[3.2、预处理方法及结果](#_Toc42501035)

[3.2.1、数据清洗](#_Toc42501036)

[3.2.2、数据变换](#_Toc42501037)

[四、  用分类模型实现分娩分析](#_Toc42501038)

[4.1、分析目标](#_Toc42501039)

[4.2、分析方法及结果](#_Toc42501040)

[4.2.1、准备工作](#_Toc42501041)

[4.2.2、详细步骤](#_Toc42501042)

[五、  结论与展望](#_Toc42501043)

[5.1、结论及局限性](#_Toc42501044)

[5.2、过程感悟及展望](#_Toc42501045)

 # 一、  简介

## 1.1、数据集摘要

此数据集包含有关 80 名孕妇的剖腹产结果的信息，这些孕妇在医疗领域具有最重要的分娩问题特征：

 

| 名称  （Name）                               | 分娩情况分类数据集数据集  (Caesarian Section Classification Dataset Data  Set) |
| -------------------------------------------- | ------------------------------------------------------------ |
| 特征简介  （Feature introduction）           | 整数（Integer）                                              |
| 记录数（Record number）                      | 80/6（Eighty/Six）                                           |
| 分析目标  （Analysis target）                | 分娩情况（是否剖腹产）与年龄、分娩次数、分娩时间、血压、心脏状况有无准确联系  （Is there any accurate relationship between  delivery and age, delivery times, delivery time, blood pressure and heart  condition） |
| 分析思路及方法（Analysis ideas and methods） | 收集多数信息，分析计算其中是否有准确联系  （Collect most information, analyze and calculate  whether there is an accurate connection） |

 

## 1.2、资料来源

### 1.2.1、网址: 

UCI Machine Learning Repository （加利福尼大学欧文分校的机器学习库）， http://archive.ics.uci.edu/ml/datasets.php（网址）

Caesariaqwn Section Classification Dataset Data Set（分娩情况分类数据集数据集），

http://archive.ics.uci.edu/ml/datasets/Caesarian+Section+Classification+Dataset

### 1.2.2、来源机构：

Name: Muhammad Zain Amin

Email: ZainAmin1@outlook.com

Institution: University of Engineering and Technology, Lahore, Pakistan

机构：巴基斯坦拉合尔工程技术大学

Name: Amir Ali

Email: amirali.ryk1@gmail.com

Institution: University of Engineering and Technology, Lahore, Pakistan

机构：巴基斯坦拉合尔工程技术大学

其中数据集中选择年龄、分娩次数、分娩时间、血压、心脏状况和是否剖腹产为6个属性。我们将分娩时间分类为早产、准时和晚点。就像分娩时间一样，我们考虑血压处于低、正常和高情绪三种状态。心脏问题被归类为正常和无能。

### 1.2.3、分析前资料理解：

通过百度得到理解各个名词意义，理解得到其中是否有客观因素联系，猜测是否有联系，再用以数据分析，得到科学分析证明。

其中百度百科得到各个因素的含义，猜测分娩情况受年龄、分娩次数、分娩时间、血压、心脏状况的影响，所以这五项为因变量，而是否采取了剖腹产则是结果变量。然后来一一分析证明是否猜测正确。

## 1.3、分析目标及方法：

**分析目标：**

每一个变量对分娩情况的影响，寻到最适变量或最适范围及其是成正相关还是负相关。

**方法：**

在建立svm模型后，采用固定其他变量，定一变量在范围中寻找最值及其趋势。

# 二、  数据读取

## 2.1、数据读取方法

  导入xlrd使用open_workbook()函数对本次数据集文件caesarian.xlsx进行读取（本来想的是用Pandas里的read_excel()函数来读取文件，但网上搜集学习的时候，看到这个库包，很感兴趣，而且 Pandas的基本操作已经都会了。所以就学习了一下。）

基础方法(pandas)：

              ![image](//tva3.sinaimg.cn//006WrmUrly1goewk1c167j30dh07h0vc.jpg)               

<p style="text-align:center">图2.1 读取方法</p>

改进的（xlrd）：

*导入*xlrd*库包*

<code>import xlrd</code>

<code>import matplotlib.pyplot as plt</code>

*读取**caesarian.xlsx**文件，**r**代表**read**，其中也有**w**，**write**等*

<code>data = xlrd.open_workbook(r'./data/caesarian.xlsx' )</code>

*选择**xlsx**文件的第一个表单，也可更改为其他表单*

<code>table = data.sheets()[0]</code>

## 2.2、读取的结果

读取的表单数据概况：

*获取第一行所有内容,如果括号中1就是第二行，这点跟列表索引类似*

<code>keys = table.row_values(0)</code>

*获取工作表的有效行数*

<code>rowNum = table.nrows</code>

*获取工作表的有效列数*

<code>colNum = table.ncols</code>

<code>print(keys)</code>

<code>print(rowNum, colNum)</code>

输出结果:

 ![image](//tva2.sinaimg.cn//006WrmUrly1goewjqmgxfj30hr02c0t8.jpg)

<p style="text-align:center">图2.2.1 读取结果</p>

Pandas的语句：
```

import pandas as pd

data = pd.read_excel('./data/caesarian.xlsx')

data.head()

print(data.shape)

print('数据: \n',data.head(15))
```
Pandas的简单输出数据：
![image](//tva4.sinaimg.cn//006WrmUrly1goewjgyjh2j30fe0bbabq.jpg)

<p style="text-align:center">图 2.2.2 读取结果</p>

## 2.3、数据简单概要描述

> 从读取的数据可知，数据文件有八十行六列，有年龄、分娩次数、分娩时间、血压、心脏状况和剖腹产6个属性，而且文档介绍中也说明了年龄在17-40区间，分娩次数在1-4次，分娩时间0表示准时，1表示提前，2表示晚于，血压是0表示低，1是正常，2是高，心脏问题0表示恰当正常的，1表示不正常的，剖腹产0表示没有采用，即顺利分娩，1表示剖腹产了，即非自然分娩。

- @attribute ‘year 年龄’
{ 22,26,28,27,32,36,33,23,20,29,25,37,24,18,30,40,31,19,21,35,17,38 } 

- @attribute 'Delivery number次数' { 1,2,3,4 }

- @attribute 'Delivery time分娩时间' { 准时0,提前的1,晚于的2 }

- @attribute 'Blood of Pressure血压' { 高2,正常1,低0 }

- @attribute 'Heart Problem心脏问题' { 不恰当1,恰当的0 } 

- @attribute Caesarianpa'剖腹产 {不 0, 是1 }

# 三、  数据预处理

## 3.1、分析数据现状，明确问题

  > 读取数据发现数据都是数值化，基本数据操作很方便，下一步检查数据是否有缺失，是否均衡，重复值情况等。

## 3.2、预处理方法及结果

### 3.2.1、数据清洗

#### 3.2.1.1、查看数据的缺失值

**代码：**

*通过describe()方法看数据*

<code>data.describe()</code>

*使用isnull识别缺失值*

<code>print('caesarian每个特征缺失的数目为：\n', data.isnull().sum())</code>

*使用notnull识别非缺失值*

<code>print('caesarian每个特征非缺失的数目为：\n', data.notnull().sum())</code>

- 通过describe()方法看数据，主要关注mean这个，对数据分布有个大体的了解。 然后再看数据样本是否均衡

- 两个print代码是检测数据中是否有某个或某些特征的值是不完整的，即是否有缺失值。使用isnull()识别缺失值，使用notnull()识别非缺失值


| ![image](//tvax4.sinaimg.cn//006WrmUrgy1goewi8vbagj307n05ngm6.jpg) |![image](//tvax3.sinaimg.cn//006WrmUrgy1goewi08qk7j307q05njs1.jpg) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                       图3.2.1 缺失结果                       |                      图3.2.2 非缺失情况                      |


#### 结合isnull及notnull方法，可以从输出结果中看出此数据集中不存在缺失值。且样本较为均衡，差别不大

- 所有数据的数值为79，所以没有缺失值。

#### 3.2.1.2、查看重复值

代码：
```
extra = data[data.duplicated()]

print(extra.shape)
```
结果：

 ![image](//tvax3.sinaimg.cn//006WrmUrgy1goewhemf7uj302800ugle.jpg)

<p style="text-align:center">图3.2.3 重复值结果</p>

代码查看数据重复值。有4个重复值，但先不删除它，因为这些数据是用数值代替的。

### 3.2.2、数据变换

#### 3.2.2.1、设置中文显示

代码：

*#* *中文显示*
```
plt.rcParams['font.sans-serif'] = 'SimHei' 

plt.rcParams['axes.unicode_minus'] = False
```
#### 3.2.2.2、单变量可视化

代码：
```
*每一个变量是一列，获取一列数值保存为数组*

y = table.col_values(0)

*设置刻度的字体大小*

plt.tick_params(labelsize=20)

plt.title('分娩实验年龄分布', fontsize='18')

plt.xlabel('血压情况/人', fontsize='18')

plt.ylabel('年龄', fontsize='18')

*绘制折线图*

plt.plot(range(0, 80), y)

*保存图片，设置dpi和inches使图片清晰完整*

plt.savefig('./img/分娩实验年龄分布.png', dpi=500, bbox_inches='tight')

plt.show()
```

![image](//tvax3.sinaimg.cn//006WrmUrgy1goewgybfhvj30hx0dgjv1.jpg)
<p style="text-align:center">图3.2.4  分娩实验年龄分布</p>

**下面的代码只写出不同的重点之处，其余基本都不在书写。**

代码：
```
y = table.col_values(1) # *读取列的值*

*运用四个小变量来计数*

cout0 = 0
cout1 = 0
cout2 = 0
cout3 = 0

for i in range(0, len(y)):
  if y[i] == 1:
    cout0 = cout0 + 1
  if y[i] == 2:
    cout1 = cout1 + 1
  if y[i] == 3:
    cout2 = cout2 + 1
  if y[i] == 4:
    cout3 = cout3 + 1

y = [cout0, cout1, cout2, cout3]
x = ['1', '2', '3', '4']
*在柱状图上标记具体数量，ha表示水平，va表示竖直*
for x, y in enumerate(y):
  plt.text(x, y + 0.1, '%s' % y, fontsize='16', ha='center', va='bottom')

其中y+0.1是指在y轴的上面距离0.1，可以调高度
```
<img src="//tvax1.sinaimg.cn//006WrmUrgy1goewgfgio8j30h90cxn13.jpg" alt="image">

<p style="text-align:center">图3.2.5 单变量图表实例图</p>






































| <img src="//tva2.sinaimg.cn//006WrmUrgy1goewfrqbsjj30hx0dgjv1.jpg" alt="image" alt="image.png" style="zoom:50%;" /> |![image](//tvax2.sinaimg.cn//006WrmUrgy1goewf34dgvj308i06paa5.jpg)|
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                    图一 分娩实验年龄分布                     |                   图二  分娩次数情况柱状图                   |
| <img src="//tvax3.sinaimg.cn//006WrmUrgy1goewelyj9nj308a06gdfy.jpg" alt="image"> | <img src="//tva3.sinaimg.cn//006WrmUrgy1goewe94qnoj308j06e3yj.jpg" alt="image">|
|                     图三  分娩情况柱状图                     |                     图四  血压情况柱状图                     |
| <img src="//tva1.sinaimg.cn//006WrmUrgy1goewdstcnzj308806674b.jpg" alt="image"> | <img src="//tvax3.sinaimg.cn//006WrmUrgy1goewdchayrj30ai07wwem.jpg" alt="image">|
|                     图五  心脏情况柱状图                     |                    图六  剖腹产情况柱状图                    |






> 六张图分别为图一、分娩实验年龄分布；图二、分娩次数情况柱状图；图三、分娩情况柱状图；图四、血压情况柱状图；图五、心脏情况柱状图；图六、剖腹产情况柱状图。

> 由单一变量可视化操作之后，可清晰的看出这组数据分布情况，可知数据均衡，符合实验数据分析样例，接下来就是使用分类方法来验证这五个因素对分娩到底有没有联系。

# 四、  用分类模型实现分娩分析

## 4.1、分析目标

   我们有五个可以输入的属性，分别为：年龄、分娩次数、分娩时间、血压和心脏状况，输出则是剖腹产属性。通过构建一个SVM模型，再通过预测训练集的结果与真实的结果对比，计算准确率，并多测几组数据，然后得到数据，即可证明分娩情况与年龄、分娩次数、分娩时间、血压和心脏状况是否有联系。

## 4.2、分析方法及结果

### 4.2.1、准备工作

我所获得的数据集来源于UCI Machine Learning Repository网站，我们首先看caesarian.csv文件中6个字符串数据的排序：

年龄、分娩次数、分娩时间、血压情况、心脏情况、是否剖腹产

前5个字段组成输入数据，我们的任务是预测是否剖腹产。

转换为txt文本，名字为caesarian.txt，更容易处理。因为是六个字段所以代码如下：
```
import pandas as pd

data = pd.read_csv('./data/caesarian.csv', encoding='utf-8')

with open('./data/news_data.txt','a+') as f:

  for line in data.values:

    f.write((str(line[0])+','+str(line[1])+','+

       str(line[2])+','+str(line[3])+','+

       str(line[4])+','+str(line[5])+'\n'))
```
txt文件的六列属性：

年龄、分娩次数、时间、血压、心脏和剖腹产

### 4.2.2、详细步骤

#### 1）数据全部加在X

<code>input_file = './data/news_data.txt'</code>

\#读取数据
```
X = []

count = 0

with open(input_file,'r') as f:

  for line in f.readlines():

    data = line[:-1].split(',')

    X.append([data[0]] + data[2:])

X = np.array(X)
```
得到的X数据为：

 ![image](//tvax3.sinaimg.cn//006WrmUrgy1goewceudeuj305k03fwel.jpg)
<p style="text-align:center">图4.2.1  x数据</p>

#### 2）将字符串格式转换成数值格式

为了更好的去读取操作统计，所以要转换为数值格式，方便构建模型。
```
label_encoder = []

X_encoder = np.empty(X.shape)

for i,item in enumerate(X[0]):

  if item.isdigit():

    X_encoder[:,i] = X[:,i]

  else:

    label_encoder.append(preprocessing.LabelEncoder())

    X_encoder[:,i] = label_encoder[-1].fit_transform(X[:,i])

X = X_encoder[:,:-1].astype(int)

y = X_encoder[:,-1].astype(int)
```
得到X和y的值为:


![image](//tva2.sinaimg.cn//006WrmUrgy1goewbuunulj305o04m3yk.jpg)
<p style="text-align:center">图4.2.2 X和y的值</p>

#### 3)svm模型操作
```
params = {'kernel':'rbf','probability':True}

classifier = SVC(**params)

classifier.fit(X,y)

\#交叉验证

from sklearn.model_selection import cross_val_score

这个已经废弃，所以引用上面的进行交叉验证

\#from sklearn import cross_validation

就不需要cross_validation，直接使用cross_val_score（）方法

\#accuracy = cross_validation.cross_val_score(classifier,

\#        X,y,scoring = 'accuracy',cv = 3)

accuracy = cross_val_score(classifier,

        X,y,scoring = 'accuracy',cv = 3)

print("Accuracy of the classifier:" + str(round(100*accuracy.mean(),2))+"%")
```


在这需要说明一下 在用<code>from sklearn import cross_validation</code>时，报错为<code>cannot import name 'cross_validation' from 'sklearn'</code>。


![image](//tva4.sinaimg.cn//006WrmUrgy1goewb6wzoxj30ee030q3m.jpg)
<p style="text-align:center">图4.2.3 报错信息</p>

  查询得知说是新版<code>sklearn</code>中<code>cross_validation</code>被废弃，可是测试了几个网上的解决办法，依然报错。

最后还是深入了解到这个方法后知道，<code>cross_val_score（）</code>方法已经迁移到<code>model_selection</code>，所以可以直接从 <code>sklearn.model_selection</code> 导入<code>cross_val_score（）</code>进行使用。交叉验证换成百分比得到结果：

![image](//tvax2.sinaimg.cn//006WrmUrgy1goewasb79dj30do01y0t4.jpg)

<p style="text-align:center">图4.2.4 SVM训练结果</p>

结果只是73.85%，比预想的要低，但是没有关系，还没有结束。

#### 4）用一个新的数据点测试SVM
```
input_data = ['22', '1','1','1']

input_data=np.array(input_data).reshape(1,-1)

input_data_encoded = [-1] * len(input_data)

\#input_data = flatten(input_data).reshape(1,-1)

count = 0

for i,item in enumerate(input_data):

  if item.isdigit() :

    input_data_encoded[i] = int(input_data[i])

  else:

    input_data_encoded[i]=     int(label_encoder[count].transform(input_data[i]))

    count = count + 1
```
用一个新的数据点来校正数据精度。
```
input_data_encoded = np.array(input_data_encoded)

output_class = classifier.predict(input_data_encoded)

print("Outputclass:",label_encoder[1].inverse_transform(output_class)[0])label_encoder = []）
```
最后得到结果为:


![image](//tva4.sinaimg.cn//006WrmUrgy1goewa9x860j30dn022dgc.jpg)
<p style="text-align:center">图4.2.5 实训结果</p>

#### 5）定四变量，动一变量，寻找最值

> 由下面的属性可知，数据集的年龄范围是17-40，分娩次数取2，分娩时间取0，血压取1，心脏问题取0，来判断是否采用了剖腹产，百分比越大即越符合模型，即最值。年龄从上面的单变量可视化的年龄折线图可知，27岁为平均值。

- @attribute ‘year 年龄’
{ 22,26,28,27,32,36,33,23,20,29,25,37,24,18,30,40,31,19,21,35,17,38 } 

- @attribute 'Delivery number次数' { 1,2,3,4 }

- @attribute 'Delivery time分娩时间' { 准时0,提前的1,晚于的2 }

- @attribute 'Blood of Pressure血压' { 高2,正常1,低0 }

- @attribute 'Heart Problem心脏问题' { 不恰当1,恰当的0 } 

- @attribute Caesarianpa'剖腹产 {不 0, 是1 }

 ![image](//tvax2.sinaimg.cn//006WrmUrgy1goew9uerhij30hv09ft9i.jpg)

<p style="text-align:center">图4.2.6 年龄影响图</p>

> 根据折线图可知，27不仅为平均值，而且还是最值，并且呈现为正太分布，39岁的忽然有一小幅度上升，估计是svm模型有一点不完善，猜测是数据不是很多，所以造成的一点准确，但是基本可知27为最适年龄。

- 然后定年龄为27，分析分娩次数的影响。

 ![image](//tva1.sinaimg.cn//006WrmUrgy1goew9d3hjej30gn0863yx.jpg)

<p style="text-align:center">图4.2.6 分娩次数影响图</p>

- 得到结果为，分娩次数与分娩情况成负相关。


![image](//tvax2.sinaimg.cn//006WrmUrgy1goew8ox551j30gc08hmxp.jpg)
<p style="text-align:center">图4.2.7  分娩时间影响图</p>

-   因为分娩时间的准确度都在50%左右，所以没有很重要的影响分娩情况。即分娩时间不是直接影响因素。


![image](//tva2.sinaimg.cn//006WrmUrgy1goew7o2wn0j30hv087t94.jpg)
<p style="text-align:center">图4.2.8 血压情况图</p>

- 从图可知，血压越正常对分娩情况越好。偏低或偏高对分娩都有负面影响。

<img src="//tvax1.sinaimg.cn//006WrmUrgy1goew5qc5asj30he08cq3h.jpg" alt="image">

<p style="text-align:center">图4.2.9 心脏情况图</p>

- 从图可知，心脏也好对分娩情况也好，成正相关。

# 五、  结论与展望

## 5.1、结论及局限性

  根据上面猜测与实际预测，得到的结果是分娩情况与年龄，分娩次数，分娩时间，血压情况和心脏情况有准确联系，而且年龄在27对分娩情况影响越小，年龄偏大偏小都会对分娩造成或多或少的负面影响，成正态分布；而分娩次数则成负相关，分娩时间没有太直接影响，血压情况正常最好，偏高偏低都会对分娩造成负影响，心脏问题也是正常为好。但是也有局限性，就是具体的那个因素对分娩造成的影响更大还没有得出，这个需要得到更多的数据，然后从损失函数、最小二乘法以及核函数Kernel的方面来进行预测核实。

## 5.2、过程感悟及展望

在刚开始去处理这个数据集的时候没有一点头绪，翻看了很多资料，理解了这个这个数据集的内容和目的之后，脑中思路就很清晰了，然后就开始编写代码。但开始读取文本的简单操作就让我重新查看了书本和网上资料，发现对知识的掌握还是没有自己所想的那么牢固，在数据预处理的时候，因为选取的数据很工整简洁，所以在这个方面操作的很少，只有简单的基本操作，但在可视化操作中对图表的基本绘制还是掌握的不错的，做的过程中又因为一些需求，学习掌握了更多关于这方面的知识，然后就是最好一步也是最重要的一步，对我来说耗时最久，学习知识层面最宽的一个就是数据预测模型学习与应用。书本上的这点很浅，对我的帮助很少，但是处理数据方面的方面不少，可以让我扩宽知识面。在我的编程操作及需求上，最大的障碍就是建立成自己的模型，而不是去读取调用公共模块，从刚开始的修改库函数，到一次次报错，我放弃了，就这一步耗费了一天时间，最后也无疾而终，然后我就想调用函数来构造自己的数据集，最后因为在学习这个过程的期间，遇到了更好的办法，也放弃这个想法，最后采取的方法是转文本，数据清洗，采用svm模型进行回归预测。但是由于数据量不是很多，所以只能预测他们（五个属性）对分娩有影响，没有得到具体的个别属性对其影响的权重关系。所以想以后加强学习对数据分析方面的知识，多了解几个算法函数和预测模型，这些我可以等这个数据多了以后，再来试着分析一次。

> 展望：我想在接下来的一段时间里，多加强数据分析的了解分析，然后在多学习爬虫方面的知识，因为我对爬取数据很感兴趣，所以有可能的话，我应该会试着自己去爬取数据然后自己分析。