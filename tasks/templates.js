import gulp from 'gulp';
import posthtml from 'gulp-posthtml';
import posthtmlBem from 'posthtml-bem';
import browserSync from 'browser-sync';

import { paths, pluginOptions } from './config';

export function templates() {
  return gulp.src(paths.views)
    .pipe(posthtml([posthtmlBem(pluginOptions.posthtmlBem)]))
    .pipe(gulp.dest(paths.views));
}

function logging()  {
  console.log('öaksdfökajsdf');
}

export function templatesWatch() {
  gulp.watch(paths.views + '/**/*.twig', gulp.parallel(templates, logging))
}

export default templates;
