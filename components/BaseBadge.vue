
<script setup lang="ts">
interface BadgeProps {
    textClass?: string,
    bgClass?: string,
    title: string,
};

const props = withDefaults(defineProps<BadgeProps>(), {
    textClass: 'text-success',
    bgClass: 'bg-sucess',
    title: '',
});

</script>
<template>
    <span class="relative inline-block px-3 py-1 font-semibold text-xs sm:text-base leading-tight" :class="textClass">
        <span aria-hidden class="absolute inset-0 opacity-30 rounded-full" :class="bgClass"></span>
        <span class="relative">{{ title }}</span>
    </span>
</template>