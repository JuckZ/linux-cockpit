/*
 * @Author: Juck
 * @Date: 2020-04-25 23:37:05
 * @LastEditTime: 2020-04-26 00:06:28
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\test\bianli.js
 * @Juck is coding...
 */

 const userInfo = {
     domainOrIP: 'juck.site',
     userName: 'root',
     password: 'Zc1998zc',
     remember: true
 }
 let id = 0;
 const socket = {
     name: 'jjzz',
     id: 1
 }

 const connections = [
     {
         domainOrIP: 'domain1',
         socketsOfUsers: {
             root1: ['socket1','socket2'],
             jz1: []
         }
     },
     {
        domainOrIP: 'juck.site',
        socketsOfUsers: {
            roo: ['socket1','socket2'],
            jz: ['socket1']
        }
    }
 ]
for (const connection of connections) {
    id++ ;
    if(connection.domainOrIP == userInfo.domainOrIP) {
        console.log('i am in');
        // 如果用户名对应的socket数组长度为0则添加当前socket进去
        // if(connection.socketsOfUsers[userInfo.userName])
        const socketsForCurrentUser = connection.socketsOfUsers[userInfo.userName]
        // 已经存在对应用户的sockets数组，直接push当前socket即可
        if(socketsForCurrentUser) {
            socketsForCurrentUser.push(socket)
        } else {
            // 没有当前用户的sockets数组，先给socketsOfUsers添加一个属性，再push
            connection.socketsOfUsers[userInfo.userName] = [socket]
            // socketsForCurrentUser = [socket]
        }
    }
}
console.log('----------------');

console.log(connections[1].socketsOfUsers.root);
