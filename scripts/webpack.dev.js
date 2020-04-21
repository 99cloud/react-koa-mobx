const { resolve } = require('path')
const merge = require('lodash/merge')
const webpack = require('webpack')
const WebpackNotifier = require('webpack-notifier')
const baseConfig = require('./webpack.base')

const root = path => resolve(__dirname, `../${path}`)

const config = {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', './src/core/index.js'],
  },
  output: {
    filename: '[name].js',
    path: root('build/'),
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: root('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]',
              modules: true,
            },
          },
          {
            loader: 'fast-sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        include: root('src/assets'),
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  optimization: {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!(ace-builds|react-ace|xterm)).*.jsx?$/,
          name: 'vendor',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
        },
      },
    },
  },
  resolve: merge({}, baseConfig.resolve, {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  }),
  plugins: [
    ...baseConfig.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
      root('server'),
      root('build'),
      root('dist'),
    ]),
    new WebpackNotifier({
      title: `console`,
      alwaysNotify: true,
      excludeWarnings: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    publicPath: '/',
    compress: true,
    noInfo: false,
    quiet: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 8001,
  },
}

module.exports = config
