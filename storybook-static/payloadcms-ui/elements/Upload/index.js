'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isImage } from 'payload/shared';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { FieldError } from '../../fields/FieldError/index.js';
import { fieldBaseClass } from '../../fields/shared/index.js';
import { useForm, useFormProcessing } from '../../forms/Form/index.js';
import { useField } from '../../forms/useField/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { EditDepthProvider } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { useUploadEdits } from '../../providers/UploadEdits/index.js';
import { Button } from '../Button/index.js';
import { Drawer, DrawerToggler } from '../Drawer/index.js';
import { Dropzone } from '../Dropzone/index.js';
import { EditUpload } from '../EditUpload/index.js';
import { FileDetails } from '../FileDetails/index.js';
import './index.scss';
import { PreviewSizes } from '../PreviewSizes/index.js';
import { Thumbnail } from '../Thumbnail/index.js';
const baseClass = 'file-field';
export const editDrawerSlug = 'edit-upload';
export const sizePreviewSlug = 'preview-sizes';
const validate = value => {
  if (!value && value !== undefined) {
    return 'A file is required.';
  }
  return true;
};
export const UploadActions = t0 => {
  const $ = _c(9);
  const {
    customActions,
    enableAdjustments,
    enablePreviewSizes,
    mimeType
  } = t0;
  const {
    t
  } = useTranslation();
  let t1;
  let t2;
  if ($[0] !== customActions || $[1] !== enableAdjustments || $[2] !== enablePreviewSizes || $[3] !== mimeType || $[4] !== t) {
    t2 = Symbol.for("react.early_return_sentinel");
    bb0: {
      const fileTypeIsAdjustable = isImage(mimeType) && mimeType !== "image/svg+xml" && mimeType !== "image/jxl";
      if (!fileTypeIsAdjustable && (!customActions || customActions.length === 0)) {
        t2 = null;
        break bb0;
      }
      let t3;
      if ($[7] !== customActions) {
        t3 = customActions && customActions.map(_temp);
        $[7] = customActions;
        $[8] = t3;
      } else {
        t3 = $[8];
      }
      t1 = _jsxs("div", {
        className: `${baseClass}__upload-actions`,
        children: [fileTypeIsAdjustable && _jsxs(React.Fragment, {
          children: [enablePreviewSizes && _jsx(DrawerToggler, {
            className: `${baseClass}__previewSizes`,
            slug: sizePreviewSlug,
            children: t("upload:previewSizes")
          }), enableAdjustments && _jsx(DrawerToggler, {
            className: `${baseClass}__edit`,
            slug: editDrawerSlug,
            children: t("upload:editImage")
          })]
        }), t3]
      });
    }
    $[0] = customActions;
    $[1] = enableAdjustments;
    $[2] = enablePreviewSizes;
    $[3] = mimeType;
    $[4] = t;
    $[5] = t1;
    $[6] = t2;
  } else {
    t1 = $[5];
    t2 = $[6];
  }
  if (t2 !== Symbol.for("react.early_return_sentinel")) {
    return t2;
  }
  return t1;
};
export const Upload = props => {
  const {
    collectionSlug,
    customActions,
    initialState,
    onChange,
    uploadConfig
  } = props;
  const {
    config: {
      routes: {
        api
      },
      serverURL
    }
  } = useConfig();
  const {
    t
  } = useTranslation();
  const {
    setModified
  } = useForm();
  const {
    resetUploadEdits,
    updateUploadEdits,
    uploadEdits
  } = useUploadEdits();
  const {
    id,
    docPermissions,
    savedDocumentData,
    setUploadStatus
  } = useDocumentInfo();
  const isFormSubmitting = useFormProcessing();
  const {
    errorMessage,
    setValue,
    showError,
    value
  } = useField({
    path: 'file',
    validate
  });
  const [fileSrc, setFileSrc] = useState(null);
  const [removedFile, setRemovedFile] = useState(false);
  const [filename, setFilename] = useState(value?.name || '');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const urlInputRef = useRef(null);
  const inputRef = useRef(null);
  const useServerSideFetch = typeof uploadConfig?.pasteURL === 'object' && uploadConfig.pasteURL.allowList?.length > 0;
  const handleFileChange = useCallback(newFile => {
    if (newFile instanceof File) {
      setFileSrc(URL.createObjectURL(newFile));
    }
    setValue(newFile);
    setShowUrlInput(false);
    if (typeof onChange === 'function') {
      onChange(newFile);
    }
  }, [onChange, setValue]);
  const renameFile = (fileToChange, newName) => {
    // Creating a new File object with updated properties
    const newFile_0 = new File([fileToChange], newName, {
      type: fileToChange.type,
      lastModified: fileToChange.lastModified
    });
    return newFile_0;
  };
  const handleFileNameChange = React.useCallback(e => {
    const updatedFileName = e.target.value;
    if (value) {
      handleFileChange(renameFile(value, updatedFileName));
      setFilename(updatedFileName);
    }
  }, [handleFileChange, value]);
  const handleFileSelection = useCallback(files => {
    const fileToUpload = files?.[0];
    handleFileChange(fileToUpload);
  }, [handleFileChange]);
  const handleFileRemoval = useCallback(() => {
    setRemovedFile(true);
    handleFileChange(null);
    setFileSrc('');
    setFileUrl('');
    resetUploadEdits();
    setShowUrlInput(false);
  }, [handleFileChange, resetUploadEdits]);
  const onEditsSave = useCallback(args => {
    setModified(true);
    updateUploadEdits(args);
  }, [setModified, updateUploadEdits]);
  const handleUrlSubmit = async () => {
    if (!fileUrl || uploadConfig?.pasteURL === false) {
      return;
    }
    setUploadStatus('uploading');
    try {
      // Attempt client-side fetch
      const clientResponse = await fetch(fileUrl);
      if (!clientResponse.ok) {
        throw new Error(`Fetch failed with status: ${clientResponse.status}`);
      }
      const blob = await clientResponse.blob();
      const fileName = decodeURIComponent(fileUrl.split('/').pop() || '');
      const file = new File([blob], fileName, {
        type: blob.type
      });
      handleFileChange(file);
      setUploadStatus('idle');
      return; // Exit if client-side fetch succeeds
    } catch (_clientError) {
      if (!useServerSideFetch) {
        // If server-side fetch is not enabled, show client-side error
        toast.error('Failed to fetch the file.');
        setUploadStatus('failed');
        return;
      }
    }
    // Attempt server-side fetch if client-side fetch fails and useServerSideFetch is true
    try {
      const pasteURL = `/${collectionSlug}/paste-url${id ? `/${id}?` : '?'}src=${encodeURIComponent(fileUrl)}`;
      const serverResponse = await fetch(`${serverURL}${api}${pasteURL}`);
      if (!serverResponse.ok) {
        throw new Error(`Fetch failed with status: ${serverResponse.status}`);
      }
      const blob_0 = await serverResponse.blob();
      const fileName_0 = decodeURIComponent(fileUrl.split('/').pop() || '');
      const file_0 = new File([blob_0], fileName_0, {
        type: blob_0.type
      });
      handleFileChange(file_0);
      setUploadStatus('idle');
    } catch (_serverError) {
      toast.error('The provided URL is not allowed.');
      setUploadStatus('failed');
    }
  };
  useEffect(() => {
    if (initialState?.file?.value instanceof File) {
      setFileSrc(URL.createObjectURL(initialState.file.value));
      setRemovedFile(false);
    }
  }, [initialState]);
  useEffect(() => {
    if (showUrlInput && urlInputRef.current) {
      // urlInputRef.current.focus() // Focus on the remote-url input field when showUrlInput is true
    }
  }, [showUrlInput]);
  useEffect(() => {
    if (isFormSubmitting) {
      setRemovedFile(false);
    }
  }, [isFormSubmitting]);
  const canRemoveUpload = docPermissions?.update && 'delete' in docPermissions && docPermissions?.delete;
  const hasImageSizes = uploadConfig?.imageSizes?.length > 0;
  const hasResizeOptions = Boolean(uploadConfig?.resizeOptions);
  // Explicity check if set to true, default is undefined
  const focalPointEnabled = uploadConfig?.focalPoint === true;
  const {
    crop: showCrop = true,
    focalPoint = true
  } = uploadConfig;
  const showFocalPoint = focalPoint && (hasImageSizes || hasResizeOptions || focalPointEnabled);
  const acceptMimeTypes = uploadConfig.mimeTypes?.join(', ');
  const imageCacheTag = uploadConfig?.cacheTags && savedDocumentData?.updatedAt;
  if (uploadConfig.hideFileInputOnCreate && !savedDocumentData?.filename) {
    return null;
  }
  return /*#__PURE__*/_jsxs("div", {
    className: [fieldBaseClass, baseClass].filter(Boolean).join(' '),
    children: [/*#__PURE__*/_jsx(FieldError, {
      message: errorMessage,
      showError: showError
    }), savedDocumentData && savedDocumentData.filename && !removedFile && /*#__PURE__*/_jsx(FileDetails, {
      collectionSlug: collectionSlug,
      customUploadActions: customActions,
      doc: savedDocumentData,
      enableAdjustments: showCrop || showFocalPoint,
      handleRemove: canRemoveUpload ? handleFileRemoval : undefined,
      hasImageSizes: hasImageSizes,
      hideRemoveFile: uploadConfig.hideRemoveFile,
      imageCacheTag: imageCacheTag,
      uploadConfig: uploadConfig
    }), (!uploadConfig.hideFileInputOnCreate && !savedDocumentData?.filename || removedFile) && /*#__PURE__*/_jsxs("div", {
      className: `${baseClass}__upload`,
      children: [!value && !showUrlInput && /*#__PURE__*/_jsx(Dropzone, {
        onChange: handleFileSelection,
        children: /*#__PURE__*/_jsxs("div", {
          className: `${baseClass}__dropzoneContent`,
          children: [/*#__PURE__*/_jsxs("div", {
            className: `${baseClass}__dropzoneButtons`,
            children: [/*#__PURE__*/_jsx(Button, {
              buttonStyle: "pill",
              onClick: () => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              },
              size: "small",
              children: t('upload:selectFile')
            }), /*#__PURE__*/_jsx("input", {
              accept: acceptMimeTypes,
              "aria-hidden": "true",
              className: `${baseClass}__hidden-input`,
              hidden: true,
              onChange: e_0 => {
                if (e_0.target.files && e_0.target.files.length > 0) {
                  handleFileSelection(e_0.target.files);
                }
              },
              ref: inputRef,
              type: "file"
            }), uploadConfig?.pasteURL !== false && /*#__PURE__*/_jsxs(Fragment, {
              children: [/*#__PURE__*/_jsx("span", {
                className: `${baseClass}__orText`,
                children: t('general:or')
              }), /*#__PURE__*/_jsx(Button, {
                buttonStyle: "pill",
                onClick: () => {
                  setShowUrlInput(true);
                },
                size: "small",
                children: t('upload:pasteURL')
              })]
            })]
          }), /*#__PURE__*/_jsxs("p", {
            className: `${baseClass}__dragAndDropText`,
            children: [t('general:or'), " ", t('upload:dragAndDrop')]
          })]
        })
      }), showUrlInput && /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: `${baseClass}__remote-file-wrap`,
          children: [/*#__PURE__*/_jsx("input", {
            className: `${baseClass}__remote-file`,
            onChange: e_1 => {
              setFileUrl(e_1.target.value);
            },
            ref: urlInputRef,
            type: "text",
            value: fileUrl
          }), /*#__PURE__*/_jsx("div", {
            className: `${baseClass}__add-file-wrap`,
            children: /*#__PURE__*/_jsx("button", {
              className: `${baseClass}__add-file`,
              onClick: () => {
                void handleUrlSubmit();
              },
              type: "button",
              children: t('upload:addFile')
            })
          })]
        }), /*#__PURE__*/_jsx(Button, {
          buttonStyle: "icon-label",
          className: `${baseClass}__remove`,
          icon: "x",
          iconStyle: "with-border",
          onClick: () => {
            setShowUrlInput(false);
          },
          round: true,
          tooltip: t('general:cancel')
        })]
      }), value && fileSrc && /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          className: `${baseClass}__thumbnail-wrap`,
          children: /*#__PURE__*/_jsx(Thumbnail, {
            collectionSlug: collectionSlug,
            fileSrc: isImage(value.type) ? fileSrc : null
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: `${baseClass}__file-adjustments`,
          children: [/*#__PURE__*/_jsx("input", {
            className: `${baseClass}__filename`,
            onChange: handleFileNameChange,
            type: "text",
            value: filename || value.name
          }), /*#__PURE__*/_jsx(UploadActions, {
            customActions: customActions,
            enableAdjustments: showCrop || showFocalPoint,
            enablePreviewSizes: hasImageSizes && savedDocumentData?.filename && !removedFile,
            mimeType: value.type
          })]
        }), /*#__PURE__*/_jsx(Button, {
          buttonStyle: "icon-label",
          className: `${baseClass}__remove`,
          icon: "x",
          iconStyle: "with-border",
          onClick: handleFileRemoval,
          round: true,
          tooltip: t('general:cancel')
        })]
      })]
    }), (value || savedDocumentData?.filename) && /*#__PURE__*/_jsx(EditDepthProvider, {
      children: /*#__PURE__*/_jsx(Drawer, {
        Header: null,
        slug: editDrawerSlug,
        children: /*#__PURE__*/_jsx(EditUpload, {
          fileName: value?.name || savedDocumentData?.filename,
          fileSrc: savedDocumentData?.url || fileSrc,
          imageCacheTag: imageCacheTag,
          initialCrop: uploadEdits?.crop ?? undefined,
          initialFocalPoint: {
            x: uploadEdits?.focalPoint?.x || savedDocumentData?.focalX || 50,
            y: uploadEdits?.focalPoint?.y || savedDocumentData?.focalY || 50
          },
          onSave: onEditsSave,
          showCrop: showCrop,
          showFocalPoint: showFocalPoint
        })
      })
    }), savedDocumentData && hasImageSizes && /*#__PURE__*/_jsx(Drawer, {
      className: `${baseClass}__previewDrawer`,
      hoverTitle: true,
      slug: sizePreviewSlug,
      title: t('upload:sizesFor', {
        label: savedDocumentData.filename
      }),
      children: /*#__PURE__*/_jsx(PreviewSizes, {
        doc: savedDocumentData,
        imageCacheTag: imageCacheTag,
        uploadConfig: uploadConfig
      })
    })]
  });
};
function _temp(CustomAction, i) {
  return _jsx(React.Fragment, {
    children: CustomAction
  }, i);
}
//# sourceMappingURL=index.js.map