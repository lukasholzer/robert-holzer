const path = require('path');
const webpack = require('webpack');

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
    ]
  },

  plugins: [
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

    new webpack.NoEmitOnErrorsPlugin(),

    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
