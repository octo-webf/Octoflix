const { GenerateSW } = require('workbox-webpack-plugin')
const urlAPIToCache = '^https://tv.octo.com/api/v2*'

module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('service-worker')
      .use(GenerateSW, [{
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
          urlPattern: new RegExp(urlAPIToCache),
          handler: 'cacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }])
    return config
  }
}
