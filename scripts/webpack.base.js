/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')

const root = path => resolve(__dirname, `../${path}`)

module.exports = {
  entry: {
    main: './src/core/index.js',
  },
  moduleRules: [
    {
      test: /\.jsx?$/,
      include: [root('src'), root('common')],
      use: 'happypack/loader?id=jsx',
    },
    {
      test: /\.jsx?$/,
      include: root('node_modules'),
      use: 'cache-loader',
    },
    {
      test: /\.svg$/,
      issuer: { test: /\.jsx?$/ },
      use: [
        { loader: 'cache-loader' },
        { loader: '@svgr/webpack', options: { icon: true } },
      ],
    },
    {
      test: /\.(jpg|png|svg)(\?.+)?$/,
      include: root('src/assets'),
      use: 'url-loader?limit=100000',
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.less'],
    symlinks: false,
    modules: [root('src'), root('src/pages'), 'node_modules'],
    alias: {
      common: root('common'),
      src: root('src'),
      scss: root('src/scss'),
      less: root('src/less'),
      core: root('src/core'),
      components: root('src/components'),
      stores: root('src/stores'),
      utils: root('src/utils'),
      apps: root('src/pages/apps'),
    },
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new WebpackBar(),
  ],
  postCssOptions: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
      require('postcss-remove-google-fonts'),
    ],
  },
}
