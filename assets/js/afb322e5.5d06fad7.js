"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[161],{3905:function(e,t,a){a.d(t,{Zo:function(){return l},kt:function(){return f}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),p=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(a),f=r,g=d["".concat(c,".").concat(f)]||d[f]||u[f]||o;return a?n.createElement(g,i(i({ref:t},l),{},{components:a})):n.createElement(g,i({ref:t},l))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5379:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return l},default:function(){return d}});var n=a(3117),r=a(102),o=(a(7294),a(3905)),i=["components"],s={id:"grafana-boot-data",title:"Grafana boot data"},c=void 0,p={unversionedId:"guides/grafana-boot-data",id:"guides/grafana-boot-data",isDocsHomePage:!1,title:"Grafana boot data",description:"window.grafanaBootData is not through the plugin, but through Grafana itself. This means it can easily change based on the Grafana version.",source:"@site/docs/guides/grafana-boot-data.md",sourceDirName:"guides",slug:"/guides/grafana-boot-data",permalink:"/docs/guides/grafana-boot-data",editUrl:"https://github.com/gapitio/gapit-htmlgraphics-panel/edit/main/website/docs/guides/grafana-boot-data.md",tags:[],version:"current",frontMatter:{id:"grafana-boot-data",title:"Grafana boot data"},sidebar:"docsSidebar",previous:{title:"References",permalink:"/docs/references"},next:{title:"How to add the HTMLGraphics panel",permalink:"/docs/guides/how-to-add-the-panel"}},l=[],u={toc:l};function d(e){var t=e.components,a=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"window.grafanaBootData")," is not through the plugin, but through Grafana itself. This means it can easily change based on the Grafana version."))),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/#bootdata-property"},"Grafana boot data")," can be gotten through the window object. The ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/#bootdata-property"},"bootData property")," type is any, but ",(0,o.kt)("inlineCode",{parentName:"p"},"window.grafanaBootData.settings")," is ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/"},"Grafana boot config"),"."),(0,o.kt)("p",null,"The easiest way to see what's useful is to just log it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"console.log(window.grafanaBootData);\n")),(0,o.kt)("p",null,"In no particular order, here's a few things that can be gotten, ",(0,o.kt)("em",{parentName:"p"},"that I think is useful,")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"window.grafanaBootData"),"."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The users mail, name, orgRole and more. ",(0,o.kt)("inlineCode",{parentName:"li"},"window.grafanaBootData.user"),"."),(0,o.kt)("li",{parentName:"ul"},"Check if there's an update ready for Grafana. ",(0,o.kt)("inlineCode",{parentName:"li"},"window.grafanaBootData.settings.buildInfo.hasUpdate"),"."),(0,o.kt)("li",{parentName:"ul"},"Get data sources proxy url. ",(0,o.kt)("inlineCode",{parentName:"li"},'window.grafanaBootData.settings.datasources["data source name"].url'),".")))}d.isMDXComponent=!0}}]);