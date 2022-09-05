<script setup lang="ts">
import { ButtonType, IApiResponse, ICustomList, IEnumberation, ISurveyForm } from '~~/types';
import { boolean, object, string } from "yup";
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
import { useBaseFetch } from '~~/composables/fetching';
import { PropType } from 'vue';
import { Common } from '~~/utils/common';

const { error } = ToastHandler();
const { customClientErrorHandler } = ErrorHandler();
const { formatDate } = Common();

interface ISurveyDropDown extends ICustomList {
    id: number;
    title: string;
}

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false,
    },
    initialValues: {
        type: Object as PropType<ISurveyForm>,
        default: () => {
            const today =new Date(Date.now());
            const tomorrow= new Date(today);
            tomorrow.setDate(today.getDate()+1)
            const date = tomorrow.toISOString();
            return {
                id: null,
                title: '',
                surveyCategoryId: 0,
                deadLine: date,
                isActive: false,
                surveyItems: [],
                surveyQuestions: [],
            }
        },
    }
})

const model = reactive<ISurveyForm>({
    id: props.initialValues.id,
    title: props.initialValues.title,
    deadLine: formatDate(props.initialValues.deadLine),
    isActive: true,
    surveyCategoryId: props.initialValues.surveyCategoryId,
    surveyItems: props.initialValues.surveyItems,
    surveyQuestions: props.initialValues.surveyQuestions
})

const schema = object({
    title: string()
        .required("تیتر اجباری است")
        .label("FullName"),
    isActive: boolean().label("IsActive"),

});

const title = computed<string>(() => props.isEdit ? 'ویرایش نظرسنجی' : 'افزودن نظرسنجی');
const hasItems = computed<boolean>(() => model.surveyItems.length > 0);
const hasQuestions = computed<boolean>(() => model.surveyQuestions.length > 0);
const currentCategory = computed<string>(() => surveyCategories.value.find(sc => sc.id == model.surveyCategoryId)?.name);

const [{ data: surveyCategories }, { data: surveyItemDefinitions, refresh: refreshSurveyItemDefinitions }, { data: surveyQuestionDefinitions, refresh: refreshSurveyQuestionDefinitions }] = await Promise.all([
    await useAsyncData<IEnumberation[]>('get-survey-categories-by-admin-for-survey', async () => {
        var response = await useBaseFetch<IApiResponse<ISurveyDropDown[]>>('/admin/survey-category/get-survey-categories');
        model.surveyCategoryId = response.result[0].id;
        return response.result.map(r => {
            return {
                id: r.id,
                name: r.title
            }
        });
    }, {
        initialCache: false
    }),
    await useAsyncData<IEnumberation[]>('get-survey-item-definitions-by-category', async () => {
        var response = await useBaseFetch<IApiResponse<ISurveyDropDown[]>>(`/admin/survey-item-definition/get-survey-item-definitions-by-category/${model.surveyCategoryId}`);
        return response.result.map(r => {
            return {
                id: r.id,
                name: r.title
            }
        });
    }, {
        initialCache: false
    }),
    await useAsyncData<IEnumberation[]>('get-survey-question-definitions-by-category', async () => {
        var response = await useBaseFetch<IApiResponse<ISurveyDropDown[]>>(`/admin/survey-question-definition/get-survey-question-definitions-by-category/${model.surveyCategoryId}`);
        return response.result.map(r => {
            return {
                id: r.id,
                name: r.title
            }
        });
    }, {
        initialCache: false
    })
])
const submit = async (values
) => {
    const payload = {
        ...model,
        title: values.title,
        isActive: values.isActive ?? false
    };

    try {
        const url = props.isEdit ? `/admin/survey/update-survey` : '/admin/survey/add-survey';
        const method = props.isEdit ? 'PUT' : 'POST';
        const { result } = await useBaseFetch<IApiResponse<number>>(url, {
            method,
            body: payload,
        })
        navigateTo('/admin/survey');
    } catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            error(message, detail)
        );
    }
}

watch(() => model.surveyCategoryId, async (val) => {
    model.surveyItems = [];
    model.surveyQuestions = [];
    await refreshSurveyItemDefinitions();
    await refreshSurveyQuestionDefinitions();
});


</script>
    
<template>
    <div class="w-full md:w-1/2">
        <div class=" flex justify-between">
            <h2 class="text-header">{{ title }}</h2>
            <nuxt-link to="/admin/survey">بازگشت</nuxt-link>
        </div>
        <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
            v-slot="{ meta: formMeta }" @submit="submit">

            <div class="flex flex-col md:grid  md:grid-cols-2 gap-4">
                <base-input name="title" label="تیتر" />

                <BaseDropDown v-if="!isEdit" v-model="model.surveyCategoryId" :items="surveyCategories" text="کتگوری">
                </BaseDropDown>
                <p class="md:self-end" v-if="isEdit">
                    کتگوری: <span class="font-bold text-primary"> {{ currentCategory }}</span>
                </p>
                <div class="survey-card">
                    <label class="text-sm text-dark mb-2">آیتم‌ها</label>
                    <template v-for="item in surveyItemDefinitions" :key="item.id">
                        <div><input type="checkbox" v-model="model.surveyItems" :id="`item_${item.id}`" :value="item.id"
                                class="custom-checkbox">
                            <label :for="`item_${item.id}`" class="custom-checkbox-label">{{ item.name }}</label>
                        </div>
                    </template>
                </div>
                <div class="survey-card">
                    <label class="text-sm text-dark mb-2">سوالات</label>
                    <template v-for="question in surveyQuestionDefinitions" :key="question.id">
                        <div><input type="checkbox" v-model="model.surveyQuestions" :id="`question_${question.id}`"
                                :value="question.id" class="custom-checkbox">
                            <label :for="`question_${question.id}`" class="custom-checkbox-label">{{ question.name
                            }}</label>
                        </div>
                    </template>
                </div>
                <BaseDatePicker label="انقضا" v-model="model.deadLine">
                </BaseDatePicker>
                <BaseCheckbox class="md:self-end" name="isActive" id="isActive" v-model="model.isActive" label="فعال">
                </BaseCheckbox>
            </div>
            <BaseButton class="mt-4" type="submit" :btn-type="isEdit ? ButtonType.WARNING : ButtonType.SUCCESS"
                text="ذخیره" :disabled="!hasItems || !hasQuestions || !formMeta.valid"> </BaseButton>
        </VForm>
    </div>
</template>

<style lang="scss" scoped>
.survey-card {
    @apply flex flex-col p-4 shadow-md rounded-md max-h-36 overflow-y-auto
}
</style>