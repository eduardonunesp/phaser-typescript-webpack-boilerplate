switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack/production.config.js')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./webpack/test.config.js')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack/development.config.js')({env: 'development'});
}
