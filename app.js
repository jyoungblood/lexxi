var express = require('express'),
    exphbs  = require('express3-handlebars'),
    app = express(),
    q = require('q'),
    lexi = require('./lexi'),
    config = require('./app/config');

//    helpers = require('./app/scripts_server/helpers'),
    // mongoose = require('mongoose'),
    // passport = require("passport"),
    // local_strategy = require('passport-local').Strategy,


var hbs = exphbs.create({
    defaultLayout: 'base',
    extname: '.hbs',
//        helpers      : helpers,
    partialsDir: [
        'app/templates/_partials/'
    ],
    layoutsDir: 'app/templates/_layouts/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './app/templates');
app.use("/compiled", express.static(__dirname + "/app/compiled"));
app.use("/bower_components", express.static(__dirname + "/app/bower_components"));
app.use("/images", express.static(__dirname + "/app/images"));
app.use("/fonts", express.static(__dirname + "/app/fonts"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/scripts_client", express.static(__dirname + "/app/scripts_client"));


////////////////////////////////////////////////////////////////////////////

// fixit separate env/prod configs

// if (config.db){
//     mongoose.connect(config.db);
//     var db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
// }

app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.session({ secret: 'LEXISECRET666' }));
// app.use(passport.initialize());
// app.use(passport.session());

var $ = {
    app: app,
    q: q,
    lexi: lexi,
    config: config
//    db: db,
//    mongoose: mongoose,
};


////////////////////////////////////////////////////////////////////////////

require('./app/compiled/scripts-server.js')(app, $);

app.get('*', function(req, res){
    res.status(404).render('404');
});

app.listen(3000);

console.log('♥ http://localhost:3000');
