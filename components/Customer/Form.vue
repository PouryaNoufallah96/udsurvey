<script setup lang="ts">
import { ButtonType, IApiResponse, ICustomerForm, IEnumberation } from '~~/types';
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
    categories: {
        type: Array<IEnumberation>,
        default: [],
    },
    initialValues: {
        type: Object as PropType<ICustomerForm>,
        default: () => ({
            id: null,
            title: '',
            customerCategoryId: 0,
        }),
    }
})

const { error } = ToastHandler();
const { customClientErrorHandler } = ErrorHandler();

const title = computed<string>(() => props.isEdit ? 'ویرایش مشتری' : 'افزودن مشتری');

const customerCategoryId = ref<number>(props.initialValues.customerCategoryId);

const schema = object({
    title: string()
        .required("نام اجباری است")
        .label("FullName"),
});

const submit = async (values: ICustomerForm) => {
    try {
        const url = props.isEdit ? `/admin/customer/update-customer` : '/admin/customer/add-customer';
        const method = props.isEdit ? 'PUT' : 'POST';
        const { result } = await useBaseFetch<IApiResponse<number>>(url, {
            method,
            body: { ...values, customerCategoryId: customerCategoryId.value },
        })
        navigateTo('/admin/customer');
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
            <nuxt-link to="/admin/customer">بازگشت</nuxt-link>
        </div>
        <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
            v-slot="{ meta: formMeta }" @submit="submit">

            <div class="flex flex-col md:grid  md:grid-cols-3 gap-4">
                <BaseInput class="col-span-2" name="title" label="نام" />
                <BaseDropDown v-model="customerCategoryId" :items="categories" text="کتگوری">
                </BaseDropDown>
            </div>

            <BaseButton class="mt-4" type="submit" :btn-type="isEdit ? ButtonType.WARNING : ButtonType.SUCCESS" text="ذخیره"
                :disabled="!formMeta.valid"> </BaseButton>
        </VForm>

    </div>
</template>