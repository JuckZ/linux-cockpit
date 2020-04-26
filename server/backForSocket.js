/*
 * @Author: Juck
 * @Date: 2020-04-26 08:11:59
 * @LastEditTime: 2020-04-26 08:12:42
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\backForSocket.js
 * @Juck is coding...
 */
// /*
//  * @Author: Juck
//  * @Date: 2020-04-26 08:11:59
//  * @LastEditTime: 2020-04-26 08:12:00
//  * @LastEditors: Juck
//  * @Description: 
//  * @FilePath: \linux-cockpit\server\backForSocket.js
//  * @Juck is coding...
//  */

/**
 * connections = [
 *  { 
 *      domainOrIP: 'xxx.xxx',
 *      socketsOfUsers: {
 *          root: [socket1, socket2...],
 *          jz: [...]
 *      }      
 * },
 * {
 *  ......
 * }
 * ]
 * 
 */
// const connections = []; //应该为二维数组，使用同样信息登录的用户放在同一个子数组中
// let currentConnection = null
// // 登录时创建自己的socket
// socket.on('login', (userInfo) => {
//     /*当前登录用户*/
//     currentConnection = userInfo
//     if(connections.length == 0) {
//         const newConnection = {
//             domainOrIP: userInfo.domainOrIP,
//             socketsOfUsers: {}
//         }
//         // 将当前socket放入到对应数组中
//         newConnection.socketsOfUsers[userInfo.userName] = [ socket ]
//         connections.push(newConnection)
//     }
//     for (const connection of connections) {
//         // 如果已有对应的domainOrIP
//         if (connection.domainOrIP == userInfo.domainOrIP) {
//             // 如果用户名对应的socket数组长度为0则添加当前socket进去
//             // if(connection.socketsOfUsers[userInfo.userName])
//             const socketsForCurrentUser = connection.socketsOfUsers[userInfo.userName]
//             // 已经存在对应用户的sockets数组，直接push当前socket即可
//             if (socketsForCurrentUser) {
//                 socketsForCurrentUser.push(socket)
//             } else {
//                 // 没有当前用户的sockets数组，先给socketsOfUsers添加一个属性，再push
//                 connection.socketsOfUsers[userInfo.userName] = [socket]
//                 // socketsForCurrentUser = [socket]
//             }
//         } else {
//             // 如果没有对应的domainOrIP，则先创建一个(当然也要创建socketsOfUsers和它的值)
//             const newConnection = {
//                 domainOrIP: userInfo.domainOrIP,
//                 socketsOfUsers: {}
//             }
//             // 将当前socket放入到对应数组中
//             newConnection.socketsOfUsers[userInfo.userName] = [ socket ]
//             connections.push(newConnection)
//         }
//     }
//     /*登录成功*/
//     socket.emit('loginSuccess', userInfo)
//     /*向所有连接的客户端广播add事件*/
//     io.sockets.emit('addUser', userInfo)
//     /*登录失败*/
//     // socket.emit('loginFail', userInfo)
//     console.log(connections[0].socketsOfUsers.root.length);
    
// })