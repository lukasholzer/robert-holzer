import gulp from 'gulp';

import clean from './clean';
import images from './images';
import fonts from './fonts';
import server from './server';
import scripts from './webpack';
import styles from './styles';

export const build = gulp.series(clean, gulp.parallel(images, scripts, styles), fonts);
export const dev = gulp.series(clean, gulp.parallel(images, styles, scripts), fonts, server);

export default dev;
