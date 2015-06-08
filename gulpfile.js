var gulp          = require('gulp');
var sass          = require('gulp-sass');
var minifyCSS     = require('gulp-minify-css');
var browserSync   = require('browser-sync');
var size          = require('gulp-size');
var rename        = require('gulp-rename');
var prefix        = require('gulp-autoprefixer');
var watch         = require('gulp-watch');

/*
 * Sass task
 */

gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded', includePaths: ['scss']}))
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('css'))
    .pipe(size({gzip: false, showFiles: true, title:'original'}))
    .pipe(minifyCSS())
    .pipe(size({gzip: false, showFiles: true, title:'minified'}))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .on('error', mindError);
});

/*
 * Browser task
 */

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css"], {
        server: {
            baseDir: "./"
        }
    });
});

/*
 * Prevents breakage
 */

function mindError(error) {
  console.log(error.toString());
  this.emit('end');
}

/*
 * Default task, just run 'gulp'
 */

gulp.task('default', ['sass', 'browser-sync'], function(){
  gulp.watch("scss/**/*.scss", ['sass']);
});