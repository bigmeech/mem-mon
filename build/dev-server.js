const webpack = require('webpack');
const clientConfig = require('./webpack.base.config');
const devMiddleware = require('webpack-dev-middleware');
const hmrMiddleware = require('webpack-hot-middleware');

module.exports = function setUpDevServer(app) {
  const clientCompiler = webpack(clientConfig);

  app.use(devMiddleware(clientCompiler, {
    stats: {
      color: true
    }
  }));
  app.use(hmrMiddleware(clientCompiler))
};
