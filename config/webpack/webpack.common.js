const path = require('path');
const webpack = require('webpack');

module.exports = {

  context: path.resolve(__dirname, '../', '../', 'theme', 'src'),
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
            configFileName: 'theme/src/tsconfig.json'
          }
        }
      },
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
    ]
  },

  plugins: [
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

    new webpack.NoEmitOnErrorsPlugin(),

    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
