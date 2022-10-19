var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const prod = {
    buildScripts: function () {
        return (
            gulp
                .src([
                    "app/js/plugin/**/*.js",
                    "app/js/**/*.js",
                    "!app/js/ignore/**",
                ])
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(
                    babel({
                        // Help convert JS down grade to ES2015
                        presets: ["@babel/env"],
                    })
                )
                // Disable if don't want to merge all file to `all.js`
                .pipe(concat("all.js"))

                .pipe(gulp.src(["app/lib/jquery.js"]))
                .pipe(uglify())
                .pipe(rename({ extname: ".min.js" }))

                .pipe(sourcemaps.write(".", { addComment: false }))
                .pipe(gulp.dest("dist/js"))
        );
    },
    watchScripts: function () {
        gulp.watch("app/js/**/*.js", gulp.series("js"));
    },
};


gulp.task("js:prod", prod.buildScripts);
gulp.task('js:watch:prod', prod.watchScripts);