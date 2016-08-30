var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: false
  });

  gulp.watch('app/**/*.css').on('change', browserSync.reload);
  gulp.watch('app/**/*.js').on('change', browserSync.reload);
  gulp.watch('app/**/*.html').on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
