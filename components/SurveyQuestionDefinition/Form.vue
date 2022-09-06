<script setup lang="ts">
import { ButtonType, IApiResponse, ISurveyQuestionDefinitionForm, ICustomList, IEnumberation } from '~~/types';
import { boolean, object, string } from "yup";
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
import { useBaseFetch } from '~~/composables/fetching';
import { PropType } from 'vue';

interface ISurveyCategoryForSurveyQuestionDefinitionList extends ICustomList {
    id: number;
    title: string;
}

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false,
    },
    initialValues: {
        type: Object as PropType<ISurveyQuestionDefinitionForm>,
        default: () => ({
            id: null,
            title: '',
            surveyCategoryId: 0,
            isActive: false,
        }),
    }
})

const { error } = ToastHandler();
const { handlingError, customClientErrorHandler } = ErrorHandler();

const title = computed<string>(() => props.isEdit ? 'ویرایش سوال' : 'افزودن سوال');

const surveyCategoryId = ref<number | null>(props.initialValues.surveyCategoryId);

const schema = object({
    title: string()
        .required("تیتر اجباری است")
        .label("Title"),
    isActive: boolean().label("IsActive"),
});

const { data: surveyCategories, error: err } = await useAsyncData<IEnumberation[]>('get-survey-category-by-admin-for-survey-question-definition', async () => {
    var response = await useBaseFetch<IApiResponse<ISurveyCategoryForSurveyQuestionDefinitionList[]>>('/admin/survey-category/get-survey-categories');
    surveyCategoryId.value = response.result[0].id;
    return response.result.map(r => {
        return {
            id: r.id,
            name: r.title
        }
    });
}, {
    initialCache: false
});
if (err.value) {
    handlingError(err.value, (message: string, detail?: string) => error(message, detail));
}


const submit = async (values: ISurveyQuestionDefinitionForm) => {
    try {
        const url = props.isEdit ? `/admin/survey-question-definition/update-survey-question-definition` : '/admin/survey-question-definition/add-survey-question-definition';
        const method = props.isEdit ? 'PUT' : 'POST';
        const { result } = await useBaseFetch<IApiResponse<number>>(url, {
            method,
            body: { ...values, isActive: values.isActive ?? false, surveyCategoryId: surveyCategoryId.value },
        })
        navigateTo('/admin/survey/question-definition');
    } catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            error(message, detail)
        );
    }
}

</script>

<template>
    <div class="w-full md:w-1/2">
        <div class=" flex justify-between">
            <h2 class="text-header">{{ title }}</h2>
            <nuxt-link to="/admin/survey/question-definition">بازگشت</nuxt-link>
        </div>
        <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
            v-slot="{ meta: formMeta }" @submit="submit">

            <div class="flex flex-col md:grid  md:grid-cols-2 gap-4">
                <BaseInput class="col-span-2" name="title" label="تیتر" />
                <BaseDropDown v-model="surveyCategoryId" :items="surveyCategories" text="کتگوری">
                </BaseDropDown>
                <BaseCheckbox class="md:self-end" id="isActive" name="isActive" label="فعال"></BaseCheckbox>
            </div>
            <BaseButton class="mt-4" type="submit" :btn-type="isEdit ? ButtonType.WARNING : ButtonType.SUCCESS"
                text="ذخیره" :disabled="!formMeta.valid"> </BaseButton>
        </VForm>

    </div>
</template>