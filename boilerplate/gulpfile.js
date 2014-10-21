
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    wrapper = require('gulp-wrapper');


gulp.task('styles', function () {
  gulp.src('app/styles/app.scss')
    .pipe(sass({includePaths: ['app/styles']}))
    .pipe(gulp.dest('app/compiled'));
});


gulp.task('scripts-server', function() {
  gulp.src(['app/scripts_server/**/*.js'])
    .pipe(concat('scripts-server.js'))
    .pipe(wrapper({
       header: 'module.exports = function(app, $){',
       footer: '}'
    }))
    .pipe(gulp.dest('app/compiled'));
});


gulp.task('scripts-client', function() {
  gulp.src(['app/scripts_client/**/*.js'])
      .pipe(concat('scripts-client.js'))
      .pipe(gulp.dest('app/compiled'));
});


gulp.task('server', function(){
  nodemon({
    script: 'app.js',
    ext: 'js hbs scss',
    ignore: ['node_modules/**', '.git/**', 'app/bower_components/**']
  })
  .on('change', ['build'])
  .on('restart', function () {
  });
});




// fixit livereload
  // open the browser window after the server has started

// fixit build-optimize
  // package to 'dist' folder
    // minify
    // uglify
    // imagemin
    // copy everything else


gulp.task('build', ['styles', 'scripts-server', 'scripts-client']);
gulp.task('dev', ['build', 'server']);
gulp.task('package', ['build', 'build-optimize']);
