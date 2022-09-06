<script setup lang="ts">

interface ITableProps {
    columns: string[],
    data: any[],
    propsToSearch: any[],
};
interface ITablePaginationProps {
    perPage: number,
    currentPage: number,
    total: number
};

const props = withDefaults(defineProps<ITableProps>(), {
    columns: (): string[] => [],
    data: (): any[] => [],
});

const searchQuery = ref<string>('')
const pagination = ref<ITablePaginationProps>({
    perPage: 10,
    currentPage: 1,
    total: 0
});

const total = computed<number>(() => {
    pagination.value.total = props.data.length
    return props.data.length
});
const to = computed<number>(() => {
    let highBound = from.value + pagination.value.perPage
    if (total.value < highBound) {
        highBound = total.value
    }
    return highBound
});
const from = computed<number>(() => {
    return pagination.value.perPage * (pagination.value.currentPage - 1)
});
const pagedData = computed<any[]>(() => {
    return props.data.slice(from.value, to.value)
});
const queriedData = computed<any[]>(() => {
    if (!searchQuery.value) {
        pagination.value.total = props.data.length
        return pagedData.value
    }
    let result = props.data
        .filter((row) => {
            let isIncluded = false;
            for (let key of props.propsToSearch) {
                let rowValue = row[key].toLowerCase().toString();
                if (rowValue.includes && rowValue.includes(searchQuery.value.toLowerCase())) {
                    isIncluded = true
                }
            }
            return isIncluded
        })
    pagination.value.total = result.length
    return result.slice(from.value, to.value)
});


const hasValue = (item: any, column: string): boolean => {
    return item[column.toLowerCase()] !== 'undefined';
}
const itemValue = (item: any, column: string): any => {
    return item[column.toLowerCase()];
}

</script>
<template>
    <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="relative my-2">
                <input type="search" id="default-search" v-model="searchQuery"
                    class="block p-4 pr-10 w-full text-sm text-dark bg-white rounded-lg border border-white focus:ring-primary focus:border-primary "
                    placeholder="جستجو">
                <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-dark" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div class="inline-block min-w-full card overflow-hidden" v-if="data && data.length">
                <table class="hidden sm:table min-w-full leading-normal">
                    <thead>
                        <tr>
                            <slot name="columns" :columns="columns">
                                <th class="px-5 py-3 border-b-4 border-light  text-right text-xs font-semibold text-dark uppercase tracking-wider"
                                    v-for="column in columns" :key="column">{{ column }}</th>
                            </slot>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in queriedData" :key="item.id">
                            <slot name="normal" :row="item" :index="index">
                                <template v-for="(column, idx) in columns" :key="idx">
                                    <td class="px-5 py-5 border-b border-light  text-sm" v-if="hasValue(item, column)">
                                        {{ itemValue(item, column) }}
                                    </td>
                                </template>
                            </slot>
                        </tr>
                    </tbody>
                </table>
                <div class="block sm:hidden">
                    <div v-for="(item, index) in queriedData" :key="`small` + item.id">
                        <slot name="small" :row="item" :index="index">
                            <template v-for="(column, idx) in columns" :key="`small` +idx">
                                <p class="px-5 py-5 text-dark  text-sm" v-if="hasValue(item, column)">
                                    {{ itemValue(item, column) }}
                                </p>
                            </template>
                        </slot>
                    </div>
                </div>
                <BasePagination v-if="data.length > 10" v-model="pagination.currentPage" :total="total">
                </BasePagination>
            </div>
        </div>
    </div>
</template>