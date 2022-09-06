import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    app: {
        head: {
            title: "UD Survey | نظرسنجی فراروند داده‌ها",
            meta: [
                {
                    charset: "utf-8"
                },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                {
                    hid: "description",
                    name: "description",
                    content: "Ultra Data Group Survey Application",
                },
            ],
            link: [
                { rel: 'icon', type: 'image/ico', href: 'favicon.ico' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
            ],
            bodyAttrs: {
                dir: 'rtl'
            }
        },
    },
    loading: { color: "#6366f1" },
    loadingIndicator: { name: "cube-grid", color: "#6366f1" },
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    modules: ['@nuxtjs/tailwindcss'],
    css: [
        '~/assets/styles/main.scss',
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css'
    ],
    pwa: {
        meta: {
            title: "UD | Survey",
            author: "UltraDataGroup",
        },
        manifest: {
            name: "survey",
            short_name: "ud-survey",
            display: "standalone",
            background_color: "#000000",
            theme_color: "#6366f1",
            lang: "fa",
        },
    },
    components: true,
    buildModules: [
        '@nuxtjs/pwa',
        ['@alireza-ab/vue3-persian-datepicker/nuxt', { persianDate: true }]
    ],
    build: {
        transpile: ['primevue', '@vee-validate/rules']
    },
    tailwindcss: {
        cssPath: '~/assets/styles/tailwind.scss',
        configPath: 'tailwind.config.js',
        exposeConfig: true,
        injectPosition: 'last'
    },
});
