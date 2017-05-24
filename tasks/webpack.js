import path from 'path';
import webpack from 'webpack';
import process from 'process';

const isProduction = (process.env.NODE_ENV === 'production');

const pluginsProd = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      unused: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
    },
    output: {
      comments: false,
    }
  })
];

const pluginsDev = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['app', 'vendor', 'polyfills']
  })
];

const mainEntry = ['./main.ts', 'webpack/hot/dev-server','webpack-hot-middleware/client'];

// if (isProduction) {
//   mainEntry.push('webpack/hot/dev-server');
//   mainEntry.push('webpack-hot-middleware/client');
// }

export let config = {
  context: path.resolve(__dirname, '../', 'theme', 'src'),
  entry: {
    app: mainEntry,
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
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configuration: require('../tslint.json')
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'theme/src/tsconfig.json'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    // publicPath: 'http://localhost:4000/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json'
  },
  plugins: isProduction ? pluginsProd : pluginsDev
};

export function scripts() {

  return new Promise(resolve => webpack(config, (err, stats) => {

    if (err) {
      console.log('Webpack', err)
    }

    console.log(stats.toString({ /* stats options */ }));

    resolve();
  }));
}

export default { config, scripts };
