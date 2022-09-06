
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
                const { result } = await useBaseFetch<IApiResponse<IUser>>('account/check-authentication', { method: 'POST' })
                console.log(result);
                if (result)
                    setUser(result)
            }
            catch (err) {
                console.log(err);
                setUser(null);
                setToken(null);
            }
        }
    }

    const ssrCheck = async () => {

        try {
            const { result } = await useBaseFetch<IApiResponse<IUser>>('account/ssr-check', { method: 'POST' })
            console.log(result);
        }
        catch (err) {
            console.log(err);
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
        ssrCheck
    }
}