<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { CustomerCategories, IApiResponse, ICustomerForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش مشتری",
});

const { handlingError } = ErrorHandler();
const toast = ToastHandler();

const route = useRoute();
const id = route.params.id;


const { data: customer, error } = await useAsyncData<ICustomerForm>('get-customer-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ICustomerForm>>(`/admin/customer/get-customer-by-id/${id}`);
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const categories = CustomerCategories;

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <CustomerForm :categories="categories" :initial-values="customer" :isEdit="true"></CustomerForm>
        </NuxtLayout>
    </div>
</template>