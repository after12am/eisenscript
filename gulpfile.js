'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

/**
 * regression test
 */
gulp.task('watch:test', () => {
  gulp.watch([
    'src/**/*',
    'test/**/*'
  ], gulp.series('test'));
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
  const entry = Object.values(config.entry);
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
    startPath: '/examples',
    open: 'external',
    server: {
      baseDir: ['.']
    }
  });

  gulp.watch([
    'src/**/*'
  ], gulp.series('webpack'));

  gulp.watch([
    'src/**/*',
    'examples/**/*',
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
