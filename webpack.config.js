const webpack = require('webpack');
const path = require('path');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
});

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './main.ts',
    vendor: './vendor.ts',
    polyfills: './polyfills.ts',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  target: 'web',
  module: {
    rules: [
      { // Font Loader
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            //limit: 65000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      { // Image Loading
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // Convert images < 10k to base64 strings
        }]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { // TypeScript Loader
        test: /\.ts$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: './src/tsconfig.json'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
  ]
}

module.exports = config
