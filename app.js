"use strict";

// ----------------------------------------
//  import required libraries
// ----------------------------------------

var express = require('express'),
    exphbs = require('express-handlebars'),
    lexxi_handlebars = require('lexxi-handlebars'),
    _ = require('lodash'),
    cookie_parser = require('cookie-parser'),
    body_parser = require('body-parser'),
    multer  = require('multer'),
    compression = require('compression'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    file_stream_rotator = require('file-stream-rotator'),

    settings = require(__dirname + '/app/settings'),
    fs = require('fs'),
    path = require('path'),

    q = require('q'),
    bcrypt = require('bcrypt-nodejs'),
    request = require('request'),
    moment = require('moment'),
    math = require('mathjs'),
    mime = require('mime'),
    gm = require('gm'),
    v = require('voca');




// ----------------------------------------
//  combine libraries for application use
// ----------------------------------------

var $ = {
  q: q,
  bcrypt: bcrypt,
  request: request,
  moment: moment,
  math: math,
  mime: mime,
  gm: gm,
  v: v,
  __base: __dirname + '/',
  settings: settings,
  _: _,
  path: path,
  fs: fs
};




// ----------------------------------------
//  initialize error log
// ----------------------------------------

var log_directory = path.join(__dirname, 'logs');

fs.existsSync(log_directory) || fs.mkdirSync(log_directory);

var error_log_stream = file_stream_rotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(log_directory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});





// ----------------------------------------
//  initialize env, express app / settings
// ----------------------------------------

var app = express();

  app.use(compression());
  app.use(multer({dest: __dirname + '/tmp'}).any());
  app.use(body_parser.json({limit: '50mb'}));
  app.use(body_parser.urlencoded({
    extended: true,
    limit: '50mb'
  }));
  app.use(cookie_parser(settings.crypto_secret));
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Cache-Control');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  if (app.get('env') !== 'production') {
    app.use(errorhandler());
  }
  app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: error_log_stream
  }));





// ----------------------------------------
//  define static routes
// ----------------------------------------

