import gulp from 'gulp';
import chalk from 'chalk';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import globbing from 'gulp-css-globbing';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import If from 'gulp-if';

import { paths, pluginOptions } from './config';

const isProduction = (process.env.NODE_ENV === 'production');
const reload = browserSync.reload;

export default function styles() {

  return gulp.src(paths.styles.files)
    .pipe(plumber({ errorHandler: notify.onError("SCSS Error: <%= error.message %>") }))
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(If(!isProduction, sourcemaps.init()))

    // PostCSS Linting
    // .pipe(postcss(pluginOptions.postcss.pre))

    // SASS Processing
    .pipe(sass().on('error', (error) => {
      console.log(error);
    }))

    // PostCSS Plugins like autoprefixer and so on
    // .pipe(postcss(pluginOptions.postcss.after))
    .pipe(If(!isProduction, sourcemaps.write('./maps')))
    .pipe(If(isProduction, cssnano()))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(reload({ stream: true }));
}
