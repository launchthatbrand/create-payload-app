'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { SelectAllStatus, useSelection } from '../../providers/Selection/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { DeleteMany } from '../DeleteMany/index.js';
import { EditMany } from '../EditMany/index.js';
import { PublishMany } from '../PublishMany/index.js';
import { UnpublishMany } from '../UnpublishMany/index.js';
import './index.scss';
const baseClass = 'list-selection';
export const ListSelection = t0 => {
  const $ = _c(10);
  const {
    collectionConfig,
    disableBulkDelete,
    disableBulkEdit,
    label
  } = t0;
  const {
    count,
    selectAll,
    toggleAll,
    totalDocs
  } = useSelection();
  const {
    t
  } = useTranslation();
  if (count === 0) {
    return null;
  }
  let t1;
  if ($[0] !== collectionConfig || $[1] !== count || $[2] !== disableBulkDelete || $[3] !== disableBulkEdit || $[4] !== label || $[5] !== selectAll || $[6] !== t || $[7] !== toggleAll || $[8] !== totalDocs) {
    t1 = _jsxs("div", {
      className: baseClass,
      children: [_jsx("span", {
        children: t("general:selectedCount", {
          count,
          label: ""
        })
      }), selectAll !== SelectAllStatus.AllAvailable && count < totalDocs && _jsx("button", {
        "aria-label": t("general:selectAll", {
          count,
          label
        }),
        className: `${baseClass}__button`,
        id: "select-all-across-pages",
        onClick: () => toggleAll(true),
        type: "button",
        children: t("general:selectAll", {
          count: totalDocs,
          label: ""
        })
      }), !disableBulkEdit && !disableBulkDelete && _jsx("span", {
        children: "\u2014"
      }), !disableBulkEdit && _jsxs(Fragment, {
        children: [_jsx(EditMany, {
          collection: collectionConfig
        }), _jsx(PublishMany, {
          collection: collectionConfig
        }), _jsx(UnpublishMany, {
          collection: collectionConfig
        })]
      }), !disableBulkDelete && _jsx(DeleteMany, {
        collection: collectionConfig
      })]
    });
    $[0] = collectionConfig;
    $[1] = count;
    $[2] = disableBulkDelete;
    $[3] = disableBulkEdit;
    $[4] = label;
    $[5] = selectAll;
    $[6] = t;
    $[7] = toggleAll;
    $[8] = totalDocs;
    $[9] = t1;
  } else {
    t1 = $[9];
  }
  return t1;
};
//# sourceMappingURL=index.js.map