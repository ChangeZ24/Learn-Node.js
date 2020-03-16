var events = require("events");
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
  console.log("Connect Success!!");
  //触发data_received事件
  eventEmitter.emit("data_received");
};
//绑定事件处理
eventEmitter.on("connection", connectHandler);
//绑定data_received事件
eventEmitter.on("data_received", function() {
  console.log("data received success!!");
});
//触发connection事件
eventEmitter.emit("connection");

console.log("------END------");
