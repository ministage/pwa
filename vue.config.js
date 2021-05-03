module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
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
  ]
};
