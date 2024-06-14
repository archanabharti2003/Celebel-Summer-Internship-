const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = path.join(__dirname, url.pathname);

    if (req.method === 'GET' && url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <h1>File Management Tool</h1>
            <form action="/create" method="post">
                <input type="text" name="filename" placeholder="Enter filename to create">
                <button type="submit">Create File</button>
            </form>
            <form action="/read" method="get">
                <input type="text" name="filename" placeholder="Enter filename to read">
                <button type="submit">Read File</button>
            </form>
            <form action="/delete" method="post">
                <input type="text" name="filename" placeholder="Enter filename to delete">
                <button type="submit">Delete File</button>
            </form>
        `);
    } else if (req.method === 'POST' && url.pathname === '/create') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            if (filename) {
                fs.writeFile(path.join(__dirname, filename), '', (err) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Error creating file');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('File created successfully');
                    }
                });
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Filename not provided');
            }
        });
    } else if (req.method === 'GET' && url.pathname === '/read') {
        const filename = url.searchParams.get('filename');
        if (filename) {
            fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error reading file');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(data);
                }
            });
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Filename not provided');
        }
    } else if (req.method === 'POST' && url.pathname === '/delete') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            if (filename) {
                fs.unlink(path.join(__dirname, filename), (err) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Error deleting file');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('File deleted successfully');
                    }
                });
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Filename not provided');
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
