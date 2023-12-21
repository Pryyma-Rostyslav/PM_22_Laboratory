const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const autoprefixer = require('gulp-autoprefixer');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin')
const { series, watch, src } = require('gulp');
const sync = require('browser-sync').create()


function html() {
    console.log('This is a html task!');
    return gulp.src("app/**.html")
        .pipe(gulp.dest("dist"))
}


function scss() {
    console.log('This is a scss task!');
    return src("app/sass/**.scss", {
        sourcemaps: true
    })
        .pipe(concat('style.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserList: "last 5 versions"
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
}

function css() {
    return src("app/css/**.css")
        .pipe(gulp.dest("dist/css"))
}

function image() {
    return src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

function jsson() {
    console.log("json")
    return src("app/*.json")
        .pipe(gulp.dest("dist"))
}

function scripts() {
    console.log('This is a scripts task!');
    return gulp.src("app/js/*.js")
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/js"))
}

function serve() {
    console.log('This is a watch task!');
    sync.init({
        server: './dist'
    })

    watch('app/*.html', series(html)).on('change', sync.reload)
    watch('app/js/*.js', series(scripts)).on('change', sync.reload)
    watch('app/css/*.css', series(css)).on('change', sync.reload)
    watch('app/sass/*.scss', series(scss)).on('change', sync.reload)
    watch('app/img/*.png', series(image)).on('change', sync.reload)
    watch('app/*.json', series(jsson)).on('change', sync.reload)

}

exports.build = series(html, scss, scripts, jsson, image, serve)
exports.html = html
exports.scss = scss
exports.scripts = scripts
exports.serve = serve
exports.image = image