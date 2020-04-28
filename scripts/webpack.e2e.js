/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const { resolve } = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const ChunkRenamePlugin = require('webpack-chunk-rename-plugin')

const root = path => resolve(__dirname, `../${path}`)

const baseConfig = require('./webpack.base')

const theme = require('./theme')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  mode: 'production',
  entry: baseConfig.entry,
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.scss$/,
        include: root('src'),
        loader: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
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
            loader: 'postcss-loader',
            options: baseConfig.postCssOptions,
          },
          { loader: 'fast-sass-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              javascriptEnabled: true,
            }
          },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
            options: {
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
          options: {
            outputPath: '/assets/',
          },
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
    minimize: true,
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
  resolve: baseConfig.resolve,
  plugins: [
    ...baseConfig.plugins,
    new ChunkRenamePlugin({
      vendor: '[name].js',
    }),
    new CopyPlugin([{ from: root('src/assets'), to: root('dist/assets') }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
})
