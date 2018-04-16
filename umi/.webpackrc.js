/**
 * 配置 webpack
 */
const SPARROW_ENVIRONMENT = process.env.SPARROW_ENVIRONMENT;

console.log('----> process.env.SPARROW_ENVIRONMENT: ', SPARROW_ENVIRONMENT, '\r\n');

export default {

  /**
   * 配置 webpack-dev-server 的 proxy 属性。
   */
  // proxy: {
  //   "/api": {
  //     "target": "http://jsonplaceholder.typicode.com/",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api": "" }
  //   }
  // },

  /**
   * 外部引入
   */
  // externals: {
  //   react: 'window.React',
  //   'react-dom': 'window.ReactDOM',
  // },

  /**
   * 配置主题，实际上是配置 less 变量
   */
  // theme: './theme-config.js',

  /**
   * 通过 webpack 的 DefinePlugin 传递给代码，值会自动做 JSON.stringify 处理。
   */
  define: {
    'process.env.SPARROW_ENVIRONMENT': SPARROW_ENVIRONMENT,
  },

  /**
   * 对特定的环境进行配置
   */
  env: {
    development: {
      define: {
        'process.env.SPARROW_ENVIRONMENT': 'ontest',
      }
    }
  },

  /**
   * 配置 webpack 的 output.putlicPath 属性
   */
  // publicPath: 'http://jsonplaceholder.typicode.com/',

}
