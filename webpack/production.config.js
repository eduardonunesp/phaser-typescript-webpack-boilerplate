const webpackMerge = require('webpack-merge');
const commongConfig = require('./common.config.js');

// Constants.
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {});
}