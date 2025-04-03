'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { ArrayAction } from '../../elements/ArrayAction/index.js';
import { Collapsible } from '../../elements/Collapsible/index.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { ShimmerEffect } from '../../elements/ShimmerEffect/index.js';
import { useFormSubmitted } from '../../forms/Form/context.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { RowLabel } from '../../forms/RowLabel/index.js';
import { useThrottledValue } from '../../hooks/useThrottledValue.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'array-field';
export const ArrayRow = t0 => {
  const $ = _c(42);
  const {
    addRow,
    attributes,
    CustomRowLabel,
    duplicateRow,
    errorCount,
    fields,
    forceRender: t1,
    hasMaxRows,
    isDragging,
    isLoading: isLoadingFromProps,
    isSortable,
    labels,
    listeners,
    moveRow,
    parentPath,
    path,
    permissions,
    readOnly,
    removeRow,
    row,
    rowCount,
    rowIndex,
    schemaPath,
    setCollapse,
    setNodeRef,
    transform,
    transition
  } = t0;
  const forceRender = t1 === undefined ? false : t1;
  const isLoading = useThrottledValue(isLoadingFromProps, 500);
  const {
    i18n
  } = useTranslation();
  const hasSubmitted = useFormSubmitted();
  const fallbackLabel = `${getTranslation(labels.singular, i18n)} ${String(rowIndex + 1).padStart(2, "0")}`;
  const fieldHasErrors = errorCount > 0 && hasSubmitted;
  const t2 = fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`;
  let t3;
  if ($[0] !== t2) {
    t3 = [`${baseClass}__row`, t2].filter(Boolean);
    $[0] = t2;
    $[1] = t3;
  } else {
    t3 = $[1];
  }
  const classNames = t3.join(" ");
  const t4 = `${parentPath.split(".").join("-")}-row-${rowIndex}`;
  const t5 = isDragging ? 1 : undefined;
  let t6;
  if ($[2] !== CustomRowLabel || $[3] !== addRow || $[4] !== attributes || $[5] !== classNames || $[6] !== duplicateRow || $[7] !== errorCount || $[8] !== fallbackLabel || $[9] !== fieldHasErrors || $[10] !== fields || $[11] !== forceRender || $[12] !== hasMaxRows || $[13] !== i18n || $[14] !== isLoading || $[15] !== isSortable || $[16] !== listeners || $[17] !== moveRow || $[18] !== parentPath || $[19] !== path || $[20] !== permissions || $[21] !== readOnly || $[22] !== removeRow || $[23] !== row.collapsed || $[24] !== row.id || $[25] !== rowCount || $[26] !== rowIndex || $[27] !== schemaPath || $[28] !== setCollapse || $[29] !== setNodeRef || $[30] !== t4 || $[31] !== t5 || $[32] !== transform || $[33] !== transition) {
    let t7;
    if ($[35] !== errorCount || $[36] !== fieldHasErrors || $[37] !== i18n) {
      t7 = fieldHasErrors && _jsx(ErrorPill, {
        count: errorCount,
        i18n,
        withMessage: true
      });
      $[35] = errorCount;
      $[36] = fieldHasErrors;
      $[37] = i18n;
      $[38] = t7;
    } else {
      t7 = $[38];
    }
    let t8;
    if ($[39] !== row.id || $[40] !== setCollapse) {
      t8 = collapsed => setCollapse(row.id, collapsed);
      $[39] = row.id;
      $[40] = setCollapse;
      $[41] = t8;
    } else {
      t8 = $[41];
    }
    t6 = _jsx("div", {
      id: t4,
      ref: setNodeRef,
      style: {
        transform,
        transition,
        zIndex: t5
      },
      children: _jsx(Collapsible, {
        actions: !readOnly ? _jsx(ArrayAction, {
          addRow,
          duplicateRow,
          hasMaxRows,
          index: rowIndex,
          isSortable,
          moveRow,
          removeRow,
          rowCount
        }) : undefined,
        className: classNames,
        collapsibleStyle: fieldHasErrors ? "error" : "default",
        dragHandleProps: isSortable ? {
          id: row.id,
          attributes,
          listeners
        } : undefined,
        header: _jsxs("div", {
          className: `${baseClass}__row-header`,
          children: [isLoading ? _jsx(ShimmerEffect, {
            height: "1rem",
            width: "8rem"
          }) : _jsx(RowLabel, {
            CustomComponent: CustomRowLabel,
            label: fallbackLabel,
            path,
            rowNumber: rowIndex
          }), t7]
        }),
        isCollapsed: row.collapsed,
        onToggle: t8,
        children: isLoading ? _jsx(ShimmerEffect, {}) : _jsx(RenderFields, {
          className: `${baseClass}__fields`,
          fields,
          forceRender,
          margins: "small",
          parentIndexPath: "",
          parentPath: path,
          parentSchemaPath: schemaPath,
          permissions: permissions === true ? permissions : permissions?.fields,
          readOnly
        })
      })
    }, `${parentPath}-row-${row.id}`);
    $[2] = CustomRowLabel;
    $[3] = addRow;
    $[4] = attributes;
    $[5] = classNames;
    $[6] = duplicateRow;
    $[7] = errorCount;
    $[8] = fallbackLabel;
    $[9] = fieldHasErrors;
    $[10] = fields;
    $[11] = forceRender;
    $[12] = hasMaxRows;
    $[13] = i18n;
    $[14] = isLoading;
    $[15] = isSortable;
    $[16] = listeners;
    $[17] = moveRow;
    $[18] = parentPath;
    $[19] = path;
    $[20] = permissions;
    $[21] = readOnly;
    $[22] = removeRow;
    $[23] = row.collapsed;
    $[24] = row.id;
    $[25] = rowCount;
    $[26] = rowIndex;
    $[27] = schemaPath;
    $[28] = setCollapse;
    $[29] = setNodeRef;
    $[30] = t4;
    $[31] = t5;
    $[32] = transform;
    $[33] = transition;
    $[34] = t6;
  } else {
    t6 = $[34];
  }
  return t6;
};
//# sourceMappingURL=ArrayRow.js.map