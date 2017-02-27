/**
 * Created by quoctho.nguyen on 13/09/2016.
 */
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//jshint
gulp.task('lint',function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Compile Our Sass
gulp.task('sass',function(){
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'));
});
// browserSync
gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
    gulp.watch(['scss/*.css'], reload);
    gulp.watch(['assets/images/*.css'], reload);
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});
// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch','serve']);