<script setup lang="ts">

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن کتگوری",
});


</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
           <SurveyCategoryForm></SurveyCategoryForm>
        </NuxtLayout>
    </div>
</template>