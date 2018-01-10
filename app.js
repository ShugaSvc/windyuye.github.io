var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-1d2200a73cd8c95c32c6e3ff39f1c0c1');

// var request = require('request');

// allow CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/contactUs', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var from = req.body.from;

  var text = "Name; " + name + "\r\n"
    + "Email; " + email + "\r\n"
    + "Message; " + message;

  mg.sendText("info@iask.today", ["service@iask.today", "anderson.tai@iask.today", "celistine.liang@hcdigitech.com", "william.wang@iask.today"], "Contact Request from www.iask.today - " + from, text, function (err) {
    if (err)
      res.status(400);
    else
      res.status(200);
    res.send();
  });
});

app.listen(8082, function () {
  console.log('app listening on port 8082!');
});