'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { validateMimeType } from 'payload/shared';
import React from 'react';
import { toast } from 'sonner';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Drawer, useDrawerDepth } from '../Drawer/index.js';
import { AddFilesView } from './AddFilesView/index.js';
import { AddingFilesView } from './AddingFilesView/index.js';
import { FormsManagerProvider, useFormsManager } from './FormsManager/index.js';
const drawerSlug = 'bulk-upload-drawer-slug';
function DrawerContent() {
  const {
    addFiles,
    forms,
    isInitializing
  } = useFormsManager();
  const {
    closeModal
  } = useModal();
  const {
    collectionSlug,
    drawerSlug
  } = useBulkUpload();
  const {
    getEntityConfig
  } = useConfig();
  const {
    t
  } = useTranslation();
  const uploadCollection = getEntityConfig({
    collectionSlug
  });
  const uploadConfig = uploadCollection?.upload;
  const uploadMimeTypes = uploadConfig?.mimeTypes;
  const onDrop = React.useCallback(acceptedFiles => {
    const fileTransfer = new DataTransfer();
    for (const candidateFile of acceptedFiles) {
      if (uploadMimeTypes === undefined || uploadMimeTypes.length === 0 || validateMimeType(candidateFile.type, uploadMimeTypes)) {
        fileTransfer.items.add(candidateFile);
      }
    }
    if (fileTransfer.files.length === 0) {
      toast.error(t('error:invalidFileType'));
    } else {
      void addFiles(fileTransfer.files);
    }
  }, [addFiles, t, uploadMimeTypes]);
  if (!collectionSlug) {
    return null;
  }
  if (!forms.length && !isInitializing) {
    return /*#__PURE__*/_jsx(AddFilesView, {
      acceptMimeTypes: uploadMimeTypes?.join(', '),
      onCancel: () => closeModal(drawerSlug),
      onDrop: onDrop
    });
  } else {
    return /*#__PURE__*/_jsx(AddingFilesView, {});
  }
}
export function BulkUploadDrawer() {
  const $ = _c(2);
  const {
    drawerSlug
  } = useBulkUpload();
  let t0;
  if ($[0] !== drawerSlug) {
    t0 = _jsx(Drawer, {
      gutter: false,
      Header: null,
      slug: drawerSlug,
      children: _jsx(FormsManagerProvider, {
        children: _jsx(DrawerContent, {})
      })
    });
    $[0] = drawerSlug;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}
const Context = /*#__PURE__*/React.createContext({
  collectionSlug: '',
  currentActivePath: undefined,
  drawerSlug: '',
  initialFiles: undefined,
  maxFiles: undefined,
  onCancel: () => null,
  onSuccess: () => null,
  setCollectionSlug: () => null,
  setCurrentActivePath: () => null,
  setInitialFiles: () => null,
  setMaxFiles: () => null,
  setOnCancel: () => null,
  setOnSuccess: () => null
});
export function BulkUploadProvider(t0) {
  const $ = _c(16);
  const {
    children
  } = t0;
  const [collection, setCollection] = React.useState();
  const [onSuccessFunctionMap, setOnSuccessFunctionMap] = React.useState();
  const [onCancelFunction, setOnCancelFunction] = React.useState();
  const [initialFiles, setInitialFiles] = React.useState(undefined);
  const [maxFiles, setMaxFiles] = React.useState(undefined);
  const [currentActivePath, setCurrentActivePath] = React.useState(undefined);
  const drawerSlug = useBulkUploadDrawerSlug();
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = slug => {
      setCollection(slug);
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const setCollectionSlug = t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = (path, onSuccess) => {
      setOnSuccessFunctionMap(prev => ({
        ...prev,
        [path]: onSuccess
      }));
    };
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const setOnSuccess = t2;
  let t3;
  if ($[2] !== onCancelFunction) {
    t3 = () => {
      if (typeof onCancelFunction === "function") {
        onCancelFunction();
      }
    };
    $[2] = onCancelFunction;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  let t4;
  if ($[4] !== currentActivePath || $[5] !== onSuccessFunctionMap) {
    t4 = (docIDs, errorCount) => {
      if (onSuccessFunctionMap && Object.hasOwn(onSuccessFunctionMap, currentActivePath)) {
        const onSuccessFunction = onSuccessFunctionMap[currentActivePath];
        onSuccessFunction(docIDs, errorCount);
      }
    };
    $[4] = currentActivePath;
    $[5] = onSuccessFunctionMap;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== children || $[8] !== collection || $[9] !== currentActivePath || $[10] !== drawerSlug || $[11] !== initialFiles || $[12] !== maxFiles || $[13] !== t3 || $[14] !== t4) {
    t5 = _jsx(Context, {
      value: {
        collectionSlug: collection,
        currentActivePath,
        drawerSlug,
        initialFiles,
        maxFiles,
        onCancel: t3,
        onSuccess: t4,
        setCollectionSlug,
        setCurrentActivePath,
        setInitialFiles,
        setMaxFiles,
        setOnCancel: setOnCancelFunction,
        setOnSuccess
      },
      children: _jsxs(React.Fragment, {
        children: [children, _jsx(BulkUploadDrawer, {})]
      })
    });
    $[7] = children;
    $[8] = collection;
    $[9] = currentActivePath;
    $[10] = drawerSlug;
    $[11] = initialFiles;
    $[12] = maxFiles;
    $[13] = t3;
    $[14] = t4;
    $[15] = t5;
  } else {
    t5 = $[15];
  }
  return t5;
}
export const useBulkUpload = () => React.use(Context);
export function useBulkUploadDrawerSlug() {
  const depth = useDrawerDepth();
  return `${drawerSlug}-${depth || 1}`;
}
//# sourceMappingURL=index.js.map