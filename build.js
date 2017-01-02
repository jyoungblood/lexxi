var fq = require('fquery');
var fs = require('fs');

fs.unlink('./app/compiled/scripts-server.js');

fq('./app/controllers/**/*.js')
.concat('\n')
.wrap("module.exports = function(app, $){ if ($.mongoose){ var mongoose = $.mongoose; require('mongoose-query-paginate');}", "}")
.write('./app/compiled/scripts-server.js');

process.exit();
