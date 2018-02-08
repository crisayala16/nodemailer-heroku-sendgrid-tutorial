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

**Make sure you keep this info safe somewhere, you're going to need for the next step.**

![heroku-sendgrid-auth](./public/images/sendgrid-auth.png) 

### Create config.json file

Create a config.json file, replace the 'user name' and 'password' strings with your sendgrid auth info. 

```json
{
"SENDGRID_USERNAME": "user name",
"SENDGRID_PASSWORD": "password"
}
```

### Create .gitignore file

Run ``` touch .gitignore ``` to create a .gitignore file

This .gitignore file will prevent git from sending certain files with sensitive / unnecessary information to github.

Go inside your .gitignore file and enter node_modules and config.json

![gitignore](./public/images/gitignore-config.png)

**This step is very crucial, sendgrid will suspend your account if you push your sendgrid authentication info to github.**

### Set up server route

Run ``` npm install --save express body-parser nodemailer ``` to install your node modules. 

Set up server modules and their middleware

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const auth = require('./config.json');

const app = express();

//This middleware allows our server routes to have parsed json data from the client
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());

app.listen(3000);
```

### Set up nodemailer 

First, we need to be able to grab our sensitive sengrid authentication info from the config.json file.

We also need to consider grabbing that info when our app is deployed. Since the .gitignore file will prevent the config.json file from being to pushed to github, our app will not have access to the info when deployed.

To fix this we need to grab the info from our environment variables.

Heroku automatically adds the sendgrid user name and password as environment variables, so all we have to do is use ```process.env.<environment variable>``` to access that info.

Here we set up the auth info using an if else statement, determining whether our app is deployed or not.

*server.js*
```javascript
const auth;

if(process.env.NODE_ENV === 'production'){
    auth = process.env;
}
else{
    auth = require('./config.json');
}
```

Now we need to configure nodemailer

*server.js*
```javascript
const transporter = nodemailer.createTransport({
  service: 'Sendgrid',
  auth: {
    user: auth.SENDGRID_USERNAME, pass: auth.SENDGRID_PASSWORD
  }
});
```

Create a route in your server to handle user input from the client and start using nodemailer.

*server.js*
```javascript
app.post('/sendEmail', (req, res)=>{
    let email = req.body.email;
    let message = req.body.message;
    let name = req.body.name;

    
});
```










