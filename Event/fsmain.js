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
