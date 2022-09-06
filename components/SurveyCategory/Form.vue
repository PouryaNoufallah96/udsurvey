<script setup lang="ts">
import { ButtonType, IApiResponse, ISurveyCategoryForm } from '~~/types';
import { object, string } from "yup";
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
import { useBaseFetch } from '~~/composables/fetching';
import { PropType } from 'vue';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false,
    },
    initialValues: {
        type: Object as PropType<ISurveyCategoryForm>,
        default: () => ({
            id: null,
            title: '',
        }),
    }
})

const { error } = ToastHandler();
const { customClientErrorHandler } = ErrorHandler();

const title = computed<string>(() => props.isEdit ? 'ویرایش کتگوری' : 'افزودن کتگوری');

const schema = object({
    title: string()
        .required("تیتر اجباری است")
        .label("FullName"),
});

const submit = async (values: ISurveyCategoryForm) => {
    try {
        const url = props.isEdit ? `/admin/survey-category/update-survey-category` : '/admin/survey-category/add-survey-category';
        const method = props.isEdit ? 'PUT' : 'POST';
        const { result } = await useBaseFetch<IApiResponse<number>>(url, {
            method,
            body: { ...values },
        })
        navigateTo('/admin/survey/category');
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
            <nuxt-link to="/admin/survey/category">بازگشت</nuxt-link>
        </div>
        <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
            v-slot="{ meta: formMeta }" @submit="submit">
            <BaseInput  name="title" label="تیتر" />
            <BaseButton class="mt-4" type="submit" :btn-type="isEdit ? ButtonType.WARNING : ButtonType.SUCCESS"
                text="ذخیره" :disabled="!formMeta.valid"> </BaseButton>
        </VForm>

    </div>
</template>