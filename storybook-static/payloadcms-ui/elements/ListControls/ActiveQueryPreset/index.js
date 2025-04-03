'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { PeopleIcon } from '../../../icons/People/index.js';
import { XIcon } from '../../../icons/X/index.js';
import { useConfig } from '../../../providers/Config/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { Pill } from '../../Pill/index.js';
import './index.scss';
const baseClass = 'active-query-preset';
export function ActiveQueryPreset(t0) {
  const $ = _c(36);
  const {
    activePreset,
    openPresetListDrawer,
    resetPreset
  } = t0;
  const {
    i18n,
    t
  } = useTranslation();
  const {
    getEntityConfig
  } = useConfig();
  let t1;
  let t10;
  let t11;
  let t2;
  let t3;
  let t4;
  let t5;
  let t6;
  let t7;
  let t8;
  let t9;
  if ($[0] !== activePreset || $[1] !== getEntityConfig || $[2] !== i18n || $[3] !== openPresetListDrawer || $[4] !== t) {
    const presetsConfig = getEntityConfig({
      collectionSlug: "payload-query-presets"
    });
    t10 = _jsxs;
    t11 = Pill;
    const t12 = activePreset && `${baseClass}--active`;
    let t13;
    if ($[16] !== t12) {
      t13 = [baseClass, t12].filter(Boolean);
      $[16] = t12;
      $[17] = t13;
    } else {
      t13 = $[17];
    }
    t6 = t13.join(" ");
    t7 = "select-preset";
    if ($[18] !== openPresetListDrawer) {
      t8 = () => {
        openPresetListDrawer();
      };
      $[18] = openPresetListDrawer;
      $[19] = t8;
    } else {
      t8 = $[19];
    }
    t9 = activePreset ? "always-white" : "light";
    if ($[20] !== activePreset?.isShared) {
      t5 = activePreset?.isShared && _jsx(PeopleIcon, {
        className: `${baseClass}__shared`
      });
      $[20] = activePreset?.isShared;
      $[21] = t5;
    } else {
      t5 = $[21];
    }
    t3 = _jsx;
    t4 = "div";
    t1 = `${baseClass}__label-text`;
    t2 = activePreset?.title || t("general:selectLabel", {
      label: getTranslation(presetsConfig.labels.singular, i18n)
    });
    $[0] = activePreset;
    $[1] = getEntityConfig;
    $[2] = i18n;
    $[3] = openPresetListDrawer;
    $[4] = t;
    $[5] = t1;
    $[6] = t10;
    $[7] = t11;
    $[8] = t2;
    $[9] = t3;
    $[10] = t4;
    $[11] = t5;
    $[12] = t6;
    $[13] = t7;
    $[14] = t8;
    $[15] = t9;
  } else {
    t1 = $[5];
    t10 = $[6];
    t11 = $[7];
    t2 = $[8];
    t3 = $[9];
    t4 = $[10];
    t5 = $[11];
    t6 = $[12];
    t7 = $[13];
    t8 = $[14];
    t9 = $[15];
  }
  let t12;
  if ($[22] !== activePreset || $[23] !== resetPreset || $[24] !== t1 || $[25] !== t10 || $[26] !== t11 || $[27] !== t2 || $[28] !== t3 || $[29] !== t4 || $[30] !== t5 || $[31] !== t6 || $[32] !== t7 || $[33] !== t8 || $[34] !== t9) {
    t12 = t10(t11, {
      className: t6,
      id: t7,
      onClick: t8,
      pillStyle: t9,
      children: [t5, t3(t4, {
        className: t1,
        children: t2
      }), activePreset ? _jsx("div", {
        className: `${baseClass}__clear`,
        id: "clear-preset",
        onClick: async e => {
          e.stopPropagation();
          await resetPreset();
        },
        onKeyDown: async e_0 => {
          e_0.stopPropagation();
          await resetPreset();
        },
        role: "button",
        tabIndex: 0,
        children: _jsx(XIcon, {})
      }) : null]
    });
    $[22] = activePreset;
    $[23] = resetPreset;
    $[24] = t1;
    $[25] = t10;
    $[26] = t11;
    $[27] = t2;
    $[28] = t3;
    $[29] = t4;
    $[30] = t5;
    $[31] = t6;
    $[32] = t7;
    $[33] = t8;
    $[34] = t9;
    $[35] = t12;
  } else {
    t12 = $[35];
  }
  return t12;
}
//# sourceMappingURL=index.js.map