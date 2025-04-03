'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import { fieldIsHiddenOrDisabled, fieldIsID } from 'payload/shared';
import React, { useId, useMemo } from 'react';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { PlusIcon } from '../../icons/Plus/index.js';
import { XIcon } from '../../icons/X/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useTableColumns } from '../../providers/TableColumns/index.js';
import { DraggableSortable } from '../DraggableSortable/index.js';
import { Pill } from '../Pill/index.js';
import './index.scss';
const baseClass = 'column-selector';
export const ColumnSelector = ({
  collectionSlug
}) => {
  const {
    columns,
    moveColumn,
    toggleColumn
  } = useTableColumns();
  const uuid = useId();
  const editDepth = useEditDepth();
  const filteredColumns = useMemo(() => columns.filter(col => !(fieldIsHiddenOrDisabled(col.field) && !fieldIsID(col.field)) && !col?.field?.admin?.disableListColumn), [columns]);
  if (!columns) {
    return null;
  }
  return /*#__PURE__*/_jsx(DraggableSortable, {
    className: baseClass,
    ids: filteredColumns.map(col_0 => col_0?.accessor),
    onDragEnd: ({
      moveFromIndex,
      moveToIndex
    }) => {
      void moveColumn({
        fromIndex: moveFromIndex,
        toIndex: moveToIndex
      });
    },
    children: filteredColumns.map((col_1, i) => {
      const {
        accessor,
        active,
        field
      } = col_1;
      return /*#__PURE__*/_jsx(Pill, {
        alignIcon: "left",
        "aria-checked": active,
        className: [`${baseClass}__column`, active && `${baseClass}__column--active`].filter(Boolean).join(' '),
        draggable: true,
        icon: active ? /*#__PURE__*/_jsx(XIcon, {}) : /*#__PURE__*/_jsx(PlusIcon, {}),
        id: accessor,
        onClick: () => {
          void toggleColumn(accessor);
        },
        children: col_1.CustomLabel ?? /*#__PURE__*/_jsx(FieldLabel, {
          label: field && 'label' in field && field.label,
          unstyled: true
        })
      }, `${collectionSlug}-${field && 'name' in field ? field?.name : i}${editDepth ? `-${editDepth}-` : ''}${uuid}`);
    })
  });
};
//# sourceMappingURL=index.js.map