/*global require, alert: false, confirm: false, console: true, Debug: false, opera: false, prompt: false, WSH: false */

var path,
    serverConfig,
    log,
    // -----------------------------------------
    gulp = require("gulp"),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    pug = require('gulp-pug'),
    minifyCss   = require('gulp-cssnano'),
    csscomb  = require('gulp-csscomb'),
    plumber  = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    spritesmith = require('gulp.spritesmith'),
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream,
    devPath = "_source",
    prodPath = "app-tmp";



// =====================================================================================
// CONFIG / CONFIG / CONFIG / CONFIG / CONFIG / CONFIG / CONFIG / CONFIG / CONFIG /
// =====================================================================================
path = {
    dev: {
        tmp:  devPath + "/page/",
        css:  devPath + "/page/",
        js:   devPath + "/page/**/*.js",
        fvc:  devPath + "/assets/favicon/",
        fnt:  devPath + "/assets/fonts/",
        img:  devPath + "/assets/img/",
        mov:  devPath + "/assets/movie/",
        srv:  devPath + "/assets/server/",
        sprt: devPath + "/assets/sprite/",
        svg:  devPath + "/assets/svg/"
    },
    vndr: {
        bwr:  "./bower_files",
        tmp:  "./" + devPath + "/vndr/tmp/",
        css:  "./" + devPath + "/vndr/css/",
        js:   "./" + devPath + "/vndr/js/"
    },
    wch: {
        bwr:  "./bower.json",
        tmp:  devPath + "/page/**/*.pug",
        css:  devPath + "/page/**/*.scss",
        js:   devPath + "/page/**/*.js",
        fvc:  devPath + "/assets/favicon/*.*",
        fnt:  devPath + "/assets/fonts/*.*",
        img:  devPath + "/assets/img/*.*",
        mov:  devPath + "/assets/movie/*.*",
        srv:  devPath + "/assets/server/*.*",
        sprt: devPath + "/assets/sprite/*.*",
        svg:  devPath + "/assets/svg/*.*"
    },
    app: {
        tmp: "./" + prodPath + "/",
        js:  "./" + prodPath + "/script/",
        css: "./" + prodPath + "/css/",
        
        fvc: "./" + prodPath + "/favicon/",
        fnt: "./" + prodPath + "/css/font/",
        img: "./" + prodPath + "/css/img/",
        mov: "./" + prodPath + "/css/movie/",
        svg: "./" + prodPath + "/css/svg/"
    },
    bowerFiles: "./bower_files",
    cleanTmp:   ["./" + prodPath + "/*.html",   "./" + devPath + "/vndr/tmp"],
    cleanAll:   ["./" + prodPath + "/",         "./" + devPath + "/vndr"]
};
// --------------------------
serverConfig = {
    server: {
        baseDir: path.app.tmp
    },
    tunnel: false,
    host: "localhost",
    port: 9000
};
// --------------------------
log = function (err) {
    "use strict";
    return {
        message: "\n\n======================\n" +
                    "\n" + err.message + "\n" +
                    "======================\n"
    };
};





// =====================================================================================
//// TASKS / TASKS / TASKS / TASKS / TASKS / TASKS / TASKS / TASKS / TASKS / TASKS /
// =====================================================================================
// DEV SERVER ------------------------------------------------------------------------
gulp.task("server", function () {
    "use strict";
    return browserSync(serverConfig);
});



// ASSETS ------------------------------------------------------------------------
gulp.task("sprt", function () {
    "use strict";
    var spriteData = gulp.src(path.dev.sprt + "*.png")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(spritesmith({
            imgName: "sprite.png",
            cssName: "sprite.css"
        }));
    spriteData.img
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.img))
        .pipe(browserSync.reload({stream: true}));
    spriteData.css
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.vndr.css));
});

