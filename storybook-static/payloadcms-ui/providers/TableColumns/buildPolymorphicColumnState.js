// Dirty copy of buildColumnState.tsx with some changes to not break things
import { jsx as _jsx } from "react/jsx-runtime";
import { MissingEditorProp } from 'payload';
import { fieldIsHiddenOrDisabled, fieldIsID, fieldIsPresentationalOnly, flattenTopLevelFields } from 'payload/shared';
import React from 'react';
import { RenderCustomComponent, RenderDefaultCell, SortColumn } from '../../exports/client/index.js';
import { RenderServerComponent } from '../../elements/RenderServerComponent/index.js';
import { filterFields } from './filterFields.js';
export const buildPolymorphicColumnState = args => {
  const {
    beforeRows,
    columnPreferences,
    columns,
    customCellProps,
    docs,
    enableRowSelections,
    fields,
    i18n,
    payload,
    sortColumnProps,
    useAsTitle
  } = args;
  // clientFields contains the fake `id` column
  let sortedFieldMap = flattenTopLevelFields(filterFields(fields), true);
  let _sortedFieldMap = flattenTopLevelFields(filterFields(fields), true) // TODO: think of a way to avoid this additional flatten
  ;
  // place the `ID` field first, if it exists
  // do the same for the `useAsTitle` field with precedence over the `ID` field
  // then sort the rest of the fields based on the `defaultColumns` or `columnPreferences`
  const idFieldIndex = sortedFieldMap?.findIndex(field => fieldIsID(field));
  if (idFieldIndex > -1) {
    const idField = sortedFieldMap.splice(idFieldIndex, 1)[0];
    sortedFieldMap.unshift(idField);
  }
  const useAsTitleFieldIndex = useAsTitle ? sortedFieldMap.findIndex(field => 'name' in field && field.name === useAsTitle) : -1;
  if (useAsTitleFieldIndex > -1) {
    const useAsTitleField = sortedFieldMap.splice(useAsTitleFieldIndex, 1)[0];
    sortedFieldMap.unshift(useAsTitleField);
  }
  const sortTo = columnPreferences || columns;
  const sortFieldMap = (fieldMap, sortTo) => fieldMap?.sort((a, b) => {
    const aIndex = sortTo.findIndex(column => 'name' in a && column.accessor === a.name);
    const bIndex = sortTo.findIndex(column => 'name' in b && column.accessor === b.name);
    if (aIndex === -1 && bIndex === -1) {
      return 0;
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });
  if (sortTo) {
    // sort the fields to the order of `defaultColumns` or `columnPreferences`
    sortedFieldMap = sortFieldMap(sortedFieldMap, sortTo);
    _sortedFieldMap = sortFieldMap(_sortedFieldMap, sortTo) // TODO: think of a way to avoid this additional sort
    ;
  }
  const activeColumnsIndices = [];
  const sorted = sortedFieldMap?.reduce((acc, field, index) => {
    if (fieldIsHiddenOrDisabled(field) && !fieldIsID(field)) {
      return acc;
    }
    const _field = _sortedFieldMap.find(f => 'name' in field && 'name' in f && f.name === field.name);
    const columnPreference = columnPreferences?.find(preference => field && 'name' in field && preference.accessor === field.name);
    let active = false;
    if (columnPreference) {
      active = columnPreference.active;
    } else if (columns && Array.isArray(columns) && columns.length > 0) {
      active = columns.find(column => field && 'name' in field && column.accessor === field.name)?.active;
    } else if (activeColumnsIndices.length < 4) {
      active = true;
    }
    if (active && !activeColumnsIndices.includes(index)) {
      activeColumnsIndices.push(index);
    }
    // const CustomLabelToRender =
    //   _field &&
    //   'admin' in _field &&
    //   'components' in _field.admin &&
    //   'Label' in _field.admin.components &&
    //   _field.admin.components.Label !== undefined // let it return `null`
    //     ? _field.admin.components.Label
    //     : undefined
    // // TODO: customComponent will be optional in v4
    // const clientProps: Omit<ClientComponentProps, 'customComponents'> = {
    //   field,
    // }
    // const customLabelServerProps: Pick<
    //   ServerComponentProps,
    //   'clientField' | 'collectionSlug' | 'field' | 'i18n' | 'payload'
    // > = {
    //   clientField: field,
    //   collectionSlug: collectionConfig.slug,
    //   field: _field,
    //   i18n,
    //   payload,
    // }
    const CustomLabel = undefined;
    const fieldAffectsDataSubFields = field && field.type && (field.type === 'array' || field.type === 'group' || field.type === 'blocks');
    const Heading = /*#__PURE__*/_jsx(SortColumn, {
      disable: fieldAffectsDataSubFields || fieldIsPresentationalOnly(field) || undefined,
      Label: CustomLabel,
      label: field && 'label' in field ? field.label : undefined,
      name: 'name' in field ? field.name : undefined,
      ...(sortColumnProps || {})
    });
    const column = {
      accessor: 'name' in field ? field.name : undefined,
      active,
      CustomLabel,
      field,
      Heading,
      renderedCells: active ? docs.map((doc, i) => {
        const isLinkedColumn = index === activeColumnsIndices[0];
        const collectionSlug = doc.relationTo;
        doc = doc.value;
        const baseCellClientProps = {
          cellData: undefined,
          collectionSlug,
          customCellProps,
          field,
          rowData: undefined
        };
        const cellClientProps = {
          ...baseCellClientProps,
          cellData: 'name' in field ? doc[field.name] : undefined,
          link: isLinkedColumn,
          rowData: doc
        };
        const cellServerProps = {
          cellData: cellClientProps.cellData,
          className: baseCellClientProps.className,
          collectionConfig: payload.collections[collectionSlug].config,
          collectionSlug,
          columnIndex: baseCellClientProps.columnIndex,
          customCellProps: baseCellClientProps.customCellProps,
          field: _field,
          i18n,
          link: cellClientProps.link,
          onClick: baseCellClientProps.onClick,
          payload,
          rowData: doc
        };
        let CustomCell = null;
        if (_field?.type === 'richText') {
          if (!_field?.editor) {
            throw new MissingEditorProp(_field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
            ;
          }
          if (typeof _field?.editor === 'function') {
            throw new Error('Attempted to access unsanitized rich text editor.');
          }
          if (!_field.admin) {
            _field.admin = {};
          }
          if (!_field.admin.components) {
            _field.admin.components = {};
          }
          CustomCell = RenderServerComponent({
            clientProps: cellClientProps,
            Component: _field.editor.CellComponent,
            importMap: payload.importMap,
            serverProps: cellServerProps
          });
        } else {
          const CustomCellComponent = _field?.admin?.components?.Cell;
          if (CustomCellComponent) {
            CustomCell = RenderServerComponent({
              clientProps: cellClientProps,
              Component: CustomCellComponent,
              importMap: payload.importMap,
              serverProps: cellServerProps
            });
          } else {
            CustomCell = undefined;
          }
        }
        return /*#__PURE__*/_jsx(RenderCustomComponent, {
          CustomComponent: CustomCell,
          Fallback: /*#__PURE__*/_jsx(RenderDefaultCell, {
            clientProps: cellClientProps,
            columnIndex: index,
            enableRowSelections: enableRowSelections,
            isLinkedColumn: isLinkedColumn
          })
        }, `${i}-${index}`);
      }) : []
    };
    acc.push(column);
    return acc;
  }, []);
  if (beforeRows) {
    sorted.unshift(...beforeRows);
  }
  return sorted;
};
//# sourceMappingURL=buildPolymorphicColumnState.js.map