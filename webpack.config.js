const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports.getWebpackConfig = (config, options) => ({
  ...config,
  plugins: [
    ...config.plugins,
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve('node_modules/monaco-editor/min/'), to: 'lib' }],
    }),
  ],
});
