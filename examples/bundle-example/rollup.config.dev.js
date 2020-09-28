import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import svgo from 'rollup-plugin-svgo';
import svgoConfig from './svgo.config';
import json from '@rollup/plugin-json';

const OUT_DIR = 'public/build';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: OUT_DIR,
      format: 'es',
      sourcemap: true
    },
    watch: {
      clearScreen: false
    },
    plugins: [
      svgo(svgoConfig),
      json({
        preferConst: true
      }),
      typescript({
        check: false,
        typescript: require("typescript")
      }),
      nodeResolve({
        browser: true
      }),
      livereload(OUT_DIR)
    ]
  },
  {
    input: 'src/on-init.ts',
    output: {
      dir: OUT_DIR,
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      typescript({
        check: false,
        typescript: require("typescript")
      }),
      nodeResolve({
        browser: true
      })
    ]
  },
  {
    input: 'src/on-render.ts',
    output: {
      dir: OUT_DIR,
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      typescript({
        check: false,
        typescript: require("typescript")
      }),
      nodeResolve({
        browser: true
      })
    ]
  }
];
