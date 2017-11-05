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
gulp.task('sass::lint', function () {
  return gulp.src('assets/sass/**/*.s+(a|c)ss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

// --------------------------------------------------
// Compile SASS
// --------------------------------------------------
gulp.task('sass::build', function() {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));

        console.log('sass::build Done!');
});

// --------------------------------------------------
// Minify CSS
// --------------------------------------------------
gulp.task('css::min', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));

    console.log('css::min Done!');
});

// --------------------------------------------------
// Concatenate & Minify JS
// --------------------------------------------------
gulp.task('scripts::min', function() {
    return gulp.src('assets/js/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    console.log('scripts::min Done!');
});

// --------------------------------------------------
// Test SCSS, build and minify CSS
// --------------------------------------------------
gulp.task('sass::test', function(done) {
  runsequence('sass::lint', 'sass::build', 'css::min', function() {
      console.log('sass::test Succes!');
      done();
  });
});

// --------------------------------------------------
// Watch SASS & SCRIPT Files For Changes
// --------------------------------------------------
gulp.task('watch', function() {
  gulp.watch('assets/js/*.js', ['scripts::min']);
  gulp.watch('assets/sass/**/*.scss', ['sass::test']);
  console.log('watch is now running...');
});

// --------------------------------------------------
// Watch SASS ONLY
// --------------------------------------------------
gulp.task('watch::sass', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass::test']);
  console.log('watch::sass is now running...');
});

// --------------------------------------------------
// Default task cmd: gulp
// --------------------------------------------------
gulp.task('default', ['scripts::min', 'sass::lint', 'sass::build', 'css::min', 'watch']);