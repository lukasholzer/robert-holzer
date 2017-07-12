const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr&timeout=2000&reload=true';
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const entry = {};
for (let name in commonConfig.entry) {
  if (commonConfig.entry.hasOwnProperty(name)) {
    entry[name] = [commonConfig.entry[name], hotMiddlewareScript];
  }
}

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: entry,

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: 'http://localhost:4000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: path.join(__dirname, 'theme', 'src', 'app'),
        use: [
          'style-loader',
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: '../../theme/src/styles/postcss.config.js',
              plugins: () => {
                return [
                  require('postcss-ordered-values'),
                  require('postcss-cssnext')
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

});
