#!/bin/bash
# 准备工作


# 给yum添加epel源
yum install -y epel-release

# 安装和配置ssh

# 安装必要环境
## nodejs

```bash
yum install -y nodejs
```



## 升级nodejs

```bash
npm cache clean -f 
npm install -g n
n stable
ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node
node -v
```



## 自动交互工具（预定）
yum install expect
# 定时任务

# 自启动任务

# 防火墙

# 初始账户

# 获取系统相关信息

输入"uname -a ",可显示电脑以及操作系统的相关信息

输入"cat /proc/version",说明正在运行的内核版本。

输入"cat /etc/issue", 显示的是发行版本信息

lsb_release -a (适用于所有的linux，包括Redhat、SuSE、Debian等发行版，但是在debian下要安装lsb)

查看cpu大小 cat /proc/cpuinfo |grep "model name" && cat /proc/cpuinfo |grep "physical id"

查看内存大小 cat /proc/meminfo |grep MemTotal

查看硬盘大小 **fdisk -l |grep Disk**

**uname -a # 查看内核/操作系统/CPU信息的linux系统信息命令**

**head -n 1 /etc/issue # 查看操作系统版本，是数字1不是字母L**

**cat /proc/cpuinfo # 查看CPU信息的linux系统信息命令**

**hostname # 查看计算机名的linux系统信息命令**

**lspci -tv # 列出所有PCI设备**

**lsusb -tv # 列出所有USB设备的linux系统信息命令**

**lsmod # 列出加载的内核模块**

**env # 查看环境变量资源**

**free -m # 查看内存使用量和交换区使用量**

**df -h # 查看各分区使用情况**

**十四、du -sh # 查看指定目录的大小**
**十五、grep MemTotal /proc/meminfo # 查看内存总量**
**十六、grep MemFree /proc/meminfo # 查看空闲内存量**
**十七、uptime # 查看系统运行时间、用户数、负载**
**十八、cat /proc/loadavg # 查看系统负载磁盘和分区**
**十九、mount | column -t # 查看挂接的分区状态**
**二十、fdisk -l # 查看所有分区**
**二十一、swapon -s # 查看所有交换分区**
**二十二、hdparm -i /dev/hda # 查看磁盘参数(仅适用于IDE设备)**
**二十三、dmesg | grep IDE # 查看启动时IDE设备检测状况网络**
**二十四、ifconfig # 查看所有网络接口的属性**
**二十五、iptables -L # 查看防火墙设置**
**二十六、route -n # 查看路由表**
**二十七、netstat -lntp # 查看所有监听端口**
**二十八、netstat -antp # 查看所有已经建立的连接**
**二十九、netstat -s # 查看网络统计信息进程**
**三十、ps -ef # 查看所有进程**
**三十一、top # 实时显示进程状态用户**
**三十二、w # 查看活动用户**
**三十三、id # 查看指定用户信息**
**三十四、last # 查看用户登录日志**
**三十五、cut -d: -f1 /etc/passwd # 查看系统所有用户**
**三十六、cut -d: -f1 /etc/group # 查看系统所有组**
**三十七、crontab -l # 查看当前用户的计划任务服务**
**三十七、chkconfig –list # 列出所有系统服务**
**三十八、chkconfig –list | grep on # 列出所有启动的系统服务程序**
**三十九、rpm -qa # 查看所有安装的软件包**
**四十、cat /proc/cpuinfo ：查看CPU相关参数的linux系统命令**
**四十一、cat /proc/partitions ：查看linux硬盘和分区信息的系统信息命令**
**四十二、cat /proc/meminfo ：查看linux系统内存信息的linux系统命令**
**四十三、cat /proc/version ：查看版本，类似uname -r**
**四十四、cat /proc/ioports ：查看设备io端口**
**四十五、cat /proc/interrupts ：查看中断**
**四十六、cat /proc/pci ：查看pci设备的信息**
**四十七、cat /proc/swaps ：查看所有swap分区的信息**





用 yum repolist all 命令可以查看yum源的地址

yum相关命令（缓存、安装、已安装列表、卸载、纯净卸载、。。）



### 防火墙相关

查看防火墙状态 firewall-cmd --state

停止 systemctl stop firewalld.service

禁止开机启动 systemctl disable firewalld.service

关闭 systemctl stop firewalld.service

查看已经开放的端口 firewall-cmd --list-ports

开启端口 firewall-cmd --zone=public(作用域) --add-port=80/tcp(端口和访问类型) --permanent(永久生效）

删除端口 firewall-cmd --zone= public --remove-port=80/tcp --permanent