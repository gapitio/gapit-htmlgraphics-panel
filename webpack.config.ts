import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import grafanaConfig from './.config/webpack/webpack.config';
import path from 'path';

const htmlGraphicsDeclarationsPath = path.resolve(__dirname, 'src/components/CodeEditor/declarations');

const config = async (env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);

  if (baseConfig.module?.rules) {
    if (!Array.isArray(baseConfig.module.rules)) {
      throw new Error('Expected baseConfig.module.rules to be an array');
    }
    if (baseConfig.module.rules.length < 2) {
      throw new Error('baseConfig.module.rules is missing rules');
    }
    const javascriptParserRule = baseConfig.module.rules[1];

    if (javascriptParserRule == null || typeof javascriptParserRule !== 'object') {
      throw new Error('Expected baseConfig.module.rules[1] to be an object (RuleSetRule)');
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
            filename: 'declarations/[hash].d.ts',
          },
        },
      ],
    },
  });
};

export default config;
