import { u as useHead, E as ErrorHandler, T as ToastHandler, j as useRoute, e as useAsyncData, f as useBaseFetch, _ as __nuxt_component_0$2, l as _sfc_main$6 } from './server.mjs';
import { defineComponent, withAsyncContext, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u062A\u06AF\u0648\u0631\u06CC"
    });
    const { handlingError } = ErrorHandler();
    const toast = ToastHandler();
    const route = useRoute();
    const id = route.params.id;
    const { data: surveyCategory, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("get-survey-category-by-admin-by-id", async () => {
      var response = await useBaseFetch(`/admin/survey-category/get-survey-category-by-id/${id}`);
      return response.result;
    }, {
      initialCache: false
    }, "$GwibseFoGh")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      handlingError(error.value, (message, detail) => toast.error(message, detail));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_SurveyCategoryForm = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SurveyCategoryForm, {
              "initial-values": unref(surveyCategory),
              isEdit: true
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SurveyCategoryForm, {
                "initial-values": unref(surveyCategory),
                isEdit: true
              }, null, 8, ["initial-values"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/survey/category/update/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.e8b5981e.mjs.map
