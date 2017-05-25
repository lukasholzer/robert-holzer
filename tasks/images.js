import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browser from 'browser-sync';
import size from 'gulp-size';
import chalk from 'chalk';

import { paths, pluginOptions } from './config';

const src = `${paths.images.src}/**/*.{jpg,jpeg,png,gif,svg,ico}`;

export default function images() {
  return gulp.src(src, { since: gulp.lastRun(images) })
    .pipe(imagemin(pluginOptions.imagemin))
    .pipe(gulp.dest(paths.images.dist))
    .pipe(size({
      title: '🤖  ⚙  🔧  Optimized Images: ',
      pretty: true
    }))
    .pipe(browser.stream());;
}

export function imagesWatch() {
  const watcher = gulp.watch(src);

  watcher.on('all', function (event, path, stats) {
    console.log(chalk.green(`'File ${path} was ${event}ed ---> Running task: ${chalk.bold(' images ')} ...`));
    images();
  });
}
