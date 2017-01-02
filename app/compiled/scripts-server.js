module.exports = function(app, $){ if ($.mongoose){ var mongoose = $.mongoose; require('mongoose-query-paginate');}
// ----------------------------------------
//  custom handlebars helpers
// ----------------------------------------

app.use(function(req, res, next){
  res.locals.helpers = {

    // expression helper
    // literally: function (input) {
    //   return input;
    // },

    // block helper
    // sample_logic: function(v1, v2, options){
    //   if (v1 === v2){
    //     return options.fn(this); // true
    //   }
    //   return options.inverse(this); // false
    // }

  };
  next();
});





// ----------------------------------------
//  index route
// ----------------------------------------

app.get('/', function (req, res) {
  res.render('index', {});
});
}