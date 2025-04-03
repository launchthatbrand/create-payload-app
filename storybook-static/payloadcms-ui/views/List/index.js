'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import { formatFilesize, isNumber } from 'payload/shared';
import React, { Fragment, useEffect, useState } from 'react';
import { useBulkUpload } from '../../elements/BulkUpload/index.js';
import { Button } from '../../elements/Button/index.js';
import { Gutter } from '../../elements/Gutter/index.js';
import { ListControls } from '../../elements/ListControls/index.js';
import { useListDrawerContext } from '../../elements/ListDrawer/Provider.js';
import { ListSelection } from '../../elements/ListSelection/index.js';
import { useModal } from '../../elements/Modal/index.js';
import { Pagination } from '../../elements/Pagination/index.js';
import { PerPage } from '../../elements/PerPage/index.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { SelectMany } from '../../elements/SelectMany/index.js';
import { useStepNav } from '../../elements/StepNav/index.js';
import { RelationshipProvider } from '../../elements/Table/RelationshipProvider/index.js';
import { ViewDescription } from '../../elements/ViewDescription/index.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useListQuery } from '../../providers/ListQuery/index.js';
import { SelectionProvider } from '../../providers/Selection/index.js';
import { TableColumnsProvider } from '../../providers/TableColumns/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { useWindowInfo } from '../../providers/WindowInfo/index.js';
import { ListHeader } from './ListHeader/index.js';
import './index.scss';
const baseClass = 'collection-list';
export function DefaultListView(props) {
  const $ = _c(17);
  const {
    AfterList,
    AfterListTable,
    beforeActions,
    BeforeList,
    BeforeListTable,
    collectionSlug,
    columnState,
    Description,
    disableBulkDelete,
    disableBulkEdit,
    disableQueryPresets,
    enableRowSelections,
    hasCreatePermission: hasCreatePermissionFromProps,
    listMenuItems,
    newDocumentURL,
    queryPreset,
    queryPresetPermissions,
    renderedFilters,
    resolvedFilterOptions,
    Table: InitialTable
  } = props;
  const [Table, setTable] = useState(InitialTable);
  const {
    allowCreate,
    createNewDrawerSlug,
    drawerSlug: listDrawerSlug,
    onBulkSelect
  } = useListDrawerContext();
  const hasCreatePermission = allowCreate !== undefined ? allowCreate && hasCreatePermissionFromProps : hasCreatePermissionFromProps;
  let t0;
  let t1;
  if ($[0] !== InitialTable) {
    t0 = () => {
      if (InitialTable) {
        setTable(InitialTable);
      }
    };
    t1 = [InitialTable];
    $[0] = InitialTable;
    $[1] = t0;
    $[2] = t1;
  } else {
    t0 = $[1];
    t1 = $[2];
  }
  useEffect(t0, t1);
  const {
    user
  } = useAuth();
  const {
    getEntityConfig
  } = useConfig();
  const router = useRouter();
  const {
    data,
    defaultLimit: initialLimit,
    handlePageChange,
    handlePerPageChange,
    query
  } = useListQuery();
  const {
    openModal
  } = useModal();
  const {
    setCollectionSlug,
    setCurrentActivePath,
    setOnSuccess
  } = useBulkUpload();
  const {
    drawerSlug: bulkUploadDrawerSlug
  } = useBulkUpload();
  const collectionConfig = getEntityConfig({
    collectionSlug
  });
  const {
    labels,
    upload
  } = collectionConfig;
  const isUploadCollection = Boolean(upload);
  const isBulkUploadEnabled = isUploadCollection && collectionConfig.upload.bulkUpload;
  const isInDrawer = Boolean(listDrawerSlug);
  const {
    i18n,
    t
  } = useTranslation();
  const {
    setStepNav
  } = useStepNav();
  const {
    breakpoints: t2
  } = useWindowInfo();
  const {
    s: smallBreak
  } = t2;
  let t3;
  if (isUploadCollection) {
    let t4;
    if ($[3] !== data.docs) {
      t4 = data.docs.map(_temp);
      $[3] = data.docs;
      $[4] = t4;
    } else {
      t4 = $[4];
    }
    t3 = t4;
  } else {
    t3 = data.docs;
  }
  const docs = t3;
  let t4;
  if ($[5] !== bulkUploadDrawerSlug || $[6] !== collectionSlug || $[7] !== openModal || $[8] !== router || $[9] !== setCollectionSlug || $[10] !== setCurrentActivePath || $[11] !== setOnSuccess) {
    t4 = () => {
      setCollectionSlug(collectionSlug);
      setCurrentActivePath(collectionSlug);
      openModal(bulkUploadDrawerSlug);
      setOnSuccess(collectionSlug, () => router.refresh());
    };
    $[5] = bulkUploadDrawerSlug;
    $[6] = collectionSlug;
    $[7] = openModal;
    $[8] = router;
    $[9] = setCollectionSlug;
    $[10] = setCurrentActivePath;
    $[11] = setOnSuccess;
    $[12] = t4;
  } else {
    t4 = $[12];
  }
  const openBulkUpload = t4;
  useEffect(() => {
    if (!isInDrawer) {
      setStepNav([{
        label: labels?.plural
      }]);
    }
  }, [setStepNav, labels, isInDrawer]);
  let t5;
  if ($[13] !== beforeActions || $[14] !== enableRowSelections || $[15] !== onBulkSelect) {
    t5 = enableRowSelections && typeof onBulkSelect === "function" ? beforeActions ? [...beforeActions, _jsx(SelectMany, {
      onClick: onBulkSelect
    }, "select-many")] : [_jsx(SelectMany, {
      onClick: onBulkSelect
    }, "select-many")] : beforeActions;
    $[13] = beforeActions;
    $[14] = enableRowSelections;
    $[15] = onBulkSelect;
    $[16] = t5;
  } else {
    t5 = $[16];
  }
  return _jsx(Fragment, {
    children: _jsx(TableColumnsProvider, {
      collectionSlug,
      columnState,
      children: _jsx("div", {
        className: `${baseClass} ${baseClass}--${collectionSlug}`,
        children: _jsxs(SelectionProvider, {
          docs,
          totalDocs: data.totalDocs,
          user,
          children: [BeforeList, _jsxs(Gutter, {
            className: `${baseClass}__wrap`,
            children: [_jsx(ListHeader, {
              collectionConfig,
              Description: _jsx("div", {
                className: `${baseClass}__sub-header`,
                children: _jsx(RenderCustomComponent, {
                  CustomComponent: Description,
                  Fallback: _jsx(ViewDescription, {
                    collectionSlug,
                    description: collectionConfig?.admin?.description
                  })
                })
              }),
              disableBulkDelete,
              disableBulkEdit,
              hasCreatePermission,
              i18n,
              isBulkUploadEnabled: isBulkUploadEnabled && !upload.hideFileInputOnCreate,
              newDocumentURL,
              openBulkUpload,
              smallBreak,
              t
            }), _jsx(ListControls, {
              beforeActions: t5,
              collectionConfig,
              collectionSlug,
              disableQueryPresets: collectionConfig?.enableQueryPresets !== true || disableQueryPresets,
              listMenuItems,
              queryPreset,
              queryPresetPermissions,
              renderedFilters,
              resolvedFilterOptions
            }), BeforeListTable, docs.length > 0 && _jsx(RelationshipProvider, {
              children: Table
            }), docs.length === 0 && _jsxs("div", {
              className: `${baseClass}__no-results`,
              children: [_jsx("p", {
                children: i18n.t("general:noResults", {
                  label: getTranslation(labels?.plural, i18n)
                })
              }), hasCreatePermission && newDocumentURL && _jsx(Fragment, {
                children: isInDrawer ? _jsx(Button, {
                  el: "button",
                  onClick: () => openModal(createNewDrawerSlug),
                  children: i18n.t("general:createNewLabel", {
                    label: getTranslation(labels?.singular, i18n)
                  })
                }) : _jsx(Button, {
                  el: "link",
                  to: newDocumentURL,
                  children: i18n.t("general:createNewLabel", {
                    label: getTranslation(labels?.singular, i18n)
                  })
                })
              })]
            }), AfterListTable, docs.length > 0 && _jsxs("div", {
              className: `${baseClass}__page-controls`,
              children: [_jsx(Pagination, {
                hasNextPage: data.hasNextPage,
                hasPrevPage: data.hasPrevPage,
                limit: data.limit,
                nextPage: data.nextPage,
                numberOfNeighbors: 1,
                onChange: page => void handlePageChange(page),
                page: data.page,
                prevPage: data.prevPage,
                totalPages: data.totalPages
              }), data.totalDocs > 0 && _jsxs(Fragment, {
                children: [_jsxs("div", {
                  className: `${baseClass}__page-info`,
                  children: [data.page * data.limit - (data.limit - 1), "-", data.totalPages > 1 && data.totalPages !== data.page ? data.limit * data.page : data.totalDocs, " ", i18n.t("general:of"), " ", data.totalDocs]
                }), _jsx(PerPage, {
                  handleChange: limit => void handlePerPageChange(limit),
                  limit: isNumber(query?.limit) ? Number(query.limit) : initialLimit,
                  limits: collectionConfig?.admin?.pagination?.limits,
                  resetPage: data.totalDocs <= data.pagingCounter
                }), smallBreak && _jsxs("div", {
                  className: `${baseClass}__list-selection`,
                  children: [_jsx(ListSelection, {
                    collectionConfig,
                    disableBulkDelete,
                    disableBulkEdit,
                    label: getTranslation(collectionConfig.labels.plural, i18n)
                  }), _jsx("div", {
                    className: `${baseClass}__list-selection-actions`,
                    children: enableRowSelections && typeof onBulkSelect === "function" ? beforeActions ? [...beforeActions, _jsx(SelectMany, {
                      onClick: onBulkSelect
                    }, "select-many")] : [_jsx(SelectMany, {
                      onClick: onBulkSelect
                    }, "select-many")] : beforeActions
                  })]
                })]
              })]
            })]
          }), AfterList]
        })
      })
    })
  });
}
function _temp(doc) {
  return {
    ...doc,
    filesize: formatFilesize(doc.filesize)
  };
}
//# sourceMappingURL=index.js.map