//引入插件
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var sequence = require('gulp-sequence');
var datajson = require('./data/data.json');

var fs = require('fs');
var path = require('path');
var url = require('url');

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === './favicon.ico') {
                    return false;
                }
                if (pathname === '/api/index') {
                    res.end(JSON.stringify(datajson))
                } else {
                    pathname = pathname === '/' ? './index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

//压缩css
gulp.task('devscss', function() {
    return gulp.src('./src/scss/*scss')
        .pipe(sass())
        .pipe(cleancss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest('./src/css'));
});

//压缩js
gulp.task('uglify', function() {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/newjs'))
});
//压缩html
gulp.task('htmlmin', function() {
    gulp.src('./src/*html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./src/html'))
});
//监听css
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*scss', ['devscss']);
});

gulp.task('default', function(cd) {
    sequence('devscss', 'uglify', 'htmlmin', 'watch', 'server', cd);
})