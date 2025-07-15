const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    let filePath = '';
    switch (req.url) {
        case '/':
            filePath = '../Home_page/home.html';
            break;
        case '/about':
            filePath = '../About_page/about.html';
            break;
        case '/services':
            filePath = '../Services_page/services.html';
            break;
        case '/blog':
            filePath = '../Blog_page/blog.html';
            break;
        case '/contact':
            filePath = '../Contact_page/contact.html';
            break;
        default:
            filePath = '../NotFound_page/notfound.html';
    }

    let data = fs.readFileSync(filePath, 'utf-8');
    res.end(data);

});

server.listen(8000, () => {
    console.log('Server start on http://localhost:8000');
});