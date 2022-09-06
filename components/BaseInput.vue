<script setup lang="ts">

interface InputProps {
    type?: string,
    name: string,
    label: string,
    placeholder?: string,
};

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    name: '',
    label: '',
    placeholder: '',
});
</script>


<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm text-dark">{{ label }}</label>

        <VField :name="name" v-slot="{ field, meta, errors }">
            <input v-bind="field"
                class="rounded-md outline-none border border-1 border-light bg-light shadow-md focus:border-disabled focus:ring-0 focus:ring-offset-0 "
                :class="{
                    'border-danger': !meta.valid && meta.touched,
                }" :placeholder="placeholder" :type="type" />
            <VErrorMessage :name="name" as="div" class="text-xs text-danger" />
        </VField>


    </div>
</template>