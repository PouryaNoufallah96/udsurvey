import { useAuth } from "~~/composables/auth"

export default defineNuxtRouteMiddleware(async (_to, _from) => {

    const { isAdmin, isLoggedIn } = useAuth()
    if (!isLoggedIn.value)
        return navigateTo({ name: 'login' });

    if (!isAdmin.value)
        return navigateTo({ name: 'index' });
})