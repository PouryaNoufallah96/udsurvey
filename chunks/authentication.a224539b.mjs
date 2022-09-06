import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { b as _export_sfc } from './server.mjs';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import '@vue/shared';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Toast = resolveComponent("Toast");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container max-w-full h-screen bg-gradient-to-r from-secondary to-primary py-10 md:py-40" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Toast, null, null, _parent));
  _push(`<div class="flex flex-col place-items-center gap-3"><h1 class="text-4xl font-bold text-light">\u0641\u0631\u0627\u0631\u0648\u0646\u062F \u062F\u0627\u062F\u0647\u200C\u0647\u0627</h1><h2 class="text-2xl font-bold mb-5 text-light">\u0646\u0638\u0631\u0633\u0646\u062C\u06CC</h2></div><div class="max-w-sm mx-auto h-full flex flex-col items-center justify-center relative">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/authentication.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const authentication = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { authentication as default };
//# sourceMappingURL=authentication.a224539b.mjs.map
