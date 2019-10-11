import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue' 

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/index.esm.js'
  },
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    babel({
      extensions: ['.js'],
      exclude: 'node_modules/**'
    })
  ],
  external: ['vue']
}
