<script setup lang="ts">
import { useBaseFetch } from '~~/composables/fetching';
import { ButtonType, IApiResponse, ISurveyUserForm } from '~~/types';
import { Common } from '~~/utils/common';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();
const { gregorianToJalali } = Common();

interface AnswerInterface {
    surveyQuestionId: number,
    surveyItemId: number,
    point: number,
    description?: string
}
interface SurveyResultInterface {
    surveyId: number,
    results: AnswerInterface[]
}

const route = useRoute();
const id = route.params.id;

definePageMeta({
    middleware: ['auth'],
})

const { data: survey, error } = await useAsyncData<ISurveyUserForm>('get-survey-by-user-by-id', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyUserForm>>(`/survey/get-survey-by-id/${id}`);
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

useHead({
    title: `نظرسنجی | ${survey.value?.title}`,
});

const isSubmiting = ref<boolean>(false);

const answers = reactive<AnswerInterface[]>([]);

const numberOfOptions: number = 5;

const answer = (question: number, item: number, point: number) => {
    if (answerExist(question, item)) {
        const idx = answers.findIndex(a => a.surveyItemId == item && a.surveyQuestionId == question);
        if (answers[idx].point == point) { return answers.splice(idx, 1); }
        answers.splice(idx, 1);
    }
    const data: AnswerInterface = { surveyQuestionId: question, surveyItemId: item, point, description: '' };
    answers.push(data);
}
const answerExist = (question: number, item: number): boolean =>
    answers.some(a => a.surveyItemId == item && a.surveyQuestionId == question);
const answerActive = (question: number, item: number, point: number): boolean =>
    answers.some(a => a.surveyItemId == item && a.surveyQuestionId == question && a.point == point);
const setDescription = (question: number, item: number, event: Event): void => {
    var description = event.target['value'];
    answers.find(a => a.surveyItemId == item && a.surveyQuestionId == question).description = description;
}
const submit = async () => {
    try {
        isSubmiting.value = true;
        const payload: SurveyResultInterface = {
            surveyId: survey.value.id,
            results: answers
        }
        await useBaseFetch<IApiResponse<number>>('survey/add-survey-result', {
            method: 'POST',
            body: payload,
        })
        toast.success('با تشکر', 'نظرات شما با موفقیت ثبت شد')
        setTimeout(() => {
            navigateTo('/');
        }, 2000);
    }
    catch (err) {
        isSubmiting.value = false;
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}


</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <template v-if="!error">

                <div class="flex flex-col gap-10">
                    <div class="flex justify-between">
                        <div class="flex flex-col gap-2">
                            <h1 class="text-lg font-bold text-primary">{{ survey.title }}</h1>
                            <h2 class="text-sm font-bold">{{ survey.surveyCategory }}</h2>
                        </div>
                        <span class="text-sm font-bold">
                            {{ gregorianToJalali(survey.deadLine) }} <i
                                class="pi pi-calendar-times text-danger"></i></span>
                    </div>
                    <div class=" p-4 flex flex-col gap-8 bg-white rounded-md shadow-md ">
                        <template v-for="question, idx in survey.surveyQuestions" :key="question.id">
                            <div class="flex flex-col gap-6"
                                :class="{ 'pb-8 border-b-[1px]  border-disabled': idx != survey.surveyQuestions.length - 1 }">
                                <p class="flex gap-3 items-center ">
                                    <span class="text-primary font-extrabold text-3xl ">{{ idx + 1
                                    }} </span> <span class="text-base font-semibold"> {{ question.title }} </span>
                                </p>
                                <div class="flex flex-col gap-8 md:gap-4">
                                    <template v-for="item in survey.surveyItems" :key="item.id">
                                        <div
                                            class="mx-6 flex flex-col gap-6  md:flex-row md:items-center md:gap-10  flex-wrap ">
                                            <p class="text-sm font-semibold"> {{ item.title }}</p>
                                            <div class="flex items-center  gap-1 md:gap-3">
                                                <button type="button" v-for="point in numberOfOptions" :key="point"
                                                    @click="answer(question.id, item.id, point)"
                                                    class="flex justify-center items-center select-none  cursor-pointer border-2  text-xl font-bold p-2  rounded-full shadow h-10 w-10  hover:shadow-md hover:bg-primary-light "
                                                    :class="answerActive(question.id, item.id, point) ? 'bg-primary text-light shadow-md outline-none shadow-outline' : 'bg-white'">
                                                    <span>{{ point }}</span>
                                                </button>

                                            </div>
                                            <input placeholder="توضیحات"
                                                class="p-2 rounded-md outline-none border border-1 border-light bg-white shadow text-sm grow focus:border-disabled focus:ring-0 focus:ring-offset-0 "
                                                v-if="answerExist(question.id, item.id)"
                                                @input="setDescription(question.id, item.id, $event)" />
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <BaseButton :disabled="!answers || !answers.length || isSubmiting" class="mt-6 self-start px-10"
                            @click="submit" :btn-type="ButtonType.PRIMARY" text="ثبت">
                        </BaseButton>
                    </div>
                </div>
            </template>
            <template v-else>
                {{ error['message'] }}
            </template>
        </NuxtLayout>
    </div>
</template>