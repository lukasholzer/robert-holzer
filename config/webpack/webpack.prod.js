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
          use: [
            'raw-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
// use : [
//   'style-loader',
//   'css-loader', {
//     loader: 'postcss-loader',
//     options: {
//       plugins: () => {
//         return [require('postcss-ordered-values'), require('postcss-cssnext')]
//       }
//     }
//   },
//   'sass-loader'
// ]
        })
      }
    ]
  },

  plugins: [
    new ManifestPlugin({
      fileName: 'build-manifest.json',
      prettyPrint: true
    }),

    // new webpack.LoaderOptionsPlugin({
    //   test: /\.scss$/,
    //   options: {
    //     postcss: {
    //       plugins: [
    //         require('postcss-ordered-values'),
    //         require('autoprefixer')({
    //           browsers: ['last 2 versions', 'ie >= 10']
    //         }),
    //         require('postcss-cssnext')
    //       ]
    //     }
    //   }
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   dropDebugger: true,
    //   dropConsole: true,
    //   sourceMap: false,
    //   compressor: {
    //     warnings: false,
    //   },
    // }),

    inlineCSS,
    mainCSS
  ]
});
