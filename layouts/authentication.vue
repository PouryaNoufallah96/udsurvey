<script setup lang="ts"></script>
<template>
  <div class="container max-w-full h-screen bg-gradient-to-r from-secondary to-primary py-10 md:py-40">
    <Toast />
    <div class="flex flex-col place-items-center gap-3">
      <h1 class="text-4xl font-bold text-light">فراروند داده‌ها</h1>
      <h2 class="text-2xl font-bold mb-5 text-light">نظرسنجی</h2>
    </div>
    <div class="max-w-sm mx-auto h-full flex flex-col items-center justify-center relative">
      <slot />
    </div>
  </div>
</template>
