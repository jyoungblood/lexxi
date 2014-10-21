//
// var schemas = {},
//     models = {};
//
// $.mongoose.connect('mongodb://'+$.config.db.username+':'+$.config.db.password+'@'+$.config.db.host+'/'+$.config.db.name);
//
// var db = $.mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
//
//
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
//
//
// schemas.message = {
//   site_code: String,
//   body: String,
//   excerpt: String,
//   date_sent: { type: Date, default: Date.now },
//   date_read: Date,
//   user_id_sender: String,
//   user_id_recipient: String
// };
//
//
//
//
//
// var schema_user = new $.mongoose.Schema(schemas.user),
//     schema_message = new $.mongoose.Schema(schemas.message);
//
// models.user = $.mongoose.model('users', schema_user);
// models.message = $.mongoose.model('messages', schema_message);
