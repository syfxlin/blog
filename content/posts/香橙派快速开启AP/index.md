---
title: 香橙派快速开启AP
slug: 香橙派快速开启ap
status: publish
date: '2017-07-04T00:00:00.000Z'
date_updated: '2021-07-28T15:44:06.701Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
由于学校网络太渣，手机 wifi 信号不好于是我入手香橙派 lite，但想要在香橙派，树莓派的 Linux 系统上开启 ap，由于香橙派树莓派开启 ap 步骤繁琐，于是便请求 google，发现了 create_ap 这个好软件。

### 一、安装依赖

```
sudo apt-get install bash util-linux procps hostapd iproute2 iwconfig haveged dnsmasq iptables
```

注:由于各种系统软件不一，如果提示安装问题去掉即可，debian 没有问题

### 二、安装 create_ap

```bash
git clone https://github.com/oblique/create_ap
cd create_ap
make install
```

注:如果提示未找到 git 命令请安装 git

### 三、开启 wifi

- 没有加密的 ap

```
create_ap wlan0 eth0 ap名称
```

- 开启 wpa wpa2 加密的 ap

```
create_ap wlan0 eth0 ap名称 ap密码
```

- 其他

```
请参考：HTTPS://GITHUB.COM/OBLIQUE/CREATE_AP
```
