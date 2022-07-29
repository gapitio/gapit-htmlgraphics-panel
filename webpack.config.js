const path = require('path');

const pluginJson = require('./src/plugin.json');

const htmlGraphicsDeclarationsPath = path.resolve(__dirname, 'src/components/CodeEditor/declarations');

/**
 * @type {import("@grafana/toolkit/src/config").CustomWebpackConfigurationGetter}
 */
module.exports.getWebpackConfig = (config, options) => {
  config.output.publicPath = `public/plugins/${pluginJson.id}/`;

  // Don't compile the declarations with babel (removes the types).
  config.module.rules[0].exclude = [/node_modules/, htmlGraphicsDeclarationsPath];

  // Compile the declarations using asset/resource
  config.module.rules.push({
    test: /\.d\.ts?$/,
    type: 'asset/resource',
    resource: [htmlGraphicsDeclarationsPath],
    generator: {
      publicPath: `public/plugins/${pluginJson.id}/declarations/`,
      outputPath: 'declarations/',
      filename: '[hash].d.ts',
    },
  });

  // Workaround for https://github.com/grafana/grafana/issues/52923
  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      type: 'asset/resource',
      generator: {
        publicPath: `public/plugins/${pluginJson.id}/img/`,
        outputPath: 'img/',
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset/resource',
      generator: {
        publicPath: `public/plugins/${pluginJson.id}/fonts/`,
        outputPath: 'fonts/',
      },
    }
  );

  return config;
};
