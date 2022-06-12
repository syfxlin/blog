---
title: Orange Pi搭建NAS(3)-系统安装
slug: orange-pi搭建nas3-系统安装
status: publish
date: '2017-07-13T00:00:00.000Z'
date_updated: '2021-07-28T07:56:34.731Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
##### 安装操作系统

Orange Pi 支持的系统很多，可以从[官方下载](http://www.orangepi.cn/downloadresourcescn/)也可以下载其他的系统

##### OrangePi one 系统

> 推荐 armbian [链接](https://www.armbian.com/orange-pi-one/)
>
> 本教程以 armbian 系统为例

下载 Armbian 操作系统，下载完成后解压缩得到镜像文件(.img)，然后我们需要一个工具把镜像文件烧录到 SD 卡上， 我知道有两款工具，Win32DiskImager，USB Image Tool，另外这两款工具还可以备份整个 SD 卡为一个镜像文件。下面以 Win32DiskImager 为例说明如何烧录

> 1. 把 micro SD card 插入读卡器中，连接上电脑. 等电脑识别后会分配一个盘符(例如 G:)
> 2. 下载 [Win32DiskImager](http://sourceforge.net/projects/win32diskimager/)安装
> 3. 下载[SD Formatter](https://www.sdcard.org/downloads/formatter_4/) 安装
> 4. 安装完成后以系统管理员权限运行
> 5. 选择之前解压缩得到的镜像文件，选择 SD 卡所在盘符
> 6. 点击 Write 按钮开始写入镜像文件，然后就是等待，完成后会弹出提示框
>
> 注:Armbian 的 boot 文件夹在 windows 不可见

### 登录 SSH

把 micro SD card 插入 Orange Pi，插上网线，连到路由器，然后上电。由于我们没有键盘和显示器，所以需要用 SSH 登录，默认登陆用户名/密码：root / 1234。 但是不知道 IP 地址怎么办？其实我们可以从路由器设置里面得到 IP 地址。下面以 TP-LINK 为例，其他路由器类似。 进入路由器设置—>DHCP 服务器—>客户端列表，就可以得到 OPi 的 IP 地址。

接下来用 SSH 客户端(Puty, SecureCRT, XShell 等) 登录

### 系统配置

Armbian 开机会提示你输入账户和密码输入后会提示更改密码，更改密码先输入原始 1234 密码，后输入自己设置的密码(输入两遍)，之后提示创建一个非 root 账户，按提示来就行。

##### 接下来就是更新源

sudo apt-get update
sudo apt-get upgrade
注：如果你想用 mt7601 又不想编译驱动请不要输入第二行代码

##### 汉化

更新完成输入

apt-get install ttf-wqy-microhei

命令来获取字体包并安装

安装完毕输入

aptitude install locales
dpkg-reconfigure locales

命令来设置系统的字体，跳出一个文字选择界面，上下翻页、空格键选择以下编码

en_US.UTF-8
zh_CN.GBK
zh_CN.GB2312
zh_CN.UTF-8

然后回车确认将默认字体设置为 zh_CN.UTF-8

编辑 locale 文件，输入

nano /etc/default/locale

进入编辑界面，把里面写着 en_US.UTF-8 的全部改为 zh_CN.UTF-8 了

然后保存重启就汉化完成了。

##### 网卡配置

Armbian 采用网络管理器，有 GUI，输入 nmtui 即可开启网络管理器的 GUI 界面

\-----至此系统已简单安装完毕
