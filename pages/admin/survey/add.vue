<script setup lang="ts">
definePageMeta({
    middleware: ['admin'],
})

useHead({
    title: "افزودن نظرسنجی",
});

</script>
    <template>
    <div>
        <NuxtLayout name="dashboard">
            <SurveyForm></SurveyForm>
        </NuxtLayout>
    </div>
</template>