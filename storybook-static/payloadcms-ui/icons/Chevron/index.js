import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './index.scss';
export const ChevronIcon = ({
  ariaLabel,
  className,
  direction,
  size
}) => /*#__PURE__*/_jsx("svg", {
  "aria-label": ariaLabel,
  className: ['icon icon--chevron', className, size && `icon--size-${size}`].filter(Boolean).join(' '),
  height: "100%",
  style: {
    transform: direction === 'left' ? 'rotate(90deg)' : direction === 'right' ? 'rotate(-90deg)' : direction === 'up' ? 'rotate(180deg)' : undefined
  },
  viewBox: "0 0 22 12",
  width: "100%",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/_jsx("path", {
    className: "stroke",
    d: "M1 1.12109L11 11.1211L21 1.12109",
    strokeLinecap: "square"
  })
});
//# sourceMappingURL=index.js.map