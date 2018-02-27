const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, './src/index.ts')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },
  devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it
  },
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' /* chunkName= */ ,
      filename: 'vendor.bundle.js' /* filename= */
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets'
    }]),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },
      {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser']
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2']
      }, {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  },
}
