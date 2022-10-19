var gulp = require('gulp'); 

/* css task */
require("./css");
/* scss task */
require("./sass");
/* js task */
require("./script");

/* default task */
// Can define like below
gulp.task("default", gulp.parallel(['css', 'sass', 'js']));
gulp.task("dev", gulp.parallel(['css', 'sass', 'js']));
gulp.task("prod", gulp.parallel(['css', 'sass', 'js']));
// Or
// function defaultTask(cb) {
//     gulp.parallel(['sass', 'js'])
//     cb();
// }
// exports.default = defaultTask;