import path from 'path';
import webpack from 'webpack';
import process from 'process';

import { base } from '../config';

export const config = {
  context: path.resolve(__dirname, '../../', base.root, base.src),
  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'app': './main.ts'
  },
  output: {
    path: path.resolve(__dirname, '..', base.root, base.dist),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configuration: require('../../tslint.json')
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'theme/src/tsconfig.json'
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};

export default config;
