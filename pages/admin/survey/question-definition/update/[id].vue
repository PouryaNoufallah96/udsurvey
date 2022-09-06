<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { IApiResponse, ISurveyQuestionDefinitionForm, IUserForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش سوال نظرسنجی",
});

const { handlingError } = ErrorHandler();
const toast = ToastHandler();

const route = useRoute();
const id = route.params.id;


const { data: surveyQuestionDefinition, error } = await useAsyncData<ISurveyQuestionDefinitionForm>('get-survey-question-definition-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyQuestionDefinitionForm>>(`/admin/survey-question-definition/get-survey-question-definition-by-id/${id}`);
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
            <SurveyQuestionDefinitionForm :initial-values="surveyQuestionDefinition" :isEdit="true">
            </SurveyQuestionDefinitionForm>
        </NuxtLayout>
    </div>
</template>