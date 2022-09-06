import { w as defineNuxtRouteMiddleware, t as useAuth, n as navigateTo } from './server.mjs';
import 'vue';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import '@vue/shared';
import 'vue/server-renderer';
import 'yup';
import 'cookie-es';
import 'ohash';
import '@alireza-ab/persian-date';
import 'jalali-moment';
import 'click-outside-vue3';
import 'vee-validate';
import '@vee-validate/i18n';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

const auth = defineNuxtRouteMiddleware(async (_to, _from) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn.value)
    return navigateTo({ name: "login" });
});

export { auth as default };
//# sourceMappingURL=auth.475f47a5.mjs.map
