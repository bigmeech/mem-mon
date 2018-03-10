const path = require('path');

const config = {
  entry: {
    app: path.resolve(__dirname, '../app/entry.js'),
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  output: {
    path: path.resolve(__dirname, '../src/public/dist'),
    publicPath: './',
    filename: 'assets/js/[name].js',
  },
};

module.exports = config;
