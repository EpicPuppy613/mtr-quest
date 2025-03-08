const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  //devtool: 'eval-source-map',
  name: 'default',
  entry: './src/index.ts',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true
        }
      })
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'resource/[hash][ext][query]'
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'resource/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;