const http = require('http');
const app = require('./app');
var server = http.createServer(app);
server.listen(process.env.PORT||8000,()=>{
  console.log(`server listening on port ${process.env.PORT}`);
});