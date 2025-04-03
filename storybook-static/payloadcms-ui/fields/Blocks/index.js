'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment, useCallback } from 'react';
import { Banner } from '../../elements/Banner/index.js';
import { Button } from '../../elements/Button/index.js';
import { DraggableSortableItem } from '../../elements/DraggableSortable/DraggableSortableItem/index.js';
import { DraggableSortable } from '../../elements/DraggableSortable/index.js';
import { DrawerToggler } from '../../elements/Drawer/index.js';
import { useDrawerSlug } from '../../elements/Drawer/useDrawerSlug.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { useForm, useFormSubmitted } from '../../forms/Form/context.js';
import { extractRowsAndCollapsedIDs, toggleAllRows } from '../../forms/Form/rowHelpers.js';
import { NullifyLocaleField } from '../../forms/NullifyField/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { scrollToID } from '../../utilities/scrollToID.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import { BlockRow } from './BlockRow.js';
import { BlocksDrawer } from './BlocksDrawer/index.js';
import './index.scss';
const baseClass = 'blocks-field';
const BlocksFieldComponent = props => {
  const $ = _c(52);
  const {
    i18n,
    t
  } = useTranslation();
  const {
    field: t0,
    path,
    permissions,
    readOnly,
    schemaPath: schemaPathFromProps,
    validate
  } = props;
  const {
    name,
    admin: t1,
    blockReferences,
    blocks,
    label,
    labels: labelsFromProps,
    localized,
    maxRows,
    minRows: minRowsProp,
    required
  } = t0;
  let t2;
  if ($[0] !== t1) {
    t2 = t1 === undefined ? {} : t1;
    $[0] = t1;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const {
    className,
    description,
    isSortable: t3
  } = t2;
  const isSortable = t3 === undefined ? true : t3;
  const schemaPath = schemaPathFromProps ?? name;
  const minRows = minRowsProp ?? required ? 1 : 0;
  const {
    setDocFieldPreferences
  } = useDocumentInfo();
  const {
    addFieldRow,
    dispatchFields,
    setModified
  } = useForm();
  const {
    code: locale
  } = useLocale();
  const {
    config: t4,
    config
  } = useConfig();
  const {
    localization
  } = t4;
  const drawerSlug = useDrawerSlug("blocks-drawer");
  const submitted = useFormSubmitted();
  const labels = {
    plural: t("fields:blocks"),
    singular: t("fields:block"),
    ...labelsFromProps
  };
  let t5;
  bb0: {
    if (localization && localization.fallback) {
      const defaultLocale = localization.defaultLocale;
      t5 = locale === defaultLocale;
      break bb0;
    }
    t5 = true;
  }
  const editingDefaultLocale = t5;
  let t6;
  if ($[2] !== editingDefaultLocale || $[3] !== maxRows || $[4] !== minRows || $[5] !== required || $[6] !== validate) {
    t6 = (value, options) => {
      if (!editingDefaultLocale && value === null) {
        return true;
      }
      if (typeof validate === "function") {
        return validate(value, {
          ...options,
          maxRows,
          minRows,
          required
        });
      }
    };
    $[2] = editingDefaultLocale;
    $[3] = maxRows;
    $[4] = minRows;
    $[5] = required;
    $[6] = validate;
    $[7] = t6;
  } else {
    t6 = $[7];
  }
  const memoizedValidate = t6;
  let t7;
  if ($[8] !== memoizedValidate || $[9] !== path) {
    t7 = {
      hasRows: true,
      path,
      validate: memoizedValidate
    };
    $[8] = memoizedValidate;
    $[9] = path;
    $[10] = t7;
  } else {
    t7 = $[10];
  }
  const {
    customComponents: t8,
    disabled,
    errorPaths,
    rows: t9,
    showError,
    valid,
    value: value_0
  } = useField(t7);
  let t10;
  if ($[11] !== t8) {
    t10 = t8 === undefined ? {} : t8;
    $[11] = t8;
    $[12] = t10;
  } else {
    t10 = $[12];
  }
  const {
    AfterInput,
    BeforeInput,
    Description,
    Error,
    Label,
    RowLabels
  } = t10;
  let t11;
  if ($[13] !== t9) {
    t11 = t9 === undefined ? [] : t9;
    $[13] = t9;
    $[14] = t11;
  } else {
    t11 = $[14];
  }
  const rows = t11;
  let t12;
  if ($[15] !== addFieldRow || $[16] !== path || $[17] !== schemaPath) {
    t12 = (rowIndex, blockType) => {
      addFieldRow({
        blockType,
        path,
        rowIndex,
        schemaPath
      });
      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex + 1}`);
      }, 0);
    };
    $[15] = addFieldRow;
    $[16] = path;
    $[17] = schemaPath;
    $[18] = t12;
  } else {
    t12 = $[18];
  }
  const addRow = t12;
  let t13;
  if ($[19] !== dispatchFields || $[20] !== path || $[21] !== setModified) {
    t13 = rowIndex_0 => {
      dispatchFields({
        type: "DUPLICATE_ROW",
        path,
        rowIndex: rowIndex_0
      });
      setModified(true);
      setTimeout(() => {
        scrollToID(`${path}-row-${rowIndex_0 + 1}`);
      }, 0);
    };
    $[19] = dispatchFields;
    $[20] = path;
    $[21] = setModified;
    $[22] = t13;
  } else {
    t13 = $[22];
  }
  const duplicateRow = t13;
  let t14;
  if ($[23] !== dispatchFields || $[24] !== path || $[25] !== setModified) {
    t14 = rowIndex_1 => {
      dispatchFields({
        type: "REMOVE_ROW",
        path,
        rowIndex: rowIndex_1
      });
      setModified(true);
    };
    $[23] = dispatchFields;
    $[24] = path;
    $[25] = setModified;
    $[26] = t14;
  } else {
    t14 = $[26];
  }
  const removeRow = t14;
  let t15;
  if ($[27] !== dispatchFields || $[28] !== path || $[29] !== setModified) {
    t15 = (moveFromIndex, moveToIndex) => {
      dispatchFields({
        type: "MOVE_ROW",
        moveFromIndex,
        moveToIndex,
        path
      });
      setModified(true);
    };
    $[27] = dispatchFields;
    $[28] = path;
    $[29] = setModified;
    $[30] = t15;
  } else {
    t15 = $[30];
  }
  const moveRow = t15;
  let t16;
  if ($[31] !== dispatchFields || $[32] !== path || $[33] !== rows || $[34] !== setDocFieldPreferences) {
    t16 = collapsed => {
      const {
        collapsedIDs,
        updatedRows
      } = toggleAllRows({
        collapsed,
        rows
      });
      dispatchFields({
        type: "SET_ALL_ROWS_COLLAPSED",
        path,
        updatedRows
      });
      setDocFieldPreferences(path, {
        collapsed: collapsedIDs
      });
    };
    $[31] = dispatchFields;
    $[32] = path;
    $[33] = rows;
    $[34] = setDocFieldPreferences;
    $[35] = t16;
  } else {
    t16 = $[35];
  }
  const toggleCollapseAll = t16;
  let t17;
  if ($[36] !== dispatchFields || $[37] !== path || $[38] !== rows || $[39] !== setDocFieldPreferences) {
    t17 = (rowID, collapsed_0) => {
      const {
        collapsedIDs: collapsedIDs_0,
        updatedRows: updatedRows_0
      } = extractRowsAndCollapsedIDs({
        collapsed: collapsed_0,
        rowID,
        rows
      });
      dispatchFields({
        type: "SET_ROW_COLLAPSED",
        path,
        updatedRows: updatedRows_0
      });
      setDocFieldPreferences(path, {
        collapsed: collapsedIDs_0
      });
    };
    $[36] = dispatchFields;
    $[37] = path;
    $[38] = rows;
    $[39] = setDocFieldPreferences;
    $[40] = t17;
  } else {
    t17 = $[40];
  }
  const setCollapse = t17;
  const hasMaxRows = maxRows && rows.length >= maxRows;
  const fieldErrorCount = errorPaths.length;
  const fieldHasErrors = submitted && fieldErrorCount + (valid ? 0 : 1) > 0;
  const showMinRows = rows.length < minRows || required && rows.length === 0;
  const showRequired = readOnly && rows.length === 0;
  const t18 = fieldHasErrors ? `${baseClass}--has-error` : `${baseClass}--has-no-error`;
  let t19;
  if ($[41] !== className || $[42] !== t18) {
    t19 = [fieldBaseClass, baseClass, className, t18].filter(Boolean);
    $[41] = className;
    $[42] = t18;
    $[43] = t19;
  } else {
    t19 = $[43];
  }
  let t20;
  if ($[44] !== Error || $[45] !== path || $[46] !== showError) {
    t20 = showError && _jsx(RenderCustomComponent, {
      CustomComponent: Error,
      Fallback: _jsx(FieldError, {
        path,
        showError
      })
    });
    $[44] = Error;
    $[45] = path;
    $[46] = showError;
    $[47] = t20;
  } else {
    t20 = $[47];
  }
  let t21;
  if ($[48] !== fieldErrorCount || $[49] !== fieldHasErrors || $[50] !== i18n) {
    t21 = fieldHasErrors && fieldErrorCount > 0 && _jsx(ErrorPill, {
      count: fieldErrorCount,
      i18n,
      withMessage: true
    });
    $[48] = fieldErrorCount;
    $[49] = fieldHasErrors;
    $[50] = i18n;
    $[51] = t21;
  } else {
    t21 = $[51];
  }
  return _jsxs("div", {
    className: t19.join(" "),
    id: `field-${path?.replace(/\./g, "__")}`,
    children: [t20, _jsxs("header", {
      className: `${baseClass}__header`,
      children: [_jsxs("div", {
        className: `${baseClass}__header-wrap`,
        children: [_jsxs("div", {
          className: `${baseClass}__heading-with-error`,
          children: [_jsx("h3", {
            children: _jsx(RenderCustomComponent, {
              CustomComponent: Label,
              Fallback: _jsx(FieldLabel, {
                label,
                localized,
                path,
                required
              })
            })
          }), t21]
        }), rows.length > 0 && _jsxs("ul", {
          className: `${baseClass}__header-actions`,
          children: [_jsx("li", {
            children: _jsx("button", {
              className: `${baseClass}__header-action`,
              onClick: () => toggleCollapseAll(true),
              type: "button",
              children: t("fields:collapseAll")
            })
          }), _jsx("li", {
            children: _jsx("button", {
              className: `${baseClass}__header-action`,
              onClick: () => toggleCollapseAll(false),
              type: "button",
              children: t("fields:showAll")
            })
          })]
        })]
      }), _jsx(RenderCustomComponent, {
        CustomComponent: Description,
        Fallback: _jsx(FieldDescription, {
          description,
          path
        })
      })]
    }), BeforeInput, _jsx(NullifyLocaleField, {
      fieldValue: value_0,
      localized,
      path
    }), (rows.length > 0 || !valid && (showRequired || showMinRows)) && _jsxs(DraggableSortable, {
      className: `${baseClass}__rows`,
      ids: rows.map(_temp),
      onDragEnd: t22 => {
        const {
          moveFromIndex: moveFromIndex_0,
          moveToIndex: moveToIndex_0
        } = t22;
        return moveRow(moveFromIndex_0, moveToIndex_0);
      },
      children: [rows.map((row_0, i) => {
        const {
          blockType: blockType_0,
          isLoading
        } = row_0;
        const blockConfig = config.blocksMap[blockType_0] ?? (blockReferences ?? blocks).find(block => typeof block !== "string" && block.slug === blockType_0);
        if (blockConfig) {
          const rowPath = `${path}.${i}`;
          const rowErrorCount = errorPaths.filter(errorPath => errorPath.startsWith(rowPath + ".")).length;
          return _jsx(DraggableSortableItem, {
            disabled: readOnly || disabled || !isSortable,
            id: row_0.id,
            children: draggableSortableItemProps => _jsx(BlockRow, {
              ...draggableSortableItemProps,
              addRow,
              block: blockConfig,
              blocks: blockReferences ?? blocks,
              duplicateRow,
              errorCount: rowErrorCount,
              fields: blockConfig.fields,
              hasMaxRows,
              isLoading,
              isSortable,
              Label: RowLabels?.[i],
              labels,
              moveRow,
              parentPath: path,
              path: rowPath,
              permissions,
              readOnly: readOnly || disabled,
              removeRow,
              row: row_0,
              rowCount: rows.length,
              rowIndex: i,
              schemaPath: schemaPath + blockConfig.slug,
              setCollapse
            })
          }, row_0.id);
        }
        return null;
      }), !editingDefaultLocale && _jsxs(React.Fragment, {
        children: [showMinRows && _jsx(Banner, {
          type: "error",
          children: t("validation:requiresAtLeast", {
            count: minRows,
            label: getTranslation(minRows > 1 ? labels.plural : labels.singular, i18n) || t(minRows > 1 ? "general:row" : "general:rows")
          })
        }), showRequired && _jsx(Banner, {
          children: t("validation:fieldHasNo", {
            label: getTranslation(labels.plural, i18n)
          })
        })]
      })]
    }), !hasMaxRows && _jsxs(Fragment, {
      children: [_jsx(DrawerToggler, {
        className: `${baseClass}__drawer-toggler`,
        disabled: readOnly || disabled,
        slug: drawerSlug,
        children: _jsx(Button, {
          buttonStyle: "icon-label",
          disabled: readOnly || disabled,
          el: "span",
          icon: "plus",
          iconPosition: "left",
          iconStyle: "with-border",
          children: t("fields:addLabel", {
            label: getTranslation(labels.singular, i18n)
          })
        })
      }), _jsx(BlocksDrawer, {
        addRow,
        addRowIndex: rows?.length || 0,
        blocks: blockReferences ?? blocks,
        drawerSlug,
        labels
      })]
    }), AfterInput]
  });
};
export const BlocksField = withCondition(BlocksFieldComponent);
function _temp(row) {
  return row.id;
}
//# sourceMappingURL=index.js.map