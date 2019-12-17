import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/index.js'
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      extensions: ['.js'],
      exclude: 'node_modules/**'
    })
  ]
}
