const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const outputDirectory = 'server-build';
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports =  {
  entry: [ './src/client/index.js'],
  target: ["web", 'es5'],

  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'index.min.js'
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3004'
    }
  }
,
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.scss$/,
        
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
      },

      {
        test: /\.less$/,
        
        use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "less-loader",
          options: {
            lessOptions: {
               javascriptEnabled: true
            }
          }
      }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name:'assets/images/[name].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [new CleanWebpackPlugin([outputDirectory]), new MiniCssExtractPlugin() , new Dotenv({path :`${isProduction ? '.env.production' : '.env.development' }`}),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico'
  })  ],
   performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
  
};