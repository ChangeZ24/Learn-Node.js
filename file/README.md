## 模块

### 概述

模块是 Node.js 的基本组成部分，文件和模块一一对应，即一个 Node.js 文件就是一个模块。

> `exports`：模块公开的接口，即封装模块的关键字

> `require`：从外部获取一个模块的接口，即调用模块的关键字

```
//引入当前目录下的hello文件
var hello = require("./hello");
//使用exports将world作为模块访问的接口
exports.world=function(){
    console.log("Hello World");
}
```

### require 调用模块机制

![require](https://s1.ax1x.com/2020/03/16/8GZTTx.jpg)

> 其中，

> 原生模块：Node.js 自带的模块，如 http、fs 等。

> 文件模块：某目录下的文件，使用前必须先使用`exports`封装模块

## 文件系统

### 概述

```
var fs = require("fs");
```

文件模块中所有方法均有异步同步两种，异步方法的最后一个参数为回掉函数，第一个参数包含了错误信息。

### 测试

```
var fs = require("fs");

// 异步读取
fs.readFile('fs.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('fs.txt');
console.log("同步: " + data.toString());

console.log("------END------");
```

![output](https://s1.ax1x.com/2020/03/16/8Gmoi6.jpg)
