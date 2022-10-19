var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/css/**/*.css')
		.pipe(sourcemaps.init())

		.pipe(autoprefixer())
		.pipe(concat('all.css'))

        .pipe(cssnano())
        .pipe(rename({extname: '.min.css'}))

		.pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest('./dist/css'));
}

/* watch change task */
function watchStyles() {
    gulp.watch('app/css/**/*.css', ['css']);
}

gulp.task("css:prod", buildStyles);
gulp.task("watch:css:prod", watchStyles);