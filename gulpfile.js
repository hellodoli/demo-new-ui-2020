var gulp = require('gulp');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
var gulp_watch_pug = require('gulp-watch-pug');

gulp.task('build', function () {
    return gulp.src('src/*.pug')
        .pipe(watch('src/*.pug'))
        .pipe(gulp_watch_pug('src/*.pug', { delay: 100 }))
        .pipe(pug())
        .pipe(gulp.dest('./'));
});
      