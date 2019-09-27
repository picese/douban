const path = require('path'); // 路径操作 基于node.js

const htmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html 插件

const { VueLoaderPlugin } = require('vue-loader'); // 把 vue-loader 定义成一个 VueLoaderPlugin 的插件

// 这个配置文件，通过 node 中的模块操作向外暴露一个配置对象 
module.exports = { 

    mode: 'production',

    entry: path.join(__dirname, './scr/main.js'), // 入口，表示使用 webpack 打包那个文件

    output: { // 输出文件的相关配置

        path: path.join(__dirname, './dist'),// 指定打包好的文件输出到那个目录中

        filename: 'bundle.js' // 指定输出文件的名称
    },

    // 配置 HTML 插件节点
    plugins: [ 
        new htmlWebpackPlugin({ // 创建一个在内存中生成的 html 页面插件

            template:path.join(__dirname,'./scr/index.html'), // 指定生成内存页面中的模板页面
            
            filename:'index.html' // 指定生成后页面的名称
        }),

        new VueLoaderPlugin() // 使用定义插件 解决缺少 VueLoaderPlugin 的 BUG
    ],

    // 配置 CSS 第三方模块加载器
    module: {
        rules:[ 
            {test: /\.css$/, use:['style-loader','css-loader'] },

            {test: /\.(jpg|jpeg|png|gif)$/, use:'url-loader?limit=25859 & name = [hash:8]-[name].[ext]'},

            {test: /\.(eot|svg|ttf|woff|woff2)$/, use:'url-loader'},

            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},

            {test:/\.vue$/,use:'vue-loader'} // 处理 .vue 文件的 loader
        ]
    },

    resolve:{
        alias:{ // 设置 Vue 被导入时候的路径
            "vue$":"vue/dist/vue.js"
        }
    }

}

    