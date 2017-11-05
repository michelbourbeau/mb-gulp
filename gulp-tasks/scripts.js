var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename');

    gulp.task('scripts', function() {
      return gulp.src('assets/js/*.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'));
  
      console.log('scripts Done [...]');
  });