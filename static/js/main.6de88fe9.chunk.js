(this.webpackJsonpgpt3=this.webpackJsonpgpt3||[]).push([[0],[,,,,,,,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),i=n(5),s=n.n(i),a=(n(10),n(0)),r=(n.p,n.p,n.p,n.p,n.p,n(12),n(13),n(14),n.p,n(15),n(2)),o=n.p+"static/media/ai.aa60586b.png",j=(n(16),function(e){var t=e.recPipelineId;console.log("Recieved: whatgpt3 ".concat(t));var n=Object(c.useState)(o),i=Object(r.a)(n,2),s=i[0],j=i[1],l=Object(c.useState)("Loading caption..."),d=Object(r.a)(l,2),u=d[0],h=d[1],p=Object(c.useState)(["Loading triplets..."]),b=Object(r.a)(p,2),g=b[0],O=b[1],f=Object(c.useState)(!1),_=Object(r.a)(f,2),x=_[0],m=_[1];!1===x&&t&&m(t),t&&(Object(c.useEffect)((function(){var e=setInterval((function(){fetch("http://74.82.29.209:5000/get_movie_id1",{method:"POST",body:JSON.stringify(t),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(e){console.log(e),console.log(e.movie_id)}))}))}),300);return function(){clearInterval(e)}}),[]),Object(c.useEffect)((function(){var e=setInterval((function(){fetch("http://74.82.29.209:5000/get_generated_caption_url",{method:"POST",body:JSON.stringify(t),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(e){console.log(e.image_url),j(e.image_url)}))}))}),300);return function(){clearInterval(e)}}),[]),Object(c.useEffect)((function(){var e=setInterval((function(){fetch("http://74.82.29.209:5000/get_generated_text",{method:"POST",body:JSON.stringify(t),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(e){console.log(e.candidate),h(e.candidate)}))}))}),300);return function(){clearInterval(e)}}),[]),Object(c.useEffect)((function(){var e=setInterval((function(){fetch("http://74.82.29.209:5000/get_generated_triplets",{method:"POST",body:JSON.stringify(t),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(e){console.log(e.triplets),O(e.triplets)}))}))}),300);return function(){clearInterval(e)}}),[]));var v=g;return g.length>1&&(v=g.map((function(e){return 3===e.length&&Object(a.jsx)("p",{children:"".concat(e[0]," -> ").concat(e[1]," -> ").concat(e[2])})}))),Object(a.jsxs)("div",{className:"gpt3__whatgpt3 section__margin",id:"wgpt3",children:[Object(a.jsx)("div",{className:"gpt3__whatgpt3-feature",children:Object(a.jsx)("div",{className:"gpt3__whatgpt3-image",children:s?Object(a.jsx)("img",{src:s}):j(o)})}),Object(a.jsxs)("div",{className:"gpt3__whatgpt3-heading",children:[Object(a.jsx)("h1",{className:"gradient__text",children:"Generated caption:"}),Object(a.jsx)("p",{children:u})]}),Object(a.jsxs)("div",{className:"gpt3__whatgpt3-heading",children:[Object(a.jsx)("h1",{className:"gradient__text",children:"Generated triplets:"}),v]})]})}),l=(n(17),function(){var e=Object(c.useState)(o),t=Object(r.a)(e,2),n=t[0],i=t[1],s=Object(c.useState)(!1),l=Object(r.a)(s,2),d=l[0],u=l[1],h=Object(c.useState)(!1),p=Object(r.a)(h,2),b=p[0],g=p[1];return Object(c.useEffect)((function(){n!==o&&fetch("http://74.82.29.209:5000/insert_pipeline_id",{method:"POST",body:JSON.stringify(n),headers:{"content-type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){console.log(e),u(e.pipeline_id)})).catch(console.error)}),[b]),Object(a.jsxs)("div",{className:"gpt3__header section__padding",id:"home",children:[Object(a.jsxs)("div",{className:"gpt3__header-content",children:[Object(a.jsx)("h1",{className:"gradient__text",children:"Let's Process Your Image With Nebula"}),Object(a.jsx)("p",{children:"Insert the URL Link below"}),Object(a.jsxs)("div",{className:"gpt3__header-content__input",children:[Object(a.jsx)("input",{type:"text",onChange:function(e){i(e.target.value)},id:"urlLink",name:"urlLink",placeholder:"Your URL Link"}),Object(a.jsx)("button",{onClick:function(){return g((function(e){return!e}))},type:"button",children:"Start"})]})]}),Object(a.jsx)("div",{className:"gpt3__header-image",children:Object(a.jsx)("img",{src:n})}),Object(a.jsxs)("div",{className:"gpt3__header-image",children:[console.log("Sending ".concat(d)),d&&d!==o&&Object(a.jsx)(j,{recPipelineId:d})]})]})}),d=(n.p,n(18),n(19),function(){return Object(a.jsx)("div",{className:"gpt3__brand section__padding"})}),u=(n(20),n(4)),h=(n(21),function(){var e=Object(c.useState)(!1),t=Object(r.a)(e,2),n=t[0],i=t[1];return Object(a.jsxs)("div",{className:"gpt3__navbar",children:[Object(a.jsxs)("div",{className:"gpt3__navbar-links",children:[Object(a.jsx)("div",{className:"gpt3__navbar-links_logo",children:Object(a.jsx)("p",{children:"NEBULA"})}),Object(a.jsxs)("div",{className:"gpt3__navbar-links_container",children:[Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"#home",children:"Home"})}),Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"#wgpt3",children:"Results"})})]})]}),Object(a.jsxs)("div",{className:"gpt3__navbar-sign",children:[Object(a.jsx)("p",{children:"Sign in"}),Object(a.jsx)("button",{type:"button",children:"Sign up"})]}),Object(a.jsxs)("div",{className:"gpt3__navbar-menu",children:[n?Object(a.jsx)(u.a,{color:"#fff",size:27,onClick:function(){return i(!1)}}):Object(a.jsx)(u.b,{color:"#fff",size:27,onClick:function(){return i(!0)}}),n&&Object(a.jsxs)("div",{className:"gpt3__navbar-menu_container scale-up-center",children:[Object(a.jsxs)("div",{className:"gpt3__navbar-menu_container-links",children:[Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"#home",children:"Home"})}),Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"#wgpt3",children:"Results"})})]}),Object(a.jsxs)("div",{className:"gpt3__navbar-menu_container-links-sign",children:[Object(a.jsx)("p",{children:"Sign in"}),Object(a.jsx)("button",{type:"button",children:"Sign up"})]})]})]})]})}),p=(n(22),function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("div",{className:"gradient__bg",children:[Object(a.jsx)(h,{}),Object(a.jsx)(l,{})]}),Object(a.jsx)(d,{})]})});n(23);s.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))}],[[24,1,2]]]);
//# sourceMappingURL=main.6de88fe9.chunk.js.map