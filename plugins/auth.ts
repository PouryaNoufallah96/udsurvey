import { useAuth } from "~~/composables/auth"

export default defineNuxtPlugin(async () => {
    const { checkAuthentication } = useAuth()
    await checkAuthentication()
})