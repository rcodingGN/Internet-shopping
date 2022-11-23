// server.js
// 1. 引入接下来要用到的node内置模块
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// 2. 利用path解析当前目录，然后拼接dist目录，使得服务器当前的根目录变为dist
const root = path.join(path.resolve(process.argv[2] || '.'), 'dist');

// 3. 创建http服务器
const server = http.createServer((request, response) => {

    // 4. 解析请求url获取文件路径
    const pathname = url.parse(request.url).pathname;
    const filepath = path.join(root, pathname);

    // 5. 使用fs文件系统模块读取index.html文件并返回给前端
    fs.stat(filepath, (err, stats) => {
        if (!err && stats.isFile()) {
            // 响应头设为200
            response.writeHead(200);
            // 创建一个读写流管道，将index.html文件内容写入response并返回
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 请求路径不对时返回404
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

// 6. 服务器监听8081端口
server.listen(8081);
