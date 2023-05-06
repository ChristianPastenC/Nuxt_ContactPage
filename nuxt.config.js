export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Contact Me',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    ['@nuxtjs/google-fonts', {
      families: {
        'Exo+2': {
          ital: [700]
        },
        'Space+Mono': true
      }
    }],
    '@nuxtjs/tailwindcss',
  ],
  modules: [
  ],
  build: {
    transpile: ['three', 'GLTFLoader'],

    extend(config, ctx) {
      if (config.module) {
        config.module.rules.push({
          test: /\.(glsl)$/i,
          use: ['raw-loader'],
        })
      }
    },
  }
}
