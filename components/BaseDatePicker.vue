<script setup lang="ts">
import { Styles } from '@alireza-ab/vue3-persian-datepicker/dist/utils/modules/types';
import { Common } from '~~/utils/common';
const { jalaliToGregorian } = Common();

interface DatePickerProps {
    modelValue: string,
    label: string,
};

withDefaults(defineProps<DatePickerProps>(), {
    modelValue: '',
    label: ''
});

const emit = defineEmits(["update:modelValue"]);

const styles: Styles = {
    "primary-color": '#6366f1',
    'secondary-color': '#4338ca',
    'in-range-background': '#a5b4fc',
    'text-color': 'black',
    'hover-color': '',
    'border-color': '',
    'icon-background': '',
    'overlay-color': '',
    'main-box-shadow': '',
    'day-dimensions': '',
    'z-index': '',
    'disabled-opacity': '',
    'time-scale': '',
    radius: '',
    background: ''
};


const select = (date: Object) => {
    const jDate = date['d'];
    const gregorian = jalaliToGregorian(jDate['year'], jDate['month'], jDate['date']);
    emit("update:modelValue", gregorian);
}

</script>
<template>
    <DatePicker readonly :label="label" label-class="text-sm text-dark" :styles="styles" from="1401/6/14"
        class=" rounded-md outline-none border border-1 rounded-r-none border-light bg-light shadow-md focus:border-disabled focus:ring-0 focus:ring-offset-0 "
        :modelValue="modelValue" @select="select" format="YYYY-MM-DD" input-format="jYYYY-jMM-jDD" :column="1"
        mode="single">
    </DatePicker>
</template>
<style lang="scss" >
.pdp-group {
    @apply mt-2
}

.pdp input {
    width: 100%;
    padding: 0 0.5rem !important;
}

.pdp.rtl .pdp-group :first-child:not(.pdp-inside) {
    @apply shadow-md bg-light border-light;
}
</style>