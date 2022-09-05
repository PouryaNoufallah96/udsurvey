<script setup lang="ts">
definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن سوال نظرسنجی",
});

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <SurveyQuestionDefinitionForm></SurveyQuestionDefinitionForm>
        </NuxtLayout>
    </div>
</template>