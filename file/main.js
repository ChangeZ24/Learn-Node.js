var fs = require("fs");

// 异步读取
fs.readFile("fs.txt", function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步: " + data.toString());
});

// 同步读取
var data = fs.readFileSync("fs.txt");
console.log("同步: " + data.toString());

console.log("------END------");
