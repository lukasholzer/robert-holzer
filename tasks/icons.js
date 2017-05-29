import gulp from 'gulp';
import svg from 'gulp-svg-sprite';

import { paths, pluginOptions } from './config';

export default function icons() {
  return gulp.src('./theme/src/icons/**/*.svg')
    .pipe(svg(pluginOptions.svg))
    .pipe(gulp.dest('.'));
}
