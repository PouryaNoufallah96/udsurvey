import{d as h,E as A,j as b,k as x,l as E,m as B,o as g,i as F,a as c,t as T,u as s,b as u,w as l,B as r,n as V,p as w,q as N,s as S,_ as k}from"./entry.87f1605d.js";import{_ as j}from"./BaseInput.vue_vue_type_script_setup_true_lang.ee0dc373.js";import{T as H}from"./handle-toast.69ee9aaa.js";const $={class:"w-full md:w-1/2"},q={class:"flex justify-between"},I={class:"text-header"},O=V("\u0628\u0627\u0632\u06AF\u0634\u062A"),G=h({__name:"Form",props:{isEdit:{type:Boolean,default:!1},initialValues:{type:Object,default:()=>({id:null,title:""})}},setup(o){const n=o,{error:d}=H(),{customClientErrorHandler:m}=A(),_=b(()=>n.isEdit?"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u062A\u06AF\u0648\u0631\u06CC":"\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u062A\u06AF\u0648\u0631\u06CC"),p=x({title:E().required("\u062A\u06CC\u062A\u0631 \u0627\u062C\u0628\u0627\u0631\u06CC \u0627\u0633\u062A").label("FullName")}),y=async i=>{try{const e=n.isEdit?"/admin/survey-category/update-survey-category":"/admin/survey-category/add-survey-category",t=n.isEdit?"PUT":"POST",{result:a}=await w(e,{method:t,body:{...i}});N("/admin/survey/category")}catch(e){m(e,(t,a)=>d(t,a))}};return(i,e)=>{const t=S,a=j,C=k,f=B("VForm");return g(),F("div",$,[c("div",q,[c("h2",I,T(s(_)),1),u(t,{to:"/admin/survey/category"},{default:l(()=>[O]),_:1})]),u(f,{class:"p-8 flex flex-col gap-3 card","validation-schema":s(p),"initial-values":o.initialValues,onSubmit:y},{default:l(({meta:v})=>[u(a,{name:"title",label:"\u062A\u06CC\u062A\u0631"}),u(C,{class:"mt-4",type:"submit","btn-type":o.isEdit?s(r).WARNING:s(r).SUCCESS,text:"\u0630\u062E\u06CC\u0631\u0647",disabled:!v.valid},null,8,["btn-type","disabled"])]),_:1},8,["validation-schema","initial-values"])])}}});export{G as _};