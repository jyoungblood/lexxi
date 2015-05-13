// make global config variables (and other helpful information) available to the templates
	// it's here in case you want to add stuff to it
var global_construct = function(req, $) {
  return {
    auth_token: req.cookies.auth_token,
    admin_token: req.cookies.admin_token,
    moderator_token: req.cookies.moderator_token,
    year: new Date().getFullYear(),
    site_title: $.config.site_title,
    site_code: $.config.site_code,
    site_url: $.config.site_url,
    google_ua: $.config.google_ua
  };
};




app.get('/', function (req, res) {
  var global = global_construct(req, $);
  res.render('index', {
      title: 'hi',
      global: global
  });
});
