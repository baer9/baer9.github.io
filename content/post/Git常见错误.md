---
title: Git常见错误
date: 2021-03-10T11:19:15+08:00
tag:
  - git
  - Hugo
categories:
  - Git
---

 QHQ-【问题描述】Git————常见错误（error10051、Timed out、some refs to、Empty reply from server http等.)
<!-- more -->

###  一、fatal: unable to access 'https://github.com/baer9/baer9.github.io.git/': OpenSSL SSL_read: Connection was reset, errno 10054 解除ssl验证

- 解决：关闭验证  git config --global http.sslVerify "false"

###  二、fatal: unable to access 'https://github.com/baer9/baer9.github.io.git/': Failed to connect to github.com port 443: Timed out  文件可能太大
- 解决：git config http.postBuffer 524288000

###  三、 ! [rejected]        main -> main (fetch first)error: failed to push some refs to 'https://github.com/baer9/baer9.github.io.git'  远端比本地多文件（可能是多一个README.md文件)
- 解决：git pull --rebase origin main  【注：pull=fetch+merge]

###  四、fatal: unable to access 'https://github.com/baer9/baer9.github.io.git/': Empty reply from server http或者https 通道不稳定
- 解决：git remote set-url origin git@github.com:baer9/baer9.github.io.git
  git remote set-url origin + git@github.com:yourname/yourname.github.io.git 代替

###  五、Git远程仓库地址变更本地如何修改
- 解决:    通过命令直接修改远程地址
  	        进入git根目录
        			git remote 查看所有远程仓库， git remote xxx 查看指定远程仓库地址
        			git remote set-url origin + 要替换的地址

### 六、Git  fatal: not a git repository (or any of the parent directories): .git

- git init

### 七、fatal: refusing to merge unrelated histories

- 解决 git pull origin master --allow-unrelated-histories

### 八、git强制推送命令

- git push -f origin master
- 注释： origin远程仓库名，master分支名，-f为force，意为：强行、强制。
- 这行命令的意思就是强制用本地的代码去覆盖掉远程仓库的代码，敲git push --help可查看官方的解释（英文的）。当然不止这一种操作方式了，但是这种操作是最快(bao)速(li)的，不会有冲突什么的，当然我也有一个忠告：请谨慎使用！请谨慎使用！请谨慎使用！
- 千里之行，始于足下。改变现在，就是改变未来。改变未来，从现在开始。

###  九、如果提示Filename too long，说明文件名或路径太长08129665

- 解决：git config --global core.longpaths true51

---

- 1、首先，你要有一个 Github 账号，然后创建一个仓库，注意：创建仓库的名必须是你 GitHub 的昵称小写再加上.github.io。例如，我的 GitHub 昵称是 baer9因此创建的仓库名必须是 baer9.github.io。下面都基于这个仓库名示例。

- 2、*然后，切换到 myblog 根目录下，输入命令 hugo --baseUrl="https://baer9.github.io/" --buildDrafts，会在 myblog 根目录下生成一个 public 文件夹。

- 3、切换到 public 文件夹下，输入命令 git init，初始化仓库。

- 4、*然后输入 git add .，将所有内容添加到 git。

- 5、*接着输入 git commit -m "第一次提交"，提交到 git 本地。

- 6、再接着，输入 git remote add origin https://github.com/baer9/baer9.github.io.git。关联到远程 git，注意这里需要写你自己的 git 。

- 7、*最后，输入命令 git push -u origin main，将本地仓库代码推送到远程库。

- 8、在浏览器中输入 baer9.github.io，即可访问自己的博客网站，此时别人也能访问了。

