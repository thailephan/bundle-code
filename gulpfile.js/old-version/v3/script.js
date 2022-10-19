var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require('gulp-concat'); 

function buildScripts() {
    return gulp.src(['app/js/plugin/**/*.js', 'app/js/**/*.js', '!app/js/ignore/**'])
        .pipe(babel({
            // Help convert JS down grade to ES2015
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js/'))

        .pipe(gulp.dest('./dist/js'));
}

function watchScripts() {
    gulp.watch('app/js/**/*.js', gulp.series('js'));
}

gulp.task("js", buildScripts);
gulp.task('js:watch', watchScripts);