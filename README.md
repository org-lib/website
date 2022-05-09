# vue general
    ? Please pick a preset: Manually select features
    ? Check the features needed for your project: 
     ◉ Choose Vue version
     ◉ Babel
     ◉ TypeScript
     ◯ Progressive Web App (PWA) Support
     ◉ Router
     ◉ Vuex
     ◯ CSS Pre-processors
    ❯◉ Linter / Formatter
     ◯ Unit Testing
     ◯ E2E Testing
     
     yuandeqiao@yuandeqiaodeMBP website % vue create shieldagent



     Vue CLI v4.5.14
     ┌───────────────────────────────────────────┐
     │                                           │
     │   New version available 4.5.14 → 4.5.15   │
     │     Run npm i -g @vue/cli to update!      │
     │                                           │
     └───────────────────────────────────────────┘

     ? Please pick a preset: Manually select features
     ? Check the features needed for your project: Choose Vue version, Babel, TS, Router, Vuex, Linter
     ? Choose a version of Vue.js that you want to start the project with 3.x
     ? Use class-style component syntax? No
     ? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
     ? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
     ? Pick a linter / formatter config: Standard
     ? Pick additional lint features: Lint on save
     ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
     ? Save this as a preset for future projects? No

    cd shieldagent

    yarn serve

# mdcg
    yarn init vite-app mdcg
    vue create mdcg         #Manually select features --> Babel、Router、 CSS Pre-processors、、、、、Less 、、、packages.json

    cd mdcg
    yarn add qrcode.vue
    yarn add vant@3
    yarn add vue-router
    yarn add axios
    yarn add swiper
    yarn add qs
    npm install --save vue-awesome-mui
    
    yarn serve

# shieldagent
    yarn init vite-app shieldagent

    vue create shieldagent

    cd shieldagent
    
    #npm install -g @vue/cli
    
    #npm audit fix --force
    
    yarn add axios
    yarn add element-plus
    
    #vue2 qrcodejs2
    #vue3 qrcode.vue
    
    yarn add qrcode.vue

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1
# shield
    yarn init vite-app shield

    vue create shield

    cd shield

    #npm install -g @vue/cli
    
    #npm audit fix --force
    
    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1

# easyArrived
    yarn init vite-app easyarrived

    vue create easyarrived

    cd easyarrived

    #npm install -g @vue/cli
    
    #npm audit fix --force
    
    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1

# easyarrivedagent
    yarn init vite-app easyarrivedagent

    vue create easyarrivedagent

    cd easyarrivedagent

    #npm install -g @vue/cli
    
    #npm audit fix --force
    
    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1

# easyremote
    yarn init vite-app easyremote

    vue create easyremote

    cd easyremote

    #npm install -g @vue/cli

    #npm audit fix --force

    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1

# easyremoteagent
    yarn init vite-app easyremoteagent

    vue create easyremoteagent

    cd easyremoteagent

    #npm install -g @vue/cli

    #npm audit fix --force

    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩
    yarn add -D compression-webpack-plugin@5.0.1

# 1024pie
    yarn init vite-app 1024pie

    vue create 1024pie

    cd 1024pie

    #npm install -g @vue/cli

    #npm audit fix --force

    yarn add axios
    yarn add element-plus

    yarn serve
    默认是可以运行格式化代码命令的：yarn lint

    打包压缩，默认版本太高，指定5.0.1不报错
    yarn add -D compression-webpack-plugin@5.0.1
    
# 修改基本配置
    1）index.ts 修改history 模式

    const router = createRouter({
      // history: createWebHistory(process.env.BASE_URL),
      // 指定路由的模式,此处使用的是hash模式
      history: createWebHashHistory(),
      routes
    })

    2）新增 vue.config.js
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

    3)修改 tsconfig.json
    "strict": false,
    // "strict": true,
    4）.eslintrc.js 添加rules前两行，否则，空格什么的一堆问题都会异常
    rules: {
      'space-before-function-paren': 0,
      '@typescript-eslint/no-var-requires': 0,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }

# 打包上传
brew install esolitos/ipa/sshpass

make
