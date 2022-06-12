---
title: dietpi系统使用小记
slug: dietpi系统使用小记
status: publish
date: '2017-09-02T00:00:00.000Z'
date_updated: '2021-07-28T07:58:10.419Z'
layout: post
categories:
  - 折腾记录
tags:
  - Dietpi
---
> dietpi 系统作为树莓派，香橙派等开发板的系统，有着许多优点，但也有缺点，今天就我来为大家评测下，由于装载 dietpi 的 orange pi pc2 没有电源线（因为我的电源线用在 lite 上了）所以没截图，之后我会补图的，见谅。

dietpi 系统十分轻量化，基于广受好评的 armbian 构建工具构建的系统，进行优化，dietpi 有其特殊的应用商店和一系列工具使安装配置环境或软件非常简单，十分懒的人可以选择入手 dietpi 系统。

## 优点

系统开启速度比 armbian 快许多，DietPi 针对最小的 CPU 和 RAM 资源使用进行高度优化，确保开发板能始终运行在最好的情况。DietPi 程序使用轻量级 Whiptail 菜单。你会花更少的时间盯着命令行，更多的时间享受 DietPi。

### dietpi-software

这里我用 dietpi 的一大原因，能快速，轻松地安装“准备运行”并针对您的系统进行优化的流行软件。像 OMV NAS 环境，Wemim 环境，LAMP，LEMP，Nextcloud，Wordpress 等都可以快速搭建。

### dietpi-backup

快速备份系统，防止配置错误后的折腾，省去用电脑读取 img 镜像的时间。

## 缺点

其中最强大也是最危险的缺点莫过于开机有几率丢失 Dietpi 文件夹，这个文件夹丢失可以说是对 dietpi 的一个重大打击，丢失后所有从 dietpi-software 安装的软件都无法运行，因为这些软件启动是通过 dietpi 文件夹里的一个脚本启动的，我两度遇上这个问题，一旦开机电流不够遇上这个问题的几率就非常大，修复方法我没试过，遇上这个问题的可以试试。方法如下

> 注:没有备份系统的以下方法无用。
>
> 由于 Dietpi 文件夹丢失 dietpi-backup 就启动不了所以抓取 dietpi-backup 脚本
>
> wget https://raw.githubusercontent.com/Fourdee/DietPi/master/dietpi/dietpi-backup -O /root/dietpi-backup
> chmod +x /root/dietpi-backup
>
> 运行脚本，进行恢复
>
> /root/dietpi-backup
>
> 以上方法不一定能成功

\===2018-05-31 更新===

Dietpi 系统已不在提供 OrangePi 的完整镜像，需要从 Armbian 构建，通过 Dietpi 官方脚本构建，目前尚未测试，预计在 7 月会测试。

\===2018-06-08 更新===

我的 Orange Pi PC2 已摔，所以测试是不存在的了。
