let http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, NodeJs !!!');
}).listen(8081, () => {
    console.log("Server running...")
});
