'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import React, { useState } from 'react';
import { useAuth } from '../../providers/Auth/index.js';
import { EditDepthProvider } from '../../providers/EditDepth/index.js';
import { SelectAllStatus, useSelection } from '../../providers/Selection/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Drawer } from '../Drawer/index.js';
import { EditManyDrawerContent } from './DrawerContent.js';
import './index.scss';
export const baseClass = 'edit-many';
export const EditMany = props => {
  const $ = _c(10);
  const {
    collection: t0
  } = props;
  const {
    slug
  } = t0;
  const {
    permissions
  } = useAuth();
  const {
    openModal
  } = useModal();
  const {
    selectAll
  } = useSelection();
  const {
    t
  } = useTranslation();
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = [];
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const [selectedFields, setSelectedFields] = useState(t1);
  const collectionPermissions = permissions?.collections?.[slug];
  const drawerSlug = `edit-${slug}`;
  if (selectAll === SelectAllStatus.None || !collectionPermissions?.update) {
    return null;
  }
  let t2;
  if ($[1] !== drawerSlug || $[2] !== openModal || $[3] !== props.collection || $[4] !== selectedFields || $[5] !== t) {
    let t3;
    if ($[7] !== drawerSlug || $[8] !== openModal) {
      t3 = () => {
        openModal(drawerSlug);
        setSelectedFields([]);
      };
      $[7] = drawerSlug;
      $[8] = openModal;
      $[9] = t3;
    } else {
      t3 = $[9];
    }
    t2 = _jsxs("div", {
      className: baseClass,
      children: [_jsx("button", {
        "aria-label": t("general:edit"),
        className: `${baseClass}__toggle`,
        onClick: t3,
        type: "button",
        children: t("general:edit")
      }), _jsx(EditDepthProvider, {
        children: _jsx(Drawer, {
          Header: null,
          slug: drawerSlug,
          children: _jsx(EditManyDrawerContent, {
            collection: props.collection,
            drawerSlug,
            selectedFields,
            setSelectedFields
          })
        })
      })]
    });
    $[1] = drawerSlug;
    $[2] = openModal;
    $[3] = props.collection;
    $[4] = selectedFields;
    $[5] = t;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
};
//# sourceMappingURL=index.js.map