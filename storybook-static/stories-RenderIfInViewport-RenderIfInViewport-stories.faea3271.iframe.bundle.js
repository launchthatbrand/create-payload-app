"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[5312],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/RenderIfInViewport/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>RenderIfInViewport});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),_hooks_useIntersect_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useIntersect.js");const RenderIfInViewport=t0=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(9),{children,className,forceRender}=t0,[hasRendered,setHasRendered]=react__WEBPACK_IMPORTED_MODULE_2__.useState(Boolean(forceRender));let t1;$[0]===Symbol.for("react.memo_cache_sentinel")?(t1={rootMargin:"1000px"},$[0]=t1):t1=$[0];const[intersectionRef,entry]=(0,_hooks_useIntersect_js__WEBPACK_IMPORTED_MODULE_3__.R)(t1,Boolean(forceRender)),isIntersecting=Boolean(entry?.isIntersecting),shouldRender=forceRender||isIntersecting||entry?.boundingClientRect?.top<0;let t2,t3;$[1]!==hasRendered||$[2]!==shouldRender?(t2=()=>{shouldRender&&!hasRendered&&setHasRendered(!0)},t3=[shouldRender,hasRendered],$[1]=hasRendered,$[2]=shouldRender,$[3]=t2,$[4]=t3):(t2=$[3],t3=$[4]),react__WEBPACK_IMPORTED_MODULE_2__.useEffect(t2,t3);const t4=hasRendered?children:null;let t5;return $[5]!==className||$[6]!==intersectionRef||$[7]!==t4?(t5=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className,ref:intersectionRef,children:t4}),$[5]=className,$[6]=intersectionRef,$[7]=t4,$[8]=t5):t5=$[8],t5}},"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useIntersect.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useIntersect});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const useIntersect=(t0,disable)=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(14);let t1;$[0]!==t0?(t1=void 0===t0?{}:t0,$[0]=t0,$[1]=t1):t1=$[1];const{root:t2,rootMargin:t3,threshold:t4}=t1,root=void 0===t2?null:t2,rootMargin=void 0===t3?"0px":t3,threshold=void 0===t4?0:t4,[entry,updateEntry]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),[node,setNode]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);let t5;$[2]!==disable||$[3]!==root||$[4]!==rootMargin||$[5]!==threshold?(t5="undefined"!=typeof window&&"IntersectionObserver"in window&&!disable?new window.IntersectionObserver((t6=>{const[ent]=t6;return updateEntry(ent)}),{root,rootMargin,threshold}):null,$[2]=disable,$[3]=root,$[4]=rootMargin,$[5]=threshold,$[6]=t5):t5=$[6];const observer=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(t5);let t6,t7,t8;return $[7]!==disable||$[8]!==node?(t6=()=>{if(disable)return;const{current:currentObserver}=observer;return currentObserver.disconnect(),node&&currentObserver.observe(node),()=>currentObserver.disconnect()},t7=[node,disable],$[7]=disable,$[8]=node,$[9]=t6,$[10]=t7):(t6=$[9],t7=$[10]),(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t6,t7),$[11]!==entry||$[12]!==node?(t8=[setNode,entry,node],$[11]=entry,$[12]=node,$[13]=t8):t8=$[13],t8}},"./src/stories/RenderIfInViewport/RenderIfInViewport.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_RenderIfInViewport__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/RenderIfInViewport/index.js"));const __WEBPACK_DEFAULT_EXPORT__={title:"@payloadcms/ui/elements/RenderIfInViewport",component:_payloadcms_ui_elements_RenderIfInViewport__WEBPACK_IMPORTED_MODULE_2__.r,parameters:{docs:{description:{component:"RenderIfInViewport component from @payloadcms/ui/dist/elements/RenderIfInViewport"}}},argTypes:{},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_RenderIfInViewport__WEBPACK_IMPORTED_MODULE_2__.r,{...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <RenderIfInViewport {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the RenderIfInViewport component",...Default.parameters?.docs?.description}}}}}]);