(function () {
    'use strict';
    var gulp = require('gulp');
    var browserSync = require('browser-sync');

    //lazy load gulp plugins
    var $ = require('gulp-load-plugins')({lazy: true});

    //configuration files
    var config = require('./gulp.config.js')();

/////////////////////////////////////////////
//              FILE WATCH                  //
/////////////////////////////////////////////
    gulp.task('default', ['compile-css', 'compile-html', 'compile-js', 'start-browserSync'], function () {
        gulp.watch([config.sass.watch], ['compile-css']);
        gulp.watch([config.ts.watch], ['compile-js', browserSync.reload]);
        gulp.watch([config.html.watch], ['compile-html', browserSync.reload]);
    });

/////////////////////////////////////////////
//           BROWSER SYNC                  //
/////////////////////////////////////////////
    gulp.task('start-browserSync', function () {
        browserSync(config.browserSync);
    });

/////////////////////////////////////////////
//                SASS                     //
/////////////////////////////////////////////
    gulp.task('compile-css', function () {
        gulp.src(config.sass.in)
            .pipe($.sass(config.sass.sassOpts))
            .pipe($.pleeease(config.sass.pleeeaseOpts))
            .pipe(gulp.dest(config.sass.out))
            .pipe(browserSync.reload({stream: true}));
    });

/////////////////////////////////////////////
//                  TS                     //
/////////////////////////////////////////////
    gulp.task('compile-js', function () {
        gulp.src(config.ts.in)
            .pipe($.typescript(config.ts.tsOpts))
            .pipe(gulp.dest(config.ts.out))
    });

/////////////////////////////////////////////
//                HTML                     //
/////////////////////////////////////////////
    gulp.task('compile-html', function () {
        gulp.src(config.html.in)
            .pipe($.preprocess())
            .pipe(gulp.dest(config.html.out));
    });

/////////////////////////////////////////////
//          ERROR HANDLING                 //
/////////////////////////////////////////////
    var gulp_src = gulp.src;
    gulp.src = function () {
        return gulp_src.apply(gulp, arguments)
            .pipe($.plumber(function (error) {
                $.util.log($.util.colors.red('Error( ' + error.plugin + ' ):' + error.message));
                this.emit('end');
            }));
    };
}());