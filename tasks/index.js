import gulp from 'gulp';

import { clean } from './clean';
import { scripts } from './webpack';
import server from './server';
import { templates, templatesWatch } from './templates';



import { paths, pluginOptions } from './config';
import path from 'path';
import posthtml from 'gulp-posthtml';
import posthtmlBem from 'posthtml-bem';
import browserSync from 'browser-sync';
import chalk from 'chalk';


export function test() {
  console.log(chalk.magenta('—— 🦄    Are you Bem Comform?  🦄  ——\nTesting templates…'));
  console.info(path.join(__dirname, '..', 'theme/views') + '/**/*.twig');
  return gulp.src(path.join(__dirname, '..', 'theme/views'), + '/**/*.twig')
    .pipe(posthtml([posthtmlBem(pluginOptions.posthtmlBem)]))
    .pipe(gulp.dest('theme/views/**/*.twig'));
}

export function watch() {
  gulp.watch('theme/views/**/*.twig', test);
}


export const dev = gulp.series(test);
//export const dev = gulp.series(clean, gulp.parallel(templates, server));
export const build = gulp.series(clean, gulp.parallel(templates,scripts));

export default dev
