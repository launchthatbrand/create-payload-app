'use client';

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { isImage } from 'payload/shared';
import * as qs from 'qs-esm';
import React from 'react';
import { toast } from 'sonner';
import { fieldReducer } from '../../../forms/Form/fieldReducer.js';
import { useConfig } from '../../../providers/Config/index.js';
import { useLocale } from '../../../providers/Locale/index.js';
import { useServerFunctions } from '../../../providers/ServerFunctions/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { useUploadHandlers } from '../../../providers/UploadHandlers/index.js';
import { hasSavePermission as getHasSavePermission } from '../../../utilities/hasSavePermission.js';
import { LoadingOverlay } from '../../Loading/index.js';
import { useLoadingOverlay } from '../../LoadingOverlay/index.js';
import { createThumbnail } from '../../Thumbnail/createThumbnail.js';
import { useBulkUpload } from '../index.js';
import { createFormData } from './createFormData.js';
import { formsManagementReducer } from './reducer.js';
const Context = /*#__PURE__*/React.createContext({
  activeIndex: 0,
  addFiles: () => Promise.resolve(),
  bulkUpdateForm: () => null,
  collectionSlug: '',
  docPermissions: undefined,
  documentSlots: {},
  forms: [],
  getFormDataRef: {
    current: () => ({})
  },
  hasPublishPermission: false,
  hasSavePermission: false,
  hasSubmitted: false,
  isInitializing: false,
  removeFile: () => {},
  saveAllDocs: () => Promise.resolve(),
  setActiveIndex: () => 0,
  setFormTotalErrorCount: () => {},
  thumbnailUrls: [],
  totalErrorCount: 0
});
const initialState = {
  activeIndex: 0,
  forms: [],
  totalErrorCount: 0
};
export function FormsManagerProvider({
  children
}) {
  const {
    config
  } = useConfig();
  const {
    routes: {
      api
    },
    serverURL
  } = config;
  const {
    code
  } = useLocale();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    getDocumentSlots,
    getFormState
  } = useServerFunctions();
  const {
    getUploadHandler
  } = useUploadHandlers();
  const [documentSlots, setDocumentSlots] = React.useState({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [docPermissions, setDocPermissions] = React.useState();
  const [hasSavePermission, setHasSavePermission] = React.useState(false);
  const [hasPublishPermission, setHasPublishPermission] = React.useState(false);
  const [hasInitializedState, setHasInitializedState] = React.useState(false);
  const [hasInitializedDocPermissions, setHasInitializedDocPermissions] = React.useState(false);
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [state, dispatch] = React.useReducer(formsManagementReducer, initialState);
  const {
    activeIndex,
    forms,
    totalErrorCount
  } = state;
  const formsRef = React.useRef(forms);
  formsRef.current = forms;
  const formsCount = forms.length;
  const thumbnailUrlsRef = React.useRef([]);
  const processedFiles = React.useRef(new Set()) // Track already-processed files
  ;
  const [renderedThumbnails, setRenderedThumbnails] = React.useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;
    (async () => {
      const newThumbnails = [...thumbnailUrlsRef.current];
      for (let i = 0; i < formsCount; i++) {
        const file = formsRef.current[i].formState.file.value;
        // Skip if already processed
        if (processedFiles.current.has(file) || !file || !isImage(file.type)) {
          continue;
        }
        processedFiles.current.add(file);
        // Generate thumbnail and update ref
        const thumbnailUrl = await createThumbnail(file);
        newThumbnails[i] = thumbnailUrl;
        thumbnailUrlsRef.current = newThumbnails;
        // Trigger re-render in batches
        setRenderedThumbnails([...newThumbnails]);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    })();
  }, [formsCount]);
  const {
    toggleLoadingOverlay
  } = useLoadingOverlay();
  const {
    closeModal
  } = useModal();
  const {
    collectionSlug,
    drawerSlug,
    initialFiles,
    onSuccess
  } = useBulkUpload();
  const [isUploading, setIsUploading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('');
  const hasInitializedWithFiles = React.useRef(false);
  const initialStateRef = React.useRef(null);
  const getFormDataRef = React.useRef(() => ({}));
  const actionURL = `${api}/${collectionSlug}`;
  const initializeSharedDocPermissions = React.useCallback(async () => {
    const params = {
      locale: code || undefined
    };
    const docAccessURL = `/${collectionSlug}/access`;
    const res = await fetch(`${serverURL}${api}${docAccessURL}?${qs.stringify(params)}`, {
      credentials: 'include',
      headers: {
        'Accept-Language': i18n.language,
        'Content-Type': 'application/json'
      },
      method: 'post'
    });
    const json = await res.json();
    const publishedAccessJSON = await fetch(`${serverURL}${api}${docAccessURL}?${qs.stringify(params)}`, {
      body: JSON.stringify({
        _status: 'published'
      }),
      credentials: 'include',
      headers: {
        'Accept-Language': i18n.language,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(res_0 => res_0.json());
    setDocPermissions(json);
    setHasSavePermission(getHasSavePermission({
      collectionSlug,
      docPermissions: json,
      isEditing: false
    }));
    setHasPublishPermission(publishedAccessJSON?.update);
    setHasInitializedDocPermissions(true);
  }, [api, code, collectionSlug, i18n.language, serverURL]);
  const initializeSharedFormState = React.useCallback(async abortController => {
    if (abortController?.signal) {
      abortController.abort('aborting previous fetch for initial form state without files');
    }
    // FETCH AND SET THE DOCUMENT SLOTS HERE!
    const documentSlots_0 = await getDocumentSlots({
      collectionSlug
    });
    setDocumentSlots(documentSlots_0);
    try {
      const {
        state: formStateWithoutFiles
      } = await getFormState({
        collectionSlug,
        docPermissions,
        docPreferences: {
          fields: {}
        },
        locale: code,
        operation: 'create',
        renderAllFields: true,
        schemaPath: collectionSlug,
        skipValidation: true
      });
      initialStateRef.current = formStateWithoutFiles;
      setHasInitializedState(true);
    } catch (_err) {
      // swallow error
    }
  }, [getDocumentSlots, collectionSlug, getFormState, docPermissions, code]);
  const setActiveIndex = React.useCallback(index => {
    const currentFormsData = getFormDataRef.current();
    dispatch({
      type: 'REPLACE',
      state: {
        activeIndex: index,
        forms: forms.map((form, i_0) => {
          if (i_0 === activeIndex) {
            return {
              errorCount: form.errorCount,
              formState: currentFormsData
            };
          }
          return form;
        })
      }
    });
  }, [forms, activeIndex]);
  const addFiles = React.useCallback(async files => {
    toggleLoadingOverlay({
      isLoading: true,
      key: 'addingDocs'
    });
    if (!hasInitializedState) {
      await initializeSharedFormState();
    }
    dispatch({
      type: 'ADD_FORMS',
      files,
      initialState: initialStateRef.current
    });
    toggleLoadingOverlay({
      isLoading: false,
      key: 'addingDocs'
    });
  }, [initializeSharedFormState, hasInitializedState, toggleLoadingOverlay]);
  const removeThumbnails = React.useCallback(indexes => {
    thumbnailUrlsRef.current = thumbnailUrlsRef.current.filter((_, i_1) => !indexes.includes(i_1));
    setRenderedThumbnails([...thumbnailUrlsRef.current]);
  }, []);
  const removeFile = React.useCallback(index_0 => {
    dispatch({
      type: 'REMOVE_FORM',
      index: index_0
    });
    removeThumbnails([index_0]);
  }, [removeThumbnails]);
  const setFormTotalErrorCount = React.useCallback(({
    errorCount,
    index: index_1
  }) => {
    dispatch({
      type: 'UPDATE_ERROR_COUNT',
      count: errorCount,
      index: index_1
    });
  }, []);
  const saveAllDocs = React.useCallback(async ({
    overrides
  } = {}) => {
    const currentFormsData_0 = getFormDataRef.current();
    const currentForms = [...forms];
    currentForms[activeIndex] = {
      errorCount: currentForms[activeIndex].errorCount,
      formState: currentFormsData_0
    };
    const newDocs = [];
    setIsUploading(true);
    for (let i_2 = 0; i_2 < currentForms.length; i_2++) {
      try {
        const form_0 = currentForms[i_2];
        setLoadingText(t('general:uploadingBulk', {
          current: i_2 + 1,
          total: currentForms.length
        }));
        const req = await fetch(actionURL, {
          body: await createFormData(form_0.formState, overrides, collectionSlug, getUploadHandler({
            collectionSlug
          })),
          method: 'POST'
        });
        const json_0 = await req.json();
        if (req.status === 201 && json_0?.doc) {
          newDocs.push(json_0.doc);
        }
        // should expose some sort of helper for this
        const [fieldErrors, nonFieldErrors] = (json_0?.errors || []).reduce(([fieldErrs, nonFieldErrs], err) => {
          const newFieldErrs = [];
          const newNonFieldErrs = [];
          if (err?.message) {
            newNonFieldErrs.push(err);
          }
          if (Array.isArray(err?.data?.errors)) {
            err.data?.errors.forEach(dataError => {
              if (dataError?.path) {
                newFieldErrs.push(dataError);
              } else {
                newNonFieldErrs.push(dataError);
              }
            });
          }
          return [[...fieldErrs, ...newFieldErrs], [...nonFieldErrs, ...newNonFieldErrs]];
        }, [[], []]);
        currentForms[i_2] = {
          errorCount: fieldErrors.length,
          formState: fieldReducer(currentForms[i_2].formState, {
            type: 'ADD_SERVER_ERRORS',
            errors: fieldErrors
          })
        };
        if (req.status === 413 || req.status === 400) {
          // file too large
          currentForms[i_2] = {
            ...currentForms[i_2],
            errorCount: currentForms[i_2].errorCount + 1
          };
          toast.error(nonFieldErrors[0]?.message);
        }
      } catch (__0) {
        // swallow
      }
    }
    setHasSubmitted(true);
    setLoadingText('');
    setIsUploading(false);
    const remainingForms = [];
    const thumbnailIndexesToRemove = [];
    currentForms.forEach(({
      errorCount: errorCount_0
    }, i_3) => {
      if (errorCount_0) {
        remainingForms.push(currentForms[i_3]);
      } else {
        thumbnailIndexesToRemove.push(i_3);
      }
    });
    const successCount = Math.max(0, currentForms.length - remainingForms.length);
    const errorCount_1 = currentForms.length - successCount;
    if (successCount) {
      toast.success(`Successfully saved ${successCount} files`);
      if (typeof onSuccess === 'function') {
        onSuccess(newDocs, errorCount_1);
      }
      if (remainingForms.length && thumbnailIndexesToRemove.length) {
        removeThumbnails(thumbnailIndexesToRemove);
      }
    }
    if (errorCount_1) {
      toast.error(`Failed to save ${errorCount_1} files`);
    } else {
      closeModal(drawerSlug);
    }
    dispatch({
      type: 'REPLACE',
      state: {
        activeIndex: 0,
        forms: remainingForms,
        totalErrorCount: remainingForms.reduce((acc, {
          errorCount: errorCount_2
        }) => acc + errorCount_2, 0)
      }
    });
  }, [actionURL, activeIndex, forms, removeThumbnails, onSuccess, collectionSlug, getUploadHandler, t, closeModal, drawerSlug]);
  const bulkUpdateForm = React.useCallback(async (updatedFields, afterStateUpdate) => {
    for (let i_4 = 0; i_4 < forms.length; i_4++) {
      Object.entries(updatedFields).forEach(([path, value]) => {
        if (forms[i_4].formState[path]) {
          forms[i_4].formState[path].value = value;
          dispatch({
            type: 'UPDATE_FORM',
            errorCount: forms[i_4].errorCount,
            formState: forms[i_4].formState,
            index: i_4
          });
        }
      });
      if (typeof afterStateUpdate === 'function') {
        afterStateUpdate();
      }
      if (hasSubmitted) {
        const {
          state: state_0
        } = await getFormState({
          collectionSlug,
          docPermissions,
          docPreferences: null,
          formState: forms[i_4].formState,
          operation: 'create',
          schemaPath: collectionSlug
        });
        const newFormErrorCount = Object.values(state_0).reduce((acc_0, value_0) => value_0?.valid === false ? acc_0 + 1 : acc_0, 0);
        dispatch({
          type: 'UPDATE_FORM',
          errorCount: newFormErrorCount,
          formState: state_0,
          index: i_4
        });
      }
    }
  }, [collectionSlug, docPermissions, forms, getFormState, hasSubmitted]);
  React.useEffect(() => {
    if (!collectionSlug) {
      return;
    }
    if (!hasInitializedState) {
      void initializeSharedFormState();
    }
    if (!hasInitializedDocPermissions) {
      void initializeSharedDocPermissions();
    }
    if (initialFiles) {
      if (!hasInitializedState || !hasInitializedDocPermissions) {
        setIsInitializing(true);
      } else {
        setIsInitializing(false);
      }
    }
    if (hasInitializedState && initialFiles && !hasInitializedWithFiles.current) {
      void addFiles(initialFiles);
      hasInitializedWithFiles.current = true;
    }
    return;
  }, [addFiles, initialFiles, initializeSharedFormState, initializeSharedDocPermissions, collectionSlug, hasInitializedState, hasInitializedDocPermissions]);
  return /*#__PURE__*/_jsxs(Context, {
    value: {
      activeIndex: state.activeIndex,
      addFiles,
      bulkUpdateForm,
      collectionSlug,
      docPermissions,
      documentSlots,
      forms,
      getFormDataRef,
      hasPublishPermission,
      hasSavePermission,
      hasSubmitted,
      isInitializing,
      removeFile,
      saveAllDocs,
      setActiveIndex,
      setFormTotalErrorCount,
      thumbnailUrls: renderedThumbnails,
      totalErrorCount
    },
    children: [isUploading && /*#__PURE__*/_jsx(LoadingOverlay, {
      animationDuration: "250ms",
      loadingText: loadingText,
      overlayType: "fullscreen",
      show: true
    }), children]
  });
}
export function useFormsManager() {
  return React.use(Context);
}
//# sourceMappingURL=index.js.map