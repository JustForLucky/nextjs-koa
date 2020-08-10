const withCss = require('@zeit/next-css')
const config = require('./config')

const configs = {
    // 编译文件输出目录
    distDir: 'dest',
    // 是否给每个路由生成Etag
    generateEtags: true,
    // 页面内容缓存配置
    onDemandEntries: {
        // 内容在内存中的缓存时长(ms)
        maxInactiveAge: 25 * 1000,
        // 同时缓存多少个页面
        pagesBufferLength: 2
    },
    // 在pages目录下哪种后缀文件会被认为是页面
    pageExtensions: ['jsx', 'js'],
    // 配置buildId
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }
        return null
    },
    // 手动修改webpack配置
    webpack(config, options) {
        return config
    },
    // 修改webpackDevMiddleware配置
    webpackDevMiddleware: config => {
        return config;
    },
    // 可以在页面上通过process.env.customKey获取value
    // env: {
    //     customeKey: 'value'
    // },
    // 下面两个要通过'next/config'来读取
    // 只有在服务端渲染时才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET
    },
    // 在服务端渲染和客户端渲染都可以获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static'
    }
}

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}



module.exports = withCss({
    publicRuntimeConfig: {
        GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
        OAUTH_URL: config.OAUTH_URL
    }
})