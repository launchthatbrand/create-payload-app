import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { Button } from '../../../elements/Button/index.js';
import { useListDrawerContext } from '../../../elements/ListDrawer/Provider.js';
import { ListSelection } from '../../../elements/ListSelection/index.js';
import { Pill } from '../../../elements/Pill/index.js';
import { ReactSelect } from '../../../elements/ReactSelect/index.js';
import { FieldLabel } from '../../../fields/FieldLabel/index.js';
import { XIcon } from '../../../icons/X/index.js';
import { useConfig } from '../../../providers/Config/index.js';
import './index.scss';
const baseClass = 'list-header';
const drawerBaseClass = 'list-drawer';
const DefaultListHeader = ({
  className,
  collectionConfig,
  Description,
  disableBulkDelete,
  disableBulkEdit,
  hasCreatePermission,
  i18n,
  isBulkUploadEnabled,
  newDocumentURL,
  openBulkUpload,
  smallBreak,
  t
}) => {
  return /*#__PURE__*/_jsxs("header", {
    className: [baseClass, className].filter(Boolean).join(' '),
    children: [/*#__PURE__*/_jsx("h1", {
      children: getTranslation(collectionConfig?.labels?.plural, i18n)
    }), hasCreatePermission && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Button, {
        "aria-label": i18n.t('general:createNewLabel', {
          label: getTranslation(collectionConfig?.labels?.singular, i18n)
        }),
        buttonStyle: "pill",
        el: 'link',
        size: "small",
        to: newDocumentURL,
        children: i18n.t('general:createNew')
      }), isBulkUploadEnabled && /*#__PURE__*/_jsx(Button, {
        "aria-label": t('upload:bulkUpload'),
        buttonStyle: "pill",
        onClick: openBulkUpload,
        size: "small",
        children: t('upload:bulkUpload')
      })]
    }), !smallBreak && /*#__PURE__*/_jsx(ListSelection, {
      collectionConfig: collectionConfig,
      disableBulkDelete: disableBulkDelete,
      disableBulkEdit: disableBulkEdit,
      label: getTranslation(collectionConfig?.labels?.plural, i18n)
    }), Description]
  });
};
const ListDrawerHeader = ({
  Description,
  hasCreatePermission,
  i18n,
  t
}) => {
  const {
    config: {
      collections
    },
    getEntityConfig
  } = useConfig();
  const {
    closeModal
  } = useModal();
  const {
    DocumentDrawerToggler,
    drawerSlug,
    enabledCollections,
    selectedOption,
    setSelectedOption
  } = useListDrawerContext();
  const collectionConfig = getEntityConfig({
    collectionSlug: selectedOption.value
  });
  const enabledCollectionConfigs = collections.filter(({
    slug
  }) => enabledCollections.includes(slug));
  const moreThanOneAvailableCollection = enabledCollections.length > 1;
  return /*#__PURE__*/_jsxs("header", {
    className: `${drawerBaseClass}__header`,
    children: [/*#__PURE__*/_jsxs("div", {
      className: `${drawerBaseClass}__header-wrap`,
      children: [/*#__PURE__*/_jsxs("div", {
        className: `${drawerBaseClass}__header-content`,
        children: [/*#__PURE__*/_jsx("h2", {
          className: `${drawerBaseClass}__header-text`,
          children: getTranslation(collectionConfig?.labels?.plural, i18n)
        }), hasCreatePermission && /*#__PURE__*/_jsx(DocumentDrawerToggler, {
          className: `${drawerBaseClass}__create-new-button`,
          children: /*#__PURE__*/_jsx(Pill, {
            children: t('general:createNew')
          })
        })]
      }), /*#__PURE__*/_jsx("button", {
        "aria-label": t('general:close'),
        className: `${drawerBaseClass}__header-close`,
        onClick: () => {
          closeModal(drawerSlug);
        },
        type: "button",
        children: /*#__PURE__*/_jsx(XIcon, {})
      })]
    }), Description, moreThanOneAvailableCollection && /*#__PURE__*/_jsxs("div", {
      className: `${drawerBaseClass}__select-collection-wrap`,
      children: [/*#__PURE__*/_jsx(FieldLabel, {
        label: t('upload:selectCollectionToBrowse')
      }), /*#__PURE__*/_jsx(ReactSelect, {
        className: `${baseClass}__select-collection`,
        onChange: setSelectedOption,
        options: enabledCollectionConfigs.map(coll => ({
          label: getTranslation(coll.labels.singular, i18n),
          value: coll.slug
        })),
        value: {
          label: getTranslation(collectionConfig?.labels.singular, i18n),
          value: collectionConfig?.slug
        }
      })]
    })]
  });
};
export const ListHeader = props => {
  const {
    isInDrawer
  } = useListDrawerContext();
  if (isInDrawer) {
    return /*#__PURE__*/_jsx(ListDrawerHeader, {
      ...props
    });
  }
  return /*#__PURE__*/_jsx(DefaultListHeader, {
    ...props
  });
};
//# sourceMappingURL=index.js.map