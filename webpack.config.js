
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index.js'
  ],

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },

  plugins: [
    new AppCachePlugin({
      cache: [
        'index.html',
        'style/default.css',
        'bundle.js',
        'http://rawgit.com/twbs/bootstrap/v4.0.0-alpha.2/dist/css/bootstrap.css'
      ],
      network: ['*'],
      setting: ['prefer-online'],
      output: 'app.appcache'
    })
  ]
};
