# nodemailer-heroku-sendgrid-tutorial
Tutorial for setting up nodemailer in heroku with sendrid.

# Getting Started

 * Install dependencies ``` npm install ```
 * ``` npm start ```
 * open browser on port 3000

# Tutorial

This tutorial requires [Heroku](https://devcenter.heroku.com/articles/heroku-cli) and [Node.js](https://nodejs.org/en/download/)

### Log into Heroku and create

Run the ``` heroku login ``` command and enter your credentials

![heroku-login](./public/images/heroku-login.png)

After loggin in, run the ``` heroku create <app name>``` command

![heroku-create](./public/images/heroku-create.png)

### Attach Sendgrid to your heroku app

Run the ``` heroku addons:create sendgrid:starter ``` command

![heroku-addon-sendgrid](./public/images/sendgrid-addon.png)

Run ``` heroku config:get SENDGRID_USERNAME ``` and ``` heroku config:get SENDGRID_PASSWORD ``` to get the SendGrid auth info.
Make sure you keep this info safe somewhere, you're going to need it in a bit.

![heroku-sendgrid-auth](./public/images/sendgrid-auth.png) 

### Create config.json file

Create a config.json file, replace the 'user name' and 'password' strings with your sendgrid auth info. 

**Make sure to add this file to a .gitignore**

```json
{
"SENDGRID_USERNAME": "user name",
"SENDGRID_PASSWORD": "password"
}
```

### Set up server route

Set up server modules and their middleware

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var auth = require('./config.json');

var app = express();

app.listen(3000);

//This middle allows our server routes to have parsed json data from the client
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
```

Create a route in your server to handle user input from the client.

```javascript
app.post('/sendEmail', (req, res)=>{
    let email = req.body.email;
    let message = req.body.message;
    let name = req.body.name;
});
```

### Install Nodemailer and set up config

Install nodemailer with ``` npm install --save nodemailer ```






