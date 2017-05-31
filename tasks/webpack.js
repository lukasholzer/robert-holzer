import path from 'path';
import webpack from 'webpack';
import process from 'process';

import { base } from './config';
import configProd from './webpack/prod';
import configDev from './webpack/dev';

const isProduction = (process.env.NODE_ENV === 'production');

export const config = (isProduction) ? configProd : configDev;

export default function scripts() {


  return new Promise(resolve => webpack(config, (err, stats) => {

    if (err) {
      console.log('Webpack', err)
    } else {
      console.log(stats.toString({ /* stats options */ }));
    }

    resolve();
  }));
}
