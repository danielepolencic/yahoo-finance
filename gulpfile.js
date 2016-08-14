var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
  gulp
    .src('./lib/yahoo.finance.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('default', function() {
  gulp.watch('lib/*.js', ['build']);
});
