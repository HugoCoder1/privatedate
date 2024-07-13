// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon"
  ],

  vuefire: {
    auth: { enabled: true, sessionCookie: true },
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    },
  },

  tailwindcss: {
    exposeConfig: true
  },

  colorMode: {
    classSuffix: ""
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv"
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }]
  },

  build: {
    transpile: ["vue-sonner"]
  }
});