<script setup lang="ts">
import { ButtonType } from '~~/types';

interface ModalProps {
    show: boolean,
    title?: string,
    showClose?: boolean,
    okButtonText?: string,
    okButtonType?: ButtonType,
    disableOk?: boolean,
    cancelButtonType?: ButtonType,
};

const props = withDefaults(defineProps<ModalProps>(), {
    show: false,
    title: 'توجه',
    showClose: true,
    okButtonText: 'تایید',
    okButtonType: ButtonType.PRIMARY,
    disableOk: false,
    cancelButtonType: ButtonType.LINK,
});

const emit = defineEmits(["ok", "close"]);

const handleOk = <T extends unknown>(evt?: T) => {
    emit("ok", evt);
};

const handleClose = <T extends unknown>(evt?: T) => {
    emit("close", evt);
};


watch(() => props.show, (val) => {
    let documentClasses = document.querySelector('html').classList;
    if (val) {
        documentClasses.add("modal-open");
    } else {
        documentClasses.remove("modal-open");
    }
});

</script>
<template>
    <Teleport to="body">
        <div class="fixed inset-0 z-20 flex justify-center items-center bg-dark bg-opacity-30" v-if="show">
            <div v-click-outside="handleClose"
                class="w-full p-4 max-w-xs bg-white sm:max-w-sm md:max-w-md  rounded-2xl">

                <slot name="header">
                    <div class="flex justify-between">
                        <h3 class="text-xl font-bold text-dark">{{ title }}</h3>
                        <a href="#" @click="handleClose" v-if="showClose"><i class="pi pi-times"></i></a>
                    </div>
                </slot>
                <div class="px-5 py-10">

                    <slot></slot>
                </div>
                <slot name="footer">
                    <div class="flex flex-row gap-3">
                        <BaseButton type="submit" :btn-type="okButtonType" :text="okButtonText" @click.stop="handleOk"
                            :disabled="disableOk"></BaseButton>
                    </div>
                </slot>

            </div>

        </div>
    </Teleport>

</template>