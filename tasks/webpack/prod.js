import webpackMerge from 'webpack-merge';
import webpack from 'webpack';

import { config as commonConfig } from './common';

export const config = webpackMerge(commonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        unused: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
      },
      output: {
        comments: false,
      }
    })
  ]
});

export default config;
