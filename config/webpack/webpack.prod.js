const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const inlineCSS = new ExtractTextPlugin('inline.css');
const mainCSS = new ExtractTextPlugin('main.bundle.css');

const dist_path = path.join(__dirname, '../', '../', 'theme', '/dist');


module.exports = webpackMerge(commonConfig, {
  output: {
    path: dist_path,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /inline.scss$/,
        exclude: path.join(__dirname, 'theme', 'src', 'app'),
        use: inlineCSS.extract({
          fallback: 'style-loader',
          use: ['raw-loader', /*'postcss-loader',*/ 'sass-loader'] // , 'import-glob'
        })
      },
      {
        test: /main.scss$/,
        exclude: path.join(__dirname, 'theme', 'src', 'app'),
        use: mainCSS.extract({
          fallback: 'style-loader',
          use: ['raw-loader', /*'postcss-loader',*/ 'sass-loader'] // , 'import-glob'
        })
      }
    ]
  },

  plugins: [
    new ManifestPlugin({
      fileName: 'build-manifest.json',
      prettyPrint: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      dropDebugger: true,
      dropConsole: true,
      sourceMap: false,
      compressor: {
        warnings: false,
      },
    }),

    inlineCSS,
    mainCSS
  ]
});
