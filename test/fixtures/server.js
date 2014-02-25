var express = require('express');
var fs = require("fs");

var app = express();

app.use(express.bodyParser());

app.get('/', function(req, res)
{
  var html = fs.readFileSync(__dirname+"/index.html", "utf8");
  res.set('Content-Type', 'text/html');
  res.send(html);
});

exports.start = function()
{
  app.listen(3000);
  console.log('Listening on port 3000');
}

if(process.argv[0] === "server")
  console.log("teste");
  exports.start()
