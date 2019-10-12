import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue' 

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/index.esm.bundle.js'
  },
  plugins: [
    resolve({ extensions: ['.vue'] }),
    commonjs(),
    vue(),
    babel({
      extensions: ['.js', '.vue'],
      exclude: 'node_modules/**'
    })
  ]
}
