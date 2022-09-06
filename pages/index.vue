
<script setup lang="ts">import { useBaseFetch } from '~~/composables/fetching';
import { ButtonType, IApiResponse, ICustomList } from '~~/types';
import { Common } from '~~/utils/common';
import { ErrorHandler } from '~~/utils/handle-error';
import { ToastHandler } from '~~/utils/handle-toast';
const { handlingError } = ErrorHandler();
const toast = ToastHandler();
const { gregorianToJalali } = Common();

interface IUserSurveyList extends ICustomList {
  id: number;
  title: string;
  category: string;
  createDate: string;
  deadLine: string;
}
definePageMeta({
  middleware: ['auth'],
})

useHead({
  title: "خانه | لسیت نظرسنجی‌ها",
});


const { data: surveys, error } = await useAsyncData<IUserSurveyList[]>('get-surveys-by-user', async () => {

  var response = await useBaseFetch<IApiResponse<IUserSurveyList[]>>('/survey/get-surveys');
  return response.result;
}, {
  initialCache: false
});
if (error.value) {
  handlingError(error.value, (message: string, detail?: string) => toast.error(message, detail));
}

const goToSurvey = (id: number) =>
  navigateTo(`/survey/${id}`);


</script>

<template>
  <div>
    <NuxtLayout name="dashboard">
      <template #header>
        <h2 class="text-header">خانه</h2>
      </template>

      <template v-if="!error">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
          <template v-for="survey in surveys" :key="survey.id">
            <div
              class="p-4 bg-white shadow-md rounded-md flex flex-col gap-2 custom-transition hover:scale-105 hover:shadow-xl ">
              <div class="flex justify-between">
                <div class="flex flex-col gap-1">
                  <h3 class=" font-bold text-primary-dark">{{ survey.title }}</h3>
                  <span class="text-sm"> {{ survey.category }} </span>
                </div>
                <div class="text-xs sm:text-sm font-bold flex flex-col gap-1">
                  <span>{{ gregorianToJalali(survey.createDate) }} </span>
                  <span> {{ gregorianToJalali(survey.deadLine) }} </span>
                </div>
              </div>
              <hr class="my-4" />
              <BaseButton :btn-type="ButtonType.OUTLINE" text="شروع" @click="goToSurvey(survey.id)"></BaseButton>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        {{ error['message'] }}
      </template>
    </NuxtLayout>
  </div>
</template>
