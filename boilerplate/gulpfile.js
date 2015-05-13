
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    wrapper = require('gulp-wrapper');


var paths = {
    scss: './app/styles/*.scss'
};


gulp.task('styles', function () {
  gulp.src(paths.scss)
    .pipe(sass({includePaths: ['app/styles'].concat()}))
    .pipe(gulp.dest('./app/compiled'));
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




gulp.task('build', ['styles', 'scripts-server', 'scripts-client']);
gulp.task('dev', ['build', 'server']);
gulp.task('package', ['build', 'build-optimize']);
