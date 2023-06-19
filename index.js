const http = require('http')
const express = require('express')
const app = express()
const fs = require('fs');
var requests = require('requests');


const myfile = fs.readFileSync("about.html","utf-8");

app.get('/', function(req, res){
    res.end("this is Home page");
})

app.get('/about', function(req, res){
    res.end("this is about page");
})

app.get('/showpage', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/apidata', function(req, res){
    requests('https://api.publicapis.org/entries')
    .on('data', (chunk) => {
        const objdata= JSON.parse(chunk);
        let tableRows = '';
        objdata.entries.forEach(item => {          
            tableRows += `<tr><td>${item.API}</td><td>${item.Description}</td><td>${item.Category}</td></tr>`;
        });

        const html = myfile.replace('<!-- table row -->', tableRows);
        // Write the HTML content to a file or send it as a response
        res.write(html);
    })  
    .on('end', (err) => {
    if (err) return console.log('connection closed due to errors', err);
    res.end();  
    //console.log('end');
    });
})






// const server = http.createServer( (req,res) => {
//     console.log(req.url);
//     if(req.url== "/"){
//         res.end("this is home page");
//     }
//     if(req.url== "/about"){
//         res.end("this is about page");
//     }
// });

// server.listen(8888, () => { 
//     console.log("server listining");
// })

app.listen(3000, () => {
    console.log("server listening");
})