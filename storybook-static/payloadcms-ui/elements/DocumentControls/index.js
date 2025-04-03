'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { formatAdminURL } from 'payload/shared';
import React, { Fragment, useEffect } from 'react';
import { useFormInitializing, useFormProcessing } from '../../forms/Form/context.js';
import { useConfig } from '../../providers/Config/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { formatDate } from '../../utilities/formatDocTitle/formatDateTitle.js';
import { Autosave } from '../Autosave/index.js';
import { Button } from '../Button/index.js';
import { CopyLocaleData } from '../CopyLocaleData/index.js';
import { DeleteDocument } from '../DeleteDocument/index.js';
import { DuplicateDocument } from '../DuplicateDocument/index.js';
import { Gutter } from '../Gutter/index.js';
import { Locked } from '../Locked/index.js';
import { Popup, PopupList } from '../Popup/index.js';
import { PreviewButton } from '../PreviewButton/index.js';
import { PublishButton } from '../PublishButton/index.js';
import { RenderCustomComponent } from '../RenderCustomComponent/index.js';
import { SaveButton } from '../SaveButton/index.js';
import { SaveDraftButton } from '../SaveDraftButton/index.js';
import { Status } from '../Status/index.js';
import './index.scss';
const baseClass = 'doc-controls';
export const DocumentControls = props => {
  const $ = _c(15);
  const {
    id,
    slug,
    customComponents: t0,
    data,
    disableActions,
    disableCreate,
    hasSavePermission,
    isAccountView,
    isEditing,
    onDelete,
    onDrawerCreateNew,
    onDuplicate,
    onTakeOver,
    permissions,
    readOnlyForIncomingUser,
    redirectAfterDelete,
    redirectAfterDuplicate,
    user
  } = props;
  let t1;
  if ($[0] !== t0) {
    t1 = t0 === undefined ? {} : t0;
    $[0] = t0;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const {
    PreviewButton: CustomPreviewButton,
    PublishButton: CustomPublishButton,
    SaveButton: CustomSaveButton,
    SaveDraftButton: CustomSaveDraftButton
  } = t1;
  const {
    i18n,
    t
  } = useTranslation();
  const editDepth = useEditDepth();
  const {
    config,
    getEntityConfig
  } = useConfig();
  const collectionConfig = getEntityConfig({
    collectionSlug: slug
  });
  const globalConfig = getEntityConfig({
    globalSlug: slug
  });
  const {
    admin: t2,
    localization,
    routes: t3
  } = config;
  const {
    dateFormat
  } = t2;
  const {
    admin: adminRoute
  } = t3;
  const [updatedAt, setUpdatedAt] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState("");
  const processing = useFormProcessing();
  const initializing = useFormInitializing();
  let t4;
  let t5;
  if ($[2] !== data || $[3] !== dateFormat || $[4] !== i18n) {
    t4 = () => {
      if (data?.updatedAt) {
        setUpdatedAt(formatDate({
          date: data.updatedAt,
          i18n,
          pattern: dateFormat
        }));
      }
      if (data?.createdAt) {
        setCreatedAt(formatDate({
          date: data.createdAt,
          i18n,
          pattern: dateFormat
        }));
      }
    };
    t5 = [data, i18n, dateFormat];
    $[2] = data;
    $[3] = dateFormat;
    $[4] = i18n;
    $[5] = t4;
    $[6] = t5;
  } else {
    t4 = $[5];
    t5 = $[6];
  }
  useEffect(t4, t5);
  const hasCreatePermission = permissions && "create" in permissions && permissions.create;
  const hasDeletePermission = permissions && "delete" in permissions && permissions.delete;
  const showDotMenu = Boolean(collectionConfig && id && !disableActions && (hasCreatePermission || hasDeletePermission));
  const unsavedDraftWithValidations = !id && collectionConfig?.versions?.drafts && collectionConfig.versions?.drafts.validate;
  const autosaveEnabled = collectionConfig?.versions?.drafts && collectionConfig?.versions?.drafts?.autosave || globalConfig?.versions?.drafts && globalConfig?.versions?.drafts?.autosave;
  const showCopyToLocale = localization && !collectionConfig?.admin?.disableCopyToLocale;
  let t6;
  if ($[7] !== readOnlyForIncomingUser || $[8] !== user) {
    t6 = user && readOnlyForIncomingUser && _jsx(Locked, {
      className: `${baseClass}__locked-controls`,
      user
    });
    $[7] = readOnlyForIncomingUser;
    $[8] = user;
    $[9] = t6;
  } else {
    t6 = $[9];
  }
  let t7;
  if ($[10] !== onTakeOver || $[11] !== readOnlyForIncomingUser || $[12] !== t || $[13] !== user) {
    t7 = user && readOnlyForIncomingUser && _jsx(Button, {
      buttonStyle: "secondary",
      id: "take-over",
      onClick: onTakeOver,
      size: "medium",
      type: "button",
      children: t("general:takeOver")
    });
    $[10] = onTakeOver;
    $[11] = readOnlyForIncomingUser;
    $[12] = t;
    $[13] = user;
    $[14] = t7;
  } else {
    t7 = $[14];
  }
  return _jsxs(Gutter, {
    className: baseClass,
    children: [_jsxs("div", {
      className: `${baseClass}__wrapper`,
      children: [_jsx("div", {
        className: `${baseClass}__content`,
        children: _jsxs("ul", {
          className: `${baseClass}__meta`,
          children: [collectionConfig && !isEditing && !isAccountView && _jsx("li", {
            className: `${baseClass}__list-item`,
            children: _jsx("p", {
              className: `${baseClass}__value`,
              children: i18n.t("general:creatingNewLabel", {
                label: getTranslation(collectionConfig?.labels?.singular ?? i18n.t("general:document"), i18n)
              })
            })
          }), t6, (collectionConfig?.versions?.drafts || globalConfig?.versions?.drafts) && _jsxs(Fragment, {
            children: [(globalConfig || collectionConfig && isEditing) && _jsx("li", {
              className: [`${baseClass}__status`, `${baseClass}__list-item`].filter(Boolean).join(" "),
              children: _jsx(Status, {})
            }), hasSavePermission && autosaveEnabled && !unsavedDraftWithValidations && _jsx("li", {
              className: `${baseClass}__list-item`,
              children: _jsx(Autosave, {
                collection: collectionConfig,
                global: globalConfig,
                id,
                publishedDocUpdatedAt: data?.createdAt
              })
            })]
          }), collectionConfig?.timestamps && (isEditing || isAccountView) && _jsxs(Fragment, {
            children: [_jsxs("li", {
              className: [`${baseClass}__list-item`, `${baseClass}__value-wrap`].filter(Boolean).join(" "),
              title: data?.updatedAt ? updatedAt : "",
              children: [_jsxs("p", {
                className: `${baseClass}__label`,
                children: [i18n.t("general:lastModified"), ":\xA0"]
              }), data?.updatedAt && _jsx("p", {
                className: `${baseClass}__value`,
                children: updatedAt
              })]
            }), _jsxs("li", {
              className: [`${baseClass}__list-item`, `${baseClass}__value-wrap`].filter(Boolean).join(" "),
              title: data?.createdAt ? createdAt : "",
              children: [_jsxs("p", {
                className: `${baseClass}__label`,
                children: [i18n.t("general:created"), ":\xA0"]
              }), data?.createdAt && _jsx("p", {
                className: `${baseClass}__value`,
                children: createdAt
              })]
            })]
          })]
        })
      }), _jsxs("div", {
        className: `${baseClass}__controls-wrapper`,
        children: [_jsxs("div", {
          className: `${baseClass}__controls`,
          children: [(collectionConfig?.admin.preview || globalConfig?.admin.preview) && _jsx(RenderCustomComponent, {
            CustomComponent: CustomPreviewButton,
            Fallback: _jsx(PreviewButton, {})
          }), hasSavePermission && _jsx(Fragment, {
            children: collectionConfig?.versions?.drafts || globalConfig?.versions?.drafts ? _jsxs(Fragment, {
              children: [(unsavedDraftWithValidations || !autosaveEnabled) && _jsx(RenderCustomComponent, {
                CustomComponent: CustomSaveDraftButton,
                Fallback: _jsx(SaveDraftButton, {})
              }), _jsx(RenderCustomComponent, {
                CustomComponent: CustomPublishButton,
                Fallback: _jsx(PublishButton, {})
              })]
            }) : _jsx(RenderCustomComponent, {
              CustomComponent: CustomSaveButton,
              Fallback: _jsx(SaveButton, {})
            })
          }), t7]
        }), showDotMenu && !readOnlyForIncomingUser && _jsx(Popup, {
          button: _jsxs("div", {
            className: `${baseClass}__dots`,
            children: [_jsx("div", {}), _jsx("div", {}), _jsx("div", {})]
          }),
          className: `${baseClass}__popup`,
          disabled: initializing || processing,
          horizontalAlign: "right",
          size: "large",
          verticalAlign: "bottom",
          children: _jsxs(PopupList.ButtonGroup, {
            children: [showCopyToLocale && _jsx(CopyLocaleData, {}), hasCreatePermission && _jsxs(React.Fragment, {
              children: [!disableCreate && _jsx(Fragment, {
                children: editDepth > 1 ? _jsx(PopupList.Button, {
                  id: "action-create",
                  onClick: onDrawerCreateNew,
                  children: i18n.t("general:createNew")
                }) : _jsx(PopupList.Button, {
                  href: formatAdminURL({
                    adminRoute,
                    path: `/collections/${collectionConfig?.slug}/create`
                  }),
                  id: "action-create",
                  children: i18n.t("general:createNew")
                })
              }), collectionConfig.disableDuplicate !== true && isEditing && _jsx(DuplicateDocument, {
                id: id.toString(),
                onDuplicate,
                redirectAfterDuplicate,
                singularLabel: collectionConfig?.labels?.singular,
                slug: collectionConfig?.slug
              })]
            }), hasDeletePermission && _jsx(DeleteDocument, {
              buttonId: "action-delete",
              collectionSlug: collectionConfig?.slug,
              id: id.toString(),
              onDelete,
              redirectAfterDelete,
              singularLabel: collectionConfig?.labels?.singular,
              useAsTitle: collectionConfig?.admin?.useAsTitle
            })]
          })
        })]
      })]
    }), _jsx("div", {
      className: `${baseClass}__divider`
    })]
  });
};
//# sourceMappingURL=index.js.map