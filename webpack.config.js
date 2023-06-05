const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.argv.includes('--mode=production') ? 'production' : 'development';
const isProd = (mode === 'production');

module.exports = {
  mode: mode,
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress:{
            drop_console: true,
          }
        }
      }),
    ],
  },
  entry: {
    dist: './h5p-editor-uuid.ts'
  },
  output: {
    filename: 'h5p-editor-uuid.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  target: ['browserslist'],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          { 
            loader: 'ts-loader'
          },
        ],
        exclude: /node_modules/,
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: (isProd) ? undefined : 'eval-cheap-module-source-map'
};