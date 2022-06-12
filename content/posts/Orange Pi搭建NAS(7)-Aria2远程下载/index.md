---
title: Orange Pi搭建NAS(7)-Aria2远程下载
slug: orange-pi搭建nas7-aria2远程下载
status: publish
date: '2017-07-22T16:00:49.000Z'
date_updated: '2021-07-28T07:57:44.328Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
Aria2 是一个轻量级命令行下载工具，支持 HTTP / HTTPS，FTP，SFTP，BitTorrent 和 Metalink 下载，但是不支持 ed2k，支持 JSON-RPC 和 XML-RPC 调用，可以远程控制。

## 一、安装 Aria2

安装命令

apt-get install aria2

创建 aria2 配置文件 “/home/用户名/.aria2/aria2.conf” 和 “/home/用户名/.aria2/aria2.session”这个文件。

mkdir /home/用户名/.aria2

touch /home/用户名/.aria2/aria2.session

nano /home/用户名/.aria2/aria2.conf

配置文件内容如下

\# 基本配置

# 下载目录

dir=/home/用户名/nas-data/aria2

# 下载从这个文件中找到的 urls, 需自己建立这个文件

# touch /home/用户名/.aria2/aria2.session

input-file=/home/用户名/.aria2/aria2.session

# 最大同时下载任务数，默认 5

#max-concurrent-downloads=5

# 断点续传，只适用于 HTTP(S)/FTP

continue=true

# HTTP/FTP 配置

# 关闭连接如果下载速度等于或低于这个值，默认 0

#lowest-speed-limit=0

# 对于每个下载在同一个服务器上的连接数，默认 1

max-connection-per-server=5

# 每个文件最小分片大小，例如文件 20M，设置 size 为 10M, 则用 2 个连接下载，默认 20M

#min-split-size=10M

# 下载一个文件的连接数，默认 5

#split=5

# BT 特殊配置

# 启用本地节点查找，默认 false

bt-enable-lpd=true

# 指定最大文件数对于每个 bt 下载，默认 100

#bt-max-open-files=100

# 单种子最大连接数，默认 55

#bt-max-peers=55

# 设置最低的加密级别，可选全连接加密 arc4，默认是头加密 plain

#bt-min-crypto-level=plain

# 总是使用 obfuscation handshake，防迅雷必备，默认 false

bt-require-crypto=true

# 如果下载的是种子文件则自动解析并下载，默认 true

#follow-torrent=true

# 为 BT 下载设置 TCP 端口号，确保开放这些端口，默认 6881-6999

listen-port=65298

#Set UDP listening port used by DHT(IPv4, IPv6) and UDP tracker

dht-listen-port=65298

# 整体上传速度限制，0 表示不限制，默认 0

#max-overall-upload-limit=0

# 每个下载上传速度限制，默认 0

#max-upload-limit=0

# 种子分享率大于 1, 则停止做种，默认 1.0

#seed-ratio=1

# 做种时间大于 2 小时，则停止做种

seed-time=120

# RPC 配置

# 开启 JSON-RPC/XML-RPC 服务，默认 false

enable-rpc=true

# 允许所有来源，web 界面跨域权限需要，默认 false

rpc-allow-origin-all=true

# 允许外部访问，默认 false

rpc-listen-all=true

# rpc 端口，默认 6800

rpc-listen-port=6800

# 设置最大的 JSON-RPC/XML-RPC 请求大小，默认 2M

#rpc-max-request-size=2M

# rpc 密码，可不设置

#rpc-passwd=raspberry

# rpc 用户名，可不设置

#rpc-user=aria2pi

# 高级配置

# This is useful if you have to use broken DNS and

# want to avoid terribly slow AAAA record lookup.

# 默认 false

disable-ipv6=true

# 指定文件分配方法，预分配能有效降低文件碎片，提高磁盘性能，缺点是预分配时间稍长

# 如果使用新的文件系统，例如 ext4 (with extents support), btrfs, xfs or NTFS(MinGW build only), falloc 是最好的选择

# 如果设置为 none，那么不预先分配文件空间，默认 prealloc

file-allocation=falloc

# 整体下载速度限制，默认 0

#max-overall-download-limit=0

# 每个下载下载速度限制，默认 0

#max-download-limit=0

# 保存错误或者未完成的下载到这个文件

# 和基本配置中的 input-file 一起使用，那么重启后仍可继续下载

save-session=/home/pi/.aria2/aria2.session

# 每 5 分钟自动保存错误或未完成的下载，如果为 0, 只有 aria2 正常退出才回保存，默认 0

save-session-interval=300

# 若要用于 PT 下载，需另外的配置，这里没写

RPC 调用加入验证（外网调用最好加上验证），可以使用 token 验证

\# token 验证

rpc-secret=secret

运行 aria2, 测试配置是否有错误，如果没有提示任何错误信息，那就按 Ctrl+C 停止。

aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all -c

如果执行上述命令正常后加-D 参数让其正常工作。

aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all -c -D

## 二、安装 Aria2 网页端

### 安装配置 LAMP

为了方便使用网页端，以及后续的 nextcloud 需要安装 Apache+MySQL+PHP

安装 Apache

sudo apt-get install apache2

安装 mysql

sudo apt-get install mysql-server
安装 php5

sudo apt-get install php5

sudo apt-get install php5-mysql

注:Ubuntu 内核的只有 php7.0

### AriaNg 的安装

下载源码包，直接丢进 lamp 的目录即/var/www/html 中即可

https://github.com/mayswind/AriaNg/releases
