import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  const {
    public: { GOOGLE_API_KEY },
  } = useRuntimeConfig();
  
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key:  GOOGLE_API_KEY ,
      libraries: "places", // This is required if you use the Autocomplete plugin
    },
    autobindAllEvents: true,
  });
});
