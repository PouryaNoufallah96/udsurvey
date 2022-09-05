<script setup lang="ts">import { ButtonType } from "~~/types";


interface InputProps {
    type?: "submit" | "button" | "reset",
    disabled?: boolean,
    btnType?: ButtonType,
    icon?: string,
    text?: string,
};

const props = withDefaults(defineProps<InputProps>(), {
    type: 'submit',
    disabled: false,
    btnType: ButtonType.PRIMARY,
    icon: '',
    text: '',
});

const emit = defineEmits(["click"]);

const handleClick = <T extends unknown>(evt?: T) => {
    emit("click", evt);
};
</script>

<template>
    <button @click="handleClick"
        class="custom-transition py-2 px-4 text-light rounded-md  shadow-md  disabled:bg-disabled disabled:text-dark "
        :class="[{
            'bg-light border border-1 border-primary text-primary hover:bg-primary hover:text-light ': btnType == ButtonType.OUTLINE,
            ' shadow-none text-dark  hover:text-primary ': btnType == ButtonType.LINK,
            'bg-primary hover:bg-primary-dark': btnType == ButtonType.PRIMARY,
            'bg-white text-dark': btnType == ButtonType.SECONDARY,
            'bg-success hover:bg-success-dark': btnType == ButtonType.SUCCESS,
            'bg-danger hover:bg-danger-dark': btnType == ButtonType.DANGER,
            'bg-warning hover:bg-warning-dark': btnType == ButtonType.WARNING,
            'bg-info hover:bg-info-dark': btnType == ButtonType.INFO,
            'bg-light  text-dark': btnType == ButtonType.TEXTICON,
            ' text-primary  shadow-none hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary': btnType == ButtonType.ICON,
        }]" :disabled="disabled" :type="type">
        <div class="flex flex-row gap-2 items-center justify-between"
            v-if="text && icon && btnType == ButtonType.TEXTICON">
            <span>{{ text }}</span><i :class="icon"></i>
        </div>
        <span v-if="text && btnType != ButtonType.TEXTICON">{{ text }}</span>
        <i v-if="icon && btnType == ButtonType.ICON" :class="icon"></i>
    </button>
</template>