'use client';

import { c as _c } from "react/compiler-runtime";
import { useCallback, useMemo, useRef } from 'react';
import { useThrottledEffect } from '../../hooks/useThrottledEffect.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { useDocumentForm, useForm, useFormFields, useFormInitializing, useFormModified, useFormProcessing, useFormSubmitted } from '../Form/context.js';
/**
 * Get and set the value of a form field.
 *
 * @see https://payloadcms.com/docs/admin/react-hooks#usefield
 */
export const useField = options => {
  const $ = _c(62);
  const {
    disableFormData: t0,
    hasRows,
    path,
    validate
  } = options;
  const disableFormData = t0 === undefined ? false : t0;
  const submitted = useFormSubmitted();
  const processing = useFormProcessing();
  const initializing = useFormInitializing();
  const {
    user
  } = useAuth();
  const {
    id,
    collectionSlug
  } = useDocumentInfo();
  const operation = useOperation();
  const dispatchField = useFormFields(_temp);
  let t1;
  if ($[0] !== path) {
    t1 = t2 => {
      const [fields] = t2;
      return fields && fields?.[path] || null;
    };
    $[0] = path;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const field = useFormFields(t1);
  const {
    t
  } = useTranslation();
  const {
    config
  } = useConfig();
  const {
    getData,
    getDataByPath,
    getSiblingData,
    setModified
  } = useForm();
  const documentForm = useDocumentForm();
  const modified = useFormModified();
  const filterOptions = field?.filterOptions;
  const value = field?.value;
  const initialValue = field?.initialValue;
  const valid = typeof field?.valid === "boolean" ? field.valid : true;
  const showError = valid === false && submitted;
  const prevValid = useRef(valid);
  const prevErrorMessage = useRef(field?.errorMessage);
  let t2;
  if ($[2] !== path) {
    t2 = path ? path.split(".") : [];
    $[2] = path;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  const pathSegments = t2;
  let t3;
  if ($[4] !== disableFormData || $[5] !== dispatchField || $[6] !== hasRows || $[7] !== modified || $[8] !== path || $[9] !== setModified) {
    t3 = (e, t4) => {
      const disableModifyingForm = t4 === undefined ? false : t4;
      const val = e && e.target ? e.target.value : e;
      dispatchField({
        type: "UPDATE",
        disableFormData: disableFormData || hasRows && val > 0,
        path,
        value: val
      });
      if (!disableModifyingForm) {
        if (typeof setModified === "function") {
          if (modified === false) {
            setTimeout(() => {
              setModified(true);
            }, 10);
          }
        }
      }
    };
    $[4] = disableFormData;
    $[5] = dispatchField;
    $[6] = hasRows;
    $[7] = modified;
    $[8] = path;
    $[9] = setModified;
    $[10] = t3;
  } else {
    t3 = $[10];
  }
  const setValue = t3;
  let t4;
  const t5 = field?.customComponents;
  const t6 = processing || initializing;
  const t7 = field?.errorMessage;
  let t8;
  if ($[11] !== field?.errorPaths) {
    t8 = field?.errorPaths || [];
    $[11] = field?.errorPaths;
    $[12] = t8;
  } else {
    t8 = $[12];
  }
  const t9 = field?.rows;
  const t10 = field?.valid;
  let t11;
  if ($[13] !== filterOptions || $[14] !== initialValue || $[15] !== initializing || $[16] !== path || $[17] !== processing || $[18] !== setValue || $[19] !== showError || $[20] !== submitted || $[21] !== t10 || $[22] !== t5 || $[23] !== t6 || $[24] !== t7 || $[25] !== t8 || $[26] !== t9 || $[27] !== value) {
    t11 = {
      customComponents: t5,
      disabled: t6,
      errorMessage: t7,
      errorPaths: t8,
      filterOptions,
      formInitializing: initializing,
      formProcessing: processing,
      formSubmitted: submitted,
      initialValue,
      path,
      rows: t9,
      setValue,
      showError,
      valid: t10,
      value
    };
    $[13] = filterOptions;
    $[14] = initialValue;
    $[15] = initializing;
    $[16] = path;
    $[17] = processing;
    $[18] = setValue;
    $[19] = showError;
    $[20] = submitted;
    $[21] = t10;
    $[22] = t5;
    $[23] = t6;
    $[24] = t7;
    $[25] = t8;
    $[26] = t9;
    $[27] = value;
    $[28] = t11;
  } else {
    t11 = $[28];
  }
  t4 = t11;
  const result = t4;
  let t12;
  if ($[29] !== collectionSlug || $[30] !== config || $[31] !== disableFormData || $[32] !== dispatchField || $[33] !== documentForm || $[34] !== field || $[35] !== getData || $[36] !== getDataByPath || $[37] !== getSiblingData || $[38] !== hasRows || $[39] !== id || $[40] !== operation || $[41] !== path || $[42] !== pathSegments || $[43] !== t || $[44] !== user || $[45] !== validate || $[46] !== value) {
    t12 = () => {
      const validateField = async () => {
        let valueToValidate = value;
        if (field?.rows && Array.isArray(field.rows)) {
          valueToValidate = getDataByPath(path);
        }
        let errorMessage = prevErrorMessage.current;
        let valid_0 = prevValid.current;
        const data = getData();
        const isValid = typeof validate === "function" ? await validate(valueToValidate, {
          id,
          blockData: undefined,
          collectionSlug,
          data: documentForm?.getData ? documentForm.getData() : data,
          event: "onChange",
          operation,
          path: pathSegments,
          preferences: {},
          req: {
            payload: {
              config
            },
            t,
            user
          },
          siblingData: getSiblingData(path)
        }) : typeof prevErrorMessage.current === "string" ? prevErrorMessage.current : prevValid.current;
        if (typeof isValid === "string") {
          valid_0 = false;
          errorMessage = isValid;
        } else {
          if (typeof isValid === "boolean") {
            valid_0 = isValid;
            errorMessage = undefined;
          }
        }
        if (valid_0 !== prevValid.current || errorMessage !== prevErrorMessage.current) {
          prevValid.current = valid_0;
          prevErrorMessage.current = errorMessage;
          const update = {
            type: "UPDATE",
            errorMessage,
            path,
            rows: field?.rows,
            valid: valid_0,
            validate,
            value
          };
          if (disableFormData || (hasRows ? typeof value === "number" && value > 0 : false)) {
            update.disableFormData = true;
          }
          if (typeof dispatchField === "function") {
            dispatchField(update);
          }
        }
      };
      validateField();
    };
    $[29] = collectionSlug;
    $[30] = config;
    $[31] = disableFormData;
    $[32] = dispatchField;
    $[33] = documentForm;
    $[34] = field;
    $[35] = getData;
    $[36] = getDataByPath;
    $[37] = getSiblingData;
    $[38] = hasRows;
    $[39] = id;
    $[40] = operation;
    $[41] = path;
    $[42] = pathSegments;
    $[43] = t;
    $[44] = user;
    $[45] = validate;
    $[46] = value;
    $[47] = t12;
  } else {
    t12 = $[47];
  }
  const t13 = field?.rows;
  let t14;
  if ($[48] !== collectionSlug || $[49] !== disableFormData || $[50] !== dispatchField || $[51] !== getData || $[52] !== getDataByPath || $[53] !== getSiblingData || $[54] !== id || $[55] !== operation || $[56] !== path || $[57] !== t13 || $[58] !== user || $[59] !== validate || $[60] !== value) {
    t14 = [value, disableFormData, dispatchField, getData, getSiblingData, getDataByPath, id, operation, path, user, validate, t13, collectionSlug];
    $[48] = collectionSlug;
    $[49] = disableFormData;
    $[50] = dispatchField;
    $[51] = getData;
    $[52] = getDataByPath;
    $[53] = getSiblingData;
    $[54] = id;
    $[55] = operation;
    $[56] = path;
    $[57] = t13;
    $[58] = user;
    $[59] = validate;
    $[60] = value;
    $[61] = t14;
  } else {
    t14 = $[61];
  }
  useThrottledEffect(t12, 150, t14);
  return result;
};
function _temp(t0) {
  const [, dispatch] = t0;
  return dispatch;
}
//# sourceMappingURL=index.js.map