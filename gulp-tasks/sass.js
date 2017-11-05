var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename');

      gulp.task('sass', function() {
        return gulp.src('assets/sass/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('assets/css'))
            .pipe(cleancss())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/css'));
      
            console.log('sass:build Done [...]');
      });