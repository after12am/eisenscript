'use strict';

const webpack = require('webpack');

const copyright = `eisenscript v2.0.3
https://github.com/after12am/eisenscript
(c)2013-2020 Satoshi Okami
Released under the MIT license`;

module.exports = {

  entry: {
    eisenscript: __dirname + '/src/index.js',
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    library: 'eisen = EISEN',
    libraryTarget: 'var'
  },

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },

  node: {
    fs: "empty"
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.BannerPlugin(copyright)
  ]
};
