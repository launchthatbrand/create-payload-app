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
export const TextInput = props => {
  const $ = _c(31);
  const {
    AfterInput,
    BeforeInput,
    className,
    Description,
    description,
    Error,
    hasMany,
    inputRef,
    Label,
    label,
    localized,
    maxRows,
    onChange,
    onKeyDown,
    path,
    placeholder,
    readOnly,
    required,
    rtl,
    showError,
    style,
    value,
    valueToRender
  } = props;
  const {
    i18n,
    t
  } = useTranslation();
  const editableProps = _temp2;
  const t0 = showError && "error";
  const t1 = readOnly && "read-only";
  const t2 = hasMany && "has-many";
  let t3;
  if ($[0] !== className || $[1] !== t0 || $[2] !== t1 || $[3] !== t2) {
    t3 = [fieldBaseClass, "text", className, t0, t1, t2].filter(Boolean);
    $[0] = className;
    $[1] = t0;
    $[2] = t1;
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  const t4 = t3.join(" ");
  let t5;
  if ($[5] !== AfterInput || $[6] !== BeforeInput || $[7] !== Description || $[8] !== Error || $[9] !== Label || $[10] !== description || $[11] !== hasMany || $[12] !== i18n || $[13] !== inputRef || $[14] !== label || $[15] !== localized || $[16] !== maxRows || $[17] !== onChange || $[18] !== onKeyDown || $[19] !== path || $[20] !== placeholder || $[21] !== readOnly || $[22] !== required || $[23] !== rtl || $[24] !== showError || $[25] !== style || $[26] !== t || $[27] !== t4 || $[28] !== value || $[29] !== valueToRender) {
    t5 = _jsxs("div", {
      className: t4,
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
        }), BeforeInput, hasMany ? _jsx(ReactSelect, {
          className: `field-${path.replace(/\./g, "__")}`,
          components: {
            DropdownIndicator: null
          },
          customProps: {
            editableProps
          },
          disabled: readOnly,
          filterOption: () => !maxRows ? true : !(Array.isArray(value) && maxRows && value.length >= maxRows),
          isClearable: false,
          isCreatable: true,
          isMulti: true,
          isSortable: true,
          menuIsOpen: false,
          noOptionsMessage: () => {
            const isOverHasMany = Array.isArray(value) && value.length >= maxRows;
            if (isOverHasMany) {
              return t("validation:limitReached", {
                max: maxRows,
                value: value.length + 1
              });
            }
            return null;
          },
          onChange,
          options: [],
          placeholder: t("general:enterAValue"),
          showError,
          value: valueToRender
        }) : _jsx("input", {
          "data-rtl": rtl,
          disabled: readOnly,
          id: `field-${path?.replace(/\./g, "__")}`,
          name: path,
          onChange,
          onKeyDown,
          placeholder: getTranslation(placeholder, i18n),
          ref: inputRef,
          type: "text",
          value: value || ""
        }), AfterInput, _jsx(RenderCustomComponent, {
          CustomComponent: Description,
          Fallback: _jsx(FieldDescription, {
            description,
            path
          })
        })]
      })]
    });
    $[5] = AfterInput;
    $[6] = BeforeInput;
    $[7] = Description;
    $[8] = Error;
    $[9] = Label;
    $[10] = description;
    $[11] = hasMany;
    $[12] = i18n;
    $[13] = inputRef;
    $[14] = label;
    $[15] = localized;
    $[16] = maxRows;
    $[17] = onChange;
    $[18] = onKeyDown;
    $[19] = path;
    $[20] = placeholder;
    $[21] = readOnly;
    $[22] = required;
    $[23] = rtl;
    $[24] = showError;
    $[25] = style;
    $[26] = t;
    $[27] = t4;
    $[28] = value;
    $[29] = valueToRender;
    $[30] = t5;
  } else {
    t5 = $[30];
  }
  return t5;
};
function _temp(event) {
  event.currentTarget.contentEditable = "false";
}
function _temp2(data, className_0, selectProps) {
  const editableClassName = `${className_0}--editable`;
  return {
    onBlur: _temp,
    onClick: event_0 => {
      event_0.currentTarget.contentEditable = "true";
      event_0.currentTarget.classList.add(editableClassName);
      event_0.currentTarget.focus();
    },
    onKeyDown: event_1 => {
      if (event_1.key === "Enter" || event_1.key === "Tab" || event_1.key === "Escape") {
        event_1.currentTarget.contentEditable = "false";
        event_1.currentTarget.classList.remove(editableClassName);
        data.value.value = event_1.currentTarget.innerText;
        data.label = event_1.currentTarget.innerText;
        if (data.value.value.replaceAll("\n", "")) {
          selectProps.onChange(selectProps.value, {
            action: "create-option",
            option: data
          });
        } else {
          if (Array.isArray(selectProps.value)) {
            const newValues = selectProps.value.filter(v => v.id !== data.id);
            selectProps.onChange(newValues, {
              action: "pop-value",
              removedValue: data
            });
          }
        }
        event_1.preventDefault();
      }
      event_1.stopPropagation();
    }
  };
}
//# sourceMappingURL=Input.js.map