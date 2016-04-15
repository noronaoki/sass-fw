var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    sourcemap   = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    pleeease    = require('gulp-pleeease'),
    tinypng     = require('gulp-tinypng'),
    gif         = require('gulp-if'),
    footer      = require('gulp-footer'),
    browserSync = require('browser-sync');


// sass,pleeease
gulp.task('sass', function() {
  return sass('sass/style.scss', {
    style: 'expanded',
    sourcemap: true
  })
  .pipe(sourcemap.write())
  .pipe(pleeease({
      autoprefixer: {
          browsers: ['last 30 version', 'Firefox >= 20', 'ie 9']
      },
      rem:false,
      minifier: false // minify無効
  }))
  .pipe(gulp.dest('assets/css/'));
});


// sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('tiny/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '#{$img-path}/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    algorithm: 'binary-tree', //結合アルゴリズム(top-down (default), left-right, diagonal, alt-diagonal, binary-tree)
    padding: 0, //画像同士のpadding
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('tiny/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('sass/')); //cssNameで指定したcssの保存先
});


// tiny png
gulp.task('tinypng', function () {
    gulp.src('tiny/*')
        .pipe(tinypng('pDRurCCYmFqEjjA6qfXk85_CbkKG-POI')) // API KEYは自分の使ってください
        .pipe(gulp.dest('assets/img/'));
});


// browserSync
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});


// bs-reload
gulp.task('bs-reload', function(){
  browserSync.reload();
});


// watch
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('tiny/sprite/*.png', ['sprite']);
  gulp.watch(['./*.html', 'assets/css/**/*.css'], ['bs-reload']);
});


// default
gulp.task('default', ['sass', 'sprite', 'tinypng', 'browser-sync', 'watch']);
