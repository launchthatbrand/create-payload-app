'use client';

import { c as _c } from "react/compiler-runtime";
import { getTranslation } from '@payloadcms/translations';
import { formatAdminURL } from 'payload/shared';
import { useEffect } from 'react';
import { useStepNav } from '../../../elements/StepNav/index.js';
import { useConfig } from '../../../providers/Config/index.js';
import { useDocumentInfo } from '../../../providers/DocumentInfo/index.js';
import { useEntityVisibility } from '../../../providers/EntityVisibility/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
export const SetDocumentStepNav = props => {
  const $ = _c(20);
  const {
    id,
    collectionSlug,
    globalSlug,
    pluralLabel,
    useAsTitle
  } = props;
  const view = props?.view || undefined;
  const {
    isEditing,
    isInitializing,
    title
  } = useDocumentInfo();
  const {
    isEntityVisible
  } = useEntityVisibility();
  let t0;
  if ($[0] !== collectionSlug || $[1] !== globalSlug || $[2] !== isEntityVisible) {
    t0 = isEntityVisible({
      collectionSlug,
      globalSlug
    });
    $[0] = collectionSlug;
    $[1] = globalSlug;
    $[2] = isEntityVisible;
    $[3] = t0;
  } else {
    t0 = $[3];
  }
  const isVisible = t0;
  const {
    setStepNav
  } = useStepNav();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    config: t1
  } = useConfig();
  const {
    routes: t2
  } = t1;
  const {
    admin: adminRoute
  } = t2;
  let t3;
  let t4;
  if ($[4] !== adminRoute || $[5] !== collectionSlug || $[6] !== globalSlug || $[7] !== i18n || $[8] !== id || $[9] !== isEditing || $[10] !== isInitializing || $[11] !== isVisible || $[12] !== pluralLabel || $[13] !== setStepNav || $[14] !== t || $[15] !== title || $[16] !== useAsTitle || $[17] !== view) {
    t3 = () => {
      const nav = [];
      if (!isInitializing) {
        if (collectionSlug) {
          nav.push({
            label: getTranslation(pluralLabel, i18n),
            url: isVisible ? formatAdminURL({
              adminRoute,
              path: `/collections/${collectionSlug}`
            }) : undefined
          });
          if (isEditing) {
            nav.push({
              label: useAsTitle && useAsTitle !== "id" && title || `${id}`,
              url: isVisible ? formatAdminURL({
                adminRoute,
                path: `/collections/${collectionSlug}/${id}`
              }) : undefined
            });
          } else {
            nav.push({
              label: t("general:createNew")
            });
          }
        } else {
          if (globalSlug) {
            nav.push({
              label: title,
              url: isVisible ? formatAdminURL({
                adminRoute,
                path: `/globals/${globalSlug}`
              }) : undefined
            });
          }
        }
        if (view) {
          nav.push({
            label: view
          });
        }
        setStepNav(nav);
      }
    };
    t4 = [setStepNav, isInitializing, isEditing, pluralLabel, id, useAsTitle, adminRoute, t, i18n, title, collectionSlug, globalSlug, view, isVisible];
    $[4] = adminRoute;
    $[5] = collectionSlug;
    $[6] = globalSlug;
    $[7] = i18n;
    $[8] = id;
    $[9] = isEditing;
    $[10] = isInitializing;
    $[11] = isVisible;
    $[12] = pluralLabel;
    $[13] = setStepNav;
    $[14] = t;
    $[15] = title;
    $[16] = useAsTitle;
    $[17] = view;
    $[18] = t3;
    $[19] = t4;
  } else {
    t3 = $[18];
    t4 = $[19];
  }
  useEffect(t3, t4);
  return null;
};
//# sourceMappingURL=index.js.map