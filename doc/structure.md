node上运行着http服务和socket服务，并新建了一个SSH客户端进程。

http client输入对应的服务器ip，端口，用户名和密码等信息，向http server的loginwebssh接口发起请求

http server收到请求后用用户输入的参数通过ssh client向ssh server发起创建ssh连接的请求

ssh server收到到ssh client的请求后检验参数，验证通过后创建ssh连接

http client收到连接成功的响应后（返回token），通过ws client向ws server建立连接（通过token验证），用户可以开始使用自己的linux了(主要为以下两种交互)：

一、用户在http client的命令行中输入命令，通过ws将命令发送到ws server，ws server收到命令进行处理后交给ssh client，ssh client将命令发送到ssh server上进行执行；

二、用户在http client在图形化界面中进行鼠标或键盘的操作，对应的事件将会得到识别和处理，然后转换为bash脚本，在通过ws client发送到ws server上，ws server将命令想方式一中的模式进行处理。



1. SSH Server —— SSH Client:

   ```
   // 建立SSH连接
   conn.connect({
         host: '192.168.247.140',
         port: 22,
         username: 'root',
         password: 'zc1998zc'
         });
   
   // 执行bash脚本
   conn.exec(command,(err,stream){
   	//......
   })
   ```

   

   ```
   
   ```

2. SSH Client —— WS Server:

   ```
   // socket.io建立websocket连接
   io.on('connection',socket=>{
     //socket监听command事件，当用户触发该事件并传递msg(命令)时候，处理之
     socket.on('command',(msg)=>{
         //处理用户的指令msg......
         //如：conn.exec()....
     })
   })
   ```

   

3. WS Server —— Http Server:

   ```
   //创建服务，监听如80端口
   server.listen(80,()=>{
       console.log("server is running on 80 port.")
   })
   //用户输入要连接的远程主机Ip，端口，用户名，密码，才能建立ws连接
   app.post('/loginWebssh',(req,res)=>{
       //进行连接的关键代码
       conn.connect({
           host:host,
           port:port,
           username:username,
           password:password
       })
   })
   
   ```

4. Http Client —— Http Server:

   ```
   
   //输入参数，请求连接
   self.$axios.post('http://localhost/loginWebssh',{
                   "host":values.host,
                   "port":values.port,
                   "username":values.username,
                   "password":values.password
               })
   ```

   

5. Http Client —— WS Client

   ```
   //建立socket连接
   self.socket=io('ws://localhost');
   ```

   

6. WS Client —— WS Server

   ```
   //监听事件
   socket.on(...)
   //触发事件
   socket.emit(...)
   ```