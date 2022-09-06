<script setup lang="ts">
definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن آیتم نظرسنجی",
});

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <SurveyItemDefinitionForm></SurveyItemDefinitionForm>
        </NuxtLayout>
    </div>
</template>