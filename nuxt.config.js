export default defineNuxtConfig({
  ssr: false,

  experimental: {
    appManifest: false
  },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/scss/main.scss'],

  devtools: {
    enabled: false
  },

  app: {
    head: {
      title: 'BuildTrack',
      meta: [
        {
          name: 'description',
          content: 'Кабинет клиента строительной компании'
        }
      ]
    }
  }
})