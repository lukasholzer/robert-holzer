import gulp from 'gulp';

import clean from './clean';
import { scripts } from './webpack';
import images from './images';
import fonts from './fonts';
import server from './server';
import styles from './styles';

export const dev = gulp.series(clean, fonts, images, styles, server);
export const build = gulp.series(clean, gulp.parallel(fonts, images, scripts, styles));

export default dev
