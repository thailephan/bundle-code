var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/css/**/*.css')
		.pipe(autoprefixer())
		.pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'));
}

/* watch change task */
function watchStyles() {
    gulp.watch('app/css/**/*.css', ['css']);
}

gulp.task("css", buildStyles);
gulp.task("watch:css", watchStyles);