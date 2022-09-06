import { defineRule, configure } from "vee-validate";
import * as rules from "@vee-validate/rules";
import { localize, setLocale } from '@vee-validate/i18n';
import { messages } from '@vee-validate/i18n/dist/locale/fa.json';
export default defineNuxtPlugin((_) => {

  Object.keys(rules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      defineRule(rule, rules[rule]);
    });
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true, generateMessage: localize({
      fa: {
        messages
      }
    }),
  });

  setLocale('fa');

});
