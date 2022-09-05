<script setup lang="ts">
import { CustomerCategories, ICustomerForm } from '~~/types';

definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن مشتری",
});

const categories = CustomerCategories;
const initialValues: ICustomerForm = {
    id: null,
    title: '',
    customerCategoryId: categories[0].id
}

</script>
<template>
    <div>
        <NuxtLayout name="dashboard">
            <CustomerForm :categories="categories" :initial-values="initialValues"></CustomerForm>
        </NuxtLayout>
    </div>
</template>