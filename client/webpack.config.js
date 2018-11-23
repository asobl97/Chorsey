const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
  	rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: [{
      context: ['/auth', '/chores', '/houses', '/users'],
      target: 'http://localhost:3000',
    }],
    contentBase: './dist',
    hot: true
  }
};