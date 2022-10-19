# Gulp getting started


## Project structure
- app/ -- contain all code of project, and will be transpile into `dist` folder after run **gulp tasks**

  - css/
    - button.css
    - list.css

  - js
    - ignore/
      - button.js
    - plugins/
      - d3.js
    - date-time.js
    - index.js

  - lib
    - jquery.js

  - sass
    - index.scss
    - sample.scss

- gulpfile.js/
  - old-version/** - contains old version of **gulp js tasks**
  - *.js - current version of **gulp js tasks**

- dist/
  - css/ - `Output folder` for css and scss after run **gulp tasks**
  - js/ - `Output folder` for js and ts after run **gulp tasks**

- index.html - base input file for web access
- package.json - contain information about this project like package, scripts,...
- readme.md - information file, help other developer to read and understand project better


## Current tasks defined 
- js
- js:watch
- js:prod
- js:watch:prod

- css 
- css:watch
- css:prod
- css:watch:prod

- sass 
- sass:watch
- sass:prod
- sass:watch:prod


## Gulp main function
- `.task()` -  Creates a task, as mentioned above
- `.src()` -  identifies what files you will be compiling in a particular task
- `.pipe()` - adds a function to the Node stream that Gulp is using; you can pipe multiple functions in the same task (read an excellent write-up on this topic on florian.ec)
- `.dest()` - writes the resulting file to a specific location
- `.watch()` -  identifies the files to detect any changes
- More on [gulpjs](https://gulpjs.com/docs/en/getting-started/quick-start)

## Creating tasks
Each gulp task is an asynchronous JavaScript function - a function that accepts an error-first callback or returns a stream, promise, event emitter, child process, or observable 

### Exporting
Tasks can be **public** or **private** 
- Public tasks are exported from your gulpfile, which allows them to be run by the gulp command.
- Private tasks are made to be used internally, usually used as part of `series()` or `parallel()` composition.
A private task looks and acts like any other task, but an end-user can't ever execute it independently.
Ex: 
```
const { series } = require('gulp');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
  // body omitted
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
// clean task can not be executed by `yarn <task>` but can be call by another tasks
exports.default = series(clean, build);
```

### Compose Taks
Gulp provides two powerful composition methods, `series()` and `parallel()`, allowing individual tasks to be composed into larger operations.
`series()` for executing tasks in order and `parallel()` for executing task at maximum **concurrency**
Ex:
```
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```
series() and parallel() can be nested to any arbitrary depth.
Ex:
```
...
exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```

When a composed operation is run, each task will be executed every time it was referenced.
For example, a clean task referenced before two different tasks would be run twice and lead to undesired results
Ex:
```
// This is INCORRECT
...
const clean = function(cb) {
  // body omitted
  cb();
};

const css = series(clean, function(cb) {
  // body omitted
  cb();
});

const javascript = series(clean, function(cb) {
  // body omitted
  cb();
});

exports.build = parallel(css, javascript);
```
but
```
...
function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));
```


### Explaining globs
- Segments and separators
`\` is escape character, so avoid using Node's `path` package's methods like `path.join` to create blobs.
The same for `__dirname`, `process.cwd`, `__filename`
- Special character: `*` (single-star)
- Special character: `**` (double-star)
- Special character: `!` (negative) - Exclude specified folders or files
Ex: 
```
- 'temp/*.js' for any file name in one specified folder
- '**/*.js' for any file name in **any** folder 
- Negative: ['**/*.js', '!node_modules/**']
```


## Some gulp plugins
### [gulp](https://www.npmjs.com/package/gulp) (required)
Base plugin to create gulp tasks

### [gulp-cli](https://www.npmjs.com/package/gulp-cli)
Gulp runtime help running gulp tasks in cmd

### [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
Minifies your JS file

### [gulp-concat](https://www.npmjs.com/package/gulp-concat)
concatenates(combines) multiple JS file into one large file

### [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
Minifies your css file

### [gulp-sass](https://www.npmjs.com/package/gulp-sass)
Compiles your Sass files into CSS

### [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
Generate sourcemaps for production version of js, ts, css, sass, less files.
Sourcemaps help uglify one line code can be view easier. Helper debug in production better, and in should not be use in development

### [gulp-babel](https://www.npmjs.com/package/gulp-sourcemaps)
- Need to install `gulp-babel`, `@babel/core`, `@babel/preset-env` for compiling js code into ES5 version
- Need to install  `gulp-typescript` to convert ts to js. With babel, `@babel/preset-typescript` for ts files code into ES5 version (example)[https://babeljs.io/docs/en/babel-preset-typescript]
    - This plugin is for babel only, not use in gulp

### [gulp-concat](https://www.npmjs.com/package/gulp-concat)
Merge all files into one file. It support for both css and js
### [gulp-rename](https://www.npmjs.com/package/gulp-rename)
Rename filename of file in gulp `pipe`. Ex: add extname, prefix, suffix,...
### [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
Add prefix for css in order to support much version of browser as possible


### Install command
- Base command
```
  $ yarn add -D <plugin>
```
- Typescript with gulp plugin
```
  $ yarn add -D gulp typescript gulp-typescript
  $ yarn add -D browserify tsify vinyl-source-stream // Add browserify - move project from Node to the browser
  $ yarn add -D watchify fancy-log // Add watchify - read file change and run task
  $ yarn add -D babelify@8 babel-core babel-preset-es2015 vinyl-buffer gulp-sourcemaps // Add `babel` to compile ts to js or `terser`
```


## Note
Gulp can run multiple tasks with one command
```
gulp <task> <other-task>
```
Ex:
To execute task `sass` and `css` then run command in command line
```
yarn gulp sass css
```
