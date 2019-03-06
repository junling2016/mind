import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonJs from 'rollup-plugin-commonjs'

const getConfig = (minify = false) => {
  const config = {
    input: 'src/index.js',
    output: {
      file: `dist/mind${minify ? '.min' : ''}.js`,
      format: 'umd',
      name: 'Mind',
      sourcemap: minify
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      }),
      commonJs()
    ],
    watch: {
      include: 'src/**'
    }
  }

  if (minify) {
    config.plugins.push(uglify())
  }

  return config
}

export default [getConfig(), getConfig(true)]
