var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass')(require("sass")); 
const rename = require('gulp-rename');

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(cssnano())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./dist/css'));
}

/* watch change task */
function watchStyles() {
    gulp.watch('app/sass/**/*.scss', gulp.series('sass:prod'));
}

gulp.task("sass:prod", buildStyles);
gulp.task("sass:prod:watch", watchStyles);