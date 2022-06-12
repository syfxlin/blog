---
title: 调教火龙810-降低发热（已更）
slug: 调教火龙810-降低发热
status: publish
date: '2017-12-23T00:00:00.000Z'
date_updated: '2021-07-28T16:02:32.866Z'
layout: post
categories:
  - 折腾记录
tags:
  - 骁龙810
---
> 上个星期由于我的小米 4 给了我老妈，经过“慎重”思考入手 Nubia Z9Max，其实原本想入 Z9 的可惜 Money 不足，于是入手 Z9Max（没有快充，不是无边框，但是支持 SD 卡槽，只有这个可以点赞）

# 进入正题

## 基本参数

Qualcomm MSM8994 Snapdragon 810

> 4x Quad-core 2.0 GHz ARM®Cortex™ A57 （big）@ 1.96GHz and 4x quad-core 1.5 GHz ARM®Cortex™ A53（LITTLE）@ 1.56GHz；Adreno 430 GPU；X10 LTE modem；20nm LMP

## 探索发热源头

经过一星期的测试及日常使用，发现发热并没有想象中的严重，可能是天气太冷了吧，至少比我 2 年前的酷派 8190Q(MTK6589)好很多

> 开启 4 小核锁住 4 大核，日常使用 55℃
>
> 开启 4 小核只开 1 大核，日常使用 63℃
>
> 开启 4 小核只开 2 大核，日常使用 68℃
>
> 超过 2 个大核长期在线的话温度直接上升 20℃ 达到可怕的 85℃

高通吧吧主做过烤机测试，结果如下

> 单个 2GHz A57 核心，满载坚持 1 分多钟后达到 105℃ 左右，没有降频，但直接就重启了。两个 2GHz A57 核心，最多不到 5 秒钟就冲到 105℃ ，然后重启。A53 核心就好多了，1.56GHz 频率下单个满载不超过 50℃，双核大约 50℃ ，四核也才 61℃ ，都过得去。

所以发热的根源在于 4 个 A57 大核，但是如果 4 个 A57 都不在线，开启应用时及快速滑动列表时会出现严重掉帧现象，所以不能完全锁住 4 个 A57

## 动手!

> 我个人不喜欢任何国产 OS，所以扳掉 Nubia UI 刷入 RR-OS 及 Mokee，以下的所有操作都是在 RR 和 Mokee 下操作的。

RR 经过我使用发现一个问题就是关屏待机时 A57 会全部掉线，无法重新打开，必须重启，目前用以下方法应该可以解决（目前正在测试）经测试锁核问题是 msm_thermal 引起的，以下命令可成功解锁。

```bash
#执行以下命令
chmod 666 /sys/devices/soc.0/qcom,bcl.61/mode
echo -n disable > /sys/devices/soc.0/qcom,bcl.61/mode
chmod 444 /sys/devices/soc.0/qcom,bcl.61/mode
chmod 666 /sys/module/msm_thermal/core_control/enabled
echo 0 > /sys/module/msm_thermal/core_control/enabled
chmod 444 /sys/module/msm_thermal/core_control/enabled
```

另外使用高通锁核方案这个 APP 锁核后重新开核貌似也可以做到。

## 调教方案

偶然在酷安看到有酷友分享的调度，经 2 星期测试，基本不存在卡顿，发热虽然还是严重但已经不再过热降频（注:此次更新写于 4 月中旬，坐标泉州 亚热带）

方案地址: [https://github.com/yc9559](https://github.com/yc9559)
