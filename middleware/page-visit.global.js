import setupInterceptor from "~/middleware/axios.interceptors";
export default defineNuxtRouteMiddleware( () => {
  setupInterceptor()
})