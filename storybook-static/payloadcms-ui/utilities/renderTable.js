import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { fieldAffectsData, fieldIsHiddenOrDisabled, flattenTopLevelFields } from 'payload/shared';
import { RenderServerComponent } from '../elements/RenderServerComponent/index.js';
import { buildColumnState } from '../providers/TableColumns/buildColumnState.js';
import { buildPolymorphicColumnState } from '../providers/TableColumns/buildPolymorphicColumnState.js';
import { filterFields } from '../providers/TableColumns/filterFields.js';
import { getInitialColumns } from '../providers/TableColumns/getInitialColumns.js';
// eslint-disable-next-line payload/no-imports-from-exports-dir
import { Pill, SelectAll, SelectRow, Table } from '../exports/client/index.js';
export const renderFilters = (fields, importMap) => fields.reduce((acc, field) => {
  if (fieldIsHiddenOrDisabled(field)) {
    return acc;
  }
  if ('name' in field && field.admin?.components?.Filter) {
    acc.set(field.name, RenderServerComponent({
      Component: field.admin.components?.Filter,
      importMap
    }));
  }
  return acc;
}, new Map());
export const renderTable = ({
  clientCollectionConfig,
  clientConfig,
  collectionConfig,
  collections,
  columnPreferences,
  columns: columnsFromArgs,
  customCellProps,
  docs,
  enableRowSelections,
  i18n,
  payload,
  renderRowTypes,
  tableAppearance,
  useAsTitle
}) => {
  // Ensure that columns passed as args comply with the field config, i.e. `hidden`, `disableListColumn`, etc.
  let columnState;
  if (collections) {
    const fields = [];
    for (const collection of collections) {
      const config = clientConfig.collections.find(each => each.slug === collection);
      for (const field of filterFields(config.fields)) {
        if (fieldAffectsData(field)) {
          if (fields.some(each => fieldAffectsData(each) && each.name === field.name)) {
            continue;
          }
        }
        fields.push(field);
      }
    }
    const columns = columnsFromArgs ? columnsFromArgs?.filter(column => flattenTopLevelFields(fields, true)?.some(field => 'name' in field && field.name === column.accessor)) : getInitialColumns(fields, useAsTitle, []);
    columnState = buildPolymorphicColumnState({
      columnPreferences,
      columns,
      enableRowSelections,
      fields,
      i18n,
      // sortColumnProps,
      customCellProps,
      docs,
      payload,
      useAsTitle
    });
  } else {
    const columns = columnsFromArgs ? columnsFromArgs?.filter(column => flattenTopLevelFields(clientCollectionConfig.fields, true)?.some(field => 'name' in field && field.name === column.accessor)) : getInitialColumns(filterFields(clientCollectionConfig.fields), useAsTitle, clientCollectionConfig?.admin?.defaultColumns);
    columnState = buildColumnState({
      clientCollectionConfig,
      collectionConfig,
      columnPreferences,
      columns,
      enableRowSelections,
      i18n,
      // sortColumnProps,
      customCellProps,
      docs,
      payload,
      useAsTitle
    });
  }
  const columnsToUse = [...columnState];
  if (renderRowTypes) {
    columnsToUse.unshift({
      accessor: 'collection',
      active: true,
      field: {
        admin: {
          disabled: true
        },
        hidden: true
      },
      Heading: i18n.t('version:type'),
      renderedCells: docs.map((doc, i) => /*#__PURE__*/_jsx(Pill, {
        children: getTranslation(collections ? payload.collections[doc.relationTo].config.labels.singular : clientCollectionConfig.labels.singular, i18n)
      }, i))
    });
  }
  if (enableRowSelections) {
    columnsToUse.unshift({
      accessor: '_select',
      active: true,
      field: {
        admin: {
          disabled: true
        },
        hidden: true
      },
      Heading: /*#__PURE__*/_jsx(SelectAll, {}),
      renderedCells: docs.map((_, i) => /*#__PURE__*/_jsx(SelectRow, {
        rowData: docs[i]
      }, i))
    });
  }
  return {
    columnState,
    // key is required since Next.js 15.2.0 to prevent React key error
    Table: /*#__PURE__*/_jsx(Table, {
      appearance: tableAppearance,
      columns: columnsToUse,
      data: docs
    }, "table")
  };
};
//# sourceMappingURL=renderTable.js.map