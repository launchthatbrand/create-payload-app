"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[3638],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Translation/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>Translation});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js");__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const RecursiveTranslation=({elements,translationString})=>{const sections=translationString.split(/(<[^>]+>.*?<\/[^>]+>)/g);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:sections.map(((section,index)=>{if(elements&&section.startsWith("<")&&section.endsWith(">")){const elementKey=section[1],Element=elements[elementKey];if(Element){const regex=new RegExp(`<${elementKey}>(.*?)</${elementKey}>`,"g"),children=section.replace(regex,((_,group)=>group));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Element,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RecursiveTranslation,{translationString:children})},index)}}return section}))})},Translation=({elements,i18nKey,t,variables})=>{const stringWithVariables=t(i18nKey,variables||{});return elements?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RecursiveTranslation,{elements,translationString:stringWithVariables}):stringWithVariables}},"./src/stories/Translation/Translation.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_Translation__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/Translation/index.js"));const __WEBPACK_DEFAULT_EXPORT__={title:"@payloadcms/ui/elements/Translation",component:_payloadcms_ui_elements_Translation__WEBPACK_IMPORTED_MODULE_2__.w,parameters:{docs:{description:{component:"Translation component from @payloadcms/ui/dist/elements/Translation"}}},argTypes:{elements:{description:"elements prop",table:{type:{summary:"any"}}},translationString:{description:"translationString prop",table:{type:{summary:"any"}}},i18nKey:{description:"i18nKey prop",table:{type:{summary:"any"}}},t:{description:"t prop",table:{type:{summary:"any"}}},variables:{description:"variables prop",table:{type:{summary:"any"}}}},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_Translation__WEBPACK_IMPORTED_MODULE_2__.w,{...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <Translation {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the Translation component",...Default.parameters?.docs?.description}}}}}]);