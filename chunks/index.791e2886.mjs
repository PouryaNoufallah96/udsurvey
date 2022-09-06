import { E as ErrorHandler, T as ToastHandler, u as useHead, e as useAsyncData, f as useBaseFetch, B as ButtonType, m as Common, n as navigateTo, _ as __nuxt_component_0$2, a as _sfc_main$j } from './server.mjs';
import { defineComponent, withAsyncContext, withCtx, createVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { handlingError } = ErrorHandler();
    const toast = ToastHandler();
    const { gregorianToJalali } = Common();
    useHead({
      title: "\u062E\u0627\u0646\u0647 | \u0644\u0633\u06CC\u062A \u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C\u0647\u0627"
    });
    const { data: surveys, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("get-surveys-by-user", async () => {
      var response = await useBaseFetch("/survey/get-surveys");
      return response.result;
    }, {
      initialCache: false
    }, "$pqtWcjQkdb")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      handlingError(error.value, (message, detail) => toast.error(message, detail));
    }
    const goToSurvey = (id) => navigateTo(`/survey/${id}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_BaseButton = _sfc_main$j;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "dashboard" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-header"${_scopeId}>\u062E\u0627\u0646\u0647</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-header" }, "\u062E\u0627\u0646\u0647")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(error)) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(surveys), (survey) => {
                _push2(`<div class="p-4 bg-white shadow-md rounded-md flex flex-col gap-2 custom-transition hover:scale-105 hover:shadow-xl"${_scopeId}><div class="flex justify-between"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><h3 class="font-bold text-primary-dark"${_scopeId}>${ssrInterpolate(survey.title)}</h3><span class="text-sm"${_scopeId}>${ssrInterpolate(survey.category)}</span></div><div class="text-xs sm:text-sm font-bold flex flex-col gap-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(gregorianToJalali)(survey.createDate))}</span><span${_scopeId}>${ssrInterpolate(unref(gregorianToJalali)(survey.deadLine))}</span></div></div><hr class="my-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_BaseButton, {
                  "btn-type": unref(ButtonType).OUTLINE,
                  text: "\u0634\u0631\u0648\u0639",
                  onClick: ($event) => goToSurvey(survey.id)
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!--[-->${ssrInterpolate(unref(error)["message"])}<!--]-->`);
            }
          } else {
            return [
              !unref(error) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(surveys), (survey) => {
                  return openBlock(), createBlock("div", {
                    key: survey.id,
                    class: "p-4 bg-white shadow-md rounded-md flex flex-col gap-2 custom-transition hover:scale-105 hover:shadow-xl"
                  }, [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("div", { class: "flex flex-col gap-1" }, [
                        createVNode("h3", { class: "font-bold text-primary-dark" }, toDisplayString(survey.title), 1),
                        createVNode("span", { class: "text-sm" }, toDisplayString(survey.category), 1)
                      ]),
                      createVNode("div", { class: "text-xs sm:text-sm font-bold flex flex-col gap-1" }, [
                        createVNode("span", null, toDisplayString(unref(gregorianToJalali)(survey.createDate)), 1),
                        createVNode("span", null, toDisplayString(unref(gregorianToJalali)(survey.deadLine)), 1)
                      ])
                    ]),
                    createVNode("hr", { class: "my-4" }),
                    createVNode(_component_BaseButton, {
                      "btn-type": unref(ButtonType).OUTLINE,
                      text: "\u0634\u0631\u0648\u0639",
                      onClick: ($event) => goToSurvey(survey.id)
                    }, null, 8, ["btn-type", "onClick"])
                  ]);
                }), 128))
              ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(unref(error)["message"]), 1)
              ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.791e2886.mjs.map
