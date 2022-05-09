// gzip 压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  /**
   * Name : baseUrl
   * 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
   * Type: string
   * Default: '/'
   * baseUrl: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
   */
  // 基本路径
  publicPath: './',
  // 输出文件目录名称(默认dist)
  outputDir: 'dist',
  indexPath: 'index.html',
  devServer: {
    host: '127.0.0.1',
    port: 8080
  //   proxy: {
  //       '/api': {
  //           target: 'http://127.0.0.1:80',
  //           // ws: true,
  //           // secure: false,
  //           // changeOrigin: true,
  //           pathRewrite: {
  //               '^/api': '/api',//重写,
  //           }
  //       },
  //   }
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
  configureWebpack: config => {
    const plugins = [];
    // Begin 生成 gzip 压缩文件
    plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240, // 大于10k就压缩（只处理比这个值大的资源，按字节计算）
        minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
      })
    );
    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins];
  }
// 其他配置代码
}
