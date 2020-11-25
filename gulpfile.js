var gulp = require('gulp'),
    Concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    zip = require('gulp-zip'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin');



// html task
gulp.task('html',function(){
  return gulp.src('index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
    .pipe(notify("HTML Task Is Done"))
})


// css task
gulp.task("css",function() {
  return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(Concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("CSS Task Is Done"))
});

// js task
gulp.task("js",function(){
  return gulp.src(["js/one.js","js/two.js","js/three.js"])
    .pipe(Concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload())
    .pipe(notify("JS Task Is Done"))
});

// compress finale project files
gulp.task('compress',function(){
  return gulp.src('dist/**/*.*')
    .pipe(zip('simple site.zip'))
    .pipe(gulp.dest('.'))
})

gulp.task('images',function(){
  gulp.src('images/*')
    .pipe(imagemin())
    .pipe(notify("images have compressed"))
    .pipe(gulp.dest('dist/images'))
})


// watch task
gulp.task('watch', function(){
  require('./server.js')
  livereload.listen()
  gulp.watch('index.pug',gulp.series('html'))
  gulp.watch('sass/*.scss',gulp.series('css'))
  gulp.watch('js/*.js',gulp.series('js'))
  gulp.watch('dist/**/*.*',gulp.series('compress'))
  gulp.watch('images/*',gulp.series('images'))
})