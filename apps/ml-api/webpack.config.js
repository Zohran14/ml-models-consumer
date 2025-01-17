const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {join} = require('path');

module.exports = {
  watch: process.env['NODE_ENV'] !== 'production',
  output: {
    path: join(__dirname, '../../dist/apps/ml-api'),
    filename: 'main.js',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ["./src/assets"],
      memoryLimit: 4056,
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "apps/ml-api/src/app/data/email-templates",
          to: "./data/email-templates"
        },
      ],
    }),
  ]
};
