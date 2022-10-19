var gulp = require('gulp'); 

/* css task */
require("./css");
require("./css.prod");

/* scss task */
require("./sass");
require("./sass.prod");

/* js task */
require("./script");
require("./script.prod");

/* ts task */
require("./script-ts");

/* default task */
// Can define like below
gulp.task("default", gulp.parallel(['css', 'sass', 'js']));
gulp.task("dev", gulp.parallel(['css', 'sass', 'js']));
gulp.task("prod", gulp.parallel(['css:prod', 'sass:prod', 'js:prod']));
// Or
// function defaultTask(cb) {
//     gulp.parallel(['sass', 'js'])
//     cb();
// }
// exports.default = defaultTask;