import type { FetchOptions } from 'ohmyfetch';
import { IApiErrorResponse } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { useAuth } from '../auth';

export const useCustomFetch = async<T>(url: string, options?: FetchOptions) => {
    const { API_BASE_URL: baseURL } = useRuntimeConfig();
    const { createMyError } = ErrorHandler();
    const router = useRouter();
    return await useFetch<T>(url, {
        baseURL,
        initialCache: false,
        ...options,
        async onRequest({ options }) {
            const { token } = useAuth();
            if (token.value) {
                options.headers = new Headers(options.headers);
                options.headers.set("Authorization", `Bearer ${token.value}`);
            }
        }, async onResponseError({ response }) {

            if (response._data && (typeof response._data !== 'string') && response._data.errors)
                throw createMyError(response._data.errors[0]);
            else {
                const error: IApiErrorResponse = {
                    code: response.status, message: response.statusText,
                }
                throw createMyError(error);
            }
        },
    })
}