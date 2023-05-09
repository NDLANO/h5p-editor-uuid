const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = (nodeEnv === 'production');

module.exports = {
  mode: nodeEnv,
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
    path: path.resolve(__dirname, 'dist')
  },
  target: ['web', 'es5'], // IE11
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
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            }
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