const gulp = require("gulp");
// const sourcemaps = require('gulp-sourcemaps');
const buffer = require("gulp-buffer");
const terser = require("gulp-terser");
const babelify = require("babelify");
// const watchify = require("gulp-watchify");
const rename = require("gulp-rename");
const tap = require("gulp-tap");
const browserify = require("browserify");


const babelOptions = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: true
        }
      }
    ]
  ],
  extensions: [".js", ".ts"]
};
const browserifyOptions = {
  debug: true,
  insertGlobalVars: {
    console: function(file, dir) {
      return 'require("console")'
    }
  }
};

const bundlePaths = {
  src: ["src/index.ts", "!src/**/*.test.js"],
  dest: {
    path: "dist",
    basename: "index"
  }
};

const terserOptions = {
  output: {
    beautify: true
  }
};

gulp.task("build", () => {
  return (
    gulp
      .src(bundlePaths.src, { read: false })
      .pipe(
        tap(file => {
          const b = browserify(file.path, browserifyOptions).transform(
            babelify,
            babelOptions
          );
          // b.add(require.resolve("console-browserify"));
          // b.require("@gjsify/http", { expose: "http" });
          // b.require("inspect", { expose: "inspect" });
          // b.require("inherits", { expose: "inherits" });
          // b.require("util", { expose: "util" });
          b.require("console-browserify", { expose: "console" });
          // b.require("console-browserify");
          file.contents = b.transform(babelify, babelOptions).bundle();
        })
      )
      .pipe(buffer())
      // .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(terser(terserOptions))
      // .pipe(sourcemaps.write('./'))
      .pipe(
        rename({
          basename: bundlePaths.dest.basename,
          extname: ".js"
        })
      )
      .pipe(gulp.dest(bundlePaths.dest.path))
  );
});

gulp.task("watch", () => {
  return gulp.watch(bundlePaths.src, gulp.series(["build"]));
});

gulp.task("default", gulp.series(["build"]));
