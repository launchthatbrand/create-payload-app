'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useTranslation } from '../../../../providers/Translation/index.js';
import { ReactSelect } from '../../../ReactSelect/index.js';
import { formatOptions } from './formatOptions.js';
export const Select = t0 => {
  const $ = _c(26);
  const {
    disabled,
    isClearable,
    onChange,
    operator,
    options: optionsFromProps,
    value
  } = t0;
  const {
    i18n
  } = useTranslation();
  let t1;
  if ($[0] !== optionsFromProps) {
    t1 = formatOptions(optionsFromProps);
    $[0] = optionsFromProps;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const [options, setOptions] = React.useState(t1);
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = ["in", "not_in"];
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const isMulti = t2.includes(operator);
  let valueToRender;
  if (isMulti && Array.isArray(value)) {
    let t3;
    if ($[3] !== i18n || $[4] !== options) {
      t3 = val => {
        const matchingOption = options.find(option => option.value === val);
        return {
          label: matchingOption ? getTranslation(matchingOption.label, i18n) : val,
          value: matchingOption?.value ?? val
        };
      };
      $[3] = i18n;
      $[4] = options;
      $[5] = t3;
    } else {
      t3 = $[5];
    }
    valueToRender = value.map(t3);
  } else {
    if (value) {
      let matchingOption_0;
      let t3;
      if ($[6] !== i18n || $[7] !== options || $[8] !== value) {
        let t4;
        if ($[11] !== value) {
          t4 = option_0 => option_0.value === value;
          $[11] = value;
          $[12] = t4;
        } else {
          t4 = $[12];
        }
        matchingOption_0 = options.find(t4);
        t3 = matchingOption_0 ? getTranslation(matchingOption_0.label, i18n) : value;
        $[6] = i18n;
        $[7] = options;
        $[8] = value;
        $[9] = matchingOption_0;
        $[10] = t3;
      } else {
        matchingOption_0 = $[9];
        t3 = $[10];
      }
      valueToRender = {
        label: t3,
        value: matchingOption_0?.value ?? value
      };
    }
  }
  let t3;
  if ($[13] !== isMulti || $[14] !== onChange) {
    t3 = selectedOption => {
      let newValue;
      if (!selectedOption) {
        newValue = null;
      } else {
        if (isMulti) {
          if (Array.isArray(selectedOption)) {
            newValue = selectedOption.map(_temp);
          } else {
            newValue = [];
          }
        } else {
          newValue = selectedOption.value;
        }
      }
      onChange(newValue);
    };
    $[13] = isMulti;
    $[14] = onChange;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  const onSelect = t3;
  let t4;
  let t5;
  if ($[16] !== optionsFromProps) {
    t4 = () => {
      setOptions(formatOptions(optionsFromProps));
    };
    t5 = [optionsFromProps];
    $[16] = optionsFromProps;
    $[17] = t4;
    $[18] = t5;
  } else {
    t4 = $[17];
    t5 = $[18];
  }
  React.useEffect(t4, t5);
  let t6;
  let t7;
  if ($[19] !== isMulti || $[20] !== onChange || $[21] !== value) {
    t6 = () => {
      if (!isMulti && Array.isArray(value)) {
        onChange(value[0]);
      }
    };
    t7 = [isMulti, onChange, value];
    $[19] = isMulti;
    $[20] = onChange;
    $[21] = value;
    $[22] = t6;
    $[23] = t7;
  } else {
    t6 = $[22];
    t7 = $[23];
  }
  React.useEffect(t6, t7);
  let t8;
  if ($[24] !== i18n) {
    t8 = option_2 => ({
      ...option_2,
      label: getTranslation(option_2.label, i18n)
    });
    $[24] = i18n;
    $[25] = t8;
  } else {
    t8 = $[25];
  }
  return _jsx(ReactSelect, {
    disabled,
    isClearable,
    isMulti,
    onChange: onSelect,
    options: options.map(t8),
    value: valueToRender
  });
};
function _temp(option_1) {
  return option_1.value;
}
//# sourceMappingURL=index.js.map