const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inlineCSS = new ExtractTextPlugin('inline.css');
const mainCSS = new ExtractTextPlugin('main.bundle.css');


module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /inline.scss$/,
        exclude: path.join(__dirname, 'theme', 'src', 'app'),
        use: inlineCSS.extract({
          fallback: 'style-loader',
          use: ['raw-loader', 'postcss-loader', 'sass-loader'] // , 'import-glob'
        })
      }, {
        test: /main.scss$/,
        exclude: path.join(__dirname, 'theme', 'src', 'app'),
        use: mainCSS.extract({
          fallback: 'style-loader',
          use: ['raw-loader', 'postcss-loader', 'sass-loader'] // , 'import-glob'
        })
      }
    ]
  },

  plugins: [
    inlineCSS,
    mainCSS,

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      dropDebugger: true,
      dropConsole: true,
      sourceMap: false,
      compressor: {
        warnings: false,
      },
    })
  ]
});
