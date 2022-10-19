// 1. Browserify version
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var fancy_log = require("fancy-log");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

// https://www.typescriptlang.org/docs/handbook/gulp.html#terser
// https://luyenkimmau.com.vn/browserify-la-gi/

var paths = {
  pages: ["app/**/*.html"],
};

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["app/ts/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);

function bundle() {
    return watchedBrowserify 
      .transform("babelify", {
        presets: ["es2015"],
        extensions: [".ts"],
      })
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist"));
}

gulp.task(
  "ts",
  gulp.series(gulp.parallel("copy-html"), bundle)
);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);

// 2. Gulp version