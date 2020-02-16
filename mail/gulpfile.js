const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
const buffer = require('gulp-buffer');
const terser = require('gulp-terser');
const babelify = require('babelify');
const watchify = require('gulp-watchify');
const rename = require("gulp-rename");
const tap = require("gulp-tap");
const browserify = require('browserify')

const babelOptions = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env",
    {
        "targets": {
            "node": true
        }
    }]
  ],
  extensions: ['.js', '.ts'],
}

console.log('browserify', browserify);

const browserifyOptions = {
  debug: true,
}

const bundlePaths = {
    src: [
      'src/index.ts',
      '!src/**/*.test.js'
    ],
    dest: {
        path: 'dist',
        basename: 'index'
    }
}

const terserOptions = {
    output: {
        beautify: true,
    }
}

gulp.task('enable-watch-mode', () => { 
  gulp.watch(bundlePaths.src, ['build']);
})

gulp.task('build', () => {

  return gulp.src(bundlePaths.src, { read: false })
    .pipe(tap((file) => {
      const b = browserify(file.path, browserifyOptions).transform(babelify, babelOptions)
      b.require('@gjsify/http', {expose: 'http'})
      file.contents = b.transform(babelify, babelOptions).bundle();
    }))
    .pipe(buffer())
    // .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser(terserOptions))
    // .pipe(sourcemaps.write('./'))
    .pipe(rename({
      basename: bundlePaths.dest.basename,
      extname: ".js"
    }))
    .pipe(gulp.dest(bundlePaths.dest.path))
})

gulp.task('watch', gulp.series(['enable-watch-mode', 'build']))

gulp.task('default', gulp.series(['build']))
