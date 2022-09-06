<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { IApiResponse, ISurveyForm } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
const { handlingError } = ErrorHandler();
const toast = ToastHandler();

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "ویرایش نظرسنجی",
});


const route = useRoute();
const id = route.params.id;


const { data: survey, error } = await useAsyncData<ISurveyForm>('get-survey-by-admin-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyForm>>(`/admin/survey/get-survey-by-id/${id}`);
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
            <SurveyForm :initial-values="survey" :isEdit="true">
            </SurveyForm>
        </NuxtLayout>
    </div>
</template>