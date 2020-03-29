## 概述

Express 是一个简洁灵活的 Node.js Web 应用框架，其特点为：

- 可以设置中间件来响应 HTTP 请求

- 定义了路由表用于执行不同的 HTTP 请求动作

- 可以通过向模板传递参数来动态渲染 HTML 页面
  <!--more-->

### 中间件

请求发送到服务器，服务端在监听处理请求时的过程很复杂，若将这些负责的业务拆分成子部分，则每个子部份就是一个中间件，类似一个流水线工作流程。

[下图参考 easy 老师方糖全站课堂内容：](https://study.163.com/course/courseMain.htm?courseId=1209581854)

![中间件](https://i.loli.net/2020/03/16/amscOKBu1qZRNSD.jpg)

```
 var express = require('express');
 var app = express();

 app.get('/', function(req, res, next) {//function(req, res, next)为中间件

    // 当前中间件函数没有结束请求/响应循环，调用next(), 将控制权传递给下一个中间件函数继续往下处理，否则页面到此会被挂起
    next();//有next()才会往下进行下一个中间件，否则一直被挂起
 });

 //next()代表的下一个中间件
app.get('/end', function(req, res) {
    //此时没有next(),故到此结束
    res.send('-----END-----');
})
app.listen(3000);
```

### 错误中间件

[下图参考 easy 老师方糖全站课堂内容：](https://study.163.com/course/courseMain.htm?courseId=1209581854)

![错误中间件](https://i.loli.net/2020/03/16/AKTki9687StbFu5.jpg)

```
app.use(function(err, req, res, next) {//function(err, req, res, next)为错误处理中间件
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//另一种写法
app.use(function(req, res, next) {
  next(new Error("XXX error"));//next()将请求交给新建的错误处理中间件。
});
```

## 单文件 Express app

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port `+ port));
```

![output](https://i.loli.net/2020/03/16/Of4DapRuvUVq5mE.jpg)

## 使用 Express generate 生成 Express 项目

```
//Node.js v8.2.0直接使用npx命令使用生成器
$ npx express-generator

//之前版本先安装生成器包
$ npm install -g express-generator
$ express

//生成项目myapp
//将view引擎设置成pug，jade已不被支持
$ express --view=pug myapp

//运行
//安装依赖
$ cd myapp
$ npm install
//运行
$ set DEBUG=myapp:*
$ npm start

//打开页面http://localhost:3000/查看结果
```

![express](https://i.loli.net/2020/03/16/BNmsdbH4D3yvjqU.jpg)
