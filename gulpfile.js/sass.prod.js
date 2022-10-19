var gulp = require("gulp");
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass')(require("sass")); 
const rename = require('gulp-rename');
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

/* sass task */
const prod = {
    buildStyles: function () {
        // TODO: How to set name *.min.css after cssnano
        return gulp
            .src("app/sass/**/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(sourcemaps.init())

            .pipe(autoprefixer())
            // Disable if don't want to merge all file to `all.css`
            .pipe(concat("all.css"))

            .pipe(cssnano())
            .pipe(rename({ extname: ".min.css" }))

            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("./dist/css"));
    },

    /* watch change task */
    watchStyles: function () {
        gulp.watch("app/sass/**/*.scss", gulp.series("sass:prod"));
    },
}; 


gulp.task("sass:prod", prod.buildStyles);
gulp.task("sass:prod:watch", prod.watchStyles);