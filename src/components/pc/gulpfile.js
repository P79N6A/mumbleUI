/**
 * Created by harrywan on 2017/3/9.
 */
var gulp = require("gulp");
var gutil = require("gulp-util");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss 	= require('gulp-minify-css');
var sass = require("gulp-sass");
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var del = require('del');   //删除文件

// A callback function to handle error
function handleError(err) {
    new gutil.PluginError("sass", err)
}

// Webpack packaging
var webpackConfig = require('./webpack.config');
gulp.task("webpack", function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            chunks: false,
            colors: true,
            timings: true
        }));
        callback();
    });
});

// Task clean
gulp.task('clean', function(){
    del("./dist", function (err, paths) {
    });
});

gulp.task("js", ['webpack'], function(callback) {
    return gulp.src("./dist/ui-webank.js")
        .pipe(uglify(
            {
                mangle: {except: ['require' ,'exports' , 'module']} //排除混淆关键字
            }
        ))
        .pipe(rename('ui-webank.min.js'))
        .pipe(gulp.dest('./dist'));
});

//编译sass
gulp.task('css', function() {
    return gulp.src("./src/styles/index.scss")
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox 26', 'chrome 19', 'Opera 12.1', 'ios_saf 4', 'Android 4']
        }))
        .pipe(rename('ui-webank.css'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(cleanCSS())
        .pipe(rename('ui-webank.min.css'))
        .pipe(gulp.dest('./dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('./src/styles/iconfont/*.*')
        .pipe(gulp.dest('./dist/styles/iconfont'));
});

gulp.task('default', ['css', 'fonts', 'js']);
