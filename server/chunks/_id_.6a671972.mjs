import { E as ErrorHandler, T as ToastHandler, j as useRoute, e as useAsyncData, f as useBaseFetch, u as useHead, B as ButtonType, m as Common, n as navigateTo, _ as __nuxt_component_0$2, a as _sfc_main$j } from './server.mjs';
import { defineComponent, withAsyncContext, ref, reactive, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
    var _a;
    let __temp, __restore;
    const { handlingError, customClientErrorHandler } = ErrorHandler();
    const toast = ToastHandler();
    const { gregorianToJalali } = Common();
    const route = useRoute();
    const id = route.params.id;
    const { data: survey, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("get-survey-by-user-by-id", async () => {
      var response = await useBaseFetch(`/survey/get-survey-by-id/${id}`);
      return response.result;
    }, {
      initialCache: false
    }, "$gOdy71FR7a")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      handlingError(error.value, (message, detail) => toast.error(message, detail));
    }
    useHead({
      title: `\u0646\u0638\u0631\u0633\u0646\u062C\u06CC | ${(_a = survey.value) == null ? void 0 : _a.title}`
    });
    const isSubmiting = ref(false);
    const answers = reactive([]);
    const numberOfOptions = 5;
    const answer = (question, item, point) => {
      if (answerExist(question, item)) {
        const idx = answers.findIndex((a) => a.surveyItemId == item && a.surveyQuestionId == question);
        if (answers[idx].point == point) {
          return answers.splice(idx, 1);
        }
        answers.splice(idx, 1);
      }
      const data = { surveyQuestionId: question, surveyItemId: item, point, description: "" };
      answers.push(data);
    };
    const answerExist = (question, item) => answers.some((a) => a.surveyItemId == item && a.surveyQuestionId == question);
    const answerActive = (question, item, point) => answers.some((a) => a.surveyItemId == item && a.surveyQuestionId == question && a.point == point);
    const setDescription = (question, item, event) => {
      var description = event.target["value"];
      answers.find((a) => a.surveyItemId == item && a.surveyQuestionId == question).description = description;
    };
    const submit = async () => {
      try {
        isSubmiting.value = true;
        const payload = {
          surveyId: survey.value.id,
          results: answers
        };
        await useBaseFetch("survey/add-survey-result", {
          method: "POST",
          body: payload
        });
        toast.success("\u0628\u0627 \u062A\u0634\u06A9\u0631", "\u0646\u0638\u0631\u0627\u062A \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062B\u0628\u062A \u0634\u062F");
        setTimeout(() => {
          navigateTo("/");
        }, 2e3);
      } catch (err) {
        isSubmiting.value = false;
        customClientErrorHandler(
          err,
          (message, detail) => toast.error(message, detail)
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_BaseButton = _sfc_main$j;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(error)) {
              _push2(`<div class="flex flex-col gap-10"${_scopeId}><div class="flex justify-between"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><h1 class="text-lg font-bold text-primary"${_scopeId}>${ssrInterpolate(unref(survey).title)}</h1><h2 class="text-sm font-bold"${_scopeId}>${ssrInterpolate(unref(survey).surveyCategory)}</h2></div><span class="text-sm font-bold"${_scopeId}>${ssrInterpolate(unref(gregorianToJalali)(unref(survey).deadLine))} <i class="pi pi-calendar-times text-danger"${_scopeId}></i></span></div><div class="p-4 flex flex-col gap-8 bg-white rounded-md shadow-md"${_scopeId}><!--[-->`);
              ssrRenderList(unref(survey).surveyQuestions, (question, idx) => {
                _push2(`<div class="${ssrRenderClass([{ "pb-8 border-b-[1px]  border-disabled": idx != unref(survey).surveyQuestions.length - 1 }, "flex flex-col gap-6"])}"${_scopeId}><p class="flex gap-3 items-center"${_scopeId}><span class="text-primary font-extrabold text-3xl"${_scopeId}>${ssrInterpolate(idx + 1)}</span> <span class="text-base font-semibold"${_scopeId}>${ssrInterpolate(question.title)}</span></p><div class="flex flex-col gap-8 md:gap-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(survey).surveyItems, (item) => {
                  _push2(`<div class="mx-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10 flex-wrap"${_scopeId}><p class="text-sm font-semibold"${_scopeId}>${ssrInterpolate(item.title)}</p><div class="flex items-center gap-1 md:gap-3"${_scopeId}><!--[-->`);
                  ssrRenderList(numberOfOptions, (point) => {
                    _push2(`<button type="button" class="${ssrRenderClass([answerActive(question.id, item.id, point) ? "bg-primary text-light shadow-md outline-none shadow-outline" : "bg-white", "flex justify-center items-center select-none cursor-pointer border-2 text-xl font-bold p-2 rounded-full shadow h-10 w-10 hover:shadow-md hover:bg-primary-light"])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(point)}</span></button>`);
                  });
                  _push2(`<!--]--></div>`);
                  if (answerExist(question.id, item.id)) {
                    _push2(`<input placeholder="\u062A\u0648\u0636\u06CC\u062D\u0627\u062A" class="p-2 rounded-md outline-none border border-1 border-light bg-white shadow text-sm grow focus:border-disabled focus:ring-0 focus:ring-offset-0"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_component_BaseButton, {
                disabled: !answers || !answers.length || isSubmiting.value,
                class: "mt-6 self-start px-10",
                onClick: submit,
                "btn-type": unref(ButtonType).PRIMARY,
                text: "\u062B\u0628\u062A"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!--[-->${ssrInterpolate(unref(error)["message"])}<!--]-->`);
            }
          } else {
            return [
              !unref(error) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-10"
              }, [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("h1", { class: "text-lg font-bold text-primary" }, toDisplayString(unref(survey).title), 1),
                    createVNode("h2", { class: "text-sm font-bold" }, toDisplayString(unref(survey).surveyCategory), 1)
                  ]),
                  createVNode("span", { class: "text-sm font-bold" }, [
                    createTextVNode(toDisplayString(unref(gregorianToJalali)(unref(survey).deadLine)) + " ", 1),
                    createVNode("i", { class: "pi pi-calendar-times text-danger" })
                  ])
                ]),
                createVNode("div", { class: "p-4 flex flex-col gap-8 bg-white rounded-md shadow-md" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(survey).surveyQuestions, (question, idx) => {
                    return openBlock(), createBlock("div", {
                      key: question.id,
                      class: ["flex flex-col gap-6", { "pb-8 border-b-[1px]  border-disabled": idx != unref(survey).surveyQuestions.length - 1 }]
                    }, [
                      createVNode("p", { class: "flex gap-3 items-center" }, [
                        createVNode("span", { class: "text-primary font-extrabold text-3xl" }, toDisplayString(idx + 1), 1),
                        createTextVNode(),
                        createVNode("span", { class: "text-base font-semibold" }, toDisplayString(question.title), 1)
                      ]),
                      createVNode("div", { class: "flex flex-col gap-8 md:gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(survey).surveyItems, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "mx-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10 flex-wrap"
                          }, [
                            createVNode("p", { class: "text-sm font-semibold" }, toDisplayString(item.title), 1),
                            createVNode("div", { class: "flex items-center gap-1 md:gap-3" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(numberOfOptions, (point) => {
                                return createVNode("button", {
                                  type: "button",
                                  key: point,
                                  onClick: ($event) => answer(question.id, item.id, point),
                                  class: ["flex justify-center items-center select-none cursor-pointer border-2 text-xl font-bold p-2 rounded-full shadow h-10 w-10 hover:shadow-md hover:bg-primary-light", answerActive(question.id, item.id, point) ? "bg-primary text-light shadow-md outline-none shadow-outline" : "bg-white"]
                                }, [
                                  createVNode("span", null, toDisplayString(point), 1)
                                ], 10, ["onClick"]);
                              }), 64))
                            ]),
                            answerExist(question.id, item.id) ? (openBlock(), createBlock("input", {
                              key: 0,
                              placeholder: "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
                              class: "p-2 rounded-md outline-none border border-1 border-light bg-white shadow text-sm grow focus:border-disabled focus:ring-0 focus:ring-offset-0",
                              onInput: ($event) => setDescription(question.id, item.id, $event)
                            }, null, 40, ["onInput"])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ], 2);
                  }), 128)),
                  createVNode(_component_BaseButton, {
                    disabled: !answers || !answers.length || isSubmiting.value,
                    class: "mt-6 self-start px-10",
                    onClick: submit,
                    "btn-type": unref(ButtonType).PRIMARY,
                    text: "\u062B\u0628\u062A"
                  }, null, 8, ["disabled", "btn-type"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/survey/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.6a671972.mjs.map
