import{_ as p}from"./Form.vue_vue_type_script_setup_true_lang.852030ce.js";import{d as C,h as f,E as y,T as g,H as h,o as v,i as w,b as r,w as x,u as n,C as b,f as E,p as H}from"./entry.87f1605d.js";import{u as T}from"./asyncData.f0c46025.js";import{T as k}from"./handle-toast.69ee9aaa.js";import"./BaseInput.vue_vue_type_script_setup_true_lang.ee0dc373.js";import"./BaseDropDown.vue_vue_type_script_setup_true_lang.7472083e.js";const R=C({__name:"[id]",async setup(A){let e,a;f({title:"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u0634\u062A\u0631\u06CC"});const{handlingError:u}=y(),i=k(),c=g().params.id,{data:m,error:s}=([e,a]=h(async()=>T("get-customer-by-admin-by-id",async()=>{var t=await H(`/admin/customer/get-customer-by-id/${c}`);return t.result},{initialCache:!1},"$qoeUwygNTk")),e=await e,a(),e);s.value&&u(s.value,(t,o)=>i.error(t,o));const _=b;return(t,o)=>{const l=p,d=E;return v(),w("div",null,[r(d,{name:"dashboard"},{default:x(()=>[r(l,{categories:n(_),"initial-values":n(m),isEdit:!0},null,8,["categories","initial-values"])]),_:1})])}}});export{R as default};