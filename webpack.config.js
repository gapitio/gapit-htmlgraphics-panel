const pluginJson = require('./src/plugin.json');

/**
 * @type {import("@grafana/toolkit/src/config").CustomWebpackConfigurationGetter}
 */
module.exports.getWebpackConfig = (config, options) => {
  config.output.publicPath = `public/plugins/${pluginJson.id}/`;
  return config;
};
