import { useAppStore } from "~~/store/app";



export default defineNuxtRouteMiddleware((item) => {
  const {fetchDefault} = useAppStore();
  fetchDefault();
})
