<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import {  IApiResponse, ISurveyCategoryForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش کتگوری",
});

const { handlingError } = ErrorHandler();
const toast = ToastHandler();

const route = useRoute();
const id = route.params.id;


const { data: surveyCategory, error } = await useAsyncData<ISurveyCategoryForm>('get-survey-category-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyCategoryForm>>(`/admin/survey-category/get-survey-category-by-id/${id}`);
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
            <SurveyCategoryForm  :initial-values="surveyCategory" :isEdit="true"></SurveyCategoryForm>
        </NuxtLayout>
    </div>
</template>