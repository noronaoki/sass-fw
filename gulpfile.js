var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    sourcemap   = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    pleeease    = require('gulp-pleeease'),
    tinypng     = require('gulp-tinypng'),
    gif         = require('gulp-if'),
    footer      = require('gulp-footer'),
    styleguide  = require('devbridge-styleguide'),
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
          browsers: ['last 3 version', 'ie 11']
      },
      rem:false,
      minifier: false // minify??��??
  }))
  .pipe(gulp.dest('assets/css/'));
});


// sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('tiny/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png', //??��???????��???????��??
    cssName: '_sprite.scss', //???????????????scss
    imgPath: '#{$img-path}/sprite.png', //???????????????scss???�?�????????????????
    cssFormat: 'scss', //????????��????????
    algorithm: 'binary-tree', //�??????��????��????��??(top-down (default), left-right, diagonal, alt-diagonal, binary-tree)
    padding: 0, //??��?????�????padding
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(???????????????Scss??????????????????�???��??�?覧�????????)
    }
  }));
  spriteData.img.pipe(gulp.dest('tiny/')); //imgName??��??�?????????��???????��????��?????�?�????
  spriteData.css.pipe(gulp.dest('sass/')); //cssName??��??�???????css???�?�????
});


// tiny png
gulp.task('tinypng', function () {
    gulp.src('tiny/*')
        .pipe(tinypng('pDRurCCYmFqEjjA6qfXk85_CbkKG-POI'))
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


// styleguide
gulp.task('start-styleguide', function(){
  styleguide.startServer();
});
// watch
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('tiny/sprite/*.png', ['sprite']);
  gulp.watch(['./*.html', 'assets/css/**/*.css'], ['bs-reload']);
});


// default
gulp.task('default', ['sass', 'sprite', 'tinypng', 'browser-sync', 'watch']);
