<script setup lang="ts">
useHead(
    {
        bodyAttrs: {
            class: 'bg-gray-100',
        }
    }
)
</script>
<template>
    <div class="min-h-screen p-4 md:p-10">
        <Toast />
        <Navbar></Navbar>
        <div class="container pt-10 px-4 mb-8 mx-auto ">
            <header>
                <slot name="header">
                </slot>
            </header>
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>