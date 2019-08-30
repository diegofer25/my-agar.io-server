module.exports = {
  server: {
    port: process.env.PORT || 3000
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  plugins: [
    '~/plugins/axios',
  ],

  manifest: {
    name: 'Purrinha Online',
    lang: 'pt-br'
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api/': process.env.API_URL || 'http://localhost:4000'
  },

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Purrinha Online' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ],
    script: [
      { src: 'http://localhost:5000/socket.io/socket.io.js' }
    ]
  }
}
