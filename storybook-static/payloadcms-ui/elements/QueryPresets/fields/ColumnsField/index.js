'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toWords, transformColumnsToSearchParams } from 'payload/shared';
import React from 'react';
import { FieldLabel } from '../../../../fields/FieldLabel/index.js';
import { useField } from '../../../../forms/useField/index.js';
import { Pill } from '../../../Pill/index.js';
import './index.scss';
export const QueryPresetsColumnField = t0 => {
  const $ = _c(7);
  const {
    field: t1,
    path
  } = t0;
  const {
    label,
    required
  } = t1;
  let t2;
  if ($[0] !== path) {
    t2 = {
      path
    };
    $[0] = path;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const {
    value
  } = useField(t2);
  let t3;
  if ($[2] !== label || $[3] !== path || $[4] !== required || $[5] !== value) {
    t3 = _jsxs("div", {
      className: "field-type query-preset-columns-field",
      children: [_jsx(FieldLabel, {
        as: "h3",
        label,
        path,
        required
      }), _jsx("div", {
        className: "value-wrapper",
        children: value ? transformColumnsToSearchParams(value).map(_temp) : "No columns selected"
      })]
    });
    $[2] = label;
    $[3] = path;
    $[4] = required;
    $[5] = value;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
};
function _temp(column, i) {
  const isColumnActive = !column.startsWith("-");
  return _jsx(Pill, {
    pillStyle: isColumnActive ? "always-white" : "light-gray",
    children: toWords(column)
  }, i);
}
//# sourceMappingURL=index.js.map