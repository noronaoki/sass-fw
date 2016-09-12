var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    sourcemap   = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    // pleeease    = require('gulp-pleeease'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng     = require('gulp-tinypng-compress'),
    styleguide  = require('devbridge-styleguide'),
    browserSync = require('browser-sync');


// sass,pleeease
gulp.task('sass', function() {
  return sass('sass/style.scss', {
    style: 'expanded', //expanded, nested, compressed
    sourcemap: true
  })
  .pipe(sourcemap.write())
  .pipe(autoprefixer({
      autoprefixer: {
          browsers: ['last 3 version', 'ie 11']
      }
  }))
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
  spriteData.css.pipe(gulp.dest('sass/object/utility/')); //cssNameで指定したcssの保存先
});


// tiny png
gulp.task('tinypng', function () {
  gulp.src('assets/img/*.{png, jpg, jpeg}')
    .pipe(tinypng({
      key: 'pDRurCCYmFqEjjA6qfXk85_CbkKG-POI',
      log: true
    }))
    .pipe(gulp.dest('assets/img/'));
});


// browserSync
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './',
      directory: true
    },
    port: 3001,
    browser: "google chrome",
    notify: false
  });
});


// bs-reload
gulp.task('bs-reload', function(){
  browserSync.reload();
});


// styleguide
gulp.task('styleguide', function(){
  styleguide.startServer();
});


// watch
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('assets/img/sprite/*.png', ['sprite']);
  gulp.watch(['./**/*.html', 'assets/css/**/*.css'], ['bs-reload']);
});


// default
gulp.task('default', ['sass', 'sprite', 'browser-sync', 'watch']);
