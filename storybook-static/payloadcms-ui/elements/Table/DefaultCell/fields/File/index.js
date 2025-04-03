'use client';

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Thumbnail } from '../../../../Thumbnail/index.js';
import './index.scss';
const baseClass = 'file';
const targetThumbnailSizeMin = 40;
const targetThumbnailSizeMax = 180;
export const FileCell = ({
  cellData: filename,
  collectionConfig,
  field,
  rowData
}) => {
  const fieldPreviewAllowed = 'displayPreview' in field ? field.displayPreview : undefined;
  const previewAllowed = fieldPreviewAllowed ?? collectionConfig.upload?.displayPreview ?? true;
  if (previewAllowed) {
    let fileSrc = rowData?.thumbnailURL ?? rowData?.url;
    if (rowData?.url && !rowData?.thumbnailURL && typeof rowData?.mimeType === 'string' && rowData?.mimeType.startsWith('image') && rowData?.sizes) {
      const sizes = Object.values(rowData.sizes);
      const bestFit = sizes.reduce((closest, current) => {
        if (!current.width || current.width < targetThumbnailSizeMin) {
          return closest;
        }
        if (current.width >= targetThumbnailSizeMin && current.width <= targetThumbnailSizeMax) {
          return !closest.width || current.width < closest.width || closest.width < targetThumbnailSizeMin || closest.width > targetThumbnailSizeMax ? current : closest;
        }
        if (!closest.width || !closest.original && closest.width < targetThumbnailSizeMin && current.width > closest.width || closest.width > targetThumbnailSizeMax && current.width < closest.width) {
          return current;
        }
        return closest;
      }, {
        original: true,
        url: rowData?.url,
        width: rowData?.width
      });
      fileSrc = bestFit.url || fileSrc;
    }
    return /*#__PURE__*/_jsxs("div", {
      className: baseClass,
      children: [/*#__PURE__*/_jsx(Thumbnail, {
        className: `${baseClass}__thumbnail`,
        collectionSlug: collectionConfig?.slug,
        doc: {
          ...rowData,
          filename
        },
        fileSrc: fileSrc,
        size: "small",
        uploadConfig: collectionConfig?.upload
      }), /*#__PURE__*/_jsx("span", {
        className: `${baseClass}__filename`,
        children: String(filename)
      })]
    });
  } else {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: String(filename)
    });
  }
};
//# sourceMappingURL=index.js.map