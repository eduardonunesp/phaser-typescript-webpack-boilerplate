const path = require('path');
const webpackMerge = require('webpack-merge');

// Common configuration.
const commonConfig = require('./common.config.js');

// Plugins.
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Phaser.
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

// Constants.
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    entry: {
      'polyfills': './src/polyfills.ts',
      'main': './src/main.ts'
    },
    output: {
      pathinfo: true,
      filename: '[name].bundle.js',
      path: path.resolve('../dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ['./src', './node_modules'],
      alias: {
        'phaser': phaser,
        'pixi': pixi,
        'p2': p2,
      }
    },
    plugins: [
      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      // Specify the correct order the scripts will be injected in.
      new CommonsChunkPlugin({
        name: ['polyfills']
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        './src',
        {}
      ),
      new CopyWebpackPlugin([
        {
          from: './src/assets',
          to:'./assets'
        }
      ]),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      })
    ],
    module: {
      loaders: [
        { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
        { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
        { test: /p2\.js/, loader: 'expose-loader?p2' },
        { test: /\.ts?$/, loader: 'ts-loader', exclude: '/node_modules/' }
      ]
    },
    node: {
      fs: 'empty'
    },
    devtool: 'source-map'
  });
}
