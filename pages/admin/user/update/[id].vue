<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { IApiResponse, IUserForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش کاربر",
});

const { handlingError } = ErrorHandler();
const toast = ToastHandler();

const route = useRoute();
const id = route.params.id;


const { data: user, error } = await useAsyncData<IUserForm>('get-user-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<IUserForm>>(`/admin/user/get-user-by-id/${id}`);
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <UserForm :initial-values="user" :isEdit="true"></UserForm>
        </NuxtLayout>
    </div>
</template>