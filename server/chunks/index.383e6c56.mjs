import { u as useHead, E as ErrorHandler, T as ToastHandler, e as useAsyncData, f as useBaseFetch, B as ButtonType, n as navigateTo, _ as __nuxt_component_0$2, g as _sfc_main$g, a as _sfc_main$j, h as _sfc_main$e, i as __nuxt_component_5 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    useHead({
      title: "\u06A9\u062A\u06AF\u0648\u0631\u06CC\u200C\u0647\u0627\u06CC \u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C"
    });
    const { handlingError, customClientErrorHandler } = ErrorHandler();
    const toast = ToastHandler();
    const showDeleteModal = ref(false);
    const currentSurveyCategory = ref(null);
    const columns = ["\u062A\u06CC\u062A\u0631", ""];
    const propsToSearch = ["title"];
    const { data: surveyCategories, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("get-survey-categories-by-admin", async () => {
      var response = await useBaseFetch("/admin/survey-category/get-survey-categories");
      return response.result;
    }, {
      initialCache: false
    }, "$LNKUYbw09M")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      handlingError(error.value, (message, detail) => toast.error(message, detail));
    }
    const openDeleteModal = (id) => {
      currentSurveyCategory.value = id;
      showDeleteModal.value = true;
    };
    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      currentSurveyCategory.value = null;
    };
    const submitDelete = async () => {
      try {
        await useBaseFetch(`/admin/survey-category/delete-survey-category/${currentSurveyCategory.value}`, { method: "DELETE" });
        closeDeleteModal();
        refresh();
      } catch (err) {
        customClientErrorHandler(
          err,
          (message, detail) => toast.error(message, detail)
        );
      }
    };
    const addSurveyCategory = () => {
      navigateTo("/admin/survey/category/add");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_BaseModal = _sfc_main$g;
      const _component_BaseButton = _sfc_main$j;
      const _component_BaseTable = _sfc_main$e;
      const _component_nuxt_link = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "dashboard" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between"${_scopeId}><h2 class="text-header"${_scopeId}>\u06A9\u062A\u06AF\u0648\u0631\u06CC\u200C\u0647\u0627\u06CC \u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C</h2>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              "btn-type": unref(ButtonType).SUCCESS,
              text: "\u06A9\u062A\u06AF\u0648\u0631\u06CC \u062C\u062F\u06CC\u062F",
              onClick: addSurveyCategory
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between" }, [
                createVNode("h2", { class: "text-header" }, "\u06A9\u062A\u06AF\u0648\u0631\u06CC\u200C\u0647\u0627\u06CC \u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C"),
                createVNode(_component_BaseButton, {
                  "btn-type": unref(ButtonType).SUCCESS,
                  text: "\u06A9\u062A\u06AF\u0648\u0631\u06CC \u062C\u062F\u06CC\u062F",
                  onClick: addSurveyCategory
                }, null, 8, ["btn-type"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseModal, {
              "ok-button-type": unref(ButtonType).DANGER,
              show: showDeleteModal.value,
              onClose: closeDeleteModal,
              onOk: submitDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><span class="text-base text-dark font-semibold"${_scopeId2}>\u0622\u06CC\u0627 \u0627\u0632 \u062D\u0630\u0641 \u0627\u0637\u0645\u06CC\u0646\u0627\u0646 \u062F\u0627\u0631\u06CC\u062F\u061F</span></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-base text-dark font-semibold" }, "\u0622\u06CC\u0627 \u0627\u0632 \u062D\u0630\u0641 \u0627\u0637\u0645\u06CC\u0646\u0627\u0646 \u062F\u0627\u0631\u06CC\u062F\u061F")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(error)) {
              _push2(`<!--[-->`);
              if (unref(surveyCategories) && unref(surveyCategories).length) {
                _push2(ssrRenderComponent(_component_BaseTable, {
                  "props-to-search": propsToSearch,
                  columns,
                  data: unref(surveyCategories)
                }, {
                  normal: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<td class="tbl-row"${_scopeId2}><div class="flex"${_scopeId2}><div class="ml-3"${_scopeId2}><p class="text-dark whitespace-no-wrap"${_scopeId2}>${ssrInterpolate(row.title)}</p></div></div></td><td class="tbl-row"${_scopeId2}><div class="flex gap-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_nuxt_link, {
                        to: `/admin/survey/category/update/${row.id}`
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<i class="pi pi-pencil hover:text-warning"${_scopeId3}></i>`);
                          } else {
                            return [
                              createVNode("i", { class: "pi pi-pencil hover:text-warning" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<a href="#"${_scopeId2}><i class="pi pi-times hover:text-danger"${_scopeId2}></i></a></div></td>`);
                    } else {
                      return [
                        createVNode("td", { class: "tbl-row" }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode("div", { class: "ml-3" }, [
                              createVNode("p", { class: "text-dark whitespace-no-wrap" }, toDisplayString(row.title), 1)
                            ])
                          ])
                        ]),
                        createVNode("td", { class: "tbl-row" }, [
                          createVNode("div", { class: "flex gap-3" }, [
                            createVNode(_component_nuxt_link, {
                              to: `/admin/survey/category/update/${row.id}`
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "pi pi-pencil hover:text-warning" })
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            createVNode("a", {
                              href: "#",
                              onClick: () => openDeleteModal(row.id)
                            }, [
                              createVNode("i", { class: "pi pi-times hover:text-danger" })
                            ], 8, ["onClick"])
                          ])
                        ])
                      ];
                    }
                  }),
                  small: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="p-4 flex flex-row justify-between text-sm"${_scopeId2}><p class="font-bold"${_scopeId2}>${ssrInterpolate(row.title)}</p><div class="flex flex-col justify-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_nuxt_link, {
                        to: `/admin/survey/category/update/${row.id}`
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<i class="pi pi-pencil"${_scopeId3}></i>`);
                          } else {
                            return [
                              createVNode("i", { class: "pi pi-pencil" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<a href="#"${_scopeId2}><i class="pi pi-times"${_scopeId2}></i></a></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "p-4 flex flex-row justify-between text-sm" }, [
                          createVNode("p", { class: "font-bold" }, toDisplayString(row.title), 1),
                          createVNode("div", { class: "flex flex-col justify-center gap-2" }, [
                            createVNode(_component_nuxt_link, {
                              to: `/admin/survey/category/update/${row.id}`
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "pi pi-pencil" })
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            createVNode("a", {
                              href: "#",
                              onClick: () => openDeleteModal(row.id)
                            }, [
                              createVNode("i", { class: "pi pi-times" })
                            ], 8, ["onClick"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->${ssrInterpolate(unref(error)["message"])}<!--]-->`);
            }
          } else {
            return [
              createVNode(_component_BaseModal, {
                "ok-button-type": unref(ButtonType).DANGER,
                show: showDeleteModal.value,
                onClose: closeDeleteModal,
                onOk: submitDelete
              }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-base text-dark font-semibold" }, "\u0622\u06CC\u0627 \u0627\u0632 \u062D\u0630\u0641 \u0627\u0637\u0645\u06CC\u0646\u0627\u0646 \u062F\u0627\u0631\u06CC\u062F\u061F")
                  ])
                ]),
                _: 1
              }, 8, ["ok-button-type", "show"]),
              !unref(error) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                unref(surveyCategories) && unref(surveyCategories).length ? (openBlock(), createBlock(_component_BaseTable, {
                  key: 0,
                  "props-to-search": propsToSearch,
                  columns,
                  data: unref(surveyCategories)
                }, {
                  normal: withCtx(({ row }) => [
                    createVNode("td", { class: "tbl-row" }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-dark whitespace-no-wrap" }, toDisplayString(row.title), 1)
                        ])
                      ])
                    ]),
                    createVNode("td", { class: "tbl-row" }, [
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode(_component_nuxt_link, {
                          to: `/admin/survey/category/update/${row.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "pi pi-pencil hover:text-warning" })
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode("a", {
                          href: "#",
                          onClick: () => openDeleteModal(row.id)
                        }, [
                          createVNode("i", { class: "pi pi-times hover:text-danger" })
                        ], 8, ["onClick"])
                      ])
                    ])
                  ]),
                  small: withCtx(({ row }) => [
                    createVNode("div", { class: "p-4 flex flex-row justify-between text-sm" }, [
                      createVNode("p", { class: "font-bold" }, toDisplayString(row.title), 1),
                      createVNode("div", { class: "flex flex-col justify-center gap-2" }, [
                        createVNode(_component_nuxt_link, {
                          to: `/admin/survey/category/update/${row.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "pi pi-pencil" })
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode("a", {
                          href: "#",
                          onClick: () => openDeleteModal(row.id)
                        }, [
                          createVNode("i", { class: "pi pi-times" })
                        ], 8, ["onClick"])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["data"])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/survey/category/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.383e6c56.mjs.map
