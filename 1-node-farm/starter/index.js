const fs = require('fs');
const http = require('http');
const url = require('url');

// // Blocking code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what is stored in textIn: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written.');

// // Non-Blocking way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log('Should be printed first?');

// Server Code

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(productData);

const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === '/overview' || pathname === '/') {
    res.end('This is the overview page!');
  } else if (pathname === '/product') {
    res.end('This the is product page');
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(productData);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-header': 'hello world!',
    });
    res.end('<h1>This page cannot be found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is now listening on port 8000');
});
