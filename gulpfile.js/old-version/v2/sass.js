require("./sass.prod");

var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass')(require("sass")); 

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

/* watch change task */
function watchStyles() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
}

gulp.task("sass", buildStyles);
gulp.task("sass:watch", watchStyles);