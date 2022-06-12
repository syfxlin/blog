---
title: Orange Pi搭建NAS(6)-文件共享
slug: orange-pi搭建nas6-文件共享
status: publish
date: '2017-07-17T00:00:00.000Z'
date_updated: '2021-07-28T07:57:33.112Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
为了方便访问树莓派的存储设备，有必要为其添加文件共享，下面为给出三种文件访问方法：samba，ftp。我不太推荐 samba 虽然它在电脑上不需要客户端但对于小白来说配置 samba 就是个噩梦，下文我也会给出 samba 的安装方法。

## FTP

安装 vsftp，开源的轻量级的常用 ftp 服务器

sudo apt-get install vsftpd

先备份，然后编辑配置文件

sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
sudo nano /etc/vsftpd.conf

vsftp 的配置文件，它允许你设置所有类型的限制和策略，目前没有深入研究，修改如下

\# 不允许匿名访问
anonymous_enable=NO

# 设定可以进行写操作

write_enable=YES

# 设定本地用户可以访问

local_enable=YES

为了 root 账户也能访问 FTP 需要修改/etc/ftpusers

sudo nano /etc/ftpusers

把 root 那行注释掉

......

#root

......

重启 vsftpd

sudo service vsftpd restart

通过 ftp 连接树莓派系统，以用户名登录，密码是用户的密码。ftp 的根目录是/home/用户名，即用户的 HOME 目录，可上传或下载文件了。

## Samba

安装 samba 所需软件

sudo apt-get install samba samba-common-bin

先备份，然后编辑/etc/samba/smb.conf 文件

sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak

sudo nano /etc/samba/smb.conf

创建 shares 文件夹

mkdir /home/用户名/nas-data/DLNA/shares

需要修改添加的内容如下，

\[global\]
security = user
encrypt passwords = true
guest account = nobody
map to guest = bad user

#======================= Share Definitions =======================

\[share\]
comment = Guest access shares
path = /home/用户名/nas-data/shares
browseable = yes
writable = yes
#read only = yes
guest ok = yes
public = yes

\[NAS-Data\]
comment = Nas data folder
path = /home/用户名/nas-data/
browseable = yes
writable = yes
valid users = root 你的用户名

share 共享目录访问不需要密码，而 NAS-Data 访问需要验证，用户为 root 和你的用户名。

最后重启 samba 服务。然后同一局域网的其他设备就可以访问 RPi 的共享目录

sudo service samba restart

Android 可以使用 ES File Explorer，IOS 可以使用 FileExplorer, FileBrowser, Documents 和 Remote File Free，或其他支持访问共享的文件管理器。
