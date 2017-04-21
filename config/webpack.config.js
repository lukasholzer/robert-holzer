const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inlineCSS = new ExtractTextPlugin('inline.css');
const mainCSS = new ExtractTextPlugin('main.bundle.css');

module.exports = {

  context: path.resolve(__dirname, '../', 'src'),
  entry: {
    // Scriptss
    app: './main.ts',
    vendor: './vendor.ts',
    polyfills: './polyfills.ts',

    // Stylesheets
    main: './styles/main.scss',
    inline: './styles/inline.scss'
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss']
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
      {
        test: /inline.scss$/,
        exclude: path.join(__dirname, 'src', 'app'),
        use: inlineCSS.extract({
          fallback: 'style-loader',
          use: ['raw-loader', 'postcss-loader', 'sass-loader'] // , 'import-glob'
        })
      }, {
        test: /main.scss$/,
        exclude: path.join(__dirname, 'src', 'app'),
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

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postcss: {
          plugins: [
            require('postcss-ordered-values'),
            require('autoprefixer')({
              browsers: ['last 2 versions', 'ie >= 10']
            }),
            require('postcss-cssnext')
          ]
        }
      }
    }),

    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
