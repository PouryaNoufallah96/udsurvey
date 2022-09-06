<script setup lang="ts">
import { ButtonType } from '~~/types';

const showNav = ref<boolean>(false);

const toggleNav = () => showNav.value = !showNav.value;

</script>
<template>
    <nav class="container px-4 py-2 mx-auto card">
        <div class=" flex flex-wrap justify-between items-center mx-auto">
            <NuxtLink to="/" class="flex flex-row items-center gap-1">
                <img width="32" height="32" alt="logo" src="/icon.png">
                <span class="text-sm font-bold text-dark">نظرسنجی</span>
            </NuxtLink>
            <BaseButton class="md:hidden" type="button" :btnType="ButtonType.ICON" icon="pi pi-align-justify"
                @click="toggleNav">
            </BaseButton>
            <NavbarItems class="flex w-full md:hidden" v-if="showNav"></NavbarItems>
            <NavbarItems class="hidden md:flex"></NavbarItems>
        </div>
    </nav>
</template>