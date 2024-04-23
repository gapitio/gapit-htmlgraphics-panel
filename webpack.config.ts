import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import grafanaConfig from './.config/webpack/webpack.config';
import pluginJson from './src/plugin.json';
import path from 'path';

const htmlGraphicsDeclarationsPath = path.resolve(__dirname, 'src/components/CodeEditor/declarations');

/**
 * @type {import("@grafana/toolkit/src/config").CustomWebpackConfigurationGetter}
 */
module.exports.getWebpackConfig = (config, options) => {
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

  return config;
};

const config = async (env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);

  if (baseConfig.module?.rules) {
    if (!Array.isArray(baseConfig.module.rules)) {
      throw new Error('Expected baseConfig.module.rules to be an array');
    }
    if (baseConfig.module.rules.length === 0) {
      throw new Error('baseConfig.module.rules is missing rules');
    }
    const javascriptParserRule = baseConfig.module.rules[0];

    if (javascriptParserRule == null || typeof javascriptParserRule !== 'object') {
      throw new Error('Expected baseConfig.module.rules[0] to be an object (RuleSetRule)');
    }
    javascriptParserRule.exclude = [/node_modules/, htmlGraphicsDeclarationsPath];
  } else {
    throw new Error('Expected baseConfig.module.rules to be defined');
  }

  return merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.d\.ts?$/,
          type: 'asset/resource',
          resource: [htmlGraphicsDeclarationsPath],
          generator: {
            publicPath: `public/plugins/${pluginJson.id}/declarations/`,
            outputPath: 'declarations/',
            filename: '[hash].d.ts',
          },
        },
      ],
    },
  });
};

export default config;
