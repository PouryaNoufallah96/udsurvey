<script setup lang="ts">
type CheckBoxValueType = undefined | number | boolean;
type CheckBoxNameType = number | string;
interface CheckboxProps {
    id: string,
    name: CheckBoxNameType,
    label: string,
    value?: CheckBoxValueType
};
const props = withDefaults(defineProps<CheckboxProps>(), {
    id: '',
    name: '',
    label: '',
    value: true
});
</script>
<template>
    <div class="flex items-center">
        <VField :id="id" :name="name" v-slot="{ field }" type="checkbox" :value="value">
            <input :name="name" :id="id" type="checkbox" :value="value" v-bind="field" class="custom-checkbox">
            <label :for="id" class="custom-checkbox-label">{{ label }}</label>

        </VField>
    </div>
</template>