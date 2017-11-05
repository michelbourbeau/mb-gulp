var gulp  = require('gulp');

gulp.task('watch', function() {
  gulp.watch('assets/js/*.js', ['scripts::build']);
  gulp.watch('assets/sass/**/*.scss', ['sass::build']);
});