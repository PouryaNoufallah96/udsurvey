<script setup lang="ts">
import { ErrorHandler } from "~~/utils/handle-error";
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { ToastHandler } from "~~/utils/handle-toast";
import { useBaseFetch } from "~~/composables/fetching";

interface IUserList extends ICustomList {
    id: number;
    fullName: string;
    username: string;
    isAdmin: boolean;
}

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "کاربران",
});

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();

const showDeleteModal = ref<boolean>(false);

const currentUser = ref<number | null>(null);

const columns = ['نام', 'شماره تلفن', 'وضعیت', ''];
const propsToSearch: (keyof IUserList)[] = ['fullName', 'username'];

const { data: users, error, refresh } = await useAsyncData<IUserList[]>('get-users-by-admin', async () => {

    var response = await useBaseFetch<IApiResponse<IUserList[]>>('/admin/user/get-users');
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const openDeleteModal = (id: number) => {
    currentUser.value = id;
    showDeleteModal.value = true;
}

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentUser.value = null;
}

const submitDelete = async () => {
    try {
        await useBaseFetch<IApiResponse<undefined>>(`/admin/user/delete-user/${currentUser.value}`, { method: 'DELETE' })
        closeDeleteModal();
        refresh();
    }
    catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}

const addUser = () => {
    navigateTo('/admin/user/add');
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
                    <h2 class="text-header">کاربران</h2>
                    <BaseButton :btn-type="ButtonType.SUCCESS" text="کاربر جدید" @click="addUser">
                    </BaseButton>
                </div>
            </template>
            <template v-if="!error">
                <BaseTable :props-to-search="propsToSearch" :columns="columns" :data="users"
                    v-if="users && users.length">
                    <template v-slot:normal="{ row }">
                        <td class="tbl-row">
                            <div class="flex">
                                <div class="ml-3">
                                    <p class="text-dark whitespace-no-wrap">
                                        {{ row.fullName }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="tbl-row">
                            <p class="text-dark whitespace-no-wrap">{{ row.username }}</p>
                        </td>
                        <td class="tbl-row">
                            <BaseBadge :title="row.isAdmin ? 'ادمین' : 'کاربر'"
                                :text-class="row.isAdmin ? 'text-success' : 'text-info'"
                                :bg-class="row.isAdmin ? 'bg-success' : 'bg-info'"></BaseBadge>
                        </td>
                        <td class="tbl-row ">
                            <div class="flex gap-3">
                                <nuxt-link :to="`/admin/user/update/${row.id}`"><i
                                        class="pi pi-pencil  hover:text-warning"></i></nuxt-link>
                                <a href="#" @click="() => openDeleteModal(row.id)"><i
                                        class="pi pi-times hover:text-danger"></i></a>
                            </div>
                        </td>
                    </template>
                    <template v-slot:small="{ row }">
                        <div class="p-4 flex flex-row justify-between text-sm">
                            <div class="flex flex-col gap-1">
                                <p class=" font-bold">{{ row.fullName }}</p>
                                <p class="">{{ row.username }}</p>
                                <BaseBadge :title="row.isAdmin ? 'ادمین' : 'کاربر'" class="self-start"
                                    :text-class="row.isAdmin ? 'text-success' : 'text-info'"
                                    :bg-class="row.isAdmin ? 'bg-success' : 'bg-info'"></BaseBadge>
                            </div>
                            <div class="flex flex-col justify-center gap-2">
                                <nuxt-link :to="`/admin/user/update/${row.id}`"><i class="pi pi-pencil "></i>
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

