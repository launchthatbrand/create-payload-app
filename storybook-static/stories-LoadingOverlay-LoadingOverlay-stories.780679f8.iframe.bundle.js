"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[5652],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Loading/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{TA:()=>FormLoadingOverlayToggle,p8:()=>LoadingOverlay,x:()=>LoadingOverlayToggle});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_translations__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@payloadcms+translations@3.31.0/node_modules/@payloadcms/translations/dist/exports/index.js"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),_elements_LoadingOverlay_index_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/LoadingOverlay/index.js"),_forms_Form_context_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/forms/Form/context.js"),_providers_Translation_index_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/providers/Translation/index.js");const baseClass="loading-overlay",LoadingOverlay=t0=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(11),{animationDuration,loadingText,overlayType,show:t1}=t0,show=void 0===t1||t1,{t}=(0,_providers_Translation_index_js__WEBPACK_IMPORTED_MODULE_4__.B)(),t2=show?`${baseClass}--entering`:`${baseClass}--exiting`,t3=overlayType?`${baseClass}--${overlayType}`:"";let t4;$[0]!==t2||$[1]!==t3?(t4=[baseClass,t2,t3].filter(Boolean),$[0]=t2,$[1]=t3,$[2]=t4):t4=$[2];const t5=t4.join(" "),t6=animationDuration||"500ms";let t7;if($[3]!==loadingText||$[4]!==t||$[5]!==t5||$[6]!==t6){let t8;$[8]!==loadingText||$[9]!==t?(t8=loadingText||t("general:loading"),$[8]=loadingText,$[9]=t,$[10]=t8):t8=$[10],t7=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:t5,style:{animationDuration:t6},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:`${baseClass}__bars`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:`${baseClass}__bar`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:`${baseClass}__bar`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:`${baseClass}__bar`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:`${baseClass}__bar`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className:`${baseClass}__bar`})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:`${baseClass}__text`,children:t8})]}),$[3]=loadingText,$[4]=t,$[5]=t5,$[6]=t6,$[7]=t7}else t7=$[7];return t7},LoadingOverlayToggle=t0=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(7),{name:key,type:t1,loadingText,show}=t0,type=void 0===t1?"fullscreen":t1,{toggleLoadingOverlay}=(0,_elements_LoadingOverlay_index_js__WEBPACK_IMPORTED_MODULE_5__.i)();let t2,t3;return $[0]!==key||$[1]!==loadingText||$[2]!==show||$[3]!==toggleLoadingOverlay||$[4]!==type?(t2=()=>(toggleLoadingOverlay({type,isLoading:show,key,loadingText:loadingText||void 0}),()=>{toggleLoadingOverlay({type,isLoading:!1,key})}),t3=[show,toggleLoadingOverlay,key,type,loadingText],$[0]=key,$[1]=loadingText,$[2]=show,$[3]=toggleLoadingOverlay,$[4]=type,$[5]=t2,$[6]=t3):(t2=$[5],t3=$[6]),react__WEBPACK_IMPORTED_MODULE_3__.useEffect(t2,t3),null},FormLoadingOverlayToggle=t0=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(6),{name,type:t1,action,formIsLoading:t2,loadingSuffix}=t0,type=void 0===t1?"fullscreen":t1,formIsLoading=void 0!==t2&&t2,isProcessing=(0,_forms_Form_context_js__WEBPACK_IMPORTED_MODULE_6__.dS)(),{i18n,t}=(0,_providers_Translation_index_js__WEBPACK_IMPORTED_MODULE_4__.B)(),t3=`${{create:t("general:creating"),loading:t("general:loading"),update:t("general:updating")}[action]} ${loadingSuffix?(0,_payloadcms_translations__WEBPACK_IMPORTED_MODULE_2__.sC)(loadingSuffix,i18n):""}`;let t4;return $[0]!==formIsLoading||$[1]!==isProcessing||$[2]!==name||$[3]!==t3||$[4]!==type?(t4=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LoadingOverlayToggle,{loadingText:t3.trim(),name,show:formIsLoading||isProcessing,type}),$[0]=formIsLoading,$[1]=isProcessing,$[2]=name,$[3]=t3,$[4]=type,$[5]=t4):t4=$[5],t4}},"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/LoadingOverlay/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>LoadingOverlayProvider,i:()=>useLoadingOverlay});var compiler_runtime=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),Loading=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Loading/index.js"),useDelay=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useDelay.js");var Translation=__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/providers/Translation/index.js");const defaultLoadingOverlayState={isLoading:!1,loaders:[],loadingText:"",overlayType:null},reducer=(state,action)=>{const loadersCopy=[...state.loaders],{type="fullscreen",key="user",loadingText}=action.payload;if("add"===action.type)loadersCopy.push({type,key,loadingText});else if("remove"===action.type){const index=loadersCopy.findIndex((item=>item.key===key&&item.type===type));loadersCopy.splice(index,1)}const nextLoader=loadersCopy?.length>0?loadersCopy[loadersCopy.length-1]:null;return{isLoading:Boolean(nextLoader),loaders:loadersCopy,loadingText:nextLoader?.loadingText||state?.loadingText,overlayType:nextLoader?.type||state?.overlayType}},Context=(0,react.createContext)({isOnScreen:!1,toggleLoadingOverlay:void 0}),LoadingOverlayProvider=t0=>{const $=(0,compiler_runtime.c)(21),{children}=t0,{t}=(0,Translation.B)();let t1;$[0]!==t?(t1=t("general:loading"),$[0]=t,$[1]=t1):t1=$[1];const fallbackText=t1,[overlays,dispatchOverlay]=react.useReducer(reducer,defaultLoadingOverlayState);let t2;$[2]!==overlays.isLoading?(t2={delayBeforeShow:1e3,inTimeout:250,minShowTime:500,outTimeout:250,show:overlays.isLoading},$[2]=overlays.isLoading,$[3]=t2):t2=$[3];const{isMounted,isUnmounting,triggerDelayedRender}=(t0=>{const $=(0,compiler_runtime.c)(13),{delayBeforeShow,inTimeout,minShowTime,outTimeout,show}=t0,totalMountTime=inTimeout+minShowTime+outTimeout,[hasDelayed,triggerDelay]=(0,useDelay.Z)(delayBeforeShow),[isMounted,setIsMounted]=react.useState(!1),[isUnmounting,setIsUnmounting]=react.useState(!1),onMountTimestampRef=react.useRef(0),unmountTimeoutRef=react.useRef(void 0);let t1;$[0]!==outTimeout?(t1=()=>{setIsUnmounting(!0),unmountTimeoutRef.current=setTimeout((()=>{setIsMounted(!1),setIsUnmounting(!1)}),outTimeout)},$[0]=outTimeout,$[1]=t1):t1=$[1];const unmount=t1;let t2,t3,t4;return $[2]!==hasDelayed||$[3]!==isMounted||$[4]!==show||$[5]!==totalMountTime||$[6]!==unmount?(t2=()=>{const shouldUnmount=isMounted&&!show;if(hasDelayed&&!isMounted&&show)onMountTimestampRef.current=Date.now(),setIsMounted(!0);else if(shouldUnmount){const totalTimeMounted=Date.now()-onMountTimestampRef.current,remainingTime=totalMountTime-totalTimeMounted;clearTimeout(unmountTimeoutRef.current),unmountTimeoutRef.current=setTimeout(unmount,Math.max(0,remainingTime))}},t3=[isMounted,show,unmount,totalMountTime,hasDelayed],$[2]=hasDelayed,$[3]=isMounted,$[4]=show,$[5]=totalMountTime,$[6]=unmount,$[7]=t2,$[8]=t3):(t2=$[7],t3=$[8]),react.useEffect(t2,t3),$[9]!==isMounted||$[10]!==isUnmounting||$[11]!==triggerDelay?(t4={isMounted,isUnmounting,triggerDelayedRender:triggerDelay},$[9]=isMounted,$[10]=isUnmounting,$[11]=triggerDelay,$[12]=t4):t4=$[12],t4})(t2);let t3;$[4]!==fallbackText||$[5]!==triggerDelayedRender?(t3=t4=>{const{type,isLoading,key,loadingText:t5}=t4,loadingText=void 0===t5?fallbackText:t5;isLoading?(triggerDelayedRender(),dispatchOverlay({type:"add",payload:{type,key,loadingText}})):dispatchOverlay({type:"remove",payload:{type,key}})},$[4]=fallbackText,$[5]=triggerDelayedRender,$[6]=t3):t3=$[6];const toggleLoadingOverlay=t3;let t4;if($[7]!==children||$[8]!==fallbackText||$[9]!==isMounted||$[10]!==isUnmounting||$[11]!==overlays.loadingText||$[12]!==overlays.overlayType||$[13]!==toggleLoadingOverlay){let t5;$[15]!==fallbackText||$[16]!==isMounted||$[17]!==isUnmounting||$[18]!==overlays.loadingText||$[19]!==overlays.overlayType?(t5=isMounted&&(0,jsx_runtime.jsx)(Loading.p8,{animationDuration:"250ms",loadingText:overlays.loadingText||fallbackText,overlayType:overlays.overlayType,show:!isUnmounting}),$[15]=fallbackText,$[16]=isMounted,$[17]=isUnmounting,$[18]=overlays.loadingText,$[19]=overlays.overlayType,$[20]=t5):t5=$[20],t4=(0,jsx_runtime.jsxs)(Context,{value:{isOnScreen:isMounted,toggleLoadingOverlay},children:[t5,children]}),$[7]=children,$[8]=fallbackText,$[9]=isMounted,$[10]=isUnmounting,$[11]=overlays.loadingText,$[12]=overlays.overlayType,$[13]=toggleLoadingOverlay,$[14]=t4}else t4=$[14];return t4},useLoadingOverlay=()=>{const contextHook=react.use(Context);if(void 0===contextHook)throw new Error("useLoadingOverlay must be used within a LoadingOverlayProvider");return contextHook}},"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/hooks/useDelay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useDelay});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const useDelay=(delay,t0)=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(9),triggerOnMount=void 0!==t0&&t0,[hasDelayed,setHasDelayed]=react__WEBPACK_IMPORTED_MODULE_1__.useState(!1),triggerTimeoutRef=react__WEBPACK_IMPORTED_MODULE_1__.useRef(void 0);let t1;$[0]!==delay?(t1=()=>(setHasDelayed(!1),clearTimeout(triggerTimeoutRef.current),triggerTimeoutRef.current=setTimeout((()=>{setHasDelayed(!0)}),delay),()=>{clearTimeout(triggerTimeoutRef.current)}),$[0]=delay,$[1]=t1):t1=$[1];const triggerDelay=t1;let t2,t3,t4;return $[2]!==triggerDelay||$[3]!==triggerOnMount?(t2=()=>{triggerOnMount&&triggerDelay()},t3=[triggerDelay,triggerOnMount],$[2]=triggerDelay,$[3]=triggerOnMount,$[4]=t2,$[5]=t3):(t2=$[4],t3=$[5]),react__WEBPACK_IMPORTED_MODULE_1__.useEffect(t2,t3),$[6]!==hasDelayed||$[7]!==triggerDelay?(t4=[hasDelayed,triggerDelay],$[6]=hasDelayed,$[7]=triggerDelay,$[8]=t4):t4=$[8],t4}},"./src/stories/LoadingOverlay/LoadingOverlay.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_Loading__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Loading/index.js"));const __WEBPACK_DEFAULT_EXPORT__={id:"payloadcms-ui-elements-loadingoverlay",title:"@payloadcms/ui/elements/Loading",component:_payloadcms_ui_elements_Loading__WEBPACK_IMPORTED_MODULE_2__.p8,parameters:{docs:{description:{component:"LoadingOverlay component from @payloadcms/ui/dist/elements/Loading"}}},argTypes:{},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_Loading__WEBPACK_IMPORTED_MODULE_2__.p8,{...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <LoadingOverlay {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the LoadingOverlay component",...Default.parameters?.docs?.description}}}}}]);