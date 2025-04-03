'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
/**
 * This is mainly used to save a value on the form that is not visible to the user.
 * For example, this sets the `ìd` property of a block in the Blocks field.
 */
const HiddenFieldComponent = props => {
  const $ = _c(12);
  const {
    disableModifyingForm: t0,
    path,
    value: valueFromProps
  } = props;
  const disableModifyingForm = t0 === undefined ? true : t0;
  let t1;
  if ($[0] !== path) {
    t1 = {
      path
    };
    $[0] = path;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const {
    setValue,
    value
  } = useField(t1);
  let t2;
  let t3;
  if ($[2] !== disableModifyingForm || $[3] !== setValue || $[4] !== valueFromProps) {
    t2 = () => {
      if (valueFromProps !== undefined) {
        setValue(valueFromProps, disableModifyingForm);
      }
    };
    t3 = [valueFromProps, setValue, disableModifyingForm];
    $[2] = disableModifyingForm;
    $[3] = setValue;
    $[4] = valueFromProps;
    $[5] = t2;
    $[6] = t3;
  } else {
    t2 = $[5];
    t3 = $[6];
  }
  useEffect(t2, t3);
  const t4 = `field-${path?.replace(/\./g, "__")}`;
  const t5 = value || "";
  let t6;
  if ($[7] !== path || $[8] !== setValue || $[9] !== t4 || $[10] !== t5) {
    t6 = _jsx("input", {
      id: t4,
      name: path,
      onChange: setValue,
      type: "hidden",
      value: t5
    });
    $[7] = path;
    $[8] = setValue;
    $[9] = t4;
    $[10] = t5;
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  return t6;
};
export const HiddenField = withCondition(HiddenFieldComponent);
//# sourceMappingURL=index.js.map