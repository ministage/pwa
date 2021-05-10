module.exports = {
    configureWebpack: {
        devServer: {
            headers: {"Access-Control-Allow-Origin": "*"}
        }
    },

    pluginOptions: {
        apollo: {
            lintGQL: true
        }
    },

    publicPath: process.env.NODE_ENV === 'production'
        ? '/pwa/'
        : '/',

    transpileDependencies: [
        'vuetify'
    ],

    pwa: {
        name: "California",
        themeColor: "#e0bfbf",
        appleMobileWebAppCapable: 'yes',
        iconPaths: {
            faviconSVG: null,
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png'
        }
    }
};
