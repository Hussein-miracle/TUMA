// import { defineNuxtConfig } from 'nuxt';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    // '~/plugins/mono',
    '@vueuse/nuxt',
    //'@fawmi/vue-google-maps',

    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  css: ["@/assets/styles/main.css", "@/assets/styles/styles.scss"],

  app: {
    head: {
      // title:' Apace - Shopper',
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
      

        { src: "https://cdn.eu.trustpayments.com/js/latest/st.js" }


        // {
        //   src:`https://maps.googleapis.com/maps/api/js?key=${process.env.NUXT_GOOGLE_API_KEY}`
        // }
      ],
      link: [
        ,
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // { rel: 'stylesheet', href: 'https://awesome-lib.css' }
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ':root { color: red }', type: 'text/css' }

        // { children: ':root { color: red }', type: 'text/css' }
        // { children: ':root { color: red }', type: 'text/css' }
        
      ],
      noscript: [
        // <noscript>Javascript is required</noscript>
        { children: "Javascript is required" },
      ],
    },
  },
  components: true,
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      
    },
  },
  plugins: [{ src: '~/plugins/vuedompurifyhtml', mode: 'client' }]
  ,
  build:{
    transpile: ["@fawmi/vue-google-maps"],
  }
});
