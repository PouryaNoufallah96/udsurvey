<script setup lang="ts">
import { ButtonType, IEnumberation } from '~~/types';

interface DropDownProps {
    text: string,
    modelValue?: number,
    items: IEnumberation[]
};

const props = withDefaults(defineProps<DropDownProps>(), {

    text: '',
    modelValue: 0,
    items: () => []
});

const emit = defineEmits(["update:modelValue"]);

const show = ref<boolean>(false);

const currentItem = computed<IEnumberation>(() =>
    props.items.find(i => i.id == props.modelValue)
);

const selectItem = (item: number): void => {
    emit("update:modelValue", item);
    show.value = false
}

const handleClose=()=>{
    show.value=false;
}

</script>
<template>
    <div class="flex flex-col gap-2 " v-click-outside="handleClose">

        <label class="text-sm text-dark">{{ text }}</label>
        <div class="relative ">
            <BaseButton class="w-full" type="button" :icon="show ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
                :btn-type="ButtonType.TEXTICON" :text="currentItem?.name ?? '---'" @click="show = !show">
            </BaseButton>

            <ul  v-show="show" class="
                    max-h-40
                    overflow-y-scroll
                    no-scrollbar
                    absolute
                    right-0
                    py-2
                    mt-2
                  bg-light
                    rounded-md
                    shadow-md
                    flex
                    flex-col
                    w-full
                    ">
                <li @click="() => selectItem(item.id)" v-for="item in items" :key="item.id"
                    class=" cursor-pointer p-2 hover:bg-primary-light"
                    :class="{ 'bg-primary text-light font-bold': currentItem && item.id == currentItem.id }">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>

</template>