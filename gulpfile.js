// Configuration
var config = {
    paths: {
        src: {
            root: "./app",
            styles: "/styles/**/*.styl",
            styles_ignored: "/styles/**/_*.styl",
            scripts: "/scripts/**/*.js",
            images: "/assets/images/**/*.{jpg,jpeg,png,svg,gif}",
            fonts: "/assets/fonts/**/*.{woff,ttf,eof,svg}",
            markup: "/markup/**/*.pug",
            markup_ignored: "/markup/**/_*.pug"
        },
        dest: {
            root: "./public",
            styles: "/assets",
            scripts: "/assets",
            images: "/assets/images",
            fonts: "/assets/fonts"
        }
    },
    template_processor: "pug",
    css_processor: "stylus",
    js_processor: null
}

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
    gulp.src([config.paths.src.root + config.paths.src.styles, 
             "!" + config.paths.src.root + config.paths.src.styles_ignored])
        .pipe(stylus({compress: true}))
        .pipe(gulp.dest(config.paths.dest.root + config.paths.dest.styles))
        .pipe(browser_sync.stream())
})

task('scripts', function() {
    gulp.src([config.paths.src.scripts])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dest.root + config.paths.dest.scripts))
        .pipe(browser_sync.stream())
})

task('images', function() {
    gulp.src(config.paths.src.root + config.paths.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(config.paths.dest.root + config.paths.dest.images))
        .pipe(browser_sync.stream())
})

task('fonts', function() {
    gulp.src(config.paths.src.root + config.paths.src.fonts)
        .pipe(gulp.dest('./public/assets/fonts'))
        .pipe(browser_sync.stream())
})

task('markup', function() {
    gulp.src([config.paths.src.root + config.paths.src.markup, 
             "!" + config.paths.src.root + config.paths.src.markup_ignored])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./public'))
})

task('build', ['styles', 'scripts', 'images', 'fonts', 'markup'])

gulp.task('server', ['build'], function() {
    browser_sync.init({server: "./public"})

    gulp.watch(config.paths.src.root + config.paths.src.styles, ['styles'])
    gulp.watch(config.paths.src.scripts, ['scripts'])
    gulp.watch(config.paths.src.root + config.paths.src.markup, ['markup'])
    gulp.watch('./public/**/*').on('change', browser_sync.reload)
})

// Functions
function task(name, callback) {
    gulp.task(name, callback)
}