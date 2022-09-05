import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component('Toast', Toast);
});