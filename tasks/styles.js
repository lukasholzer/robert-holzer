import gulp from 'gulp';
import chalk from 'chalk';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import browser from 'browser-sync';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import globbing from 'gulp-css-globbing';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import If from 'gulp-if';

import { paths, pluginOptions } from './config';

const src = `${paths.styles.src}/**/*.{sass,scss}`;
const isProduction = (process.env.NODE_ENV === 'production');


export default function styles() {
  return gulp.src(src)
    .pipe(plumber({ errorHandler: notify.onError("SCSS Error: <%= error.message %>") }))
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(If(!isProduction, sourcemaps.init()))
    // PostCSS Linting
    .pipe(postcss(pluginOptions.postcss.pre))
    // SASS Processing
    .pipe(sass().on('error', (error) => {
      console.log(error);
    }))
    // PostCSS Plugins like autoprefixer and so on
    .pipe(postcss(pluginOptions.postcss.after))
    .pipe(If(!isProduction, sourcemaps.write('./maps')))
    .pipe(If(isProduction, cssnano(), rename({
      suffix: ".min",
      extname: ".css"
    })))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(If(!isProduction, browser.stream({ match: '**/*.css' })));
}

export function stylesWatch() {

  const watcher = gulp.watch(src);

  watcher.on('all', function (event, path, stats) {
    console.log(chalk.green(`'File ${path} was ${event}ed ---> Running task: ${chalk.bold(' styles ')} ...`));
    styles();
  });
}
