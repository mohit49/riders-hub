const path = require("path");
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.config")
const Dotenv = require("dotenv-webpack");
const config = {
  mode:"production",
  plugins: [new Dotenv( {path: '.env.local'})],
}


module.exports = merge(commonConfig, config);