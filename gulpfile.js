var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    plumber     = require('gulp-plumber'),
    styleguide  = require('devbridge-styleguide'),
    gls         = require("gulp-live-server");


// sass,pleeease
gulp.task('sass', function() {
  return sass('sass/style.scss', {
    style: 'expanded', //expanded, nested, compressed
    sourcemap: false
  })
  .pipe(gulp.dest('assets/css/'));
});



// live-server
gulp.task('serve', function() {
  //1. serve with default settings
  var server = gls.static('/', 3002); //equals to gls.static('public', 3000);
  server.start();
  //
  // //2. serve at custom port
  // var server = gls.static('dist', 8888);
  // server.start();
  //
  // //3. serve multi folders
  // var server = gls.static(['dist', '.tmp']);
  // server.start();
  //
  // //use gulp.watch to trigger server actions(notify, start or stop)
  // gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
  //   server.notify.apply(server, [file]);
  // });
});


// styleguide
gulp.task('styleguide', function(){
  styleguide.startServer();
});


// watch
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
});


// default
gulp.task('default', ['sass', 'serve', 'watch']);
