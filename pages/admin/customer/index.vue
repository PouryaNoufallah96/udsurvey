<script setup lang="ts">
import { ErrorHandler } from "~~/utils/handle-error";
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { ToastHandler } from "~~/utils/handle-toast";
import { useBaseFetch } from "~~/composables/fetching";

interface ICustomerList extends ICustomList {
    id: number;
    title: string;
    category: string
}

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "مشتریان",
});

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();

const showDeleteModal = ref<boolean>(false);

const currentCustomer = ref<number | null>(null);

const columns = ['نام', 'کتگوری', ''];
const propsToSearch: (keyof ICustomerList)[] = ['title', 'category'];

const { data: customers, error, refresh } = await useAsyncData<ICustomerList[]>('get-customers-by-admin', async () => {

    var response = await useBaseFetch<IApiResponse<ICustomerList[]>>('/admin/customer/get-customers');
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const openDeleteModal = (id: number) => {
    currentCustomer.value = id;
    showDeleteModal.value = true;
}

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentCustomer.value = null;
}

const submitDelete = async () => {
    try {
        await useBaseFetch<IApiResponse<undefined>>(`/admin/customer/delete-customer/${currentCustomer.value}`, { method: 'DELETE' })
        closeDeleteModal();
        refresh();
    }
    catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}

const addCustomer = () => {
    navigateTo('/admin/customer/add');
}

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <BaseModal :ok-button-type="ButtonType.DANGER" :show="showDeleteModal" @close="closeDeleteModal"
                @ok="submitDelete">
                <div><span class="text-base text-dark font-semibold">آیا از حذف اطمینان دارید؟</span></div>
            </BaseModal>
            <template #header>
                <div class="flex justify-between">
                    <h2 class="text-header">مشتریان</h2>
                    <BaseButton :btn-type="ButtonType.SUCCESS" text="مشتری جدید" @click="addCustomer">
                    </BaseButton>
                </div>
            </template>
            <template v-if="!error">
                <BaseTable :props-to-search="propsToSearch" :columns="columns" :data="customers"
                    v-if="customers && customers.length">
                    <template v-slot:normal="{ row }">
                        <td class="tbl-row">
                            <div class="flex">
                                <div class="ml-3">
                                    <p class="text-dark whitespace-no-wrap">
                                        {{ row.title }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="tbl-row">
                            <i class="text-dark pi pi-microsoft" v-if="row.category == 'Windows'"></i>
                            <i class="text-dark pi pi-wifi" v-else></i>
                        </td>
                        <td class="tbl-row ">
                            <div class="flex gap-3">
                                <nuxt-link :to="`/admin/customer/update/${row.id}`"><i
                                        class="pi pi-pencil  hover:text-warning"></i></nuxt-link>
                                <a href="#" @click="() => openDeleteModal(row.id)"><i
                                        class="pi pi-times hover:text-danger"></i></a>
                            </div>
                        </td>
                    </template>
                    <template v-slot:small="{ row }">
                        <div class="p-4 flex flex-row justify-between text-sm">
                            <div class="flex flex-col gap-4">

                                <p class=" font-bold">{{ row.title }}</p>
                                <p class="">{{ row.category }}</p>
                            </div>
                            <div class="flex flex-col justify-center gap-2">
                                <nuxt-link :to="`/admin/customer/update/${row.id}`"><i class="pi pi-pencil "></i>
                                </nuxt-link>
                                <a href="#" @click="() => openDeleteModal(row.id)"><i class="pi pi-times"></i></a>
                            </div>
                        </div>

                    </template>
                </BaseTable>
            </template>
            <template v-else>
                {{ error['message'] }}
            </template>
        </NuxtLayout>
    </div>
</template>

