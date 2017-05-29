import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import size from 'gulp-size';

import { paths, pluginOptions } from './config';

const reload = browserSync.reload;

export default function images() {
  return gulp.src(paths.images.files, { since: gulp.lastRun(images) })
    .pipe(imagemin(pluginOptions.imagemin))
    .pipe(gulp.dest(paths.images.dist))
    .pipe(size({
      title: '🤖  ⚙  🔧  Optimized Images: ',
      pretty: true
    }))
    .pipe(reload({ stream: true }));
}
