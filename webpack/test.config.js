const path = require('path');

// Plugins.
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

// Phaser.
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = function (options) {
  return {
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
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        './src',
        {}
      )
    ],
    module: {
      loaders: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            './node_modules/rxjs',
            './node_modules/@angular'
          ]
        },
        { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
        { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
        { test: /p2\.js/, loader: 'expose-loader?p2' },
        { test: /\.ts?$/, loader: 'ts-loader', exclude: '/node_modules/' },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: path.resolve('./src'),
          exclude: [
            /\.spec\.ts$/,
            /node_modules/
          ]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    devtool: 'inline-source-map'
  };
}
