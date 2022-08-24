const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'client/public/'),
    publicPath: 'client/public/',
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/public'),
    },
    compress: true,
    port: 80,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