app.use("/compiled", express.static(__dirname + "/app/compiled"));
app.use("/bower_components", express.static(__dirname + "/app/bower_components"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/favicon.ico", express.static(__dirname + "/app/images/favicon.ico"));
app.use("/uploads", express.static(__dirname + "/app/uploads"));
app.use("/fonts", express.static(__dirname + "/app/fonts"));
app.use("/css", express.static(__dirname + "/app/css"));
app.use("/js", express.static(__dirname + "/app/js"));





// ----------------------------------------
//  set locals vars for templates/app
// ----------------------------------------

app.use(function (req, res, next) {

  var auth = false;
  var is_admin = false;
  var is_moderator = false;
  var user_id = false;

  if (req.cookies.auth_token){
    auth = bcrypt.compareSync(settings.site_code+'-'+req.cookies.user_id, req.cookies.auth_token);
    user_id = req.cookies.user_id;
  } else if (req.body.auth_token){
    auth = bcrypt.compareSync(settings.site_code+'-'+req.body.user_id, req.body.auth_token);
    user_id = req.body.user_id;
  }

  if (req.cookies.admin_token){
    is_admin = bcrypt.compareSync(settings.site_code, req.cookies.admin_token);
  } else if (req.body.admin_token){
    is_admin = bcrypt.compareSync(settings.site_code, req.body.admin_token);
  }

  if (req.cookies.moderator_token){
    is_moderator = bcrypt.compareSync(settings.site_code+'-moderator', req.cookies.moderator_token);
  } else if (req.body.moderator_token){
    is_moderator = bcrypt.compareSync(settings.site_code+'-moderator', req.body.moderator_token);
  }

  res.locals.user_id = user_id;
  res.locals.auth = auth;
  res.locals.is_admin = is_admin;
  res.locals.is_moderator = is_moderator;
  res.locals.year = new Date().getFullYear();
  res.locals.site_title = settings.site_title;
  res.locals.site_code = settings.site_code;
  res.locals.site_url = settings.site_url;

  res.locals.title = settings.site_title;

  next();
});





// ----------------------------------------
//  configure handlebars
// ----------------------------------------

var handlebars = exphbs.create({
  defaultLayout: 'base',
  extname: '.hbs',
  helpers: lexxi_handlebars,
  partialsDir: [__dirname + '/app/pages/_partials/'],
  layoutsDir: __dirname + '/app/pages/_layouts/'
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/pages');

$.handlebars = handlebars;





// ----------------------------------------
//  set up db connection
// ----------------------------------------

var mongoose = false;

if (settings.db || settings.production.db){

  mongoose = require('mongoose');

  var schemas = {},
      models = {},
      db_options = {};

  if (app.get('env') === 'production' && settings.production.db){
    if (settings.production.db.replica_set_name){
      db_options.replset = { rs_name: settings.production.db.replica_set_name };
    }
    mongoose.connect('mongodb://'+settings.production.db.username+':'+settings.production.db.password+'@'+settings.production.db.host+'/'+settings.production.db.name, db_options);
  }else{
    if (settings.db.replica_set_name){
      db_options.replset = { rs_name: settings.db.replica_set_name };
    }
    mongoose.connect('mongodb://'+settings.db.username+':'+settings.db.password+'@'+settings.db.host+'/'+settings.db.name, db_options);
  }

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

}

$.mongoose = mongoose;






// ----------------------------------------
//  initialize s3 client
// ----------------------------------------

var s3 = false;

if (settings.s3 || settings.production.s3){
  var knox = require('knox');
  var s3_settings = settings.s3;
  if (app.get('env') === 'production' && settings.production.s3){
    s3_settings = settings.production.s3;
  }
  s3 = knox.createClient(s3_settings);
}

$.s3 = s3;





// ----------------------------------------
//  initialize lexxi utilities
// ----------------------------------------

var lexxi = require('lexxi-utilities')(app);

$.lexxi = lexxi;






// ----------------------------------------
//  initialize mailer
// ----------------------------------------

var mail_transport = false;

if (settings.smtp || settings.production.smtp || settings.mailgun || settings.production.mailgun){
  var nodemailer = require('nodemailer');
  var htmlToText = require('nodemailer-html-to-text').htmlToText;
  var hbs = require('nodemailer-express-handlebars');

  if (settings.mailgun || settings.production.mailgun){
    $.mail_mailgun = true;
    var mg = require('nodemailer-mailgun-transport');
    var mailgun_auth = settings.mailgun;
    if (app.get('env') === 'production' && settings.production.mailgun){
      mailgun_auth = settings.production.mailgun;
    }
    mail_transport = nodemailer.createTransport(mg({ auth: mailgun_auth}));
  }else{
    $.mail_mailgun = false;
    var smtp_options = settings.smtp;
    if (app.get('env') === 'production' && settings.production.smtp){
      smtp_options = settings.production.smtp;
    }
    mail_transport = nodemailer.createTransport(smtp_options);
  }
  mail_transport.use('compile', hbs({
    viewEngine: handlebars.engine,
    viewPath: __dirname + '/app/pages',
    extName: '.hbs'
  }));
  mail_transport.use('compile', htmlToText());
}

$.mail_transport = mail_transport;





















// ----------------------------------------
//  import application code
// ----------------------------------------

require(__dirname + '/app/compiled/scripts-server.js')(app, $);





// ----------------------------------------
//  handle 404s
// ----------------------------------------

app.use(function (req, res, next) {
  res.status(404).render('404', {
    title: '404 not found',
    layout: false
  });
});





// ----------------------------------------
//  ready for launch
// ----------------------------------------

var port_listen = settings.port

if (app.get('env') === 'production' && settings.production.port){
  port_listen = settings.production.port;
}

app.listen(port_listen);

console.log('♥♥ http://localhost:'+port_listen+' ♥♥ ('+app.get('env')+')');
