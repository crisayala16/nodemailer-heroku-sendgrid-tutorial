const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let auth;

if(process.env.NODE_ENV === 'production'){
    auth = process.env;
}
else{
    auth = require('./config.json');
}

const transporter = nodemailer.createTransport({
  service: 'Sendgrid',
  auth: {
    user: auth.SENDGRID_USERNAME, pass: auth.SENDGRID_PASSWORD
  }
});

const app = express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.post('/sendEmail', (req, res)=>{
    let email = req.body.email;
    let message = req.body.message;
    let name = req.body.name;
    let gif = req.body.gif;

    transporter.sendMail({
        from: 'nodemailbobthebot@gmail.com',
        to: email,
        subject: `${name}` ,
        html: `<h3>${message}</h3>`
        }, (err, info)=>{
            if(err){
                res.send(err);
            }
            else{
                console.log('after info');
                res.status(200).json({
                success: true,
                message: 'Email Sent'
                });
            }
        });
});

app.listen(PORT, ()=>{
    console.log('Listening on port: ' + PORT);
});

