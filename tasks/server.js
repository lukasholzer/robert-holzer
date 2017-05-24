import gulp from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware'
import { general, paths } from './config.js';

import { config as webpackConfig } from './webpack';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

export default function server() {

  const config = {
    proxy: general.wordpress.address,
    open: false,
    middleware: [
      webpackDevMiddleware(bundler, {
        hot: true,
        filename: 'app.bundle.js',
        publicPath: webpackConfig.output.publicPath,
        noInfo: true,
        stats: {
          colors: true,
        },
        historyApiFallback: true,
      }),
      webpackHotMiddleware(bundler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
      })
    ],
  };

  browser.init(config);

  // gulp.watch(paths.scripts.src).on('change', () => browser.reload());
}
