
import { IApiResponse, IUser } from "~~/types"
import { useBaseFetch } from "../fetching";

export const useAuth = () => {



    const user = useState<IUser | null>('user', () => null);

    const token = useCookie<string | null>("access_token", { default: null, maxAge: 86400 });

    const isLoggedIn = computed<boolean>(() => user.value != null);
    const isAdmin = computed<boolean>(() => user.value?.isAdmin);

    const setUser = (data?: IUser) => {
        user.value = data;
    }
    const setToken = (accessToken?: string) => {
        token.value = accessToken
    }

    const login = async (
        username: string,
        password: string,
    ) => {
        const { result } = await useBaseFetch<IApiResponse<string>>('account/login', {
            method: 'POST',
            body: {
                username,
                password,
            },
        })

        if (result)
            setToken(result);
    }
    const logout = () => {
        setToken(null);
        setUser(null);
        navigateTo('/login');
    }
    const checkAuthentication = async () => {
        if (!isLoggedIn.value) {
            try {
                const { API_BASE_URL: baseURL } = useRuntimeConfig();
                const { result } = await $fetch<IApiResponse<IUser>>('account/check-authentication', { baseURL, method: 'POST', headers: { 'Authorization': `Bearer ${token.value}` } })
                if (result)
                    setUser(result)
            }
            catch (err) {
                setUser(null);
                setToken(null);
            }
        }
    }

    return {
        setToken,
        user,
        token,
        isLoggedIn,
        isAdmin,
        login,
        logout,
        checkAuthentication,
    }
}