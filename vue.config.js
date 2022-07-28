const webpack = require('webpack');
module.exports = {
    // publicPath: '/Headmaster',
    //主要是配置这个. 配置项目的公共路径. 后面将打包后的文件放在服务器的该文件夹下.
    assetsPublicPath: './',

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ]
    },

    outputDir: '../wwwroot',
    assetsDir: 'static'
}
module.exports = {
    lintOnSave: false,

    // 　　publicPath: '/Headmaster',
    outputDir: '../wwwroot',

    // assetsPublicPath: './'
    assetsDir: 'static'
}