const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const header = require('gulp-header');
const pkg = require('./package.json');

const banner = [
  '/*! <%= pkg.name %> v<%= pkg.version %>',
  ' (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
  ' */\n'].join('');

function es5() {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify({
            output: {
                comments: false,
                beautify: true
            },
            mangle: false,
            compress: false
        }))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'))
}

function es5minify() {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist'))
}

exports.default = gulp.parallel(es5, es5minify);
