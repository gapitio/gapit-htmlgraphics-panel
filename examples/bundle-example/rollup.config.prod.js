import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const OUT_DIR = 'dist';

export default [
  {
    input: 'src/on-init.ts',
    output: {
      dir: OUT_DIR,
      format: 'es',
      sourcemap: false
    },
    plugins: [
      typescript({
        typescript: require('typescript')
      }),
      terser(),
      nodeResolve({
        browser: true
      }),
      copy({
        targets: [{ src: 'src/code-data.json', dest: OUT_DIR }]
      })
    ]
  },
  {
    input: 'src/on-render.ts',
    output: {
      dir: OUT_DIR,
      format: 'es',
      sourcemap: false
    },
    plugins: [
      typescript({
        typescript: require('typescript')
      }),
      terser(),
      nodeResolve({
        browser: true
      })
    ]
  }
];
