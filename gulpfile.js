var gulp = require('gulp-help')(require('gulp'));
var fileinclude = require('gulp-file-include');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
    runSequence('copy-files', 'compile-template', cb);
});

gulp.task('compile-template', function() {
    gulp.src(['./delta/templates/src/*.html'])
        .pipe(fileinclude())
        .pipe(gulp.dest('./delta/dist/'));
});

gulp.task('copy-files', function() {
    gulp.src(['./delta/templates/src/**/*', "!./delta/templates/src/*.html"])
        .pipe(gulp.dest('./delta/dist/'));
});

gulp.task('clean', function () {
    del('./delta/dist');
});
