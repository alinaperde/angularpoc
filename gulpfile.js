var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    server        = require('gulp-express'),
    concat        = require('gulp-concat');

function startServer() {
  server.run({ port: null });
}

gulp.task('data', function() {
    return gulp.src(['public/assets/**/*.json'])
      .pipe(gulp.dest('public/dist/assets'));
});

/**
 * Starts the server
 */
gulp.task('server', function () {
  startServer();
  // Restart the server when anything relevant changes
  gulp.watch(['app.js'], function() {
    startServer();
  });
});

gulp.task('scripts', function() {
    return gulp.src(['public/app/**/*.js', 'public/assets/**/*.js'])
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('public/dist/app'));
});

gulp.task('views', function() {
  gulp.src('public/index.html')
  .pipe(gulp.dest('public/dist/'))

  gulp.src(['public/app/**/*', '!public/app/**/*.js', '!public/app/*.js'])
  .pipe(gulp.dest('public/dist/app'))
});

/**
 * Watches for changes and:
 *   - restarts the server if any changes in the app/ directory were detected
 */
gulp.task('watch', ['data', 'server', 'scripts', 'views'], function () {
  gulp.watch(['public/app/**/*.js', 'public/assets/**/*.js'],[
    'views',
    'scripts'
  ]);

  gulp.watch(['public/assets/**/*.json'],[
    'data'
  ]);

  gulp.watch(['public/index.html', 'public/app/**/*.html'], [
    'views'
  ]);

});
