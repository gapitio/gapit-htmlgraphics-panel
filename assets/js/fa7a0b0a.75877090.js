"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[932],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return h}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),i=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=i(e.components);return a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),c=i(t),h=r,f=c["".concat(l,".").concat(h)]||c[h]||d[h]||o;return t?a.createElement(f,s(s({ref:n},p),{},{components:t})):a.createElement(f,s({ref:n},p))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=c;var u={};for(var l in n)hasOwnProperty.call(n,l)&&(u[l]=n[l]);u.originalType=e,u.mdxType="string"==typeof e?e:r,s[1]=u;for(var i=2;i<o;i++)s[i]=t[i];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},1569:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return i},toc:function(){return p},default:function(){return c}});var a=t(3117),r=t(102),o=(t(7294),t(3905)),s=["components"],u={id:"send-post-requests-through-grafana",title:"Send POST requests through Grafana server"},l=void 0,i={unversionedId:"guides/send-post-requests-through-grafana",id:"guides/send-post-requests-through-grafana",isDocsHomePage:!1,title:"Send POST requests through Grafana server",description:"GET requests through localhost",source:"@site/docs/guides/http-requests.md",sourceDirName:"guides",slug:"/guides/send-post-requests-through-grafana",permalink:"/docs/guides/send-post-requests-through-grafana",editUrl:"https://github.com/gapitio/gapit-htmlgraphics-panel/edit/main/website/docs/guides/http-requests.md",tags:[],version:"current",frontMatter:{id:"send-post-requests-through-grafana",title:"Send POST requests through Grafana server"},sidebar:"docsSidebar",previous:{title:"How to use a template",permalink:"/docs/guides/how-to-use-a-template"},next:{title:"Simple example",permalink:"/docs/examples/simple-example"}},p=[{value:"GET requests through localhost",id:"get-requests-through-localhost",children:[],level:2},{value:"GET requests through Grafana server with the JSON API plugin",id:"get-requests-through-grafana-server-with-the-json-api-plugin",children:[],level:2},{value:"GET requests through Grafana server with the JSON API plugin proxy",id:"get-requests-through-grafana-server-with-the-json-api-plugin-proxy",children:[],level:2},{value:"POST requests through Grafana server with the JSON API plugin proxy",id:"post-requests-through-grafana-server-with-the-json-api-plugin-proxy",children:[],level:2}],d={toc:p};function c(e){var n=e.components,u=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},d,u,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"get-requests-through-localhost"},"GET requests through localhost"),(0,o.kt)("p",null,"The easiest way to make a GET request is with ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"},"fetch"),"."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"fetch('https://swapi.dev/api/people/1/')\n  .then((response) => response.json())\n  .then((data) => console.log(data));\n")),(0,o.kt)("p",null,"The problem with this method is that it requires the user to have access to the domain."),(0,o.kt)("h2",{id:"get-requests-through-grafana-server-with-the-json-api-plugin"},"GET requests through Grafana server with the JSON API plugin"),(0,o.kt)("p",null,"With this the Grafana server is the only thing that needs access to the domain."),(0,o.kt)("p",null,"This requires the use of the ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/plugins/marcusolsson-json-datasource/"},"JSON API")," plugin to send http requests from Grafana through the Grafana server. Follow the instructions on ",(0,o.kt)("a",{parentName:"p",href:"https://marcus.se.net/grafana-json-datasource/configuration"},"https://marcus.se.net/grafana-json-datasource/configuration")," on how to configure the data source."),(0,o.kt)("p",null,"And the way to get the data would be like other metrics ",(0,o.kt)("a",{parentName:"p",href:"/docs/guides/how-to-get-metrics"},"How to get metrics"),"."),(0,o.kt)("p",null,"The problem with this is that the dashboard has to be refreshed to get the json response."),(0,o.kt)("h2",{id:"get-requests-through-grafana-server-with-the-json-api-plugin-proxy"},"GET requests through Grafana server with the JSON API plugin proxy"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/plugins/marcusolsson-json-datasource/"},"JSON API")," plugin creates a proxy with the Grafana server to send HTTP requests. The proxy can be used to send HTTP requests from the panel without refreshing the dashboard."),(0,o.kt)("p",null,"JSON API config\nURL = ",(0,o.kt)("inlineCode",{parentName:"p"},"https://swapi.dev/api")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Panel json"),(0,o.kt)("div",null,(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "calcsMutation": "none",\n  "reduceOptions": {\n    "calcs": []\n  },\n  "add100Percentage": false,\n  "centerAlignContent": true,\n  "overflow": "visible",\n  "SVGBaseFix": true,\n  "codeData": "{\\n  \\"text\\": \\"Random text\\"\\n}",\n  "rootCSS": "",\n  "css": "* {\\n  font-family: Open Sans;\\n}\\n",\n  "html": "<div>\\n  <input value=\\"1\\" min=\\"1\\" type=\\"number\\"></input>\\n  <p>Name: <span></span></p>\\n<div>",\n  "renderOnMount": true,\n  "onRender": "",\n  "dynamicHtmlGraphics": false,\n  "dynamicData": false,\n  "dynamicFieldDisplayValues": false,\n  "dynamicProps": false,\n  "panelupdateOnMount": true,\n  "onInitOnResize": false,\n  "onInit": "const inputElt = htmlNode.querySelector(\'input\');\\nconst spanElt = htmlNode.querySelector(\'span\');\\n\\nfunction getDataSourceProxyURL(name) {\\n  return Object.values(window.grafanaBootData.settings.datasources).find((dataSource) => dataSource.name === name).url;\\n}\\n\\nconst starWarsAPIProxyURL = getDataSourceProxyURL(\'Star wars API\');\\n\\nfunction updateName(peopleNr) {\\n  const starWarsPeopleURL = `${starWarsAPIProxyURL}/people/${peopleNr}`;\\n  fetch(starWarsPeopleURL, {\\n    method: \'GET\',\\n  }).then((response) => response.json().then((value) => (spanElt.innerText = value.name)));\\n}\\n\\ninputElt.oninput = () => {\\n  updateName(inputElt.value);\\n};\\n\\nupdateName(inputElt.value);"\n}\n')))),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"onInit")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const inputElt = htmlNode.querySelector('input');\nconst spanElt = htmlNode.querySelector('span');\n\nfunction getDataSourceProxyURL(name) {\n  return Object.values(window.grafanaBootData.settings.datasources).find((dataSource) => dataSource.name === name).url;\n}\n\nconst starWarsAPIProxyURL = getDataSourceProxyURL('Star wars API');\n\nfunction updateName(peopleNr) {\n  const starWarsPeopleURL = `${starWarsAPIProxyURL}/people/${peopleNr}`;\n  fetch(starWarsPeopleURL, {\n    method: 'GET',\n  }).then((response) => response.json().then((value) => (spanElt.innerText = value.name)));\n}\n\ninputElt.oninput = () => {\n  updateName(inputElt.value);\n};\n\nupdateName(inputElt.value);\n")),(0,o.kt)("h2",{id:"post-requests-through-grafana-server-with-the-json-api-plugin-proxy"},"POST requests through Grafana server with the JSON API plugin proxy"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"(Node red) hello from Grafana",src:t(9966).Z})),(0,o.kt)("p",null,"You can also use the proxy to send POST requests with data. This can be useful if you want to change a setpoint."),(0,o.kt)("p",null,"In the example below the Grafana instance is started with docker compose which means the JSON API configurations can vary based on how Grafana is started. The example below uses ",(0,o.kt)("a",{parentName:"p",href:"https://nodered.org/"},"node red")," for receiving post requests."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," node red."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml"},"version: '3.7'\n\nservices:\n  node-red:\n    image: nodered/node-red:latest\n    networks:\n      - grafana\n    ports:\n      - 1880:1880\n    volumes:\n      - node-red-data:/data\n\nvolumes:\n  node-red-data:\n\nnetworks:\n  grafana:\n    external: true\n    name: grafana\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," grafana."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml"},"version: '3.7'\nservices:\n  grafana:\n    image: grafana/grafana:8.3.3\n    networks:\n      - grafana\n    volumes:\n      - grafana-storage:/var/lib/grafana\n    ports:\n      - 3000:3000\n    environment:\n      - GF_INSTALL_PLUGINS=gapit-htmlgraphics-panel,marcusolsson-json-datasource\n\nvolumes:\n  grafana-storage:\n\nnetworks:\n  grafana:\n    external: true\n    name: grafana\n")),(0,o.kt)("p",null,"JSON API config\nURL = ",(0,o.kt)("inlineCode",{parentName:"p"},"node-red:1880")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Node red flow"),(0,o.kt)("div",null,(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "id": "f6f2187d.f17ca8",\n    "type": "tab",\n    "label": "Flow 1",\n    "disabled": false,\n    "info": ""\n  },\n  {\n    "id": "3cc11d24.ff01a2",\n    "type": "comment",\n    "z": "f6f2187d.f17ca8",\n    "name": "WARNING: please check you have started this container with a volume that is mounted to /data\\\\n otherwise any flow changes are lost when you redeploy or upgrade the container\\\\n (e.g. upgrade to a more recent node-red docker image).\\\\n  If you are using named volumes you can ignore this warning.\\\\n Double click or see info side panel to learn how to start Node-RED in Docker to save your work",\n    "info": "\\nTo start docker with a bind mount volume (-v option), for example:\\n\\n```\\ndocker run -it -p 1880:1880 -v /home/user/node_red_data:/data --name mynodered nodered/node-red\\n```\\n\\nwhere `/home/user/node_red_data` is a directory on your host machine where you want to store your flows.\\n\\nIf you do not do this then you can experiment and redploy flows, but if you restart or upgrade the container the flows will be disconnected and lost. \\n\\nThey will still exist in a hidden data volume, which can be recovered using standard docker techniques, but that is much more complex than just starting with a named volume as described above.",\n    "x": 350,\n    "y": 80,\n    "wires": []\n  },\n  {\n    "id": "59ff2a1.fa600d4",\n    "type": "http in",\n    "z": "f6f2187d.f17ca8",\n    "name": "",\n    "url": "/api",\n    "method": "post",\n    "upload": false,\n    "swaggerDoc": "",\n    "x": 380,\n    "y": 520,\n    "wires": [["75ead9333c673f05", "28ab76e4497ef6f4"]]\n  },\n  {\n    "id": "08159b4df1824988",\n    "type": "http response",\n    "z": "f6f2187d.f17ca8",\n    "name": "",\n    "statusCode": "",\n    "headers": {},\n    "x": 730,\n    "y": 580,\n    "wires": []\n  },\n  {\n    "id": "75ead9333c673f05",\n    "type": "debug",\n    "z": "f6f2187d.f17ca8",\n    "name": "",\n    "active": true,\n    "tosidebar": true,\n    "console": false,\n    "tostatus": false,\n    "complete": "payload",\n    "targetType": "msg",\n    "statusVal": "",\n    "statusType": "auto",\n    "x": 570,\n    "y": 520,\n    "wires": []\n  },\n  {\n    "id": "28ab76e4497ef6f4",\n    "type": "function",\n    "z": "f6f2187d.f17ca8",\n    "name": "Math random",\n    "func": "\\nmsg.payload = Math.random().toFixed(10);\\n\\nreturn msg;",\n    "outputs": 1,\n    "noerr": 0,\n    "initialize": "",\n    "finalize": "",\n    "libs": [],\n    "x": 570,\n    "y": 580,\n    "wires": [["08159b4df1824988"]]\n  }\n]\n')))),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Panel json"),(0,o.kt)("div",null,(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "calcsMutation": "none",\n  "reduceOptions": {\n    "calcs": []\n  },\n  "add100Percentage": false,\n  "centerAlignContent": true,\n  "overflow": "visible",\n  "SVGBaseFix": true,\n  "codeData": "{\\n  \\"text\\": \\"Random text\\"\\n}",\n  "rootCSS": "",\n  "css": "* {\\n  font-family: Open Sans;\\n}\\n\\n.box {\\n  border: solid #555 2px;\\n  border-radius: 10px;\\n  padding: 10px 20px;\\n}\\n",\n  "html": "<div>\\r\\n  <p>Request body text: <input></input></p>\\r\\n  <p>Response: <span></span></p>\\r\\n<div>",\n  "renderOnMount": true,\n  "onRender": "",\n  "dynamicHtmlGraphics": false,\n  "dynamicData": false,\n  "dynamicFieldDisplayValues": false,\n  "dynamicProps": false,\n  "panelupdateOnMount": true,\n  "onInitOnResize": false,\n  "onInit": "const inputElt = htmlNode.querySelector(\\"input\\");\\nconst spanElt = htmlNode.querySelector(\\"span\\");\\n\\nfunction getDataSourceProxyURL(name) {\\n  return Object.values(window.grafanaBootData.settings.datasources).find((dataSource) => dataSource.name === name).url;\\n}\\n\\nconst nodeRedAPIProxyURL = getDataSourceProxyURL(\'Node red API\');\\n\\nfunction sendPostRequest() {\\n  const nodeRedAPIURL = `${nodeRedAPIProxyURL}/api`;\\n  const body = inputElt.value;\\n  fetch(nodeRedAPIURL, {\\n    method: \'POST\',\\n    body\\n  }).then((response) => response.text().then(value => spanElt.innerText = value));\\n}\\n\\ninputElt.oninput = () => {\\n  sendPostRequest()\\n}\\n"\n}\n')))),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"onInit")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const inputElt = htmlNode.querySelector('input');\nconst spanElt = htmlNode.querySelector('span');\n\nfunction getDataSourceProxyURL(name) {\n  return Object.values(window.grafanaBootData.settings.datasources).find((dataSource) => dataSource.name === name).url;\n}\n\nconst nodeRedAPIProxyURL = getDataSourceProxyURL('Node red API');\n\nfunction sendPostRequest() {\n  const nodeRedAPIURL = `${nodeRedAPIProxyURL}/api`;\n  const body = inputElt.value;\n  fetch(nodeRedAPIURL, {\n    method: 'POST',\n    body,\n  }).then((response) => response.text().then((value) => (spanElt.innerText = value)));\n}\n\ninputElt.oninput = () => {\n  sendPostRequest();\n};\n")))}c.isMDXComponent=!0},9966:function(e,n,t){n.Z=t.p+"assets/images/node-red-hello-from-grafana-46d5200a70523d9c0ad8e2c3d3cf6042.gif"}}]);