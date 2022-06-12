---
title: Orange Pi搭建NAS(4)-存储设备
slug: orange-pi搭建nas3-存储设备
status: publish
date: '2017-07-16T00:00:00.000Z'
date_updated: '2021-07-28T07:57:18.303Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
准备一块硬盘，以及一个移动硬盘盒（支持 2.5/3.5 寸的硬盘，以及外接供电）把硬盘分区，并格式化为 ext4 格式，这样性能更好，寿命应该更长(待考证)。

由于 OPi 的 USB 口供电能力有限，所以移动硬盘需要外部供电，所以根据上面的分析对于想外接移动硬盘的人来说，有以下两种解决方案：

1. 用带电源的 USB 集线器，USB 集线器接上电源，然后连接上 RPi 的 USB 口，移动电源接到 USB 集线器上。如此一来就可以连接多个移动硬盘，比如接两个移动硬盘，其中一个用来做数据备份。
2. 使用易驱线，这个只能用一个硬盘，但是不再需要移动硬盘盒。

注：不建议直接用 OPi 为硬盘供电

由于我暂时没有硬盘。所以我用 U 盘进行测试，如果是移动硬盘建议格式化为 ext4，U 盘因为存储空间小建议格式化为 FAT32 这样各种设备都可读取，但由于只支持 4G 以下的文件，所以如果 U 盘只是用来作为 NAS 存储盘建议也格式化为 ext4，由于我 U 盘有其他用途，我就不格式化为 ext4。但建议大家可以弄个专用的移动硬盘，然后格式化为 ext4 格式，这样好折腾。

## 教程开始

关机，断电，插上 USB 移动硬盘和 U 盘，上电启动。然后登录 SSH，查看磁盘信息， sudo fdisk –l，如果没有问题的话，会显示以下字符

> … …
>
> Disk /dev/sda: 62.9 GB, 62914560000 bytes
>
> … …
>
> Device Boot Start End Blocks Id System
>
> /dev/sda1 2048 122879999 61438976 83 Linux

可以看到，/dev/sda 为 64G U 盘，只有一个分区/dev/sda1

成功识别到硬盘后，可以查询文件系统类型、LABEL、UUID 等信息

sudo blkid

Armbian 应该不支持 exFAT，需要安装 exfat-fuse

sudo apt-get install exfat-fuse -y

再就是设置自动挂载，需要编辑/etc/fstab，先备份

sudo cp /etc/fstab /etc/fstab.orig
sudo vim /etc/fstab

在文件最后加上下面几行内容

/dev/sda1 /home/你第一次开机设置的非 root 账户名/nas-data

如果出现中文乱码，需要加参数 utf8=1，保存，最后重启。关于/etc/fstab，可以参考https://wiki.archlinux.org/index.php/Fstab

创建挂载目录

mkdir /home/用户名/nas-data

重启

sudo reboot

重新登录 SSH，查看挂载信息

sudo mount -l

会显示

……
/dev/sda1 on /home/用户名/nas-data type ext4 (……)

表示全部挂载成功

> 本文参考:http://www.mkitby.com/2015/11/05/raspberry-pi-nas-storage-device/
