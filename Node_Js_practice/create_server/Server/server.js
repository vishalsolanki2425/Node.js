const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    let filePath = '';
    switch (req.url) {
        case '/':
            filePath = '../index.html';
            break;
        case '/about':
            filePath = '../about.html';
            break;
        case '/service':
            filePath = '../service.html';
            break;
        case '/blog':
            filePath = '../blog.html';
            break;
        case '/contact':
            filePath = '../contact.html';
            break;
        default:
            filePath = '../notfound.html';
    }

    let data = fs.readFileSync(filePath, 'utf-8');
    res.end(data);

});

server.listen(8000, () => {
    console.log('Server start on http://localhost:8000');
});