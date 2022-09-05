<script setup lang="ts">
import { useBaseFetch } from '~~/composables/fetching';
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
import { Common } from '~~/utils/common';

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();
const { formatDate, gregorianToJalali } = Common();

interface ISurveyList extends ICustomList {
    id: number;
    title: string;
    category: string;
    deadLine: string;
    isActive: boolean;
}

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "مدریت نظرسنجی‌ها",
});

const today = formatDate(new Date(Date.now()));

const showDeleteModal = ref<boolean>(false);

const currentSurvey = ref<number | null>(null);

const columns = ['تیتر', 'کتگوری', 'انقضا', 'وضعیت', ''];
const propsToSearch: (keyof ISurveyList)[] = ['title', 'category'];

const { data: surveys, error, refresh } = await useAsyncData<ISurveyList[]>('get-surveys-by-admin', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyList[]>>('/admin/survey/get-surveys');
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const openDeleteModal = (id: number) => {
    currentSurvey.value = id;
    showDeleteModal.value = true;
}
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentSurvey.value = null;
}

const expired = (date: string) => {
    return Date.parse(today) >= Date.parse(date);
}
const submitDelete = async () => {
    try {
        await useBaseFetch<IApiResponse<undefined>>(`/admin/survey/delete-survey/${currentSurvey.value}`, { method: 'DELETE' })
        closeDeleteModal();
        refresh();
    }
    catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}
const addSurvey = () => {
    navigateTo('/admin/survey/add');
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
                <div class="flex justify-between flex-wrap">
                    <h2 class="text-header">مدریت نظرسنجی‌ها</h2>
                    <div class="flex flex-wrap gap-3 items-center">
                        <BaseButton :btn-type="ButtonType.SUCCESS" text="نظرسنجی‌ جدید" @click="addSurvey">
                        </BaseButton>
                        <MyNuxtLink to="/admin/survey/category">کتگوری</MyNuxtLink>
                        <MyNuxtLink to="/admin/survey/item-definition">آیتم‌ها</MyNuxtLink>
                        <MyNuxtLink to="/admin/survey/question-definition">سوالات</MyNuxtLink>
                    </div>
                </div>
            </template>

            <template v-if="!error">
                <BaseTable :props-to-search="propsToSearch" :columns="columns" :data="surveys"
                    v-if="surveys && surveys.length">
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
                            <p class="text-dark whitespace-no-wrap">{{ row.category }}</p>
                        </td>
                        <td class="tbl-row">
                            <p class="text-dark whitespace-no-wrap" :class="{ 'text-danger': expired(row.deadLine) }">{{
                            gregorianToJalali(row.deadLine)
                            }}</p>
                        </td>
                        <td class="tbl-row">
                            <BaseBadge :title="row.isActive ? 'فعال' : 'غیر فعال'"
                                :text-class="row.isActive ? 'text-success' : 'text-danger'"
                                :bg-class="row.isActive ? 'bg-success' : 'bg-danger'"></BaseBadge>
                        </td>
                        <td class="tbl-row ">
                            <div class="flex gap-3">
                                <nuxt-link :to="`/admin/survey/update/${row.id}`"><i
                                        class="pi pi-pencil  hover:text-warning"></i></nuxt-link>
                                <a href="#" @click="() => openDeleteModal(row.id)"><i
                                        class="pi pi-times hover:text-danger"></i></a>
                            </div>
                        </td>
                    </template>
                    <template v-slot:small="{ row }">
                        <div class="p-4 flex flex-row justify-between text-sm">
                            <div class="flex flex-col justify-center gap-2">
                                <div class="flex flex-row items-center gap-2 ">
                                    <div class="w-2 h-2 rounded-full"
                                        :class="row.isActive ? 'bg-success' : 'bg-danger'">
                                    </div>
                                    <p class=" font-bold">{{ row.title }}</p>
                                </div>
                                <p class="text-sm">{{ row.category }}</p>
                                <p class="text-xs" :class="{ 'text-danger': expired(row.deadLine) }">{{
                                gregorianToJalali(row.deadLine)
                                }}</p>
                            </div>
                            <div class="flex flex-col justify-center gap-2">
                                <nuxt-link :to="`/admin/survey/update/${row.id}`"><i class="pi pi-pencil"></i>
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