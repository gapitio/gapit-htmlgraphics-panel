module.exports.getWebpackConfig = (config, options) => ({
  ...config,
  output: {
    ...config.output,
    publicPath: 'public/plugins/gapit-htmlgraphics-panel/',
  },
});
