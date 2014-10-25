var express = require('express'),
    exphbs  = require('express3-handlebars'),
    app = express(),
    q = require('q'),
    _ = require('lodash'),
    // mongoose = require('mongoose'),
    helpers = require('./app/helpers'),
    config = require('./app/config');






var hbs = exphbs.create({
  defaultLayout: 'base',
  extname: '.hbs',
  helpers: helpers,
  partialsDir: ['app/templates/_partials/'],
  layoutsDir: 'app/templates/_layouts/'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './app/templates');

app.use(express.cookieParser('LEXXISECRET666'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './tmp' }));
app.use(express.session({ secret: 'LEXXISECRET666' }));

app.use("/compiled", express.static(__dirname + "/app/compiled"));
app.use("/bower_components", express.static(__dirname + "/app/bower_components"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/favicon.ico", express.static(__dirname + "/app/images/favicon.ico"));
app.use("/uploads", express.static(__dirname + "/app/uploads"));
app.use("/fonts", express.static(__dirname + "/app/fonts"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/scripts_client", express.static(__dirname + "/app/scripts_client"));


require('./app/compiled/scripts-server.js')(app, {
  config: config,
  q: q,
  _:_,
  // mongoose: mongoose
});


app.get('*', function(req, res){
    res.status(404).render('404', {
    title: '404 not found',
    global: {
      auth_token: req.cookies.auth_token,
      year: new Date().getFullYear()
      }
    } );
});

app.listen(3001);
console.log('♥ http://localhost:3001');
