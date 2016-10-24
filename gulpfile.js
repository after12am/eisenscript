'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const del = require('del');
const $ = gulpLoadPlugins();
const _ = require('underscore');
const reload = browserSync.reload;

/**
 * regression test
 */
gulp.task('watch:test', () => {
  gulp.watch([
    'src/**/*',
    'test/**/*'
  ], ['test']);
});

/**
 * unit test
 */
gulp.task('test', () => {
  return gulp.src('test/**/inter*.js')
    .pipe($.plumber())
    .pipe($.spawnMocha());
});

/**
 * build source code as eisenscript library
 */
gulp.task('webpack', () => {
  const config = require('./webpack.config');
  const entry = _.values(config.entry);
  return gulp.src(entry)
    .pipe(webpack(config))
    .pipe(gulp.dest('build/'));
});

/**
 * start web app
 */
gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    startPath: '/',
    open: 'external',
    server: {
      baseDir: ['app']
    }
  });

  gulp.watch([
    'src/**/*'
  ], ['webpack']);

  gulp.watch([
    'app/tests/**/*',
    'src/**/*'
  ]).on('change', reload);
});



gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});



// gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.*']));
//
// gulp.task('serve:test', ['scripts'], () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/scripts': '.tmp/scripts'
//       }
//     }
//   });
//
//   gulp.watch('app/tests/scripts/**/*.js', ['scripts']);
//   gulp.watch('test/spec/**/*.js').on('change', reload);
// });
//
// gulp.task('build', ['styles', 'scripts'], () => {
//   return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
// });
//
// gulp.task('default', ['clean'], () => {
//   gulp.start('build');
// });
