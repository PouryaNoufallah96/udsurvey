
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
                console.log('result check auth', result);
                if (result)
                    setUser(result)
            }
            catch (err) {
                console.log('result err check auth', err);
                setUser(null);
                setToken(null);
            }
        }
    }

    const ssrCheck = async () => {

        try {
            const result = await $fetch('https://services.sandbadd.com/api/users/checkauthentication', {
                method: 'POST', headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Itm-2YjYsduM2Kcg2YbZiNmB2YTYp9itIiwibmFtZWlkIjoiNDA1NzAiLCJyb2xlIjoiMSIsIm5iZiI6MTY2MjQ5MTQ3MCwiZXhwIjoxNjYyNTM0NjcwLCJpYXQiOjE2NjI0OTE0NzB9.emUVQpmQdIELXZjLJ00LO_n1RmcVqPqX2p32ocBdO_Q'
                }
            })
            console.log('result ssr', result);
        }
        catch (err) {
            console.log('result err ssr', err);
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