// Include gulp
var gulp    = require('gulp'),
    req_dir = require('require-dir'),
    concat  = require('gulp-concat'),
    run_seq = require('run-sequence').use(gulp);

// Variables declaration
req_dir('./gulp-tasks');

gulp.task('default', function(done) {
  run_seq('clean', 'scripts', 'sass', 'watch', function() {
      console.log('default task done [...]');
      done();
  });
});