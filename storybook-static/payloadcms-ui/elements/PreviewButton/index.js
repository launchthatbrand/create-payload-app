'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Button } from '../Button/index.js';
import { usePreviewURL } from './usePreviewURL.js';
const baseClass = 'preview-btn';
export function PreviewButton(props) {
  const $ = _c(5);
  const {
    generatePreviewURL,
    label
  } = usePreviewURL();
  let t0;
  if ($[0] !== generatePreviewURL) {
    t0 = () => generatePreviewURL({
      openPreviewWindow: true
    });
    $[0] = generatePreviewURL;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== label || $[3] !== t0) {
    t1 = _jsx(Button, {
      buttonStyle: "secondary",
      className: baseClass,
      icon: "link",
      iconPosition: "left",
      onClick: t0,
      size: "medium",
      children: label
    });
    $[2] = label;
    $[3] = t0;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
}
//# sourceMappingURL=index.js.map