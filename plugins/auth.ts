import { useAuth } from "~~/composables/auth"

export default defineNuxtPlugin(async () => {
    const { checkAuthentication, token, ssrCheck } = useAuth();
    console.log(token.value);
    await ssrCheck();
    await checkAuthentication()
})