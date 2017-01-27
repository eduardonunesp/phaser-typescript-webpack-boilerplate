var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  entry: './src/index.ts',
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to:'./assets'
      }
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    })/*,
    new webpack.NoErrorsPlugin(),*/
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
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  },
  devtool: 'source-map'
}