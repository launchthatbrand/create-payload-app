'use client';

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { dequal } from 'dequal/lite';
import { wordBoundariesRegex } from 'payload/shared';
import * as qs from 'qs-esm';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { AddNewRelation } from '../../elements/AddNewRelation/index.js';
import { useDocumentDrawer } from '../../elements/DocumentDrawer/index.js';
import { ReactSelect } from '../../elements/ReactSelect/index.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { FieldDescription } from '../../fields/FieldDescription/index.js';
import { FieldError } from '../../fields/FieldError/index.js';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback.js';
import { useEffectEvent } from '../../hooks/useEffectEvent.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
import { mergeFieldStyles } from '../mergeFieldStyles.js';
import { fieldBaseClass } from '../shared/index.js';
import { createRelationMap } from './createRelationMap.js';
import { findOptionsByValue } from './findOptionsByValue.js';
import { optionsReducer } from './optionsReducer.js';
import { MultiValueLabel } from './select-components/MultiValueLabel/index.js';
import { SingleValue } from './select-components/SingleValue/index.js';
const maxResultsPerRequest = 10;
const baseClass = 'relationship';
const RelationshipFieldComponent = props => {
  const {
    field,
    field: {
      admin: {
        allowCreate = true,
        allowEdit = true,
        className,
        description,
        isSortable = true,
        sortOptions
      } = {},
      hasMany,
      label,
      localized,
      relationTo,
      required
    },
    path,
    readOnly,
    validate
  } = props;
  const {
    config,
    getEntityConfig
  } = useConfig();
  const {
    routes: {
      api
    },
    serverURL
  } = config;
  const {
    i18n,
    t
  } = useTranslation();
  const {
    permissions
  } = useAuth();
  const {
    code: locale
  } = useLocale();
  const hasMultipleRelations = Array.isArray(relationTo);
  const [currentlyOpenRelationship, setCurrentlyOpenRelationship] = useState({
    id: undefined,
    collectionSlug: undefined,
    hasReadPermission: false
  });
  const [lastFullyLoadedRelation, setLastFullyLoadedRelation] = useState(-1);
  const [lastLoadedPage, setLastLoadedPage] = useState({});
  const [errorLoading, setErrorLoading] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableWordBoundarySearch, setEnableWordBoundarySearch] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const hasLoadedFirstPageRef = useRef(false);
  const memoizedValidate = useCallback((value, validationOptions) => {
    if (typeof validate === 'function') {
      return validate(value, {
        ...validationOptions,
        required
      });
    }
  }, [validate, required]);
  const {
    customComponents: {
      AfterInput,
      BeforeInput,
      Description,
      Error,
      Label
    } = {},
    disabled,
    filterOptions,
    initialValue,
    setValue,
    showError,
    value: value_0
  } = useField({
    path,
    validate: memoizedValidate
  });
  const [options, dispatchOptions] = useReducer(optionsReducer, []);
  const valueRef = useRef(value_0);
  valueRef.current = value_0;
  const [DocumentDrawer,, {
    isDrawerOpen,
    openDrawer
  }] = useDocumentDrawer({
    id: currentlyOpenRelationship.id,
    collectionSlug: currentlyOpenRelationship.collectionSlug
  });
  const openDrawerWhenRelationChanges = useRef(false);
  const getResults = useCallback(async ({
    filterOptions: filterOptions_0,
    lastFullyLoadedRelation: lastFullyLoadedRelationArg,
    lastLoadedPage: lastLoadedPageArg,
    onSuccess,
    search: searchArg,
    sort,
    value: valueArg
  }) => {
    if (!permissions) {
      return;
    }
    const lastFullyLoadedRelationToUse = typeof lastFullyLoadedRelationArg !== 'undefined' ? lastFullyLoadedRelationArg : -1;
    const relations = Array.isArray(relationTo) ? relationTo : [relationTo];
    const relationsToFetch = lastFullyLoadedRelationToUse === -1 ? relations : relations.slice(lastFullyLoadedRelationToUse + 1);
    let resultsFetched = 0;
    const relationMap = createRelationMap({
      hasMany,
      relationTo,
      value: valueArg
    });
    if (!errorLoading) {
      await relationsToFetch.reduce(async (priorRelation, relation) => {
        const relationFilterOption = filterOptions_0?.[relation];
        let lastLoadedPageToUse;
        if (search !== searchArg) {
          lastLoadedPageToUse = 1;
        } else {
          lastLoadedPageToUse = lastLoadedPageArg[relation] + 1;
        }
        await priorRelation;
        if (relationFilterOption === false) {
          setLastFullyLoadedRelation(relations.indexOf(relation));
          return Promise.resolve();
        }
        if (resultsFetched < 10) {
          const collection = getEntityConfig({
            collectionSlug: relation
          });
          const fieldToSearch = collection?.admin?.useAsTitle || 'id';
          let fieldToSort = collection?.defaultSort || 'id';
          if (typeof sortOptions === 'string') {
            fieldToSort = sortOptions;
          } else if (sortOptions?.[relation]) {
            fieldToSort = sortOptions[relation];
          }
          const query = {
            depth: 0,
            draft: true,
            limit: maxResultsPerRequest,
            locale,
            page: lastLoadedPageToUse,
            sort: fieldToSort,
            where: {
              and: [{
                id: {
                  not_in: relationMap[relation]
                }
              }]
            }
          };
          if (searchArg) {
            query.where.and.push({
              [fieldToSearch]: {
                like: searchArg
              }
            });
          }
          if (relationFilterOption && typeof relationFilterOption !== 'boolean') {
            query.where.and.push(relationFilterOption);
          }
          const response = await fetch(`${serverURL}${api}/${relation}`, {
            body: qs.stringify(query),
            credentials: 'include',
            headers: {
              'Accept-Language': i18n.language,
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-HTTP-Method-Override': 'GET'
            },
            method: 'POST'
          });
          if (response.ok) {
            const data = await response.json();
            setLastLoadedPage(prevState => {
              return {
                ...prevState,
                [relation]: lastLoadedPageToUse
              };
            });
            if (!data.nextPage) {
              setLastFullyLoadedRelation(relations.indexOf(relation));
            }
            if (data.docs.length > 0) {
              resultsFetched += data.docs.length;
              dispatchOptions({
                type: 'ADD',
                collection,
                config,
                docs: data.docs,
                i18n,
                sort
              });
            }
          } else if (response.status === 403) {
            setLastFullyLoadedRelation(relations.indexOf(relation));
            dispatchOptions({
              type: 'ADD',
              collection,
              config,
              docs: [],
              i18n,
              ids: relationMap[relation],
              sort
            });
          } else {
            setErrorLoading(t('error:unspecific'));
          }
        }
      }, Promise.resolve());
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  }, [permissions, relationTo, hasMany, errorLoading, search, getEntityConfig, locale, serverURL, sortOptions, api, i18n, config, t]);
  const updateSearch = useDebouncedCallback((searchArg_0, valueArg_0) => {
    void getResults({
      filterOptions,
      lastLoadedPage: {},
      search: searchArg_0,
      sort: true,
      value: valueArg_0
    });
    setSearch(searchArg_0);
  }, 300);
  const handleInputChange = useCallback((searchArg_1, valueArg_1) => {
    if (search !== searchArg_1) {
      setLastLoadedPage({});
      updateSearch(searchArg_1, valueArg_1, searchArg_1 !== '');
    }
  }, [search, updateSearch]);
  const handleValueChange = useEffectEvent(value_1 => {
    const relationMap_0 = createRelationMap({
      hasMany,
      relationTo,
      value: value_1
    });
    void Object.entries(relationMap_0).reduce(async (priorRelation_0, [relation_0, ids]) => {
      await priorRelation_0;
      const idsToLoad = ids.filter(id => {
        return !options.find(optionGroup => optionGroup?.options?.find(option => option.value === id && option.relationTo === relation_0));
      });
      if (idsToLoad.length > 0) {
        const query_0 = {
          depth: 0,
          draft: true,
          limit: idsToLoad.length,
          locale,
          where: {
            id: {
              in: idsToLoad
            }
          }
        };
        if (!errorLoading) {
          const response_0 = await fetch(`${serverURL}${api}/${relation_0}`, {
            body: qs.stringify(query_0),
            credentials: 'include',
            headers: {
              'Accept-Language': i18n.language,
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-HTTP-Method-Override': 'GET'
            },
            method: 'POST'
          });
          const collection_0 = getEntityConfig({
            collectionSlug: relation_0
          });
          let docs = [];
          if (response_0.ok) {
            const data_0 = await response_0.json();
            docs = data_0.docs;
          }
          dispatchOptions({
            type: 'ADD',
            collection: collection_0,
            config,
            docs,
            i18n,
            ids: idsToLoad,
            sort: true
          });
        }
      }
    }, Promise.resolve());
  });
  const prevValue = useRef(value_0);
  const isFirstRenderRef = useRef(true);
  // ///////////////////////////////////
  // Ensure we have an option for each value
  // ///////////////////////////////////
  useEffect(() => {
    if (isFirstRenderRef.current || !dequal(value_0, prevValue.current)) {
      handleValueChange(value_0);
    }
    isFirstRenderRef.current = false;
    prevValue.current = value_0;
  }, [value_0]);
  // Determine if we should switch to word boundary search
  useEffect(() => {
    const relations_0 = Array.isArray(relationTo) ? relationTo : [relationTo];
    const isIdOnly = relations_0.reduce((idOnly, relation_1) => {
      const collection_1 = getEntityConfig({
        collectionSlug: relation_1
      });
      const fieldToSearch_0 = collection_1?.admin?.useAsTitle || 'id';
      return fieldToSearch_0 === 'id' && idOnly;
    }, true);
    setEnableWordBoundarySearch(!isIdOnly);
  }, [relationTo, getEntityConfig]);
  const getResultsEffectEvent = useEffectEvent(async args => {
    return await getResults(args);
  });
  // When (`relationTo` || `filterOptions` || `locale`) changes, reset component
  // Note - effect should not run on first run
  useEffect(() => {
    // If the menu is open while filterOptions changes
    // due to latency of form state and fast clicking into this field,
    // re-fetch options
    if (hasLoadedFirstPageRef.current && menuIsOpen) {
      setIsLoading(true);
      void getResultsEffectEvent({
        filterOptions,
        lastLoadedPage: {},
        onSuccess: () => {
          hasLoadedFirstPageRef.current = true;
          setIsLoading(false);
        },
        value: valueRef.current
      });
    }
    // If the menu is not open, still reset the field state
    // because we need to get new options next time the menu opens
    dispatchOptions({
      type: 'CLEAR',
      exemptValues: valueRef.current
    });
    setLastFullyLoadedRelation(-1);
    setLastLoadedPage({});
  }, [relationTo, filterOptions, locale, path, menuIsOpen]);
  const onSave = useCallback(args_0 => {
    dispatchOptions({
      type: 'UPDATE',
      collection: args_0.collectionConfig,
      config,
      doc: args_0.doc,
      i18n
    });
    const currentValue = valueRef.current;
    const docID = args_0.doc.id;
    if (hasMany) {
      const unchanged = currentValue.some(option_0 => typeof option_0 === 'string' ? option_0 === docID : option_0.value === docID);
      const valuesToSet = currentValue.map(option_1 => option_1.value === docID ? {
        relationTo: args_0.collectionConfig.slug,
        value: docID
      } : option_1);
      setValue(valuesToSet, unchanged);
    } else {
      const unchanged_0 = currentValue === docID;
      setValue({
        relationTo: args_0.collectionConfig.slug,
        value: docID
      }, unchanged_0);
    }
  }, [i18n, config, hasMany, setValue]);
  const onDuplicate = useCallback(args_1 => {
    dispatchOptions({
      type: 'ADD',
      collection: args_1.collectionConfig,
      config,
      docs: [args_1.doc],
      i18n,
      sort: true
    });
    if (hasMany) {
      setValue(valueRef.current ? valueRef.current.concat({
        relationTo: args_1.collectionConfig.slug,
        value: args_1.doc.id
      }) : null);
    } else {
      setValue({
        relationTo: args_1.collectionConfig.slug,
        value: args_1.doc.id
      });
    }
  }, [i18n, config, hasMany, setValue]);
  const onDelete = useCallback(args_2 => {
    dispatchOptions({
      id: args_2.id,
      type: 'REMOVE',
      collection: args_2.collectionConfig,
      config,
      i18n
    });
    if (hasMany) {
      setValue(valueRef.current ? valueRef.current.filter(option_2 => {
        return option_2.value !== args_2.id;
      }) : null);
    } else {
      setValue(null);
    }
    return;
  }, [i18n, config, hasMany, setValue]);
  const filterOption = useCallback((item, searchFilter) => {
    if (!searchFilter) {
      return true;
    }
    const r = wordBoundariesRegex(searchFilter || '');
    // breaking the labels to search into smaller parts increases performance
    const breakApartThreshold = 250;
    let labelString = String(item.label);
    // strings less than breakApartThreshold length won't be chunked
    while (labelString.length > breakApartThreshold) {
      // slicing by the next space after the length of the search input prevents slicing the string up by partial words
      const indexOfSpace = labelString.indexOf(' ', searchFilter.length);
      if (r.test(labelString.slice(0, indexOfSpace === -1 ? searchFilter.length : indexOfSpace + 1))) {
        return true;
      }
      labelString = labelString.slice(indexOfSpace === -1 ? searchFilter.length : indexOfSpace + 1);
    }
    return r.test(labelString.slice(-breakApartThreshold));
  }, []);
  const onDocumentDrawerOpen = useCallback(({
    id: id_0,
    collectionSlug,
    hasReadPermission
  }) => {
    openDrawerWhenRelationChanges.current = true;
    setCurrentlyOpenRelationship({
      id: id_0,
      collectionSlug,
      hasReadPermission
    });
  }, []);
  useEffect(() => {
    if (openDrawerWhenRelationChanges.current) {
      openDrawer();
      openDrawerWhenRelationChanges.current = false;
    }
  }, [openDrawer, currentlyOpenRelationship]);
  const valueToRender = findOptionsByValue({
    allowEdit,
    options,
    value: value_0
  });
  if (!Array.isArray(valueToRender) && valueToRender?.value === 'null') {
    valueToRender.value = null;
  }
  const styles = useMemo(() => mergeFieldStyles(field), [field]);
  return /*#__PURE__*/_jsxs("div", {
    className: [fieldBaseClass, baseClass, className, showError && 'error', errorLoading && 'error-loading', (readOnly || disabled) && `${baseClass}--read-only`, !(readOnly || disabled) && allowCreate && `${baseClass}--allow-create`].filter(Boolean).join(' '),
    id: `field-${path.replace(/\./g, '__')}`,
    style: styles,
    children: [/*#__PURE__*/_jsx(RenderCustomComponent, {
      CustomComponent: Label,
      Fallback: /*#__PURE__*/_jsx(FieldLabel, {
        label: label,
        localized: localized,
        path: path,
        required: required
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: `${fieldBaseClass}__wrap`,
      children: [/*#__PURE__*/_jsx(RenderCustomComponent, {
        CustomComponent: Error,
        Fallback: /*#__PURE__*/_jsx(FieldError, {
          path: path,
          showError: showError
        })
      }), BeforeInput, !errorLoading && /*#__PURE__*/_jsxs("div", {
        className: `${baseClass}__wrap`,
        children: [/*#__PURE__*/_jsx(ReactSelect, {
          backspaceRemovesValue: !isDrawerOpen,
          components: {
            MultiValueLabel,
            SingleValue
          },
          customProps: {
            disableKeyDown: isDrawerOpen,
            disableMouseDown: isDrawerOpen,
            onDocumentDrawerOpen,
            onSave
          },
          disabled: readOnly || disabled || isDrawerOpen,
          filterOption: enableWordBoundarySearch ? filterOption : undefined,
          getOptionValue: option_3 => {
            if (!option_3) {
              return undefined;
            }
            return hasMany && Array.isArray(relationTo) ? `${option_3.relationTo}_${option_3.value}` : option_3.value;
          },
          isLoading: isLoading,
          isMulti: hasMany,
          isSortable: isSortable,
          onChange: !(readOnly || disabled) ? selected => {
            if (selected === null) {
              setValue(hasMany ? [] : null);
            } else if (hasMany && Array.isArray(selected)) {
              setValue(selected ? selected.map(option_4 => {
                if (hasMultipleRelations) {
                  return {
                    relationTo: option_4.relationTo,
                    value: option_4.value
                  };
                }
                return option_4.value;
              }) : null);
            } else if (hasMultipleRelations && !Array.isArray(selected)) {
              setValue({
                relationTo: selected.relationTo,
                value: selected.value
              });
            } else if (!Array.isArray(selected)) {
              setValue(selected.value);
            }
          } : undefined,
          onInputChange: newSearch => handleInputChange(newSearch, value_0),
          onMenuClose: () => {
            setMenuIsOpen(false);
          },
          onMenuOpen: () => {
            setMenuIsOpen(true);
            if (!hasLoadedFirstPageRef.current) {
              setIsLoading(true);
              void getResults({
                filterOptions,
                lastLoadedPage: {},
                onSuccess: () => {
                  hasLoadedFirstPageRef.current = true;
                  setIsLoading(false);
                },
                value: initialValue
              });
            }
          },
          onMenuScrollToBottom: () => {
            void getResults({
              filterOptions,
              lastFullyLoadedRelation,
              lastLoadedPage,
              search,
              sort: false,
              value: initialValue
            });
          },
          options: options,
          showError: showError,
          value: valueToRender ?? null
        }), !(readOnly || disabled) && allowCreate && /*#__PURE__*/_jsx(AddNewRelation, {
          hasMany: hasMany,
          path: path,
          relationTo: relationTo,
          setValue: setValue,
          value: value_0
        })]
      }), errorLoading && /*#__PURE__*/_jsx("div", {
        className: `${baseClass}__error-loading`,
        children: errorLoading
      }), AfterInput, /*#__PURE__*/_jsx(RenderCustomComponent, {
        CustomComponent: Description,
        Fallback: /*#__PURE__*/_jsx(FieldDescription, {
          description: description,
          path: path
        })
      })]
    }), currentlyOpenRelationship.collectionSlug && currentlyOpenRelationship.hasReadPermission && /*#__PURE__*/_jsx(DocumentDrawer, {
      onDelete: onDelete,
      onDuplicate: onDuplicate,
      onSave: onSave
    })]
  });
};
export const RelationshipField = withCondition(RelationshipFieldComponent);
//# sourceMappingURL=index.js.map