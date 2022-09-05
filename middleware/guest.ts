import { useAuth } from "~~/composables/auth/useAuth"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isLoggedIn } = useAuth()

    if (isLoggedIn.value) {
        if (from.name === to.name)
            return navigateTo({ name: 'index' })

        return abortNavigation()
    }
})