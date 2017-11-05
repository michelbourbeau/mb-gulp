// Include gulp
var gulp      = require('gulp');

// Include Our Plugins
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sasslint    = require('gulp-sass-lint');
var cleancss    = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var runsequence = require('run-sequence');

// Lint our JS
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint our SASS
gulp.task('lint-sass', function () {
  return gulp.src('assets/sass/**/*.s+(a|c)ss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

// Compile Our SASS
gulp.task('sass', function() {
    return gulp.src('assets/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src('./dist/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
//gulp.task('run', ['sass', 'lint-sass', 'minify-css']);
gulp.task('run', function(done) {
  runsequence('lint-sass', 'sass', 'minify-css', function() {
      console.log('Well Done Bro!');
      done();
  });
});