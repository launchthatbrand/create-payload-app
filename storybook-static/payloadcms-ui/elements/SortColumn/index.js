'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { useListQuery } from '../../providers/ListQuery/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'sort-column';
export const SortColumn = props => {
  const $ = _c(22);
  const {
    name,
    appearance,
    disable: t0,
    Label,
    label
  } = props;
  const disable = t0 === undefined ? false : t0;
  const {
    handleSortChange,
    query
  } = useListQuery();
  const {
    t
  } = useTranslation();
  const {
    sort
  } = query;
  const desc = `-${name}`;
  const asc = name;
  let ascClasses;
  if ($[0] !== asc || $[1] !== sort) {
    ascClasses = [`${baseClass}__asc`];
    if (sort === asc) {
      ascClasses.push(`${baseClass}--active`);
    }
    $[0] = asc;
    $[1] = sort;
    $[2] = ascClasses;
  } else {
    ascClasses = $[2];
  }
  let descClasses;
  if ($[3] !== desc || $[4] !== sort) {
    descClasses = [`${baseClass}__desc`];
    if (sort === desc) {
      descClasses.push(`${baseClass}--active`);
    }
    $[3] = desc;
    $[4] = sort;
    $[5] = descClasses;
  } else {
    descClasses = $[5];
  }
  const t1 = appearance && `${baseClass}--appearance-${appearance}`;
  let t2;
  if ($[6] !== t1) {
    t2 = [baseClass, t1].filter(Boolean);
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  const t3 = t2.join(" ");
  let t4;
  if ($[8] !== Label || $[9] !== label) {
    t4 = Label ?? _jsx(FieldLabel, {
      hideLocale: true,
      label,
      unstyled: true
    });
    $[8] = Label;
    $[9] = label;
    $[10] = t4;
  } else {
    t4 = $[10];
  }
  let t5;
  if ($[11] !== asc || $[12] !== ascClasses || $[13] !== desc || $[14] !== descClasses || $[15] !== disable || $[16] !== handleSortChange || $[17] !== label || $[18] !== t || $[19] !== t3 || $[20] !== t4) {
    t5 = _jsxs("div", {
      className: t3,
      children: [_jsx("span", {
        className: `${baseClass}__label`,
        children: t4
      }), !disable && _jsxs("div", {
        className: `${baseClass}__buttons`,
        children: [_jsx("button", {
          "aria-label": t("general:sortByLabelDirection", {
            direction: t("general:ascending"),
            label
          }),
          className: [...ascClasses, `${baseClass}__button`].filter(Boolean).join(" "),
          onClick: () => void handleSortChange(asc),
          type: "button",
          children: _jsx(ChevronIcon, {
            direction: "up"
          })
        }), _jsx("button", {
          "aria-label": t("general:sortByLabelDirection", {
            direction: t("general:descending"),
            label
          }),
          className: [...descClasses, `${baseClass}__button`].filter(Boolean).join(" "),
          onClick: () => void handleSortChange(desc),
          type: "button",
          children: _jsx(ChevronIcon, {})
        })]
      })]
    });
    $[11] = asc;
    $[12] = ascClasses;
    $[13] = desc;
    $[14] = descClasses;
    $[15] = disable;
    $[16] = handleSortChange;
    $[17] = label;
    $[18] = t;
    $[19] = t3;
    $[20] = t4;
    $[21] = t5;
  } else {
    t5 = $[21];
  }
  return t5;
};
//# sourceMappingURL=index.js.map