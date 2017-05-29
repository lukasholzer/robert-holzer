import gulp from 'gulp';
import path from 'path';
import rename from 'gulp-rename';
import base64 from 'gulp-base64';
import size from 'gulp-size';
import chalk from 'chalk';

import { paths, pluginOptions } from './config';

export default function fonts() {
  return gulp.src(`${paths.fonts.src}/**/*.scss`, { since: gulp.lastRun(fonts) })
    .pipe(base64(pluginOptions.base64))
    .pipe(rename('fonts.css'))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(size({
      title: '🤖  ⚙  🔧  Optimized Fonts: ',
      pretty: true
    }));
};
