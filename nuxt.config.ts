// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  css: ["~/assets/main.css"],
  modules: ["@pinia/nuxt"],
});
