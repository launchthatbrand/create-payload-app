'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { components as SelectComponents } from 'react-select';
import './index.scss';
const baseClass = 'value-container';
export const ValueContainer = props => {
  // @ts-expect-error-next-line // TODO Fix this - moduleResolution 16 breaks our declare module
  const {
    selectProps: {
      customProps
    } = {}
  } = props;
  return /*#__PURE__*/_jsx("div", {
    className: baseClass,
    ref: customProps?.droppableRef,
    children: /*#__PURE__*/_jsx(SelectComponents.ValueContainer, {
      ...props
    })
  });
};
//# sourceMappingURL=index.js.map