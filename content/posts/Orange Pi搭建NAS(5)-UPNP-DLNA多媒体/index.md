---
title: Orange Pi搭建NAS(5)-UPNP/DLNA多媒体
slug: orange-pi搭建nas5-upnpdlna多媒体
status: publish
date: '2017-07-16T00:00:00.000Z'
date_updated: '2021-07-28T07:56:50.868Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
### 安装 miniDLNA

sudo apt-get install miniDLNA

上面安装的 miniDLNA 默认是不支持 rmvb 格式的视频，所以我们最好自己下载源代码，只需要做很少改动就可以支持 rmvb，然后编译安装。

编译安装比较麻烦，我也没成功，想支持 rmvb，参考

> http://www.mkitby.com/2015/11/09/raspberry-pi-nas-upnp-dlna/

先备份然后编辑配置文件

sudo cp /etc/minidlna.conf /etc/minidlna.conf.orig
sudo vim /etc/minidlna.conf

修改如下设置

media_dir=/home/用户名/nas-data/DLNA
db_dir=/home/用户名/nas-data/DLNA/db
log_dir=/home/用户名/nas-data/DLNA/log
friendly_name=OPi DLNA

创建文件夹

mkdir /home/用户名/nas-data/DLNA
mkdir /home/用户名/nas-data/DLNA/{Music,Pictures,Videos,db,log}

最后重启 miniDLNA 服务

sudo service minidlna restart

打开计算机网络，可以看到 OPi DLNA 媒体设备

### 解决 mp3 中文乱码

用 Windows Media Player(后面用 WMP 替代)查看 minidlna 多媒体服务器文件，有些中文文件名显示乱码，有些就正常。目前 Linux 中流行的很多播放器经常不能正确显示如歌曲名、专辑名等 MP3 tag 信息，经过有些工具转换后，标签又不能被 Windows 识别。MP3 的歌曲名、艺术家、专辑名等信息都以一定的编码格式存储在 MP3 标签中。简单地说，乱码出现的原因就是播放器未能准确识别出 MP3 标签的中文编码格式。

具体的说，现在 MP3 文件的标签主要有几种标准：ID3v1、ID3v2（现在常见的又分为 2.3 和 2.4）、APEv2。可以从两个角度解决这个问题。一是转换已有 MP3 文件的标签编码，二是使用支持 GBK 编码的播放软件,这种方案我没试过。

mp3tagiconv 是一款可用于解决 MP3 乱码问题的软件。它可以自动探测 MP3 标签的编码，并以合理的方式重新写入，经过其处理的编码可被 Linux、Windows（包括 Windows Media Player）和各种移动设备正确识别。

mp3tagiconv 需要 mutagen 的支持，确保之前已经安装。

sudo apt-get install python-mutagen
git clone https://github.com/cxcxcxcx/mp3tagiconv.git

以上就是 miniDLNA 的安装
