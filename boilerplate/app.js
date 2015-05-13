"use strict";
var express = require('express'),
    exphbs  = require('express-handlebars'),
    app = express(),
    q = require('q'),
    _ = require('lodash'),

    lexxi = require('lexxi'),

    helpers_custom = require(__dirname + '/app/helpers'),
    config = require(__dirname + '/app/config'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    multer  = require('multer');

if (config.db){
  var mongoose = require('mongoose');
}



var hbs = exphbs.create({
  defaultLayout: 'base',
  extname: '.hbs',
  helpers: lexxi.extend({}, lexxi, helpers_custom),
  partialsDir: [__dirname + '/app/templates/_partials/'],
  layoutsDir: __dirname + '/app/templates/_layouts/'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/templates');

app.use(cookieParser('LEXXISECRET666'));


app.use(multer({ dest: __dirname + '/tmp' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({ 
  secret: 'LEXXISECRET666',
  resave: false,
  saveUninitialized: false
}));

app.use("/compiled", express.static(__dirname + "/app/compiled"));
app.use("/bower_components", express.static(__dirname + "/app/bower_components"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/favicon.ico", express.static(__dirname + "/app/images/favicon.ico"));
app.use("/uploads", express.static(__dirname + "/app/uploads"));
app.use("/fonts", express.static(__dirname + "/app/fonts"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/scripts_client", express.static(__dirname + "/app/scripts_client"));


var bootstrap = {
  config: config,
  q: q,
  _:_,
  lexxi: lexxi,
  __base: __dirname + '/'
};

if (config.db){
  bootstrap.mongoose = mongoose;
}

require(__dirname + '/app/compiled/scripts-server.js')(app, bootstrap);


app.get('*', function(req, res){
    res.status(404).render('404', {
    title: '404 not found',
    global: {
      auth_token: req.cookies.auth_token,
      year: new Date().getFullYear()
      }
    } );
});

app.listen(config.port);
console.log('♥♥ http://localhost:'+config.port+' ♥♥');
