// UNCOMMENT TO ENABLE MONGOOSE
//
// var schemas = {},
//     models = {};
//
// $.mongoose.connect('mongodb://'+$.config.db.username+':'+$.config.db.password+'@'+$.config.db.host+'/'+$.config.db.name);
//
// var db = $.mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));




// EXAMPLE SETUP

// schemas.user = {
//   screenname: String,
//   password: String,
//   email: String,
//   city: String,
//   state: String,
//   zip: String,
//   validate_hash: String,
//   password_hash: String,
//   ua_header: String,
//   ip_address: String,
//   date_last_login: Date,
//   admin: { type: Boolean, default: false },
//   date_created: { type: Date, default: Date.now },
//   avatar: {
//     small: { type: String, default: '/images/avatar-default-s.png' },
//     medium: { type: String, default: '/images/avatar-default-m.png' },
//     large: { type: String, default: '/images/avatar-default-l.png' },
//     original: { type: String, default: '/images/avatar-default-o.png' }
//   }
// };

// var schema_user = new $.mongoose.Schema(schemas.user);
// models.user = $.mongoose.model('users', schema_user);


// EXAMPLE USAGE

// app.get('/user/:_id', function (req, res) {
//   models.user.findOne({ id: req.params._id }).exec(function(err, data){
//   if (err) return handleError(err);
//     res.render('stallion-detail', {
//         title: 'Edit User',
//         data: data
//     });
//   });
// });
