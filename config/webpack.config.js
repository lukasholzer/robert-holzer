const path = require('path');
const webpack = require('webpack');
// const helpers = require('./helpers');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: path.resolve(__dirname, '../', 'src'),
  entry: {
    app: './main.ts',
    vendor: './vendor.ts',
    polyfills: './polyfills.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'src/tsconfig.json'
          }
        }
      },
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // // injects script tag into layout html template and saves the file to dist folder
    // new HtmlWebpackPlugin({
    //   template: helpers.root('src', 'server', 'views', 'layouts', 'base.njk'),
    //   filename: helpers.root('dist', 'views', 'layouts', 'base.njk'),
    //   inject: 'body',
    //   excludeAssets: [/internal.*.js/, /external.*.js/]
    // })

  ]
};
