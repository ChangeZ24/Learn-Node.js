## 回调函数

### 概述

> 回调是 Node.js 异步编程的直接体现。回调函数在完成任务后就会被调用。Node 的所有 API 都支持回调函数。回调函数是一种非阻塞的方式。

```
function f1(value,callback1,callback2,...){}
```

### 进程、线程

> 进程：系统中正在运行的一个应用程序，是资源分配的最小单位。

> 线程：系统分配处理器时间资源的最小单位，程序执行的最小单位。

#### 区别：

> 1.进程包含一个或多个线程。

> 2.进程=线程+内存+文件/网络句柄

> 3.线程=栈+程序计数器+线程独立内存 TLS

> 4.一个程序至少有一个进程，一个进程至少有一个线程，其第一个线程即为此进程的主线程。

> 5.一个线程可以创建和撤销另一个线程，同一个进程的多个线程可以并发执行。

### 同步、异步、阻塞、非阻塞

> **同步、异步关注应用层，阻塞、非阻塞更多针对进程和线程而谈**

> 同步：发送方发送请求之后，需要等接收方发回响应后才接着发。

> 异步：发送方发送请求后，不等待接收方响应请求，继续发送下个请求。

> 阻塞调用：调用结果返回之前，当前线程会被挂起，调用线程在获得结果后才会返回数据。

> 非阻塞调用：调用结果返回之前，当前线程也不会被挂起，而是立刻返回执行下一个调用。

#### 区别

1. 进程通信方面，同步、异步和阻塞、非阻塞基本是同义词，发送方阻塞/非阻塞与接收方阻塞/非阻塞互不影响。

2. I/O 系统调用层面，非阻塞 I/O 系统调用和异步 IO 系统调用都不会阻塞进程，但非阻塞 I/O 系统调用 read()立即返回的是可以立即拿到的数据，完整或不完整的结果或空值都可；而异步 I/O 系统调用 read()返回的结果必须是完整的。

3. 非阻塞 I/O 系统调用可用来实现线程级别的 I/O 并发，与通过多线程实现的 I/O 并发相比，可减少内存消耗及进程切换的开销。

## 事件

> Node.js 是单进程单线程的应用程序，但通过 V8 引擎提供的异步执行回调接口，可以处理大量的并发。

> Node.js 所有的事件机制，都通过观察者模式实现。其单线程类似进入一个`while(true)`的事件循环，知道没有事件观察者退出，每个异步事件都生成一个事件观察者，若有事件发生就调用该回调函数。

> 观察者模式：其定义了对象的一对多依赖，当一个对象改变，所有依赖它的观察者都会收到通知并自动更新。

### 概述

Node.js 使用事件驱动模型。当 web server 收到请求，就将他关闭放到任务队列中，然后服务下一个 web 请求，通过先进先出的原则，任务队列中的事件会被放到调用栈上进行处理（若为非阻塞 I/O 操作，则直接调用栈执行完毕，若为文件或其他数据库等需长时间的操作，则会被放入 Libuv 处理，当前任务挂起，处理下一个任务），当此请求处理完成，它会将结果重新放回任务队列，当到达队列开头，此处理结果被返回给用户（**非阻塞 I/O**或**事件驱动 I/O**）

[下图 Node.js 工作流程源自 easy 老师方糖全站课堂（超值！！买买买！！！）：](https://study.163.com/course/courseMain.htm?courseId=1209581854)

!image[Nodejs](E:\blog-img\Nodejs\1111.jpg)

### 测试

1. 事件驱动程序

```
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
```

!image[event](E:\blog-img\Nodejs\2222.jpg)

2. 文件读入

```
var fs = require("fs");

fs.readFile("fs.txt", (err, data) => {
  if (err) {
    console.log("------ERROR------");
    console.log(err.stack);
    return;
  }
  console.log("------DATA------");
  console.log(data.toString());
});
console.log("------END------");
```

成功：

!image[fs1](E:\blog-img\Nodejs\3333.jpg)

失败：

!image[fs1](E:\blog-img\Nodejs\3333.jpg)
