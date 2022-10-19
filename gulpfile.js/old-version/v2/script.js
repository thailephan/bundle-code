var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function buildScripts() {
    return gulp.src(['app/js/plugin/**/*.js', 'app/js/**/*.js', '!app/js/ignore/**'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
            // Help convert JS down grade to ES2015
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js/'))

        .pipe(sourcemaps.write("app/maps", {addComment: false}))

        .pipe(gulp.src(["app/lib/jquery.js"]))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))

        .pipe(gulp.dest('./dist/js'));
}

function watchScripts() {
    gulp.watch('app/js/**/*.js', gulp.series('js'));
}

gulp.task("js", buildScripts);
gulp.task('js:watch', watchScripts);