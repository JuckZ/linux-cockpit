/*
 * @Author: Juck
 * @Date: 2020-04-26 09:20:18
 * @LastEditTime: 2020-04-26 09:40:53
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\server\utils\BUS.js
 * @Juck is coding...
 */

//  用于后端的BUS
const events = require('events')
const myBUS = new events.EventEmitter();
module.exports = {
    myBUS: myBUS
}