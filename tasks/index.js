import gulp from 'gulp';

import clean from './clean';
import images from './images';
import fonts from './fonts';
import server from './server';
import scripts from './webpack';
import styles from './styles';

export const build = gulp.series(clean, gulp.parallel(fonts, images, scripts, styles));
export const dev = gulp.series(clean, gulp.parallel(fonts, images, styles, scripts), server);

export default dev;