gulp.task("img", function () {
    "use strict";
    return gulp.src([path.dev.img + "*.jpeg", path.dev.img + "*.jpg", path.dev.img + "*.gif", path.dev.img + "*.png"])
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.img))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("favicon", function () {
    "use strict";
    return gulp.src(path.dev.fvc + "*.*")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.fvc))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("movie", function () {
    "use strict";
    return gulp.src(path.dev.mov + "*.*")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.mov))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("fonts", function () {
    "use strict";
    return gulp.src([path.dev.fnt + "*.eot", path.dev.fnt + "*.svg", path.dev.fnt + "*.ttf", path.dev.fnt + "*.woff", path.dev.fnt + "*.woff2"])
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.fnt))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("svg", function () {
    "use strict";
    return gulp.src(path.dev.svg + "*.*")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(gulp.dest(path.app.svg))
        .pipe(browserSync.reload({stream: true}));
});



// TEMPLATE ------------------------------------------------------------------------
gulp.task("pug", function () {
    "use strict";
    var YOUR_LOCALS = {};
    return gulp.src(path.dev.tmp + "index.pug")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(pug({
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(path.vndr.tmp));
});

gulp.task("cleanMockup", function () {
    "use strict";
    return gulp.src(path.cleanTmp)
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(clean());
});

gulp.task("bower", function () {
    "use strict";
    var assets = useref.assets();
    return gulp.src(path.vndr.tmp + "*.html")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(wiredep({
            directory: path.bowerFiles,
            devDependencies: true
        }))
        .pipe(assets)
        //.pipe(gulpif("*.js",  uglify()))
        //.pipe(gulpif("*.css", minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(path.app.tmp))
        .pipe(notify("bower files"));
});



// STYLE ------------------------------------------------------------------------
gulp.task("css", function () {
    "use strict";
    return gulp.src(path.dev.css + "main.scss")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(sass())
        .pipe(autoprefixer({
			browsers: [
                'last 10 versions'
            ],
			cascade: false
		}))
        .pipe(csscomb())
//        .pipe(minifyCss())
        .pipe(rename("bundle.css"))
        .pipe(gulp.dest(path.app.css))
        .pipe(browserSync.reload({stream: true}));
});



// SCRIPT ------------------------------------------------------------------------
gulp.task("js", function () {
    "use strict";
    return gulp.src(path.dev.js)
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(concat("main.js"))
        //.pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest(path.app.js))
        .pipe(browserSync.reload({stream: true}));
});



// CLEAN PRODACTION & VENDOR PATHs ------------------------------------------------------------------------
gulp.task("c", function () {
    "use strict";
    return gulp.src(path.cleanAll)
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(clean())
        .pipe(notify("prodaction path & vendor path! CLEAN was DONE"));
});



// TRICK task ------------------------------------------------------------------------
gulp.task("reload", function () {
    "use strict";
    return gulp.src(path.app.tmp + "index.html")
        .pipe(plumber({errorHandler: notify.onError(log)}))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify("mockup-reload"));
});



//// WATCHER ------------------------------------------------------------------------
gulp.task("mockup-watcher", function (cb) {
    "use strict";
    runSequence("cleanMockup", "pug", "bower", "reload", cb);
});

gulp.task("watch", function () {
    "use strict";
    gulp.watch([path.wch.tmp],  ["mockup-watcher"]);
    gulp.watch([path.wch.css],  ["css"]);
    gulp.watch([path.wch.js],   ["js"]);
    gulp.watch([path.wch.sprt], ["sprt"]);
    gulp.watch([path.wch.img],  ["img"]);
    gulp.watch([path.wch.fvc],  ["favicon"]);
    gulp.watch([path.wch.mov],  ["movie"]);
    gulp.watch([path.wch.fnt],  ["fonts"]);
    gulp.watch([path.wch.svg],  ["svg"]);
});



//// BUILD & RUN ------------------------------------------------------------------------
gulp.task("build", function (cb) {
    "use strict";
    runSequence("c",
                "sprt", "img", "favicon", "movie", "fonts", "svg",
                "css",
                "js",
                "cleanMockup", "pug", "bower",
                "server", cb);
});

gulp.task("default", ["build", "watch"]);





