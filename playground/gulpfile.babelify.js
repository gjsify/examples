const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
const buffer = require('gulp-buffer');
const terser = require('gulp-terser');
const babelify = require('babelify');
const watchify = require('gulp-watchify');
const rename = require("gulp-rename");

let watching = false

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

gulp.task('enable-watch-mode', () => { watching = true })

gulp.task('build', watchify(function(watchify) {
    return gulp.src(bundlePaths.src)
        .pipe(watchify({
            watch:watching,
            debug:true,
            setup: (bundle) => {
                bundle.transform(babelify, {
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
                })
            }
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
}))

gulp.task('watch', gulp.series(['enable-watch-mode', 'build']))

gulp.task('default', gulp.series(['build']))
