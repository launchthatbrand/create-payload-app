'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { ReactSelect } from '../../elements/ReactSelect/index.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { FieldDescription } from '../../fields/FieldDescription/index.js';
import { FieldError } from '../../fields/FieldError/index.js';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
export const SelectInput = props => {
  const $ = _c(39);
  const {
    AfterInput,
    BeforeInput,
    className,
    Description,
    description,
    Error,
    hasMany: t0,
    isClearable: t1,
    isSortable: t2,
    label,
    Label,
    localized,
    onChange,
    onInputChange,
    options,
    path,
    readOnly,
    required,
    showError,
    style,
    value
  } = props;
  const hasMany = t0 === undefined ? false : t0;
  const isClearable = t1 === undefined ? true : t1;
  const isSortable = t2 === undefined ? true : t2;
  const {
    i18n
  } = useTranslation();
  let t3;
  if ($[0] !== AfterInput || $[1] !== BeforeInput || $[2] !== Description || $[3] !== Error || $[4] !== Label || $[5] !== className || $[6] !== description || $[7] !== hasMany || $[8] !== i18n || $[9] !== isClearable || $[10] !== isSortable || $[11] !== label || $[12] !== localized || $[13] !== onChange || $[14] !== onInputChange || $[15] !== options || $[16] !== path || $[17] !== readOnly || $[18] !== required || $[19] !== showError || $[20] !== style || $[21] !== value) {
    let valueToRender;
    if (hasMany && Array.isArray(value)) {
      let t4;
      if ($[23] !== i18n || $[24] !== options) {
        t4 = val => {
          const matchingOption = options.find(option => option.value === val);
          return {
            label: matchingOption ? getTranslation(matchingOption.label, i18n) : val,
            value: matchingOption?.value ?? val
          };
        };
        $[23] = i18n;
        $[24] = options;
        $[25] = t4;
      } else {
        t4 = $[25];
      }
      valueToRender = value.map(t4);
    } else {
      if (value) {
        let matchingOption_0;
        let t4;
        if ($[26] !== i18n || $[27] !== options || $[28] !== value) {
          let t5;
          if ($[31] !== value) {
            t5 = option_0 => option_0.value === value;
            $[31] = value;
            $[32] = t5;
          } else {
            t5 = $[32];
          }
          matchingOption_0 = options.find(t5);
          t4 = matchingOption_0 ? getTranslation(matchingOption_0.label, i18n) : value;
          $[26] = i18n;
          $[27] = options;
          $[28] = value;
          $[29] = matchingOption_0;
          $[30] = t4;
        } else {
          matchingOption_0 = $[29];
          t4 = $[30];
        }
        valueToRender = {
          label: t4,
          value: matchingOption_0?.value ?? value
        };
      } else {
        valueToRender = null;
      }
    }
    const t4 = showError && "error";
    const t5 = readOnly && "read-only";
    let t6;
    if ($[33] !== className || $[34] !== t4 || $[35] !== t5) {
      t6 = [fieldBaseClass, "select", className, t4, t5].filter(Boolean);
      $[33] = className;
      $[34] = t4;
      $[35] = t5;
      $[36] = t6;
    } else {
      t6 = $[36];
    }
    let t7;
    if ($[37] !== i18n) {
      t7 = option_1 => ({
        ...option_1,
        label: getTranslation(option_1.label, i18n)
      });
      $[37] = i18n;
      $[38] = t7;
    } else {
      t7 = $[38];
    }
    t3 = _jsxs("div", {
      className: t6.join(" "),
      id: `field-${path.replace(/\./g, "__")}`,
      style,
      children: [_jsx(RenderCustomComponent, {
        CustomComponent: Label,
        Fallback: _jsx(FieldLabel, {
          label,
          localized,
          path,
          required
        })
      }), _jsxs("div", {
        className: `${fieldBaseClass}__wrap`,
        children: [_jsx(RenderCustomComponent, {
          CustomComponent: Error,
          Fallback: _jsx(FieldError, {
            path,
            showError
          })
        }), BeforeInput, _jsx(ReactSelect, {
          disabled: readOnly,
          isClearable,
          isMulti: hasMany,
          isSortable,
          onChange,
          onInputChange,
          options: options.map(t7),
          showError,
          value: valueToRender
        }), AfterInput]
      }), _jsx(RenderCustomComponent, {
        CustomComponent: Description,
        Fallback: _jsx(FieldDescription, {
          description,
          path
        })
      })]
    });
    $[0] = AfterInput;
    $[1] = BeforeInput;
    $[2] = Description;
    $[3] = Error;
    $[4] = Label;
    $[5] = className;
    $[6] = description;
    $[7] = hasMany;
    $[8] = i18n;
    $[9] = isClearable;
    $[10] = isSortable;
    $[11] = label;
    $[12] = localized;
    $[13] = onChange;
    $[14] = onInputChange;
    $[15] = options;
    $[16] = path;
    $[17] = readOnly;
    $[18] = required;
    $[19] = showError;
    $[20] = style;
    $[21] = value;
    $[22] = t3;
  } else {
    t3 = $[22];
  }
  return t3;
};
//# sourceMappingURL=Input.js.map