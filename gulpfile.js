// Initialization
var gulp = require('gulp')
var stylus = require('gulp-stylus')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var pug = require('gulp-pug')
var browser_sync = require('browser-sync').create()

// Gulp tasks
task('styles', function() {
    gulp.src(['./app/styles/**/*.styl', '!./app/styles/**/_*.styl'])
        .pipe(stylus({compress: true}))
        .pipe(gulp.dest('./public/assets'))
        .pipe(browser_sync.stream())
})

task('scripts', function() {
    gulp.src(['./app/scripts/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets'))
        .pipe(browser_sync.stream())
})

task('images', function() {
    gulp.src('./app/assets/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(browser_sync.stream())
})

task('fonts', function() {
    gulp.src('./app/assets/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./public/assets/fonts'))
        .pipe(browser_sync.stream())
})

task('markup', function() {
    gulp.src(['./app/markup/**/*.pug', '!./app/markup/**/_*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./public'))
})

task('build', ['styles', 'scripts', 'images', 'fonts', 'markup'])

gulp.task('server', ['build'], function() {
    browser_sync.init({server: "./public"})

    gulp.watch('./app/styles/**/*', ['styles'])
    gulp.watch('./app/scripts/**/*', ['scripts'])
    gulp.watch('./app/markup/**/*', ['markup'])
    gulp.watch('./public/**/*').on('change', browser_sync.reload)
})

// Functions
function task(name, callback) {
    gulp.task(name, callback)
}