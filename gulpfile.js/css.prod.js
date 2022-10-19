var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

/* sass task */
var prod = {
    buildStyles: function () {
        // TODO: How to set name *.min.css after cssnano
        return gulp
            .src("app/css/**/*.css")
            .pipe(sourcemaps.init())

            .pipe(autoprefixer())
            // Disable if don't want to merge all file to `all.css`
            .pipe(concat("all.css"))

            .pipe(cssnano())
            .pipe(rename({ extname: ".min.css" }))

            .pipe(sourcemaps.write(".", { addComment: false }))
            .pipe(gulp.dest("./dist/css"));
    },

    /* watch change task */
    watchStyles: function () {
        gulp.watch("app/css/**/*.css", ["css"]);
    },
};

gulp.task("css:prod", prod.buildStyles);
gulp.task("watch:css:prod", prod.watchStyles);