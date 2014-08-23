var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var merge = require('merge-stream');

gulp.task('buildTest', function () {
    var js = gulp.src('test/index.js')
        .pipe(browserify());

    var html = gulp.src('test/index.html');

    merge(html, js)
        .pipe(gulp.dest('./tmp/'))
        .pipe(connect.reload());
});

gulp.task('build', function () {
    var js = gulp.src('app/js/index.js')
        .pipe(browserify());

    var html = gulp.src('app/index.html');

    merge(html, js)
        .pipe(gulp.dest('./tmp/'))
        .pipe(connect.reload());
});

gulp.task('serve', function () {
    connect.server({
        root: ['tmp', 'test'],
        port: 8080,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['./test/**/*', './lib/**/*'], ['buildTest']);
});

gulp.task('watchMain', function () {
    gulp.watch(['app/**/*', 'lib/**/*'], ['build'])
});

gulp.task('test', ['buildTest', 'serve', 'watch']);
gulp.task('default', ['build', 'serve', 'watchMain']);