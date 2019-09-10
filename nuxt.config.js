const env = {
  appName: 'Agario.js'
}

module.exports = {
  env,

  server: {
    port: process.env.PORT || 3000
  },

  router: {
    middleware: 'i18n'
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  plugins: [
    '~/plugins/axios',
    '~/plugins/i18n'
  ],

  manifest: {
    name: env.appName,
    lang: 'pt-br'
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api/': process.env.API_URL || 'http://localhost:4000'
  },

  css: ['@/assets/scss/main.scss'],

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: env.appName }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      },
      {
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        rel: "stylesheet"
      }
    ],
    script: [
      { src: 'http://localhost:5000/socket.io/socket.io.js' }
    ]
  },

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};
