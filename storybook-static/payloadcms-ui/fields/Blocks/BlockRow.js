'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { Collapsible } from '../../elements/Collapsible/index.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { Pill } from '../../elements/Pill/index.js';
import { ShimmerEffect } from '../../elements/ShimmerEffect/index.js';
import { useFormSubmitted } from '../../forms/Form/context.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { RowLabel } from '../../forms/RowLabel/index.js';
import { useThrottledValue } from '../../hooks/useThrottledValue.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { RowActions } from './RowActions.js';
import { SectionTitle } from './SectionTitle/index.js';
const baseClass = 'blocks-field';
export const BlockRow = t0 => {
  const $ = _c(40);
  const {
    addRow,
    attributes,
    block,
    blocks,
    duplicateRow,
    errorCount,
    fields,
    hasMaxRows,
    isLoading: isLoadingFromProps,
    isSortable,
    Label,
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
    transform
  } = t0;
  const isLoading = useThrottledValue(isLoadingFromProps, 500);
  const {
    i18n
  } = useTranslation();
  const hasSubmitted = useFormSubmitted();
  const fieldHasErrors = hasSubmitted && errorCount > 0;
  const showBlockName = !block.admin?.disableBlockName;
  const t1 = fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`;
  let t2;
  if ($[0] !== t1) {
    t2 = [`${baseClass}__row`, t1].filter(Boolean);
    $[0] = t1;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const classNames = t2.join(" ");
  let blockPermissions;
  if (permissions === true) {
    blockPermissions = true;
  } else {
    const permissionsBlockSpecific = permissions?.blocks?.[block.slug];
    if (permissionsBlockSpecific === true) {
      blockPermissions = true;
    } else {
      blockPermissions = permissionsBlockSpecific?.fields;
    }
  }
  const t3 = `${parentPath?.split(".").join("-")}-row-${rowIndex}`;
  let t4;
  if ($[2] !== Label || $[3] !== addRow || $[4] !== attributes || $[5] !== block.fields || $[6] !== block.labels || $[7] !== blockPermissions || $[8] !== blocks || $[9] !== classNames || $[10] !== duplicateRow || $[11] !== errorCount || $[12] !== fieldHasErrors || $[13] !== fields || $[14] !== hasMaxRows || $[15] !== i18n || $[16] !== isLoading || $[17] !== isSortable || $[18] !== labels || $[19] !== listeners || $[20] !== moveRow || $[21] !== parentPath || $[22] !== path || $[23] !== readOnly || $[24] !== removeRow || $[25] !== row.blockType || $[26] !== row.collapsed || $[27] !== row.id || $[28] !== rowCount || $[29] !== rowIndex || $[30] !== schemaPath || $[31] !== setCollapse || $[32] !== setNodeRef || $[33] !== showBlockName || $[34] !== t3 || $[35] !== transform) {
    let t5;
    if ($[37] !== row.id || $[38] !== setCollapse) {
      t5 = collapsed => setCollapse(row.id, collapsed);
      $[37] = row.id;
      $[38] = setCollapse;
      $[39] = t5;
    } else {
      t5 = $[39];
    }
    t4 = _jsx("div", {
      id: t3,
      ref: setNodeRef,
      style: {
        transform
      },
      children: _jsx(Collapsible, {
        actions: !readOnly ? _jsx(RowActions, {
          addRow,
          blocks,
          blockType: row.blockType,
          duplicateRow,
          fields: block.fields,
          hasMaxRows,
          isSortable,
          labels,
          moveRow,
          removeRow,
          rowCount,
          rowIndex
        }) : undefined,
        className: classNames,
        collapsibleStyle: fieldHasErrors ? "error" : "default",
        dragHandleProps: isSortable ? {
          id: row.id,
          attributes,
          listeners
        } : undefined,
        header: isLoading ? _jsx(ShimmerEffect, {
          height: "1rem",
          width: "8rem"
        }) : _jsxs("div", {
          className: `${baseClass}__block-header`,
          children: [_jsx(RowLabel, {
            CustomComponent: Label,
            label: _jsxs(_Fragment, {
              children: [_jsx("span", {
                className: `${baseClass}__block-number`,
                children: String(rowIndex + 1).padStart(2, "0")
              }), _jsx(Pill, {
                className: `${baseClass}__block-pill ${baseClass}__block-pill-${row.blockType}`,
                pillStyle: "white",
                children: getTranslation(block.labels.singular, i18n)
              }), showBlockName && _jsx(SectionTitle, {
                path: `${path}.blockName`,
                readOnly
              })]
            }),
            path,
            rowNumber: rowIndex
          }), fieldHasErrors && _jsx(ErrorPill, {
            count: errorCount,
            i18n,
            withMessage: true
          })]
        }),
        isCollapsed: row.collapsed,
        onToggle: t5,
        children: isLoading ? _jsx(ShimmerEffect, {}) : _jsx(RenderFields, {
          className: `${baseClass}__fields`,
          fields,
          margins: "small",
          parentIndexPath: "",
          parentPath: path,
          parentSchemaPath: schemaPath,
          permissions: blockPermissions,
          readOnly
        })
      }, row.id)
    }, `${parentPath}-row-${rowIndex}`);
    $[2] = Label;
    $[3] = addRow;
    $[4] = attributes;
    $[5] = block.fields;
    $[6] = block.labels;
    $[7] = blockPermissions;
    $[8] = blocks;
    $[9] = classNames;
    $[10] = duplicateRow;
    $[11] = errorCount;
    $[12] = fieldHasErrors;
    $[13] = fields;
    $[14] = hasMaxRows;
    $[15] = i18n;
    $[16] = isLoading;
    $[17] = isSortable;
    $[18] = labels;
    $[19] = listeners;
    $[20] = moveRow;
    $[21] = parentPath;
    $[22] = path;
    $[23] = readOnly;
    $[24] = removeRow;
    $[25] = row.blockType;
    $[26] = row.collapsed;
    $[27] = row.id;
    $[28] = rowCount;
    $[29] = rowIndex;
    $[30] = schemaPath;
    $[31] = setCollapse;
    $[32] = setNodeRef;
    $[33] = showBlockName;
    $[34] = t3;
    $[35] = transform;
    $[36] = t4;
  } else {
    t4 = $[36];
  }
  return t4;
};
//# sourceMappingURL=BlockRow.js.map