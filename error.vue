
<script setup lang="ts">
import { ButtonType } from './types';
const props = defineProps({
    error: Object,
});
const handleError = () => clearError({ redirect: '/' });
</script>
<template>
    <NuxtLayout name="error">

        <div class="error">
            <h1 class="error-title ">
                {{ error.statusCode }}
            </h1>
            <h2 class="error-title2">
                An error has occurred 😔: {{ error.message }}
            </h2>
            <BaseButton @click="handleError" text="Clear" :btnType="ButtonType.DANGER"></BaseButton>
        </div>
    </NuxtLayout>
</template>
<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &-title,
    &-title2 {
        font-weight: 600;
        color: white;
        text-align: center;
    }

    &-title {
        font-size: 1.5rem;
    }
}
</style> 