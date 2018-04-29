var http = require('http');
var fs = require('fs');
var chat = require('./app.js')
var express = require('express');
var app = express();
var html = fs.readFileSync('./public/index.html');
var style = fs.readFileSync('./public/style.css');
var js = fs.readFileSync('./public/client.js');


app.set('port', 8000);
http.createServer(app).listen(app.get('port'), ()=> {	
	console.log('listening:' + app.get('port'));
});

app.use((req,res, next)=>{
	if (req.url === '/') {
		res.end(html);
	} else next();
});

app.use((req, res, next)=>{
	if (req.url === '/style.css') {
		res.end(style)
	} else next();
});
app.use((req, res, next)=>{
	if (req.url === '/client.js') {
		res.end(js);
	} else next();
});

app.use((req, res)=>{
	if (req.url === '/subscribe') {
		chat.subscirbe(req, res);
	} else if (req.url === '/message') {
		var body;
		req.on('data', data=>{
			body = JSON.parse(data);
			chat.publish(body.message);
			res.end('ok');
		});
	};
});
