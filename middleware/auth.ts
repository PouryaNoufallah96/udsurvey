import { useAuth } from "~~/composables/auth/useAuth";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn.value)
        return navigateTo({ name: 'login' })
})