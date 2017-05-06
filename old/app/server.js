'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
let mime = require('./mime.json');
http.createServer((req, res) => {
    //处理请求的url编码,进行解码
    req.url = decodeURI(req.url);
    //处理具体请求
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('./index.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url.startsWith('/node_modules')||req.url.startsWith('/assets')||req.url.startsWith('/views')) { 
        fs.readFile('.' + req.url, (err, data) => {
            if (err) throw err;
            let mimeKey = path.extname(req.url); 
            let mimeType = mime[mimeKey] || 'text/plain'; 
            res.writeHead(200, { 'Content-type': mimeType });
            return res.end(data);
        });
    } else if (req.url === '/favicon.ico') {
        return res.end('111');
    } 

}).listen(3000, () => {
    console.log('服务器被启动了')
});





