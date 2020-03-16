const http = require("http"); //引入Node的http模块
const path = require("path"); //获取Node的Path模块
const fs = require("fs"); //移入Node文件模块
const server = http.createServer();
//它根据访问的 URL ，去返回对应的 HTML
server.on("request", (req, res) => {
  console.log(req.url); //请求的url地址
  //通过normalize将URL规范成路径
  //通过join将他和当前目录拼接起来
  //__dirname代表当前文件所在目录

  const doc_path = path.join(
    __dirname,
    "document_root",
    path.normalize(req.url)
  );
  console.log(doc_path);

  const ext = path.extname(req.url); //获取扩展名
  let mime = { "Content-Type": "text/html" };
  switch (
    ext //指定对应的MIME信息
  ) {
    case ".html":
    case ".htm":
      mime = { "Content-Type": "text/html" };
      break;
    case ".css":
      mime = { "Content-Type": "text/css" };
      break;
    case ".ico":
      mime = { "Content-Type": "image/x-icon" };
      break;
  }
  //使用existSync判断文件是否存在
  //使用extname去掉url目录，以防路径为目录，但目录里没有文件
  if (path.extname(req.url) != "" && fs.existsSync(doc_path)) {
    //Response里边会包含MIME信息以告诉浏览器这是个什么格式的文件
    res.writeHead(200, mime); //输出状态码
    content = fs.readFileSync(doc_path); //通过readFileSync读取文件内容
  } else {
    res.writeHead(404, mime);
    content = "文件不存在";
  }
  res.write(content); //将内容写到request响应里去
  res.end();
});

server.listen(8080);
