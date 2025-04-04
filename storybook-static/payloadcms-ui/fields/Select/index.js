'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useMemo } from 'react';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { mergeFieldStyles } from '../mergeFieldStyles.js';
import { SelectInput } from './Input.js';
const formatOptions = options => options.map(option => {
  if (typeof option === 'object' && (option.value || option.value === '')) {
    return option;
  }
  return {
    label: option,
    value: option
  };
});
const SelectFieldComponent = props => {
  const {
    field,
    field: {
      name,
      admin: {
        className,
        description,
        isClearable = true,
        isSortable = true
      } = {},
      hasMany = false,
      label,
      localized,
      options: optionsFromProps = [],
      required
    },
    onChange: onChangeFromProps,
    path,
    readOnly,
    validate
  } = props;
  const options = React.useMemo(() => formatOptions(optionsFromProps), [optionsFromProps]);
  const memoizedValidate = useCallback((value, validationOptions) => {
    if (typeof validate === 'function') {
      return validate(value, {
        ...validationOptions,
        hasMany,
        options,
        required
      });
    }
  }, [validate, required, hasMany, options]);
  const {
    customComponents: {
      AfterInput,
      BeforeInput,
      Description,
      Error,
      Label
    } = {},
    disabled,
    setValue,
    showError,
    value: value_0
  } = useField({
    path,
    validate: memoizedValidate
  });
  const onChange = useCallback(selectedOption => {
    if (!readOnly || disabled) {
      let newValue = null;
      if (selectedOption && hasMany) {
        if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map(option => option.value);
        } else {
          newValue = [];
        }
      } else if (selectedOption && !Array.isArray(selectedOption)) {
        newValue = selectedOption.value;
      }
      if (typeof onChangeFromProps === 'function') {
        onChangeFromProps(newValue);
      }
      setValue(newValue);
    }
  }, [readOnly, disabled, hasMany, setValue, onChangeFromProps]);
  const styles = useMemo(() => mergeFieldStyles(field), [field]);
  return /*#__PURE__*/_jsx(SelectInput, {
    AfterInput: AfterInput,
    BeforeInput: BeforeInput,
    className: className,
    Description: Description,
    description: description,
    Error: Error,
    hasMany: hasMany,
    isClearable: isClearable,
    isSortable: isSortable,
    Label: Label,
    label: label,
    localized: localized,
    name: name,
    onChange: onChange,
    options: options,
    path: path,
    readOnly: readOnly || disabled,
    required: required,
    showError: showError,
    style: styles,
    value: value_0
  });
};
export const SelectField = withCondition(SelectFieldComponent);
export { SelectInput };
//# sourceMappingURL=index.js.map