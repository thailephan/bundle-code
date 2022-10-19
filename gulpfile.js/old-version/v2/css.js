var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./css'));
}

/* watch change task */
function watchStyles() {
    gulp.watch('app/css/**/*.css', ['css']);
}

gulp.task("css", buildStyles);
gulp.task("watch:css", watchStyles);