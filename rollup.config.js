import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: pkg.main,
  plugins: [
    ts({
      useTsconfigDeclarationDir: true,
    }),
  ],
  output: [{
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.umd,
    format: 'umd',
    name: 'ZR',
  }],
};
