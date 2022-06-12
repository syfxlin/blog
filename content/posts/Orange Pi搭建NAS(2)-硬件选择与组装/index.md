---
title: Orange Pi搭建NAS(2)-硬件选择与组装
slug: orange-pi搭建nas2-硬件选择与组装
status: publish
date: '2017-07-11T00:00:00.000Z'
date_updated: '2021-07-28T07:56:19.260Z'
layout: post
categories:
  - 折腾记录
tags:
  - Orange-PI
---
### 所需硬件

下面列出所需硬件，注意有的是可选

- Orange Pi One(建议)，降低延迟选择有网口的，我因为要中继选择 Lite
- 散热片（两片）+外壳(带风扇)，一天 24 小时开机，这个还是有必要。
- 5V 2A 电源，官方店铺有，也可以自己买 DC-0.4mm(这种口径很少见，建议直接买官方的)
- 8 G micro SD card(class 10+)，至少 class10，不然后面没得玩。
- 移动硬盘或者 U 盘(如果选择硬盘要有易驱线，以及硬盘电源)\[可选\]
- USB Wifi(RTL8188eu，MT7601 需要编译)\[可选\]

### 各型号的资源

详情:[http://www.orangepi.cn/downloadresourcescn/](http://www.orangepi.cn/downloadresourcescn/)

安装步骤很简单

1. 拿起香橙派板子，看清楚各种插槽接口，搞清楚是干嘛的，小心插坏了~
2. 给 cpu 贴上散热片，要买那种自带粘胶的，手不要抖哦，小心贴歪了。
3. 把风扇的电源插头接到电源引脚上，然后接上电源看风扇转不。香橙派 40pin 接口板上有个小三角标注一号针，正极接 2 号针，负极接任何的 GND 针
4. 没什么问题就装上外壳。
