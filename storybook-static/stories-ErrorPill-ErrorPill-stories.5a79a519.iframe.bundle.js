"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[7774],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/ErrorPill/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ErrorPill});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js");__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const baseClass="error-pill",ErrorPill=props=>{const{className,count,i18n,withMessage}=props,classes=[baseClass,!withMessage&&count<99&&`${baseClass}--fixed-width`,className&&className].filter(Boolean).join(" ");return 0===count?null:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:classes,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:`${baseClass}__content`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:`${baseClass}__count`,children:count}),withMessage&&` ${count>1?i18n.t("general:errors"):i18n.t("general:error")}`]})})}},"./src/stories/ErrorPill/ErrorPill.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_ErrorPill__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/ErrorPill/index.js"));const __WEBPACK_DEFAULT_EXPORT__={title:"@payloadcms/ui/elements/ErrorPill",component:_payloadcms_ui_elements_ErrorPill__WEBPACK_IMPORTED_MODULE_2__.M,parameters:{docs:{description:{component:"ErrorPill component from @payloadcms/ui/dist/elements/ErrorPill"}}},argTypes:{count:{description:"count prop",table:{type:{summary:"any"}}},i18n:{description:"i18n prop",table:{type:{summary:"any"}}},withMessage:{description:"withMessage prop",table:{type:{summary:"any"}}}},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_ErrorPill__WEBPACK_IMPORTED_MODULE_2__.M,{...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <ErrorPill {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the ErrorPill component",...Default.parameters?.docs?.description}}}}}]);