在nginx.exe目录，打开命令行工具，用命令 启动/关闭/重启nginx：

关闭nginx：

nginx -s quit ：完整有序的停止nginx
 名称| 命令
 ---|---
 启动nginx | start nginx
 修改配置后重新加载生效| nginx -s reload
 重新打开日志文件| nginx -s reopen
 测试nginx配置文件是否正确| nnginx -t -c nginx.conf
 关闭nginx ：快速停止nginx | nginx -s stop
 完整有序的停止nginx |nginx -s quit







## 跨域配置

​        location /api {

​            rewrite  ^/api/(.*)$ /$1 break;

​            include  uwsgi_params;

​            proxy_pass   http://127.0.0.1:8092;            

​        }