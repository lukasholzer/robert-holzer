import gulp from 'gulp';
import chalk from 'chalk';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware'

import { general, paths } from './config.js';
import { config as webpackConfig } from './webpack';

// Tasks to import for watcher
import styles from './styles';
import fonts from './fonts';
import images from './images';


const reload = browserSync.reload;
const bundler = webpack(webpackConfig);

export default function server() {
  browserSync({
    port: general.proxy.port,
    proxy: {
      target: general.wordpress.address,
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false
        }
      }
    },
    reloadDelay: 500,
    notify: true,
    open: true,
    logLevel: 'silent',
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
  });

  gulp.watch('theme/**/*.{php,twig}', reload);
  gulp.watch(paths.fonts.files, gulp.series(fonts));
  gulp.watch(paths.images.files, gulp.series(images));
  const stylesWatcher = gulp.watch(paths.styles.files, gulp.series(styles));

  stylesWatcher.on('all', function (event, path, stats) {
    console.log(chalk.green(`'File ${path} was ${event}ed`));
  });
}
