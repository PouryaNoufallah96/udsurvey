import { b as _export_sfc, B as ButtonType, c as clearError, _ as __nuxt_component_0$2, a as _sfc_main$j } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const handleError = () => clearError({ redirect: "/" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_BaseButton = _sfc_main$j;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "error" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="error" data-v-cc0b4ab2${_scopeId}><h1 class="error-title" data-v-cc0b4ab2${_scopeId}>${ssrInterpolate(__props.error.statusCode)}</h1><h2 class="error-title2" data-v-cc0b4ab2${_scopeId}> An error has occurred \u{1F614}: ${ssrInterpolate(__props.error.message)}</h2>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              onClick: handleError,
              text: "Clear",
              btnType: unref(ButtonType).DANGER
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "error" }, [
                createVNode("h1", { class: "error-title" }, toDisplayString(__props.error.statusCode), 1),
                createVNode("h2", { class: "error-title2" }, " An error has occurred \u{1F614}: " + toDisplayString(__props.error.message), 1),
                createVNode(_component_BaseButton, {
                  onClick: handleError,
                  text: "Clear",
                  btnType: unref(ButtonType).DANGER
                }, null, 8, ["btnType"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc0b4ab2"]]);

export { error as default };
//# sourceMappingURL=error-component.b3888ba1.mjs.map
