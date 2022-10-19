var gulp = require('gulp'); 
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass')(require("sass")); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');

/* sass task */
function buildStyles() {
    // TODO: How to set name *.min.css after cssnano
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('./css'));
}
gulp.task("sass", buildStyles);

/* js task */
function buildScripts() {
    return gulp.src(['app/js/plugin/**/*.js', 'app/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
}
gulp.task("js", buildScripts);


/* watch change task */
function watchStyles() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
}
function watchScripts() {
    gulp.watch('app/js/**/*.js', ['js']);
}
gulp.task('watch', function() {
    watchStyles();
    watchScripts();
});
/* Export just for fun */
exports ={
    css: {
        build: buildStyles,
        watch: watchStyles
    },
    js: {
        build: buildScripts,
        watch: watchScripts,
    },
};

/* default task */
// Can define like below
gulp.task("default", gulp.parallel(['sass', 'js']));
// Or
// function defaultTask(cb) {
//     gulp.parallel(['sass', 'js'])
//     cb();
// }
// exports.default = defaultTask;