"use strict";(self.webpackChunkcreate_payload_app=self.webpackChunkcreate_payload_app||[]).push([[1058],{"./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/DraggableSortable/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>DraggableSortable});var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/compiler-runtime.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@dnd-kit+core@6.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@dnd-kit/core/dist/core.esm.js"),_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@dnd-kit+sortable@7.0.2_@dnd-kit+core@6.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/@dnd-kit/sortable/dist/sortable.esm.js"),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js");const DraggableSortable=props=>{const $=(0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(15),{children,className,ids,onDragEnd}=props,id=(0,react__WEBPACK_IMPORTED_MODULE_4__.useId)();let t0;$[0]!==id?(t0={id},$[0]=id,$[1]=t0):t0=$[1];const{setNodeRef}=(0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.zM)(t0);let t1,t2;$[2]===Symbol.for("react.memo_cache_sentinel")?(t1={activationConstraint:{distance:5}},$[2]=t1):t1=$[2],$[3]===Symbol.for("react.memo_cache_sentinel")?(t2={coordinateGetter:_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.JR},$[3]=t2):t2=$[3];const sensors=(0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.FR)((0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.MS)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.AN,t1),(0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.MS)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.uN,t2));let t3;$[4]!==ids||$[5]!==onDragEnd?(t3=event=>{const{active,over}=event;event.activatorEvent.stopPropagation(),active&&over&&"function"==typeof onDragEnd&&onDragEnd({event,moveFromIndex:ids.findIndex((_id=>_id===active.id)),moveToIndex:ids.findIndex((_id_0=>_id_0===over.id))})},$[4]=ids,$[5]=onDragEnd,$[6]=t3):t3=$[6];const handleDragEnd=t3;let t4;return $[7]!==children||$[8]!==className||$[9]!==handleDragEnd||$[10]!==id||$[11]!==ids||$[12]!==sensors||$[13]!==setNodeRef?(t4=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.Mp,{collisionDetection:_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.fp,id,onDragEnd:handleDragEnd,sensors,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.gB,{items:ids,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{className,ref:setNodeRef,children})})}),$[7]=children,$[8]=className,$[9]=handleDragEnd,$[10]=id,$[11]=ids,$[12]=sensors,$[13]=setNodeRef,$[14]=t4):t4=$[14],t4}},"./src/stories/DraggableSortable/DraggableSortable.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/jsx-runtime.js"),_payloadcms_ui_elements_DraggableSortable__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/.pnpm/next@15.2.3_@babel+core@7.26.10_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.77.4/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/@payloadcms+ui@3.31.0_@types+react@19.0.12_monaco-editor@0.52.2_next@15.2.3_@babel+core@7.26._s35ydyxurzhrrb4ha2zknhusuy/node_modules/@payloadcms/ui/dist/elements/DraggableSortable/index.js"));const __WEBPACK_DEFAULT_EXPORT__={title:"@payloadcms/ui/elements/DraggableSortable",component:_payloadcms_ui_elements_DraggableSortable__WEBPACK_IMPORTED_MODULE_2__.U,parameters:{docs:{description:{component:"DraggableSortable component from @payloadcms/ui/dist/elements/DraggableSortable"}}},argTypes:{children:{description:"children prop",control:"text"},ids:{description:"ids prop",table:{type:{summary:"any"}}},onDragEnd:{description:"onDragEnd prop",table:{type:{summary:"any"}}}},tags:["autodocs"]},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_payloadcms_ui_elements_DraggableSortable__WEBPACK_IMPORTED_MODULE_2__.U,{...args})).bind({});Default.args={children:"Example Content"};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <DraggableSortable {...args} />",...Default.parameters?.docs?.source},description:{story:"Default state of the DraggableSortable component",...Default.parameters?.docs?.description}}}}}]);