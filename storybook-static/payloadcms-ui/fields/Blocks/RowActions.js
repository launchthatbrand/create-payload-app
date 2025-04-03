'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import React from 'react';
import { ArrayAction } from '../../elements/ArrayAction/index.js';
import { useDrawerSlug } from '../../elements/Drawer/useDrawerSlug.js';
import { BlocksDrawer } from './BlocksDrawer/index.js';
export const RowActions = props => {
  const $ = _c(26);
  const {
    addRow,
    blocks,
    blockType,
    duplicateRow,
    hasMaxRows,
    isSortable,
    labels,
    moveRow,
    removeRow,
    rowCount,
    rowIndex
  } = props;
  const {
    closeModal,
    openModal
  } = useModal();
  const drawerSlug = useDrawerSlug("blocks-drawer");
  const [indexToAdd, setIndexToAdd] = React.useState(null);
  let t0;
  if ($[0] !== addRow || $[1] !== closeModal || $[2] !== drawerSlug || $[3] !== indexToAdd) {
    t0 = (_, rowBlockType) => {
      if (typeof addRow === "function") {
        addRow(indexToAdd, rowBlockType);
      }
      closeModal(drawerSlug);
    };
    $[0] = addRow;
    $[1] = closeModal;
    $[2] = drawerSlug;
    $[3] = indexToAdd;
    $[4] = t0;
  } else {
    t0 = $[4];
  }
  let t1;
  if ($[5] !== blockType || $[6] !== blocks || $[7] !== drawerSlug || $[8] !== duplicateRow || $[9] !== hasMaxRows || $[10] !== isSortable || $[11] !== labels || $[12] !== moveRow || $[13] !== openModal || $[14] !== removeRow || $[15] !== rowCount || $[16] !== rowIndex || $[17] !== t0) {
    let t2;
    if ($[19] !== drawerSlug || $[20] !== openModal) {
      t2 = index => {
        setIndexToAdd(index);
        openModal(drawerSlug);
      };
      $[19] = drawerSlug;
      $[20] = openModal;
      $[21] = t2;
    } else {
      t2 = $[21];
    }
    let t3;
    if ($[22] !== blockType || $[23] !== duplicateRow || $[24] !== rowIndex) {
      t3 = () => duplicateRow(rowIndex, blockType);
      $[22] = blockType;
      $[23] = duplicateRow;
      $[24] = rowIndex;
      $[25] = t3;
    } else {
      t3 = $[25];
    }
    t1 = _jsxs(React.Fragment, {
      children: [_jsx(BlocksDrawer, {
        addRow: t0,
        addRowIndex: rowIndex,
        blocks,
        drawerSlug,
        labels
      }), _jsx(ArrayAction, {
        addRow: t2,
        duplicateRow: t3,
        hasMaxRows,
        index: rowIndex,
        isSortable,
        moveRow,
        removeRow,
        rowCount
      })]
    });
    $[5] = blockType;
    $[6] = blocks;
    $[7] = drawerSlug;
    $[8] = duplicateRow;
    $[9] = hasMaxRows;
    $[10] = isSortable;
    $[11] = labels;
    $[12] = moveRow;
    $[13] = openModal;
    $[14] = removeRow;
    $[15] = rowCount;
    $[16] = rowIndex;
    $[17] = t0;
    $[18] = t1;
  } else {
    t1 = $[18];
  }
  return t1;
};
//# sourceMappingURL=RowActions.js.map