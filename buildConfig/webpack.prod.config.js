"use strict"

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const { DefinePlugin } = require('webpack')
const { processEnvGenerator } = require("./utility")

const config = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new DefinePlugin({
      ...processEnvGenerator(require('./ENV_PROD'))
    })
  ]
})

module.exports = config;
