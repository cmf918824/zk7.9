// 1.	按照原图进行页面的高度还原。
// 2.	实现移动端的适配问题；
// 3.	页面最大宽度限定为640px；
// 4.	页面的最小宽度限定为320px；
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minhtml = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var url = require('url');
var fs = require('fs');
var path = require('path');
var listData = require('./data/data.json');
// 7.	使用gulp启动服务进行页面的渲染；
gulp.task('server', ['devScss', 'devJs'], function() {
    gulp.src('./src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: '1', msg: listData }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
                }
            }
        }))
});
// 5.	使用gulp进行项目的构建；
// 6.	使用gulp进行接口的开发；
gulp.task('devScss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('src/css'))
});
gulp.task('devJs', function() {
    gulp.src(['./src/js/*.js', './src/js/*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/js'))
});
gulp.task('watch', function() {
    gulp.src('./src/scss/*scss', ['devScss'])
});
gulp.task('dev', ['server', 'watch']);

//上线环境
gulp.task('duileHtml', function() {
    // 17.	使用gulp实现html文件的压缩；
    gulp.src('./src/**/*html')
        .pipe(minhtml())
        .pipe(gulp.dest('duile'))
});
// 19.	使用gulp实现js文件的压缩；
gulp.task('duileJs', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('duile/js'))
});
// 18.	使用gulp实现css文件的压缩；
gulp.task('duileCss', function() {
    gulp.src('./src/scss/*scss')
        .pipe(concat('all.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('duile/css'))
});
//合并
gulp.task('duile', ['duileHtml', 'duileJs', 'duileCss'])

// 8.	在本地创建版本库；
// 9.	本地git具有git的提交记录；
// 10.	将本地git版本库与远程版本库进行关联；
// 11.	将本地git版本提交到远程，与远程同步；
// 14.	对于公共代码的封装