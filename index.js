const fs = require('node:fs');
const http = require('node:http');
const url = require('node:url');

const replaceTemp = require('./modules/replaceTemplate')

const overviewTemp = fs.readFileSync('./templates/overview.html', 'utf8');
const cardTemp = fs.readFileSync('./templates/card.html', 'utf8');
const productTemp = fs.readFileSync('./templates/product.html', 'utf8');
const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));


const server = http.createServer((req, res) =>
{

    const { pathname, query } = url.parse(req.url, true);

    // Overview
    if (pathname === '/' || pathname === '/overview')
    {
        const cards = data.map(item => replaceTemp(cardTemp, item)).join('')

        const outputOverview = overviewTemp.replace(/{%PRODUCT_CARDS%}/, cards);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(outputOverview);
    }

    // Product Details
    else if (pathname === '/product')
    {
        const product = data[query.id];
        const outputProduct = replaceTemp(productTemp, product);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(outputProduct);
    }
})

server.listen(3000, '127.0.0.1', () =>
{
    console.log('server running at http://127.0.0.1:3000');
})