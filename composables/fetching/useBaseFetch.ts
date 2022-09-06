
import { useAuth } from '../auth';
import { IApiErrorResponse } from './../../types/index';
import type { FetchOptions } from 'ohmyfetch';
import { ErrorHandler } from '~~/utils/handle-error';
export const useBaseFetch = async<T>(url: string, options?: FetchOptions) => {
    const { API_BASE_URL: baseURL } = useRuntimeConfig();
    const { createMyError } = ErrorHandler();
    return await $fetch<T>(url, {
        baseURL,
        Headers: {
            Accept: 'application/json',
            "Content-Type": "application/json; charset=utf-8"
        },
        ...options,
        async onRequest({ options }) {
            const { token } = useAuth();
            if (token.value) {
                options.headers = new Headers(options.headers);
                options.headers.set("Authorization", `Bearer ${token.value}`);
            }
        },
        async onResponseError({ response }) {
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
};