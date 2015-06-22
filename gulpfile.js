var gulp = require('gulp'),
gutil = require('gulp-util'),
concat = require('gulp-concat'),
rename = require("gulp-rename"),
stylus = require('gulp-stylus'),
uglify = require('gulp-uglify'),
Filter = require('gulp-filter'),
nib = require('nib'),
cssmin = require('gulp-cssmin');

gulp.task('css-min',function(){
  var filter = Filter('**/*.styl');

  return gulp.src([
    './src/style/**/*.styl',
    './src/style/**/*.css'
  ])
  .pipe(filter)
  .pipe(stylus({
    use:nib(),
    compress: true
  }))
  .pipe(filter.restore())
  .pipe(cssmin())
  .pipe(concat('base.css'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/style'));
});

gulp.task('unifyjs',function(){
  return gulp.src('./src/scripts/**/*.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy-html', function(){
  return gulp.src('./src/views/**/*.html')
  .pipe(gulp.dest('./dist/views'));
});

gulp.task('default',['copy-html','css-min','unifyjs'],function(){
  gulp.watch('./src/views/**/*.html', ['copy-html']);
  gulp.watch([
    './src/style/**/*.styl',
    './src/style/**/*.css'
  ],['css-min']);
  gulp.watch('./src/scripts/**/*.js', ['unifyjs']);
});
