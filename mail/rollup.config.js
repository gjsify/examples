import commonjs from '@rollup/plugin-commonjs';
import sucrase from '@rollup/plugin-sucrase';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    name: 'art-code-mail'
  },
  plugins: [
    resolve({
      extensions: ['.js', '.ts']
    }),
    commonjs(),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript']
    })
  ]
};
