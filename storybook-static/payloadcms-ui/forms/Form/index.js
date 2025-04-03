'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import { dequal } from 'dequal/lite'; // lite: no need for Map and Set support
import { useRouter } from 'next/navigation.js';
import { serialize } from 'object-to-formdata';
import { deepCopyObjectSimpleWithoutReactComponents, getDataByPath as getDataByPathFunc, getSiblingData as getSiblingDataFunc, reduceFieldsToValues, wait } from 'payload/shared';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { toast } from 'sonner';
import { FieldErrorsToast } from '../../elements/Toasts/fieldErrors.js';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect.js';
import { useEffectEvent } from '../../hooks/useEffectEvent.js';
import { useQueues } from '../../hooks/useQueues.js';
import { useThrottledEffect } from '../../hooks/useThrottledEffect.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { useRouteTransition } from '../../providers/RouteTransition/index.js';
import { useServerFunctions } from '../../providers/ServerFunctions/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { useUploadHandlers } from '../../providers/UploadHandlers/index.js';
import { abortAndIgnore, handleAbortRef } from '../../utilities/abortAndIgnore.js';
import { requests } from '../../utilities/api.js';
import { BackgroundProcessingContext, DocumentFormContext, FormContext, FormFieldsContext, FormWatchContext, InitializingContext, ModifiedContext, ProcessingContext, SubmittedContext, useDocumentForm } from './context.js';
import { errorMessages } from './errorMessages.js';
import { fieldReducer } from './fieldReducer.js';
import { initContextState } from './initContextState.js';
import { mergeServerFormState } from './mergeServerFormState.js';
const baseClass = 'form';
export const Form = props => {
  const {
    id,
    collectionSlug,
    docPermissions,
    getDocPreferences,
    globalSlug
  } = useDocumentInfo();
  const {
    action,
    beforeSubmit,
    children,
    className,
    disabled: disabledFromProps,
    disableSuccessStatus,
    disableValidationOnSubmit,
    // fields: fieldsFromProps = collection?.fields || global?.fields,
    el,
    handleResponse,
    initialState,
    isDocumentForm,
    isInitializing: initializingFromProps,
    onChange,
    onSubmit,
    onSuccess,
    redirect,
    submitted: submittedFromProps,
    uuid,
    waitForAutocomplete
  } = props;
  const method = 'method' in props ? props?.method : undefined;
  const router = useRouter();
  const documentForm = useDocumentForm();
  const {
    code: locale
  } = useLocale();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    refreshCookie,
    user
  } = useAuth();
  const operation = useOperation();
  const {
    queueTask
  } = useQueues();
  const {
    getFormState
  } = useServerFunctions();
  const {
    startRouteTransition
  } = useRouteTransition();
  const {
    getUploadHandler
  } = useUploadHandlers();
  const {
    config
  } = useConfig();
  const [disabled, setDisabled] = useState(disabledFromProps || false);
  const [isMounted, setIsMounted] = useState(false);
  const [modified, setModified] = useState(false);
  /**
  * Tracks wether the form state passes validation.
  * For example the state could be submitted but invalid as field errors have been returned.
  */
  const [isValid, setIsValid] = useState(true);
  const [initializing, setInitializing] = useState(initializingFromProps);
  const [processing, setProcessing] = useState(false);
  const [backgroundProcessing, setBackgroundProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const contextRef = useRef({});
  const abortResetFormRef = useRef(null);
  const isFirstRenderRef = useRef(true);
  const fieldsReducer = useReducer(fieldReducer, {}, () => initialState);
  const [fields, dispatchFields] = fieldsReducer;
  contextRef.current.fields = fields;
  const prevFields = useRef(fields);
  const validateForm = useCallback(async () => {
    const validatedFieldState = {};
    let isValid_0 = true;
    const data = contextRef.current.getData();
    const validationPromises = Object.entries(contextRef.current.fields).map(async ([path, field]) => {
      const validatedField = field;
      const pathSegments = path ? path.split('.') : [];
      if (field.passesCondition !== false) {
        let validationResult = validatedField.valid;
        if ('validate' in field && typeof field.validate === 'function') {
          let valueToValidate = field.value;
          if (field?.rows && Array.isArray(field.rows)) {
            valueToValidate = contextRef.current.getDataByPath(path);
          }
          validationResult = await field.validate(valueToValidate, {
            ...field,
            id,
            collectionSlug,
            // If there is a parent document form, we can get the data from that form
            blockData: undefined,
            data: documentForm?.getData ? documentForm.getData() : data,
            event: 'submit',
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
            siblingData: contextRef.current.getSiblingData(path)
          });
          if (typeof validationResult === 'string') {
            validatedField.errorMessage = validationResult;
            validatedField.valid = false;
          } else {
            validatedField.valid = true;
            validatedField.errorMessage = undefined;
          }
        }
        if (validatedField.valid === false) {
          isValid_0 = false;
        }
      }
      validatedFieldState[path] = validatedField;
    });
    await Promise.all(validationPromises);
    if (!dequal(contextRef.current.fields, validatedFieldState)) {
      dispatchFields({
        type: 'REPLACE_STATE',
        state: validatedFieldState
      });
    }
    setIsValid(isValid_0);
    return isValid_0;
  }, [collectionSlug, config, dispatchFields, id, operation, t, user, documentForm]);
  const submit = useCallback(async (options = {}, e) => {
    const {
      action: actionArg = action,
      method: methodToUse = method,
      overrides: overridesFromArgs = {},
      skipValidation
    } = options;
    if (disabled) {
      if (e) {
        e.preventDefault();
      }
      return;
    }
    // create new toast promise which will resolve manually later
    let errorToast, successToast;
    const promise = new Promise((resolve, reject) => {
      successToast = resolve;
      errorToast = reject;
    });
    const hasFormSubmitAction = actionArg || typeof action === 'string' || typeof action === 'function';
    if (redirect || disableSuccessStatus || !hasFormSubmitAction) {
      // Do not show submitting toast, as the promise toast may never disappear under these conditions.
      // Instead, make successToast() or errorToast() throw toast.success / toast.error
      successToast = data_0 => toast.success(data_0);
      errorToast = data_1 => toast.error(data_1);
    } else {
      toast.promise(promise, {
        error: data_2 => {
          return data_2;
        },
        loading: t('general:submitting'),
        success: data_3 => {
          return data_3;
        }
      });
    }
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setProcessing(true);
    setDisabled(true);
    if (waitForAutocomplete) {
      await wait(100);
    }
    // Execute server side validations
    if (Array.isArray(beforeSubmit)) {
      let revalidatedFormState;
      const serializableFields = deepCopyObjectSimpleWithoutReactComponents(contextRef.current.fields);
      await beforeSubmit.reduce(async (priorOnChange, beforeSubmitFn) => {
        await priorOnChange;
        const result = await beforeSubmitFn({
          formState: serializableFields
        });
        revalidatedFormState = result;
      }, Promise.resolve());
      const isValid_1 = Object.entries(revalidatedFormState).every(([, field_0]) => field_0.valid !== false);
      setIsValid(isValid_1);
      if (!isValid_1) {
        setProcessing(false);
        setSubmitted(true);
        setDisabled(false);
        return dispatchFields({
          type: 'REPLACE_STATE',
          state: revalidatedFormState
        });
      }
    }
    const isValid_2 = skipValidation || disableValidationOnSubmit ? true : await contextRef.current.validateForm();
    setIsValid(isValid_2);
    // If not valid, prevent submission
    if (!isValid_2) {
      errorToast(t('error:correctInvalidFields'));
      setProcessing(false);
      setSubmitted(true);
      setDisabled(false);
      return;
    }
    let overrides = {};
    if (typeof overridesFromArgs === 'function') {
      overrides = overridesFromArgs(contextRef.current.fields);
    } else if (typeof overridesFromArgs === 'object') {
      overrides = overridesFromArgs;
    }
    // If submit handler comes through via props, run that
    if (onSubmit) {
      const serializableFields_0 = deepCopyObjectSimpleWithoutReactComponents(contextRef.current.fields);
      const data_4 = reduceFieldsToValues(serializableFields_0, true);
      for (const [key, value] of Object.entries(overrides)) {
        data_4[key] = value;
      }
      onSubmit(serializableFields_0, data_4);
    }
    if (!hasFormSubmitAction) {
      // No action provided, so we should return. An example where this happens are lexical link drawers. Upon submitting the drawer, we
      // want to close it without submitting the form. Stuff like validation would be handled by lexical before this, through beforeSubmit
      setProcessing(false);
      setSubmitted(true);
      setDisabled(false);
      return;
    }
    const formData = await contextRef.current.createFormData(overrides, {
      mergeOverrideData: Boolean(typeof overridesFromArgs !== 'function')
    });
    try {
      let res;
      if (typeof actionArg === 'string') {
        res = await requests[methodToUse.toLowerCase()](actionArg, {
          body: formData,
          headers: {
            'Accept-Language': i18n.language
          }
        });
      } else if (typeof action === 'function') {
        res = await action(formData);
      }
      setModified(false);
      setDisabled(false);
      if (typeof handleResponse === 'function') {
        handleResponse(res, successToast, errorToast);
        return;
      }
      const contentType = res.headers.get('content-type');
      const isJSON = contentType && contentType.indexOf('application/json') !== -1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let json = {};
      if (isJSON) {
        json = await res.json();
      }
      if (res.status < 400) {
        if (typeof onSuccess === 'function') {
          const newFormState = await onSuccess(json);
          if (newFormState) {
            const {
              newState: mergedFormState
            } = mergeServerFormState({
              acceptValues: true,
              existingState: contextRef.current.fields || {},
              incomingState: newFormState
            });
            dispatchFields({
              type: 'REPLACE_STATE',
              optimize: false,
              state: mergedFormState
            });
          }
        }
        setSubmitted(false);
        setProcessing(false);
        if (redirect) {
          startRouteTransition(() => router.push(redirect));
        } else if (!disableSuccessStatus) {
          successToast(json.message || t('general:submissionSuccessful'));
        }
      } else {
        setProcessing(false);
        setSubmitted(true);
        contextRef.current = {
          ...contextRef.current
        } // triggers rerender of all components that subscribe to form
        ;
        if (json.message) {
          errorToast(json.message);
          return;
        }
        if (Array.isArray(json.errors)) {
          const [fieldErrors, nonFieldErrors] = json.errors.reduce(([fieldErrs, nonFieldErrs], err_0) => {
            const newFieldErrs = [];
            const newNonFieldErrs = [];
            if (err_0?.message) {
              newNonFieldErrs.push(err_0);
            }
            if (Array.isArray(err_0?.data?.errors)) {
              err_0.data?.errors.forEach(dataError => {
                if (dataError?.path) {
                  newFieldErrs.push(dataError);
                } else {
                  newNonFieldErrs.push(dataError);
                }
              });
            }
            return [[...fieldErrs, ...newFieldErrs], [...nonFieldErrs, ...newNonFieldErrs]];
          }, [[], []]);
          setIsValid(false);
          dispatchFields({
            type: 'ADD_SERVER_ERRORS',
            errors: fieldErrors
          });
          nonFieldErrors.forEach(err_1 => {
            errorToast(/*#__PURE__*/_jsx(FieldErrorsToast, {
              errorMessage: err_1.message || t('error:unknown')
            }));
          });
          return;
        }
        const message = errorMessages?.[res.status] || res?.statusText || t('error:unknown');
        errorToast(message);
      }
    } catch (err) {
      console.error('Error submitting form', err) // eslint-disable-line no-console
      ;
      setProcessing(false);
      setSubmitted(true);
      setDisabled(false);
      errorToast(err.message);
    }
  }, [beforeSubmit, startRouteTransition, action, disableSuccessStatus, disableValidationOnSubmit, disabled, dispatchFields, handleResponse, method, onSubmit, onSuccess, redirect, router, t, i18n, waitForAutocomplete]);
  const getFields = useCallback(() => contextRef.current.fields, []);
  const getField = useCallback(path_0 => contextRef.current.fields[path_0], []);
  const getData = useCallback(() => reduceFieldsToValues(contextRef.current.fields, true), []);
  const getSiblingData = useCallback(path_1 => getSiblingDataFunc(contextRef.current.fields, path_1), []);
  const getDataByPath = useCallback(path_2 => getDataByPathFunc(contextRef.current.fields, path_2), []);
  const createFormData = useCallback(async (overrides_0, {
    mergeOverrideData = true
  }) => {
    let data_5 = reduceFieldsToValues(contextRef.current.fields, true);
    let file = data_5?.file;
    if (file) {
      delete data_5.file;
    }
    if (mergeOverrideData) {
      data_5 = {
        ...data_5,
        ...overrides_0
      };
    } else {
      data_5 = overrides_0;
    }
    const handler = getUploadHandler({
      collectionSlug
    });
    if (file && typeof handler === 'function') {
      let filename = file.name;
      const clientUploadContext = await handler({
        file,
        updateFilename: value_0 => {
          filename = value_0;
        }
      });
      file = JSON.stringify({
        clientUploadContext,
        collectionSlug,
        filename,
        mimeType: file.type,
        size: file.size
      });
    }
    const dataToSerialize = {
      _payload: JSON.stringify(data_5),
      file
    };
    // nullAsUndefineds is important to allow uploads and relationship fields to clear themselves
    const formData_0 = serialize(dataToSerialize, {
      indices: true,
      nullsAsUndefineds: false
    });
    return formData_0;
  }, [collectionSlug, getUploadHandler]);
  const reset = useCallback(async data_6 => {
    const controller = handleAbortRef(abortResetFormRef);
    const docPreferences = await getDocPreferences();
    const {
      state: newState
    } = await getFormState({
      id,
      collectionSlug,
      data: data_6,
      docPermissions,
      docPreferences,
      globalSlug,
      locale,
      operation,
      renderAllFields: true,
      schemaPath: collectionSlug ? collectionSlug : globalSlug,
      signal: controller.signal,
      skipValidation: true
    });
    contextRef.current = {
      ...initContextState
    };
    setModified(false);
    dispatchFields({
      type: 'REPLACE_STATE',
      state: newState
    });
    abortResetFormRef.current = null;
  }, [collectionSlug, dispatchFields, globalSlug, id, operation, getFormState, docPermissions, getDocPreferences, locale]);
  const replaceState = useCallback(state => {
    contextRef.current = {
      ...initContextState
    };
    setModified(false);
    dispatchFields({
      type: 'REPLACE_STATE',
      state
    });
  }, [dispatchFields]);
  const addFieldRow = useCallback(({
    blockType,
    path: path_3,
    rowIndex: rowIndexArg,
    subFieldState
  }) => {
    const newRows = getDataByPath(path_3) || [];
    const rowIndex = rowIndexArg === undefined ? newRows.length : rowIndexArg;
    // dispatch ADD_ROW that sets requiresRender: true and adds a blank row to local form state.
    // This performs no form state request, as the debounced onChange effect will do that for us.
    dispatchFields({
      type: 'ADD_ROW',
      blockType,
      path: path_3,
      rowIndex,
      subFieldState
    });
    setModified(true);
  }, [dispatchFields, getDataByPath]);
  const removeFieldRow = useCallback(({
    path: path_4,
    rowIndex: rowIndex_0
  }) => {
    dispatchFields({
      type: 'REMOVE_ROW',
      path: path_4,
      rowIndex: rowIndex_0
    });
  }, [dispatchFields]);
  const replaceFieldRow = useCallback(({
    blockType: blockType_0,
    path: path_5,
    rowIndex: rowIndexArg_0,
    subFieldState: subFieldState_0
  }) => {
    const currentRows = getDataByPath(path_5);
    const rowIndex_1 = rowIndexArg_0 === undefined ? currentRows.length : rowIndexArg_0;
    dispatchFields({
      type: 'REPLACE_ROW',
      blockType: blockType_0,
      path: path_5,
      rowIndex: rowIndex_1,
      subFieldState: subFieldState_0
    });
    setModified(true);
  }, [dispatchFields, getDataByPath]);
  useEffect(() => {
    const abortOnChange = abortResetFormRef.current;
    return () => {
      abortAndIgnore(abortOnChange);
    };
  }, []);
  useEffect(() => {
    if (initializingFromProps !== undefined) {
      setInitializing(initializingFromProps);
    }
  }, [initializingFromProps]);
  contextRef.current.submit = submit;
  contextRef.current.getFields = getFields;
  contextRef.current.getField = getField;
  contextRef.current.getData = getData;
  contextRef.current.getSiblingData = getSiblingData;
  contextRef.current.getDataByPath = getDataByPath;
  contextRef.current.validateForm = validateForm;
  contextRef.current.createFormData = createFormData;
  contextRef.current.setModified = setModified;
  contextRef.current.setProcessing = setProcessing;
  contextRef.current.setBackgroundProcessing = setBackgroundProcessing;
  contextRef.current.setSubmitted = setSubmitted;
  contextRef.current.setIsValid = setIsValid;
  contextRef.current.disabled = disabled;
  contextRef.current.setDisabled = setDisabled;
  contextRef.current.formRef = formRef;
  contextRef.current.reset = reset;
  contextRef.current.replaceState = replaceState;
  contextRef.current.dispatchFields = dispatchFields;
  contextRef.current.addFieldRow = addFieldRow;
  contextRef.current.removeFieldRow = removeFieldRow;
  contextRef.current.replaceFieldRow = replaceFieldRow;
  contextRef.current.uuid = uuid;
  contextRef.current.initializing = initializing;
  contextRef.current.isValid = isValid;
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (typeof disabledFromProps === 'boolean') {
      setDisabled(disabledFromProps);
    }
  }, [disabledFromProps]);
  useEffect(() => {
    if (typeof submittedFromProps === 'boolean') {
      setSubmitted(submittedFromProps);
    }
  }, [submittedFromProps]);
  useEffect(() => {
    if (initialState) {
      contextRef.current = {
        ...initContextState
      };
      dispatchFields({
        type: 'REPLACE_STATE',
        optimize: false,
        sanitize: true,
        state: initialState
      });
    }
  }, [initialState, dispatchFields]);
  useThrottledEffect(() => {
    refreshCookie();
  }, 15000, [fields]);
  useEffect(() => {
    contextRef.current = {
      ...contextRef.current
    } // triggers rerender of all components that subscribe to form
    ;
    setModified(false);
  }, [locale]);
  const classes = [className, baseClass].filter(Boolean).join(' ');
  const executeOnChange = useEffectEvent(async (submitted_0, signal) => {
    if (Array.isArray(onChange)) {
      let revalidatedFormState_0 = contextRef.current.fields;
      for (const onChangeFn of onChange) {
        if (signal.aborted) {
          return;
        }
        // Edit view default onChange is in packages/ui/src/views/Edit/index.tsx. This onChange usually sends a form state request
        revalidatedFormState_0 = await onChangeFn({
          formState: deepCopyObjectSimpleWithoutReactComponents(contextRef.current.fields),
          submitted: submitted_0
        });
      }
      if (!revalidatedFormState_0) {
        return;
      }
      const {
        changed,
        newState: newState_0
      } = mergeServerFormState({
        existingState: contextRef.current.fields || {},
        incomingState: revalidatedFormState_0
      });
      if (changed && !signal.aborted) {
        prevFields.current = newState_0;
        dispatchFields({
          type: 'REPLACE_STATE',
          optimize: false,
          state: newState_0
        });
      }
    }
  });
  useDebouncedEffect(() => {
    if ((isFirstRenderRef.current || !dequal(fields, prevFields.current)) && modified) {
      queueTask(async signal_0 => executeOnChange(submitted, signal_0));
    }
    prevFields.current = fields;
    isFirstRenderRef.current = false;
  }, [modified, submitted, fields, queueTask], 250);
  const DocumentFormContextComponent = isDocumentForm ? DocumentFormContext : React.Fragment;
  const documentFormContextProps = isDocumentForm ? {
    value: contextRef.current
  } : {};
  const El = el || 'form';
  return /*#__PURE__*/_jsx(El, {
    action: typeof action === 'function' ? void action : action,
    className: classes,
    method: method,
    noValidate: true,
    onSubmit: e_0 => void contextRef.current.submit({}, e_0),
    ref: formRef,
    children: /*#__PURE__*/_jsx(DocumentFormContextComponent, {
      ...documentFormContextProps,
      children: /*#__PURE__*/_jsx(FormContext, {
        value: contextRef.current,
        children: /*#__PURE__*/_jsx(FormWatchContext, {
          value: {
            fields,
            ...contextRef.current
          },
          children: /*#__PURE__*/_jsx(SubmittedContext, {
            value: submitted,
            children: /*#__PURE__*/_jsx(InitializingContext, {
              value: !isMounted || isMounted && initializing,
              children: /*#__PURE__*/_jsx(ProcessingContext, {
                value: processing,
                children: /*#__PURE__*/_jsx(BackgroundProcessingContext, {
                  value: backgroundProcessing,
                  children: /*#__PURE__*/_jsx(ModifiedContext, {
                    value: modified,
                    children: /*#__PURE__*/_jsx(FormFieldsContext.Provider, {
                      value: fieldsReducer,
                      children: children
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
};
export { DocumentFormContext, FormContext, FormFieldsContext, FormWatchContext, ModifiedContext, ProcessingContext, SubmittedContext, useAllFormFields, useDocumentForm, useForm, useFormFields, useFormModified, useFormProcessing, useFormSubmitted, useWatchForm } from './context.js';
//# sourceMappingURL=index.js.map