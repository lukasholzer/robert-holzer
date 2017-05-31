import webpackMerge from 'webpack-merge';
import webpack from 'webpack';

import { config as commonConfig } from './common';

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true';
const entry = {};

for (let name in commonConfig.entry) {
  if (commonConfig.entry.hasOwnProperty(name)) {
    entry[name] = [commonConfig.entry[name], hotMiddlewareScript];
  }
}

export const config = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: entry,
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin()
  ]
});

export default config;
