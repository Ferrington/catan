// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
