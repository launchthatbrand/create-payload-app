'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { PlusIcon } from '../../icons/Plus/index.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import { useDocumentDrawer } from '../DocumentDrawer/index.js';
import { Popup } from '../Popup/index.js';
import * as PopupList from '../Popup/PopupButtonList/index.js';
import { Tooltip } from '../Tooltip/index.js';
import './index.scss';
import { useRelatedCollections } from './useRelatedCollections.js';
const baseClass = 'relationship-add-new';
export const AddNewRelation = t0 => {
  const $ = _c(46);
  const {
    Button: ButtonFromProps,
    hasMany,
    path,
    relationTo,
    setValue,
    unstyled,
    value
  } = t0;
  const relatedCollections = useRelatedCollections(relationTo);
  const {
    permissions
  } = useAuth();
  const [show, setShow] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();
  const relatedToMany = relatedCollections.length > 1;
  let t1;
  if ($[0] !== relatedCollections || $[1] !== relatedToMany) {
    t1 = () => !relatedToMany ? relatedCollections[0] : undefined;
    $[0] = relatedCollections;
    $[1] = relatedToMany;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const [collectionConfig, setCollectionConfig] = useState(t1);
  const [popupOpen, setPopupOpen] = useState(false);
  const {
    i18n,
    t
  } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const t2 = collectionConfig?.slug;
  let t3;
  if ($[3] !== t2) {
    t3 = {
      collectionSlug: t2
    };
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  const [DocumentDrawer, DocumentDrawerToggler, t4] = useDocumentDrawer(t3);
  const {
    isDrawerOpen,
    toggleDrawer
  } = t4;
  let t5;
  if ($[5] !== collectionConfig?.slug || $[6] !== hasMany || $[7] !== relationTo || $[8] !== setValue || $[9] !== value) {
    t5 = t6 => {
      const {
        doc,
        operation
      } = t6;
      if (operation === "create") {
        const newValue = Array.isArray(relationTo) ? {
          relationTo: collectionConfig?.slug,
          value: doc.id
        } : doc.id;
        const isNewValue = Array.isArray(relationTo) && Array.isArray(value) ? !value.some(v => v && typeof v === "object" && v.value === doc.id) : value !== doc.id;
        if (isNewValue) {
          if (hasMany) {
            setValue([...(Array.isArray(value) ? value : []), newValue]);
          } else {
            setValue(newValue);
          }
        }
        setSelectedCollection(undefined);
      }
    };
    $[5] = collectionConfig?.slug;
    $[6] = hasMany;
    $[7] = relationTo;
    $[8] = setValue;
    $[9] = value;
    $[10] = t5;
  } else {
    t5 = $[10];
  }
  const onSave = t5;
  let t6;
  if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = state => {
      setPopupOpen(state);
    };
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  const onPopupToggle = t6;
  let t7;
  let t8;
  if ($[12] !== permissions || $[13] !== relatedCollections) {
    t7 = () => {
      if (permissions) {
        if (relatedCollections.length === 1) {
          setShow(permissions.collections[relatedCollections[0]?.slug]?.create);
        } else {
          setShow(relatedCollections.some(collection => permissions.collections[collection?.slug]?.create));
        }
      }
    };
    t8 = [permissions, relatedCollections];
    $[12] = permissions;
    $[13] = relatedCollections;
    $[14] = t7;
    $[15] = t8;
  } else {
    t7 = $[14];
    t8 = $[15];
  }
  useEffect(t7, t8);
  let t10;
  let t9;
  if ($[16] !== relatedCollections || $[17] !== relatedToMany || $[18] !== selectedCollection) {
    t9 = () => {
      if (relatedToMany && selectedCollection) {
        setCollectionConfig(relatedCollections.find(collection_0 => collection_0?.slug === selectedCollection));
      }
    };
    t10 = [selectedCollection, relatedToMany, relatedCollections];
    $[16] = relatedCollections;
    $[17] = relatedToMany;
    $[18] = selectedCollection;
    $[19] = t10;
    $[20] = t9;
  } else {
    t10 = $[19];
    t9 = $[20];
  }
  useEffect(t9, t10);
  let t11;
  let t12;
  if ($[21] !== collectionConfig || $[22] !== relatedToMany || $[23] !== toggleDrawer) {
    t11 = () => {
      if (relatedToMany && collectionConfig) {
        toggleDrawer();
        setSelectedCollection(undefined);
      }
    };
    t12 = [toggleDrawer, relatedToMany, collectionConfig];
    $[21] = collectionConfig;
    $[22] = relatedToMany;
    $[23] = toggleDrawer;
    $[24] = t11;
    $[25] = t12;
  } else {
    t11 = $[24];
    t12 = $[25];
  }
  useEffect(t11, t12);
  let t13;
  let t14;
  if ($[26] !== isDrawerOpen || $[27] !== relatedToMany) {
    t13 = () => {
      if (relatedToMany && !isDrawerOpen) {
        setCollectionConfig(undefined);
      }
    };
    t14 = [isDrawerOpen, relatedToMany];
    $[26] = isDrawerOpen;
    $[27] = relatedToMany;
    $[28] = t13;
    $[29] = t14;
  } else {
    t13 = $[28];
    t14 = $[29];
  }
  useEffect(t13, t14);
  const t15 = relatedCollections[0];
  const t16 = t15.labels.singular;
  let t17;
  if ($[30] !== ButtonFromProps || $[31] !== DocumentDrawer || $[32] !== DocumentDrawerToggler || $[33] !== collectionConfig || $[34] !== i18n || $[35] !== onSave || $[36] !== path || $[37] !== permissions || $[38] !== popupOpen || $[39] !== relatedCollections || $[40] !== show || $[41] !== showTooltip || $[42] !== t || $[43] !== t15.labels.singular || $[44] !== unstyled) {
    t17 = Symbol.for("react.early_return_sentinel");
    bb0: {
      const label = t("fields:addNewLabel", {
        label: getTranslation(t16, i18n)
      });
      if (show) {
        t17 = _jsxs("div", {
          className: baseClass,
          id: `${path}-add-new`,
          children: [relatedCollections.length === 1 && _jsxs(Fragment, {
            children: [_jsx(DocumentDrawerToggler, {
              className: [`${baseClass}__add-button`, unstyled && `${baseClass}__add-button--unstyled`].filter(Boolean).join(" "),
              onClick: () => setShowTooltip(false),
              onMouseEnter: () => setShowTooltip(true),
              onMouseLeave: () => setShowTooltip(false),
              children: ButtonFromProps ? ButtonFromProps : _jsxs(Fragment, {
                children: [_jsx(Tooltip, {
                  className: `${baseClass}__tooltip`,
                  show: showTooltip,
                  children: label
                }), _jsx(PlusIcon, {})]
              })
            }), _jsx(DocumentDrawer, {
              onSave
            })]
          }), relatedCollections.length > 1 && _jsxs(Fragment, {
            children: [_jsx(Popup, {
              button: ButtonFromProps ? ButtonFromProps : _jsx(Button, {
                buttonStyle: "none",
                className: `${baseClass}__add-button`,
                tooltip: popupOpen ? undefined : t("fields:addNew"),
                children: _jsx(PlusIcon, {})
              }),
              buttonType: "custom",
              horizontalAlign: "center",
              onToggleOpen: onPopupToggle,
              render: t18 => {
                const {
                  close: closePopup
                } = t18;
                return _jsx(PopupList.ButtonGroup, {
                  children: relatedCollections.map(relatedCollection => {
                    if (permissions.collections[relatedCollection?.slug].create) {
                      return _jsx(PopupList.Button, {
                        className: `${baseClass}__relation-button--${relatedCollection?.slug}`,
                        onClick: () => {
                          closePopup();
                          setSelectedCollection(relatedCollection?.slug);
                        },
                        children: getTranslation(relatedCollection?.labels?.singular, i18n)
                      }, relatedCollection?.slug);
                    }
                    return null;
                  })
                });
              },
              size: "medium"
            }), collectionConfig && permissions.collections[collectionConfig?.slug]?.create && _jsx(DocumentDrawer, {
              onSave
            })]
          })]
        });
        break bb0;
      }
    }
    $[30] = ButtonFromProps;
    $[31] = DocumentDrawer;
    $[32] = DocumentDrawerToggler;
    $[33] = collectionConfig;
    $[34] = i18n;
    $[35] = onSave;
    $[36] = path;
    $[37] = permissions;
    $[38] = popupOpen;
    $[39] = relatedCollections;
    $[40] = show;
    $[41] = showTooltip;
    $[42] = t;
    $[43] = t15.labels.singular;
    $[44] = unstyled;
    $[45] = t17;
  } else {
    t17 = $[45];
  }
  if (t17 !== Symbol.for("react.early_return_sentinel")) {
    return t17;
  }
  return null;
};
//# sourceMappingURL=index.js.map