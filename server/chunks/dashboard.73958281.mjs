import { u as useHead, t as useAuth, B as ButtonType, o as __nuxt_component_3, i as __nuxt_component_5, a as _sfc_main$j } from './server.mjs';
import { useSSRContext, defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, unref, ref, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Items",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isAdmin, logout } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyNuxtLink = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full md:w-auto" }, _attrs))}><div class="flex w-full flex-col p-4 mt-4 bg-light rounded-lg border border-light md:flex-row md:gap-3 md:text-sm md:border-0 md:bg-white md:mt-0 md:p-0">`);
      _push(ssrRenderComponent(_component_MyNuxtLink, {
        class: "link",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u062E\u0627\u0646\u0647`);
          } else {
            return [
              createTextVNode("\u062E\u0627\u0646\u0647")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isAdmin)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_MyNuxtLink, {
          class: "link",
          to: "/admin/user"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u06A9\u0627\u0631\u0628\u0631\u0627\u0646`);
            } else {
              return [
                createTextVNode("\u06A9\u0627\u0631\u0628\u0631\u0627\u0646")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_MyNuxtLink, {
          class: "link",
          to: "/admin/customer"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0645\u0634\u062A\u0631\u06CC\u0627\u0646`);
            } else {
              return [
                createTextVNode("\u0645\u0634\u062A\u0631\u06CC\u0627\u0646")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_MyNuxtLink, {
          class: "link",
          to: "/admin/survey"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C\u0647\u0627`);
            } else {
              return [
                createTextVNode("\u0646\u0638\u0631\u0633\u0646\u062C\u06CC\u200C\u0647\u0627")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<hr class="my-3 md:my-0">`);
      if (unref(user)) {
        _push(`<div class="flex flex-row items-center gap-1"><span class="text-dark font-semibold">${ssrInterpolate(unref(user).fullName)}</span><a href="#" class="link"><i class="text-sm pi pi-sign-out"></i></a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar/Items.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__publicAssetsURL("icon.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const showNav = ref(false);
    const toggleNav = () => showNav.value = !showNav.value;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_5;
      const _component_BaseButton = _sfc_main$j;
      const _component_NavbarItems = _sfc_main$2;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "container px-4 py-2 mx-auto card" }, _attrs))}><div class="flex flex-wrap justify-between items-center mx-auto">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-row items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img width="32" height="32" alt="logo"${ssrRenderAttr("src", _imports_0)}${_scopeId}><span class="text-sm font-bold text-dark"${_scopeId}>\u0646\u0638\u0631\u0633\u0646\u062C\u06CC</span>`);
          } else {
            return [
              createVNode("img", {
                width: "32",
                height: "32",
                alt: "logo",
                src: _imports_0
              }),
              createVNode("span", { class: "text-sm font-bold text-dark" }, "\u0646\u0638\u0631\u0633\u0646\u062C\u06CC")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseButton, {
        class: "md:hidden",
        type: "button",
        btnType: unref(ButtonType).ICON,
        icon: "pi pi-align-justify",
        onClick: toggleNav
      }, null, _parent));
      if (showNav.value) {
        _push(ssrRenderComponent(_component_NavbarItems, { class: "flex w-full md:hidden" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NavbarItems, { class: "hidden md:flex" }, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useHead(
      {
        bodyAttrs: {
          class: "bg-gray-100"
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = resolveComponent("Toast");
      const _component_Navbar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4 md:p-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<div class="container pt-10 px-4 mb-8 mx-auto"><header>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
      _push(`</header><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard.73958281.mjs.map
