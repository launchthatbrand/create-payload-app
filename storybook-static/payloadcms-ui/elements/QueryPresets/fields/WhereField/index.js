'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { toWords } from 'payload/shared';
import React from 'react';
import { FieldLabel } from '../../../../fields/FieldLabel/index.js';
import { useField } from '../../../../forms/useField/index.js';
import { useConfig } from '../../../../providers/Config/index.js';
import { useListQuery } from '../../../../providers/ListQuery/index.js';
import { useTranslation } from '../../../../providers/Translation/index.js';
import { Pill } from '../../../Pill/index.js';
import './index.scss';
/** @todo: improve this */
const transformWhereToNaturalLanguage = (where, collectionLabel) => {
  if (!where) {
    return null;
  }
  const renderCondition = condition => {
    const key = Object.keys(condition)[0];
    if (!condition[key]) {
      return 'No where query';
    }
    const operator = Object.keys(condition[key])[0];
    let value = condition[key][operator];
    // TODO: this is not right, but works for now at least.
    // Ideally we look up iterate _fields_ so we know the type of the field
    // Currently, we're only iterating over the `where` field's value, so we don't know the type
    if (typeof value === 'object') {
      try {
        value = new Date(value).toLocaleDateString();
      } catch (_err) {
        value = 'Unknown error has occurred';
      }
    }
    return /*#__PURE__*/_jsxs(Pill, {
      pillStyle: "always-white",
      children: [/*#__PURE__*/_jsx("b", {
        children: toWords(key)
      }), " ", operator, " ", /*#__PURE__*/_jsx("b", {
        children: toWords(value)
      })]
    });
  };
  const renderWhere = (where, collectionLabel) => {
    if (where.or && where.or.length > 0) {
      return /*#__PURE__*/_jsx("div", {
        className: "or-condition",
        children: where.or.map((orCondition, orIndex) => /*#__PURE__*/_jsx(React.Fragment, {
          children: orCondition.and && orCondition.and.length > 0 ? /*#__PURE__*/_jsxs("div", {
            className: "and-condition",
            children: [orIndex === 0 && /*#__PURE__*/_jsx("span", {
              className: "label",
              children: `Filter ${collectionLabel} where `
            }), orIndex > 0 && /*#__PURE__*/_jsx("span", {
              className: "label",
              children: " or "
            }), orCondition.and.map((andCondition, andIndex) => /*#__PURE__*/_jsxs(React.Fragment, {
              children: [renderCondition(andCondition), andIndex < orCondition.and.length - 1 && /*#__PURE__*/_jsx("span", {
                className: "label",
                children: " and "
              })]
            }, andIndex))]
          }) : renderCondition(orCondition)
        }, orIndex))
      });
    }
    return renderCondition(where);
  };
  return renderWhere(where, collectionLabel);
};
export const QueryPresetsWhereField = t0 => {
  const $ = _c(2);
  const {
    field: t1,
    path
  } = t0;
  const {
    label,
    required
  } = t1;
  let t2;
  if ($[0] !== path) {
    t2 = {
      path
    };
    $[0] = path;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const {
    value
  } = useField(t2);
  const {
    collectionSlug
  } = useListQuery();
  const {
    getEntityConfig
  } = useConfig();
  const collectionConfig = getEntityConfig({
    collectionSlug
  });
  const {
    i18n
  } = useTranslation();
  return _jsxs("div", {
    className: "field-type query-preset-where-field",
    children: [_jsx(FieldLabel, {
      as: "h3",
      label,
      path,
      required
    }), _jsx("div", {
      className: "value-wrapper",
      children: value ? transformWhereToNaturalLanguage(value, getTranslation(collectionConfig.labels.plural, i18n)) : "No where query"
    })]
  });
};
//# sourceMappingURL=index.js.map