var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    plumber     = require('gulp-plumber'),
    styleguide  = require('devbridge-styleguide'),
    browserSync = require('browser-sync');
    // gls         = require("gulp-live-server");


// sass,pleeease
gulp.task('sass', function() {
  return sass('sass/style.scss', {
    style: 'expanded', //expanded, nested, compressed
    sourcemap: false
  })
  .pipe(gulp.dest('assets/css/'));
});


// sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('assets/img/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライト画像のファイル名
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '#{$img-path}/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss',
    algorithm: 'binary-tree', //結合アルゴリズム(top-down (default), left-right, diagonal, alt-diagonal, binary-tree)
    padding: 0, //画像同士のpadding
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('assets/img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('sass/')); //cssNameで指定したcssの保存先
});



// browserSync
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './',
      directory: true
    }
  });
});



// live-server
// gulp.task('serve', function() {
//   //1. serve with default settings
//   var server = gls.static('/', 3000); //equals to gls.static('public', 3000);
//   server.start();
//   //
//   // //2. serve at custom port
//   // var server = gls.static('dist', 8888);
//   // server.start();
//   //
//   // //3. serve multi folders
//   // var server = gls.static(['dist', '.tmp']);
//   // server.start();
//   //
//   // //use gulp.watch to trigger server actions(notify, start or stop)
//   // gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
//   //   server.notify.apply(server, [file]);
//   // });
// });


// styleguide
gulp.task('styleguide', function(){
  styleguide.startServer();
});


// watch
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
});


// default
gulp.task('default', ['sass', 'browser-sync', 'watch']);
