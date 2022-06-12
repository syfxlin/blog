---
title: 私有云搭建小记
slug: 私有云搭建小记
status: publish
date: '2017-09-09T00:00:00.000Z'
date_updated: '2021-07-28T15:57:07.190Z'
layout: post
categories:
  - 折腾记录
tags:
  - Aria2
  - Frp
  - NAS
---
> 之前我写了家用 NAS 的搭建教程，但这只是最基本的 NAS，只是拥有远程下载的 ftp 服务器而已，这篇文章会教大家搭建完全的私有云，解决方案为 Nextcloud+Aria2+frp 穿透+远程 ssh

### 如果还没配置好环境的请先照着 OrangePi 搭建 NAS 系列完成环境搭建。

## Nextcloud 搭建

更新

apt update
apt upgrade

安装 LAMP 环境

sudo apt-get install apache2 apache2-utils
sudo apt-get install libapache2-mod-php5 php5 php-pear php5-xcache php5-mysql php5-curl php5-gd
sudo apt-get install mysql-server
sudo apt-get install phpmyadmin

安装 Nextcloud

cd /var/www/html
wget https://download.nextcloud.com/server/releases/nextcloud-12.0.2.zip
unzip nextcloud-12.0.2.zip

浏览器访问 http://ip/nextcloud/ 然后填入相关参数使用 mysql 数据库，等待片刻浏览器会自动跳转，跳转成功后就完成 nextcloud 的安装。

> aria2 请参照 OrangePi 搭建 NAS 进行安装

## frp 内网穿透

> 由于现在的 ISP 基本都是网中网，只是用 DDNS 根本无法正常从外网访问，所以就需要内网穿透，因为 ngrok 搭建相对麻烦所以我选择 frp。

首先你需要一个外网的服务器 SSH 连接上外网主机后，使用 wget 指令下载 frp。

wget https://github.com/fatedier/frp/releases/download/v0.13.0/frp\_0.13.0\_linux\_amd64.tar.gz

使用 tar 指令解压 tar.gz 文件

tar -zxvf frp_0.13.0_linux_amd64.tar.gz

使用 cd 指令进入解压出来的文件夹

cd frp_0.13.0_linux_amd64.tar.gz

外网主机作为服务端，可以删掉不必要的客户端文件，使用 rm 指令删除文件。

rm -f frpc
rm -f frpc.ini

接下来要修改服务器配置文件，即 frps.ini 文件。使用 nano 指令对目标文件进行编辑。

vi frps.ini

打开 frps.ini 后可以看到默认已经有很多详细的配置和示范样例，该文章仅以达到内网穿透为目的，所以这里选择删掉或注释掉里面的所有内容，然后根据使用的情况，按照官方的中文文档添加以下配置。

\[common\]
bind_port = 7000
vhost_http_port = 8080

\[common\]部分是必须有的配置，其中 bind_port 是自己设定的 frp 服务端端口，vhost_http_port 是自己设定的 http 访问端口。 保存上面的配置后，使用以下指令启动 frp 服务端。（如果需要在后台运行，请往下翻阅关于后台运行的部分。）

./frps -c ./frps.ini

服务端的工作就到此结束了。 客户端 客户端前面的操作和服务端是一模一样的，这里不一一解释。

wget https://github.com/fatedier/frp/releases/download/v0.13.0/frp\_0.13.0\_linux\_386.tar.gz
tar -zxvf frp_0.13.0_linux_386.tar.gz
cd frp_0.13.0_linux_386
rm -f frps
rm -f frps.ini
nano frpc.ini

客户端的配置如下

\[common\]
server_addr = x.x.x.x
server_port = 7000
\[ssh\]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
\[web\]
type = http
local_port = 80
custom_domains = web.syfxlin.win
\[aria2\]
type = http
local_port = 6800
custom_domains = aria2.syfxlin.win

上面的配置和服务端是对应的。 \[common\]中的 server_addr 填 frp 服务端的 ip（也就是外网主机的 IP），server_port 填 frp 服务端的 bind_prot。 保存配置，输入以下指令运行 frp 客户端。（同样如果需要在后台运行，请往下翻阅关于后台运行的部分。）

./frpc -c ./frpc.ini

此时在服务端会看到"start proxy sucess"字样，即连接成功。 现在可以用 SSH 通过外网主机 IP:6000 建立 SSH 连接。通过浏览器访问 8080 端口访问 web 网站 让 frp 在后台运行 虽然现在 frp 运作起来了，内网穿透也实现了，但这还是不够的。此时如果断开与服务端或者客户端的 SSH 连接（比如关掉了 Xshell）也就中止了 frp 的运行。 保持 frp 运行是关键是让服务端的 frp 和客户端的 frp 在后台运行，使用 screen 让 frp 在后台运行 首先使用 screen 指令创建一个会话。

screen -dmS frp

然后进入这个会话。

screen -r frp

最后使用运行 frp 的指令(如果之前断开了 SSH 连接，记得用 cd 指令进入 frp 的目录先。)

./frps -c ./frps.ini

这样就让 frp 在后台运行了。
