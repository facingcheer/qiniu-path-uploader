import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/index.esm.bundle.js'
  },
  plugins: [
    commonjs(),
    babel({
      extensions: ['.js'],
      exclude: 'node_modules/**'
    })
  ]
}
