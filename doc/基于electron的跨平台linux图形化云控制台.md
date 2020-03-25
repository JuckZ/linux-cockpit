# 本科毕业论文（设计）开题报告（修订）

## TODO 

less版本问题



1. 重点：获取linux系统的反馈，以及脚本的植入和运行，权限和安全，网速和效率

vue-electron

electron-forge

## 题目：基于electron的linux云控制台

## 一、立题依据

## 二、研究的主要内容及预期目标

2.1 研究的主要内容

2.2 预期目标

#### 界面

http://www.jq22.com/jquery-info53

每个用户有一个统一的配置文件，便于放置用户的设置信息（个人喜好等，设备列表等）

#### 功能拓展

可拆卸的插件安装方式增删功能模块

集成一些线上的功能，如Uzer.me上的东西，在线的PS，在线的office编辑功能等等

查看天气的node脚本

充分运用curl

自动定位查询天气

系统信息（内存状态、任务状态、docker状态和控制面板（需要写好脚本，到时候当作插件来安装即可））

## 三、设计实现方案

3.1 拟采用的实验环境

操作系统：Ubuntu 18.04 LTS

CPU：

IDE:

3.2 技术涉及

如果不用electron可以用qt做客户端，甚至不需要客户端，直接做web应用。

electron (Electron Forge)

vue

node.js

websocket全双工通信（主要方式，实时，双方互相推送），在webssh中要使用到

ajax异步通信（非主要方式，请求和应答），在图形化界面的操作中要使用到

**集成cockpit到web应用中**

**可以参考webssh项目**

linux基础

bash编程

Inno Setup打包软件（把绿色版的文件打包成安装包）

Qt(备选)

3.3 设计大致思路

#### 依赖预计

python2.x or python3.x

curl

nodejs

mysql用配置文件代替（配置文件放在服务器端）
