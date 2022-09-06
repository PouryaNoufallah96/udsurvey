<script setup lang="ts">
definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن کاربر",
});

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <UserForm></UserForm>
        </NuxtLayout>
    </div>
</template>