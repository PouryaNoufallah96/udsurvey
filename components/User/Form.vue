<script setup lang="ts">
import { ButtonType, IApiResponse, IUserForm,ICustomList, IEnumberation } from '~~/types';
import { boolean, object, string } from "yup";
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
import { useBaseFetch } from '~~/composables/fetching';
import { PropType } from 'vue';

interface ICustomerForUserList extends ICustomList {
    id: number;
    title: string;
}

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false,
    },
    initialValues: {
        type: Object as PropType<IUserForm>,
        default: () => ({
            id: null,
            fullName: '',
            username: '',
            password: '',
            isAdmin: false,
            customerId: null,
        }),
    }
})

const { error } = ToastHandler();
const {handlingError, customClientErrorHandler } = ErrorHandler();

const title = computed<string>(() => props.isEdit ? 'ویرایش کاربر' : 'افزودن کاربر');

const customerId = ref<number | null>(props.initialValues.customerId);

const schema = object({
    fullName: string()
        .required("نام و نام خانوادگی اجباری است")
        .label("FullName"),
    username: string()
        .required()
        .matches(/^0(9\d{9})$/, "شماره تلفن وارد شده معتبر نیست")
        .label("Username"),
    password: string().required().min(6, "تعداد حروف وارد شده کافی نیست").label("Password"),
    isAdmin: boolean().label("IsAdmin"),
});

const { data: customers, error:err } = await useAsyncData<IEnumberation[]>('get-customers-by-admin-for-user', async () => {
    var response = await useBaseFetch<IApiResponse<ICustomerForUserList[]>>('/admin/customer/get-customers');
    return response.result.map(r=>{
        return {
            id:r.id,
            name:r.title
        }
    });
}, {
    initialCache: false
});
if (err.value) {
    handlingError(err.value, (message: string, detail?: string) => error(message, detail));
}


const submit = async (values: IUserForm) => {
    try {
        const url = props.isEdit ? `/admin/user/update-user` : '/admin/user/add-user';
        const method = props.isEdit ? 'PUT' : 'POST';
        const { result } = await useBaseFetch<IApiResponse<number>>(url, {
            method,
            body: { ...values, isAdmin: values.isAdmin ?? false, customerId: customerId.value },
        })
        navigateTo('/admin/user');
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
            <nuxt-link to="/admin/user">بازگشت</nuxt-link>
        </div>
        <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
            v-slot="{ meta: formMeta }" @submit="submit">

            <div class="flex flex-col md:grid  md:grid-cols-2 gap-4">
                <BaseInput class="col-span-2" name="fullName" label="نام و نام‌خانوادگی" />
                <BaseInput type="tel" name="username" label="تلفن همراه" />
                <BaseInput type="password" name="password" label="رمز عبور" />
                   <BaseDropDown v-model="customerId" :items="customers" text="مشتری">
                </BaseDropDown>
                <BaseCheckbox class="md:self-end" id="isAdmin" name="isAdmin" label="ادمین"></BaseCheckbox>
            </div>
            <BaseButton class="mt-4" type="submit" :btn-type="isEdit ? ButtonType.WARNING : ButtonType.SUCCESS" text="ذخیره"
                :disabled="!formMeta.valid"> </BaseButton>
        </VForm>

    </div>
</template>