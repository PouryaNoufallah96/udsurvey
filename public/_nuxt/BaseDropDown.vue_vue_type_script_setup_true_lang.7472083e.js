import{d as y,r as g,j as k,x as w,y as p,o as i,i as c,a as l,t as f,b as B,u as o,B as C,F as D,z as V,A as I,D as N,_ as T}from"./entry.87f1605d.js";const z={class:"flex flex-col gap-2"},E={class:"text-sm text-dark"},F={class:"relative"},S={class:"max-h-40 overflow-y-scroll no-scrollbar absolute right-0 py-2 mt-2 bg-light rounded-md shadow-md flex flex-col w-full"},$=["onClick"],A=y({__name:"BaseDropDown",props:{text:{default:""},modelValue:{default:0},items:{default:()=>[]}},emits:["update:modelValue"],setup(a,{emit:v}){const r=a,e=g(!1),n=k(()=>r.items.find(s=>s.id==r.modelValue)),_=s=>{v("update:modelValue",s),e.value=!1},h=()=>{e.value=!1};return(s,d)=>{var u,m;const x=T,b=w("click-outside");return p((i(),c("div",z,[l("label",E,f(a.text),1),l("div",F,[B(x,{class:"w-full",type:"button",icon:e.value?"pi pi-chevron-up":"pi pi-chevron-down","btn-type":o(C).TEXTICON,text:(m=(u=o(n))==null?void 0:u.name)!=null?m:"---",onClick:d[0]||(d[0]=t=>e.value=!e.value)},null,8,["icon","btn-type","text"]),p(l("ul",S,[(i(!0),c(D,null,V(a.items,t=>(i(),c("li",{onClick:()=>_(t.id),key:t.id,class:I(["cursor-pointer p-2 hover:bg-primary-light",{"bg-primary text-light font-bold":o(n)&&t.id==o(n).id}])},[l("span",null,f(t.name),1)],10,$))),128))],512),[[N,e.value]])])])),[[b,h]])}}});export{A as _};
