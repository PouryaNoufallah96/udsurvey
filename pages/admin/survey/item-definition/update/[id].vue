<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { IApiResponse, ISurveyItemDefinitionForm, IUserForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش آیتم نظرسنجی",
});

const { handlingError } = ErrorHandler();
const toast = ToastHandler();

const route = useRoute();
const id = route.params.id;


const { data: surveyItemDefinition, error } = await useAsyncData<ISurveyItemDefinitionForm>('get-survey-item-definition-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyItemDefinitionForm>>(`/admin/survey-item-definition/get-survey-item-definition-by-id/${id}`);
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
            <SurveyItemDefinitionForm :initial-values="surveyItemDefinition" :isEdit="true"></SurveyItemDefinitionForm>
        </NuxtLayout>
    </div>
</template>