'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import cssBase64 from 'gulp-css-base64';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-cssmin';

gulp.task('sass', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssBase64())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename((path)=> {
            path.basename = 'open-accessability.min';
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
    return gulp.src('./src/**/*.babel.js')
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename((path)=> {
            path.basename = path.basename.split('.')[0] + '.min';
        }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['js', 'sass']);


