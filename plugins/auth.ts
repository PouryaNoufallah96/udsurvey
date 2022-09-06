import { useAuth } from "~~/composables/auth"

export default defineNuxtPlugin(async () => {
    const { checkAuthentication, token } = useAuth();
    console.log(token.value);
    await checkAuthentication()
})