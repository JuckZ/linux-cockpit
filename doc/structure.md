node��������http�����socket���񣬲��½���һ��SSH�ͻ��˽��̡�

http client�����Ӧ�ķ�����ip���˿ڣ��û������������Ϣ����http server��loginwebssh�ӿڷ�������

http server�յ���������û�����Ĳ���ͨ��ssh client��ssh server���𴴽�ssh���ӵ�����

ssh server�յ���ssh client�����������������֤ͨ���󴴽�ssh����

http client�յ����ӳɹ�����Ӧ�󣨷���token����ͨ��ws client��ws server�������ӣ�ͨ��token��֤�����û����Կ�ʼʹ���Լ���linux��(��ҪΪ�������ֽ���)��

һ���û���http client�����������������ͨ��ws������͵�ws server��ws server�յ�������д���󽻸�ssh client��ssh client������͵�ssh server�Ͻ���ִ�У�

�����û���http client��ͼ�λ������н���������̵Ĳ�������Ӧ���¼�����õ�ʶ��ʹ���Ȼ��ת��Ϊbash�ű�����ͨ��ws client���͵�ws server�ϣ�ws server�������뷽ʽһ�е�ģʽ���д���



1. SSH Server ���� SSH Client:

   ```
   // ����SSH����
   conn.connect({
         host: '192.168.247.140',
         port: 22,
         username: 'root',
         password: 'zc1998zc'
         });
   
   // ִ��bash�ű�
   conn.exec(command,(err,stream){
   	//......
   })
   ```

   

   ```
   
   ```

2. SSH Client ���� WS Server:

   ```
   // socket.io����websocket����
   io.on('connection',socket=>{
     //socket����command�¼������û��������¼�������msg(����)ʱ�򣬴���֮
     socket.on('command',(msg)=>{
         //�����û���ָ��msg......
         //�磺conn.exec()....
     })
   })
   ```

   

3. WS Server ���� Http Server:

   ```
   //�������񣬼�����80�˿�
   server.listen(80,()=>{
       console.log("server is running on 80 port.")
   })
   //�û�����Ҫ���ӵ�Զ������Ip���˿ڣ��û��������룬���ܽ���ws����
   app.post('/loginWebssh',(req,res)=>{
       //�������ӵĹؼ�����
       conn.connect({
           host:host,
           port:port,
           username:username,
           password:password
       })
   })
   
   ```

4. Http Client ���� Http Server:

   ```
   
   //�����������������
   self.$axios.post('http://localhost/loginWebssh',{
                   "host":values.host,
                   "port":values.port,
                   "username":values.username,
                   "password":values.password
               })
   ```

   

5. Http Client ���� WS Client

   ```
   //����socket����
   self.socket=io('ws://localhost');
   ```

   

6. WS Client ���� WS Server

   ```
   //�����¼�
   socket.on(...)
   //�����¼�
   socket.emit(...)
   ```