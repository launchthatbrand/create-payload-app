"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[6530],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/ShimmerEffect/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>StaggeredShimmers,l:()=>ShimmerEffect});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_hooks_useDelay_js__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useDelay.js"));const ShimmerEffect=({animationDelay="0ms",height="60px",width="100%"})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"shimmer-effect",style:{height:"number"==typeof height?`${height}px`:height,width:"number"==typeof width?`${width}px`:width},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:"shimmer-effect__shine",style:{animationDelay}})}),StaggeredShimmers=t0=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(7),{className,count,height,renderDelay:t1,shimmerDelay:t2,shimmerItemClassName,width}=t0,renderDelay=void 0===t1?500:t1,shimmerDelay=void 0===t2?25:t2,shimmerDelayToPass="number"==typeof shimmerDelay?`${shimmerDelay}ms`:shimmerDelay,[hasDelayed]=(0,_hooks_useDelay_js__WEBPACK_IMPORTED_MODULE_3__.Z)(renderDelay,!0);if(!hasDelayed)return null;let t3;return $[0]!==className||$[1]!==count||$[2]!==height||$[3]!==shimmerDelayToPass||$[4]!==shimmerItemClassName||$[5]!==width?(t3=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className,children:[...Array(count)].map(((_,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:shimmerItemClassName,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShimmerEffect,{animationDelay:`calc(${i} * ${shimmerDelayToPass})`,height,width})},i)))}),$[0]=className,$[1]=count,$[2]=height,$[3]=shimmerDelayToPass,$[4]=shimmerItemClassName,$[5]=width,$[6]=t3):t3=$[6],t3}},"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Thumbnail/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>Thumbnail,Y:()=>ThumbnailComponent});var compiler_runtime=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const File=()=>(0,jsx_runtime.jsxs)("svg",{height:"150",viewBox:"0 0 150 150",width:"150",xmlns:"http://www.w3.org/2000/svg",children:[(0,jsx_runtime.jsx)("rect",{fill:"#333333",height:"150",transform:"translate(0 0.5)",width:"150"}),(0,jsx_runtime.jsx)("path",{d:"M82.8876 50.5H55.5555V100.5H94.4444V61.9818H82.8876V50.5Z",fill:"white"}),(0,jsx_runtime.jsx)("path",{d:"M82.8876 61.9818H94.4444L82.8876 50.5V61.9818Z",fill:"#9A9A9A"})]});var ShimmerEffect=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/ShimmerEffect/index.js");const baseClass="thumbnail",Thumbnail=props=>{const $=(0,compiler_runtime.c)(18),{className:t0,doc:t1,fileSrc,imageCacheTag,size}=props,className=void 0===t0?"":t0;let t2;$[0]!==t1?(t2=void 0===t1?{}:t1,$[0]=t1,$[1]=t2):t2=$[1];const{filename,mimeType}=t2,[fileExists,setFileExists]=react.useState(void 0),t3=`${baseClass}--size-${size||"medium"}`;let t4;$[2]!==className||$[3]!==t3?(t4=[baseClass,t3,className],$[2]=className,$[3]=t3,$[4]=t4):t4=$[4];const classNames=t4.join(" ");let t5,t6;$[5]!==fileSrc||$[6]!==mimeType?(t5=()=>{if(!fileSrc||"string"==typeof mimeType&&!mimeType.startsWith("image"))return void setFileExists(!1);setFileExists(void 0);const img=new Image;img.src=fileSrc,img.onload=()=>{setFileExists(!0)},img.onerror=()=>{setFileExists(!1)}},t6=[fileSrc,mimeType],$[5]=fileSrc,$[6]=mimeType,$[7]=t5,$[8]=t6):(t5=$[7],t6=$[8]),react.useEffect(t5,t6);let t7,src=null;if(fileSrc){const queryChar=fileSrc?.includes("?")?"&":"?";src=imageCacheTag?`${fileSrc}${queryChar}${encodeURIComponent(imageCacheTag)}`:fileSrc}if($[9]!==classNames||$[10]!==fileExists||$[11]!==filename||$[12]!==src){let t8;$[14]!==fileExists||$[15]!==filename||$[16]!==src?(t8=fileExists&&(0,jsx_runtime.jsx)("img",{alt:filename,src}),$[14]=fileExists,$[15]=filename,$[16]=src,$[17]=t8):t8=$[17],t7=(0,jsx_runtime.jsxs)("div",{className:classNames,children:[void 0===fileExists&&(0,jsx_runtime.jsx)(ShimmerEffect.l,{height:"100%"}),t8,!1===fileExists&&(0,jsx_runtime.jsx)(File,{})]}),$[9]=classNames,$[10]=fileExists,$[11]=filename,$[12]=src,$[13]=t7}else t7=$[13];return t7};function ThumbnailComponent(props){const $=(0,compiler_runtime.c)(17),{alt,className:t0,filename,fileSrc,imageCacheTag,size}=props,className=void 0===t0?"":t0,[fileExists,setFileExists]=react.useState(void 0),t1=`${baseClass}--size-${size||"medium"}`;let t2;$[0]!==className||$[1]!==t1?(t2=[baseClass,t1,className],$[0]=className,$[1]=t1,$[2]=t2):t2=$[2];const classNames=t2.join(" ");let t3,t4;$[3]!==fileSrc?(t3=()=>{if(!fileSrc)return void setFileExists(!1);setFileExists(void 0);const img=new Image;img.src=fileSrc,img.onload=()=>{setFileExists(!0)},img.onerror=()=>{setFileExists(!1)}},t4=[fileSrc],$[3]=fileSrc,$[4]=t3,$[5]=t4):(t3=$[4],t4=$[5]),react.useEffect(t3,t4);let t5,src="";if(fileSrc){const queryChar=fileSrc?.includes("?")?"&":"?";src=imageCacheTag?`${fileSrc}${queryChar}${encodeURIComponent(imageCacheTag)}`:fileSrc}if($[6]!==alt||$[7]!==classNames||$[8]!==fileExists||$[9]!==filename||$[10]!==src){let t6;$[12]!==alt||$[13]!==fileExists||$[14]!==filename||$[15]!==src?(t6=fileExists&&(0,jsx_runtime.jsx)("img",{alt:alt||filename,src}),$[12]=alt,$[13]=fileExists,$[14]=filename,$[15]=src,$[16]=t6):t6=$[16],t5=(0,jsx_runtime.jsxs)("div",{className:classNames,children:[void 0===fileExists&&(0,jsx_runtime.jsx)(ShimmerEffect.l,{height:"100%"}),t6,!1===fileExists&&(0,jsx_runtime.jsx)(File,{})]}),$[6]=alt,$[7]=classNames,$[8]=fileExists,$[9]=filename,$[10]=src,$[11]=t5}else t5=$[11];return t5}},"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useDelay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useDelay});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const useDelay=(delay,t0)=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(9),triggerOnMount=void 0!==t0&&t0,[hasDelayed,setHasDelayed]=react__WEBPACK_IMPORTED_MODULE_1__.useState(!1),triggerTimeoutRef=react__WEBPACK_IMPORTED_MODULE_1__.useRef(void 0);let t1;$[0]!==delay?(t1=()=>(setHasDelayed(!1),clearTimeout(triggerTimeoutRef.current),triggerTimeoutRef.current=setTimeout((()=>{setHasDelayed(!0)}),delay),()=>{clearTimeout(triggerTimeoutRef.current)}),$[0]=delay,$[1]=t1):t1=$[1];const triggerDelay=t1;let t2,t3,t4;return $[2]!==triggerDelay||$[3]!==triggerOnMount?(t2=()=>{triggerOnMount&&triggerDelay()},t3=[triggerDelay,triggerOnMount],$[2]=triggerDelay,$[3]=triggerOnMount,$[4]=t2,$[5]=t3):(t2=$[4],t3=$[5]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect(t2,t3),$[6]!==hasDelayed||$[7]!==triggerDelay?(t4=[hasDelayed,triggerDelay],$[6]=hasDelayed,$[7]=triggerDelay,$[8]=t4):t4=$[8],t4}},"./src/stories/Thumbnail/Thumbnail.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_Thumbnail__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Thumbnail/index.js"));const __WEBPACK_DEFAULT_EXPORT__={title:"@payloadcms/ui/elements/Thumbnail",component:_payloadcms_ui_elements_Thumbnail__WEBPACK_IMPORTED_MODULE_2__.V,parameters:{docs:{description:{component:"Thumbnail component from @payloadcms/ui/dist/elements/Thumbnail"}}},argTypes:{"className: t0":{description:"className: t0 prop",table:{type:{summary:"any"}}},"doc: t1":{description:"doc: t1 prop",table:{type:{summary:"any"}}},fileSrc:{description:"fileSrc prop",table:{type:{summary:"any"}}},imageCacheTag:{description:"imageCacheTag prop",table:{type:{summary:"any"}}},size:{description:"size prop",table:{type:{summary:"any"}}},alt:{description:"alt prop",table:{type:{summary:"any"}}},filename:{description:"filename prop",table:{type:{summary:"any"}}}},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_Thumbnail__WEBPACK_IMPORTED_MODULE_2__.V,{...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <Thumbnail {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the Thumbnail component",...Default.parameters?.docs?.description}}}}}]);