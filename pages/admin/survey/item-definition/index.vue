<script setup lang="ts">
import { useBaseFetch } from '~~/composables/fetching';
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';

interface ISurveyItemDefinitionList extends ICustomList {
    id: number;
    title: string;
    category: string;
}

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "آیتم‌های نظرسنجی‌",
});

const { handlingError, customClientErrorHandler } = ErrorHandler();
const toast = ToastHandler();

const showDeleteModal = ref<boolean>(false);

const currentSurveyItemDefinition = ref<number | null>(null);

const columns = ['تیتر', 'کتگوری', 'وضعیت', ''];
const propsToSearch: (keyof ISurveyItemDefinitionList)[] = ['title', 'category'];

const { data: surveyItemDefinitions, error, refresh } = await useAsyncData<ISurveyItemDefinitionList[]>('get-survey-item-definitions-by-admin', async () => {
    var response = await useBaseFetch<IApiResponse<ISurveyItemDefinitionList[]>>('/admin/survey-item-definition/get-survey-item-definitions');
    return response.result;
}, {
    initialCache: false
});
if (error.value) {
    handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const openDeleteModal = (id: number) => {
    currentSurveyItemDefinition.value = id;
    showDeleteModal.value = true;
}

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentSurveyItemDefinition.value = null;
}

const submitDelete = async () => {
    try {
        await useBaseFetch<IApiResponse<undefined>>(`/admin/survey-item-definition/delete-survey-item-definition/${currentSurveyItemDefinition.value}`, { method: 'DELETE' })
        closeDeleteModal();
        refresh();
    }
    catch (err) {
        customClientErrorHandler(err, (message: string, detail?: string) =>
            toast.error(message, detail)
        );
    }
}

const addSurveyItemDefinition = () => {
    navigateTo('/admin/survey/item-definition/add');
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
                    <h2 class="text-header">آیتم‌های نظرسنجی‌</h2>
                    <BaseButton :btn-type="ButtonType.SUCCESS" text="آیتم جدید" @click="addSurveyItemDefinition">
                    </BaseButton>
                </div>
            </template>

            <template v-if="!error">
                <BaseTable :props-to-search="propsToSearch" :columns="columns" :data="surveyItemDefinitions"
                    v-if="surveyItemDefinitions && surveyItemDefinitions.length">
                    <template v-slot:normal="{ row }">
                        <td class="tbl-row">
                            <p class="text-dark whitespace-no-wrap">
                                {{ row.title }}
                            </p>
                        </td>
                        <td class="tbl-row">
                            <p class="text-dark whitespace-no-wrap">{{ row.category }}</p>
                        </td>
                        <td class="tbl-row">
                            <BaseBadge :title="row.isActive ? 'فعال' : 'غیر فعال'"
                                :text-class="row.isActive ? 'text-success' : 'text-danger'"
                                :bg-class="row.isActive ? 'bg-success' : 'bg-danger'"></BaseBadge>
                        </td>
                        <td class="tbl-row ">
                            <div class="flex gap-3">
                                <nuxt-link :to="`/admin/survey/item-definition/update/${row.id}`"><i
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
                            </div>
                            <div class="flex flex-col justify-center gap-2">
                                <nuxt-link :to="`/admin/survey/item-definition/update/${row.id}`"><i
                                        class="pi pi-pencil"></i>
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