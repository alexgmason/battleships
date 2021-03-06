var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

var stylish = require('jshint-stylish');

gulp.task('jshint', function(){
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(){
  return gulp.src('spec/*.js')
    .pipe(jasmine());
});

gulp.task('watch', function(){
  gulp.watch('src/*.js', ['jshint', 'test']);
});

gulp.task('build', function(){
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});
