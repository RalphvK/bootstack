'use strict';

// node modules
var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var mergeStream = require('merge-stream');
var autoprefixer = require('gulp-autoprefixer');

// path config
var pathCfg = require('./gulpcfg');
var path = {
    get scss() { return this[this.env].scss; },
    get css() { return this[this.env].css; },
    js_src: function (name = null) {
        var env = this[this.env];
        if (name) {
            return env.js_src + name + '.js';
        } else {
            return env.js_src + env.js_src_name + '.js';
        }
    },
    get js() { return this[this.env].js; }
};
// merge path with pathCfg
Object.assign(path, pathCfg);

// scss compile task
gulp.task('scss', function () {
    return gulp.src(path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.css))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.css));
});
gulp.task('scss-minify', function () {
    return gulp.src(path.scss)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.css));
});

// concatenate javascript task
gulp.task('concat_js', function () {
    // load index.json
    var index = JSON.parse(fs.readFileSync('./js/index.json'));
    var includesMap = new Map(Object.entries(index.includes));
    console.log('Building ' + includesMap.size + ' separate output files.');
    // generate tasks for each output file
    var tasks = [];
    includesMap.forEach(function (fileList, name) {
        tasks.push(
            gulp.src(fileList) // file array
                .pipe(concat(path.js_src(name)))
                .pipe(gulp.dest(path.js))
                .pipe(minify({
                    ext: {
                        src: '',
                        min: '.min.js'
                    },
                    noSource: true
                }))
                .pipe(gulp.dest(path.js))
        );
    });
    // return tasks
    return mergeStream(...tasks);
});

// watch
gulp.task('watch', function () {
    gulp.watch('./js/partials/**/*.js', gulp.series('concat_js'));
    gulp.watch('./js/index.json', gulp.series('concat_js'));
    gulp.watch('./scss/**/*.scss', gulp.series('scss', 'scss-minify'));
});

// standard task for gulp
gulp.task('default', gulp.series('watch', 'concat_js', 'scss', 'scss-minify'));