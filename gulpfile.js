// Include gulp
var gulp      = require('gulp');

// Include Our Plugins
var sass        = require('gulp-sass');           // all       // lint
var concat      = require('gulp-concat');         // scripts
var uglify      = require('gulp-uglify');         // scripts
var sasslint    = require('gulp-sass-lint');      // lint-sass
var rename      = require('gulp-rename');         // minify-css
var cleancss    = require('gulp-clean-css');      // minify-css
var sourcemaps  = require('gulp-sourcemaps');     // minify-css
var runsequence = require('run-sequence');        // *::test

// --------------------------------------------------
// Lint SASS
// --------------------------------------------------
gulp.task('lint-sass', function () {
  return gulp.src('assets/sass/**/*.s+(a|c)ss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

// --------------------------------------------------
// Compile SASS
// --------------------------------------------------
gulp.task('sass', function() {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

// --------------------------------------------------
// Minify CSS
// --------------------------------------------------
gulp.task('minify-css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

// --------------------------------------------------
// Concatenate & Minify JS
// --------------------------------------------------
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// --------------------------------------------------
// Test SCSS, build and minify CSS
// --------------------------------------------------
gulp.task('sass::test', function(done) {
  runsequence('lint-sass', 'sass', 'minify-css', function() {
      console.log('Well Done Bro!');
      done();
  });
});

// --------------------------------------------------
// Watch SASS & SCRIPT Files For Changes
// --------------------------------------------------
gulp.task('watch', function() {
  gulp.watch('assets/js/*.js', ['scripts']);
  gulp.watch('assets/sass/**/*.scss', ['sass::test']);
});

// --------------------------------------------------
// Default task cmd: gulp
// --------------------------------------------------
gulp.task('default', ['scripts', 'lint-sass', 'sass', 'minify-css', 'watch']);