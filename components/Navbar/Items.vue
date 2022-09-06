<script setup lang="ts">import { useAuth } from '~~/composables/auth/useAuth';


const { user, isAdmin, logout } = useAuth();
</script>
<template>
    <div class="w-full md:w-auto">
        <div
            class="flex w-full flex-col p-4 mt-4 bg-light rounded-lg border border-light md:flex-row md:gap-3 md:text-sm md:border-0 md:bg-white md:mt-0 md:p-0">

            <MyNuxtLink class="link" to="/">خانه</MyNuxtLink>
            <template v-if="isAdmin">
                <MyNuxtLink class="link" to="/admin/user">کاربران</MyNuxtLink>
                <MyNuxtLink class="link" to="/admin/customer">مشتریان</MyNuxtLink>
                <MyNuxtLink class="link" to="/admin/survey">نظرسنجی‌ها</MyNuxtLink>
            </template>
            <hr class="my-3 md:my-0" />
            <div class="flex flex-row items-center gap-1 " v-if="user">
                <span class=" text-dark font-semibold">{{ user.fullName }}</span>
                <a href="#" class="link" @click="logout"><i class="text-sm pi pi-sign-out"></i></a>
            </div>
        </div>
    </div>
</template>