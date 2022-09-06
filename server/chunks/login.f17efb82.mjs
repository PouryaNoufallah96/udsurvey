import { t as useAuth, T as ToastHandler, E as ErrorHandler, n as navigateTo, _ as __nuxt_component_0$2, v as _sfc_main$k, a as _sfc_main$j } from './server.mjs';
import { defineComponent, resolveComponent, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { object, string } from 'yup';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import '@vue/shared';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login, checkAuthentication } = useAuth();
    const { error } = ToastHandler();
    const { customClientErrorHandler } = ErrorHandler();
    const schema = object({
      username: string().required().matches(/^0(9\d{9})$/, "\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A").label("Username"),
      password: string().required().min(6, "\u062A\u0639\u062F\u0627\u062F \u062D\u0631\u0648\u0641 \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u06A9\u0627\u0641\u06CC \u0646\u06CC\u0633\u062A").label("Password")
    });
    const initialValues = { username: "", password: "" };
    const handleSubmit = async (values) => {
      try {
        await login(values.username, values.password);
        await checkAuthentication();
        await navigateTo({ name: "index" });
      } catch (err) {
        customClientErrorHandler(
          err,
          (message, detail) => error(message, detail)
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$2;
      const _component_VForm = resolveComponent("VForm");
      const _component_BaseInput = _sfc_main$k;
      const _component_BaseButton = _sfc_main$j;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, { name: "authentication" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_VForm, {
              class: "p-8 flex flex-col gap-3 card",
              "validation-schema": unref(schema),
              "initial-values": initialValues,
              onSubmit: handleSubmit
            }, {
              default: withCtx(({ meta: formMeta }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_BaseInput, {
                    type: "tel",
                    name: "username",
                    label: "\u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_BaseInput, {
                    type: "password",
                    name: "password",
                    label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_BaseButton, {
                    class: "mt-5",
                    text: "\u0648\u0631\u0648\u062F",
                    disabled: !formMeta.valid
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_BaseInput, {
                      type: "tel",
                      name: "username",
                      label: "\u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647"
                    }),
                    createVNode(_component_BaseInput, {
                      type: "password",
                      name: "password",
                      label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"
                    }),
                    createVNode(_component_BaseButton, {
                      class: "mt-5",
                      text: "\u0648\u0631\u0648\u062F",
                      disabled: !formMeta.valid
                    }, null, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_VForm, {
                class: "p-8 flex flex-col gap-3 card",
                "validation-schema": unref(schema),
                "initial-values": initialValues,
                onSubmit: handleSubmit
              }, {
                default: withCtx(({ meta: formMeta }) => [
                  createVNode(_component_BaseInput, {
                    type: "tel",
                    name: "username",
                    label: "\u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647"
                  }),
                  createVNode(_component_BaseInput, {
                    type: "password",
                    name: "password",
                    label: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"
                  }),
                  createVNode(_component_BaseButton, {
                    class: "mt-5",
                    text: "\u0648\u0631\u0648\u062F",
                    disabled: !formMeta.valid
                  }, null, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["validation-schema"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login.f17efb82.mjs.map
