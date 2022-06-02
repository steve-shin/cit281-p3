const fs = require('fs');
const { connected } = require('process');
const fastify = require("fastify")();
const {coinCount} = require("./p3-module");
const listenIP = 'localhost';
const listenPort = 8080;

fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply
            .code(500)
            .header('Content-Type', 'text/html; charset=utf-8')
            .send(err)
        }
        else {
            reply
            .code(200)
            .header('Content-Type', 'text/html; charset=utf-8')
        }
    });
});




fastify.get("/coin", function (request, reply) {
    let {
        denom = 0,
        count = 0,
    } = request.query

    denom = parseInt(denom);
    count = parseInt(count);

    
    const coinValue = coinCount(request.query)
    
    
    reply
    .code(200)
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`)

});

fastify.get("/coins", function (request, reply) {
    let { option } = request.query;
    option = parseInt(option);

    let calcNum;
 

    switch (option) {
        case 1:
            calcNum = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case 2:
            let coins = [{denom: 25, count: 2},{denom: 1, count: 7}]
            calcNum = coinCount(...coins);
            break;
        default:
            calcNum = 0;
    }
    let coinValue = calcNum
    reply
    .code(200)
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`)
});




fastify.listen(listenPort, listenIP, (err, address) => {
    console.log(listenPort);
    console.log(listenIP);
});