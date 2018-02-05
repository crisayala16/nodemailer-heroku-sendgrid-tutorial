var express = require('express');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.post('/email', (req, res)=>{
    let email = req.body.email;
    let message = req.body.message;
    let name = req.body.name;

});

app.listen(PORT, ()=>{
    console.log('Listening on port: ' + PORT);
});

