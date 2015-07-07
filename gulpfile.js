var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

var stylish = require('jshint-stylish');

gulp.task('jshint', function(){
  return gulp.src('src/*.js')
    .pipe(watch('src/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(){
  return gulp.src('spec/*.js')
    .pipe(jasmine({
      verbose: true
    }));
});


gulp.task('watch', ['jshint', 'test']);

gulp.task('build', function(){
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});
