<script setup lang="ts">
interface IPaginationProps {
    pageCount?: number,
    perPage?: number,
    total: number,
    modelValue: number,
};

const props = withDefaults(defineProps<IPaginationProps>(), {
    pageCount: 0,
    perPage: 10,
    total: 0,
    modelValue: 0
});

const emit = defineEmits(["update:modelValue"]);

const totalPages = computed<number>(() => {
    if (props.pageCount > 0) return props.pageCount;
    if (props.total > 0) {
        return Math.ceil(props.total / props.perPage);
    }
    return 1;
});
const pagesToDisplay = computed<number>(() => {
    if (totalPages.value > 0 && totalPages.value < 3) {
        return totalPages.value;
    }
    return 3;
});
const minPage = computed<number>(() => {
    if (props.modelValue >= pagesToDisplay.value) {
        const pagesToAdd = Math.floor(pagesToDisplay.value / 2);
        const newMaxPage = pagesToAdd + props.modelValue;
        if (newMaxPage > totalPages.value) {
            return totalPages.value - pagesToDisplay.value + 1;
        }
        return props.modelValue - pagesToAdd;
    } else {
        return 1;
    }
});
const maxPage = computed<number>(() => {
    if (props.modelValue >= pagesToDisplay.value) {
        const pagesToAdd = Math.floor(pagesToDisplay.value / 2);
        const newMaxPage = pagesToAdd + props.modelValue;
        if (newMaxPage < totalPages.value) {
            return newMaxPage;
        } else {
            return totalPages.value;
        }
    } else {
        return pagesToDisplay.value;
    }
});

const range = (min: number, max: number): number[] => {
    let arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}
const changePage = (item: number): void => {
    emit("update:modelValue", item);
}
const nextPage = (): void => {
    if (props.modelValue < totalPages.value) {
        emit("update:modelValue", props.modelValue + 1);
    }
}
const prevPage = (): void => {
    if (props.modelValue > 1) {
        emit("update:modelValue", props.modelValue - 1);
    }
}


</script>
<template>
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t-4 border-light sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
            <a href="#" @click="prevPage"
                class="relative inline-flex items-center px-4 py-2 border border-light text-sm font-medium rounded-md text-dark bg-white hover:bg-light "
                :class="{ disabled: modelValue === 1 }">
                Previous </a>
            <a href="#" @click="nextPage"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-light text-sm font-medium rounded-md text-dark bg-white hover:bg-light"
                :class="{ disabled: modelValue === totalPages }">
                Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">

                    <a href="#" @click="prevPage"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-light bg-white text-sm font-medium text-dark hover:bg-light"
                        :class="{ disabled: modelValue === 1 }">
                        <span class="sr-only">Previous</span>
                        <i class="pi pi-chevron-right" aria-hidden="true" />
                    </a>
                    <a href="#" aria-current="page" :key="item" v-for="item in range(minPage, maxPage)"
                        @click="changePage(item)"
                        class="z-10 bg-white  relative inline-flex items-center px-4 py-2 border border-1 text-sm font-medium"
                        :class="{ active: modelValue === item }">
                        {{ item }} </a>
                    <a href="#" @click="nextPage"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-light bg-white text-sm font-medium text-dark hover:bg-light"
                        :class="{ disabled: modelValue === totalPages }">
                        <span class="sr-only">Next</span>
                        <i class="pi pi-chevron-left" aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.active {
    @apply border-primary text-primary;
}

.disabled {
    @apply text-disabled cursor-not-allowed;
}
</style>