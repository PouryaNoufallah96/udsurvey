<script setup lang="ts">
import { useBaseFetch } from '~~/composables/fetching';
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

interface ISurveyCategoryList extends ICustomList {
    id: number;
    title: string;
}

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "کتگوری‌های نظرسنجی‌",
});

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();

const showDeleteModal = ref<boolean>(false);

const currentSurveyCategory = ref<number | null>(null);

const columns = ['تیتر', ''];
const propsToSearch: (keyof ISurveyCategoryList)[] = ['title'];

const { data: surveyCategories, error, refresh } = await useAsyncData<ISurveyCategoryList[]>('get-survey-categories-by-admin', async () => {

    var response = await useBaseFetch<IApiResponse<ISurveyCategoryList[]>>('/admin/survey-category/get-survey-categories');
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const openDeleteModal = (id: number) => {
    currentSurveyCategory.value = id;
    showDeleteModal.value = true;
}

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentSurveyCategory.value = null;
}

const submitDelete = async () => {
    try {
        await useBaseFetch<IApiResponse<undefined>>(`/admin/survey-category/delete-survey-category/${currentSurveyCategory.value}`, { method: 'DELETE' })
        closeDeleteModal();
        refresh();
    }
    catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}

const addSurveyCategory = () => {
    navigateTo('/admin/survey/category/add');
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
                    <h2 class="text-header">کتگوری‌های نظرسنجی‌</h2>
                    <BaseButton :btn-type="ButtonType.SUCCESS" text="کتگوری جدید"  @click="addSurveyCategory" >
                    </BaseButton>
                </div>
            </template>

                 <template v-if="!error">
                <BaseTable :props-to-search="propsToSearch" :columns="columns" :data="surveyCategories"
                    v-if="surveyCategories && surveyCategories.length">
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
                        <td class="tbl-row ">
                            <div class="flex gap-3">
                                <nuxt-link :to="`/admin/survey/category/update/${row.id}`"><i
                                        class="pi pi-pencil  hover:text-warning"></i></nuxt-link>
                                <a href="#" @click="() => openDeleteModal(row.id)"><i
                                        class="pi pi-times hover:text-danger"></i></a>
                            </div>
                        </td>
                    </template>
                    <template v-slot:small="{ row }">
                        <div class="p-4 flex flex-row justify-between text-sm">
                                <p class=" font-bold">{{ row.title }}</p>
                            <div class="flex flex-col justify-center gap-2">
                                <nuxt-link :to="`/admin/survey/category/update/${row.id}`"><i class="pi pi-pencil"></i>
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