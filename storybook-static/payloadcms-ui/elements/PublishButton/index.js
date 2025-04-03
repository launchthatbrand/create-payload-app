'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import * as qs from 'qs-esm';
import React, { useCallback } from 'react';
import { useForm, useFormModified } from '../../forms/Form/context.js';
import { FormSubmit } from '../../forms/Submit/index.js';
import { useHotkey } from '../../hooks/useHotkey.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { PopupList } from '../Popup/index.js';
import { ScheduleDrawer } from './ScheduleDrawer/index.js';
export function PublishButton(t0) {
  const $ = _c(74);
  const {
    label: labelProp
  } = t0;
  const {
    id,
    collectionSlug,
    docConfig,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
    unpublishedVersionCount,
    uploadStatus
  } = useDocumentInfo();
  const {
    config,
    getEntityConfig
  } = useConfig();
  const {
    submit
  } = useForm();
  const modified = useFormModified();
  const editDepth = useEditDepth();
  const {
    code: localeCode
  } = useLocale();
  const {
    isModalOpen,
    toggleModal
  } = useModal();
  const drawerSlug = `schedule-publish-${id}`;
  const {
    localization,
    routes: t1,
    serverURL
  } = config;
  const {
    api
  } = t1;
  const {
    t
  } = useTranslation();
  let t2;
  if ($[0] !== labelProp || $[1] !== t) {
    t2 = labelProp || t("version:publishChanges");
    $[0] = labelProp;
    $[1] = t;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const label = t2;
  let t3;
  bb0: {
    if (collectionSlug) {
      let t4;
      if ($[3] !== collectionSlug || $[4] !== getEntityConfig) {
        t4 = getEntityConfig({
          collectionSlug
        });
        $[3] = collectionSlug;
        $[4] = getEntityConfig;
        $[5] = t4;
      } else {
        t4 = $[5];
      }
      t3 = t4;
      break bb0;
    }
    if (globalSlug) {
      let t4;
      if ($[6] !== getEntityConfig || $[7] !== globalSlug) {
        t4 = getEntityConfig({
          globalSlug
        });
        $[6] = getEntityConfig;
        $[7] = globalSlug;
        $[8] = t4;
      } else {
        t4 = $[8];
      }
      t3 = t4;
      break bb0;
    }
    t3 = undefined;
  }
  const entityConfig = t3;
  const hasNewerVersions = unpublishedVersionCount > 0;
  const canPublish = hasPublishPermission && (modified || hasNewerVersions || !hasPublishedDoc) && uploadStatus !== "uploading";
  const scheduledPublishEnabled = typeof entityConfig?.versions?.drafts === "object" && entityConfig?.versions?.drafts.schedulePublish;
  const canSchedulePublish = Boolean(scheduledPublishEnabled && hasPublishPermission && (globalSlug || collectionSlug && id) && !modified);
  const operation = useOperation();
  const disabled = operation === "update" && !modified;
  let t4;
  if ($[9] !== api || $[10] !== collectionSlug || $[11] !== disabled || $[12] !== globalSlug || $[13] !== id || $[14] !== localeCode || $[15] !== serverURL || $[16] !== submit) {
    t4 = async () => {
      if (disabled) {
        return;
      }
      const search = `?locale=${localeCode}&depth=0&fallback-locale=null&draft=true`;
      let action;
      let method = "POST";
      if (collectionSlug) {
        action = `${serverURL}${api}/${collectionSlug}${id ? `/${id}` : ""}${search}`;
        if (id) {
          method = "PATCH";
        }
      }
      if (globalSlug) {
        action = `${serverURL}${api}/globals/${globalSlug}${search}`;
      }
      await submit({
        action,
        method,
        overrides: {
          _status: "draft"
        },
        skipValidation: true
      });
    };
    $[9] = api;
    $[10] = collectionSlug;
    $[11] = disabled;
    $[12] = globalSlug;
    $[13] = id;
    $[14] = localeCode;
    $[15] = serverURL;
    $[16] = submit;
    $[17] = t4;
  } else {
    t4 = $[17];
  }
  const saveDraft = t4;
  let t5;
  if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = ["s"];
    $[18] = t5;
  } else {
    t5 = $[18];
  }
  let t6;
  if ($[19] !== editDepth) {
    t6 = {
      cmdCtrlKey: true,
      editDepth,
      keyCodes: t5
    };
    $[19] = editDepth;
    $[20] = t6;
  } else {
    t6 = $[20];
  }
  let t7;
  if ($[21] !== docConfig || $[22] !== saveDraft) {
    t7 = e => {
      e.preventDefault();
      e.stopPropagation();
      if (saveDraft && docConfig.versions?.drafts && docConfig.versions?.drafts?.autosave) {
        saveDraft();
      }
    };
    $[21] = docConfig;
    $[22] = saveDraft;
    $[23] = t7;
  } else {
    t7 = $[23];
  }
  useHotkey(t6, t7);
  let t8;
  if ($[24] !== setHasPublishedDoc || $[25] !== setMostRecentVersionIsAutosaved || $[26] !== setUnpublishedVersionCount || $[27] !== submit || $[28] !== uploadStatus) {
    t8 = () => {
      if (uploadStatus === "uploading") {
        return;
      }
      submit({
        overrides: {
          _status: "published"
        }
      });
      setUnpublishedVersionCount(0);
      setMostRecentVersionIsAutosaved(false);
      setHasPublishedDoc(true);
    };
    $[24] = setHasPublishedDoc;
    $[25] = setMostRecentVersionIsAutosaved;
    $[26] = setUnpublishedVersionCount;
    $[27] = submit;
    $[28] = uploadStatus;
    $[29] = t8;
  } else {
    t8 = $[29];
  }
  const publish = t8;
  let t9;
  if ($[30] !== api || $[31] !== collectionSlug || $[32] !== globalSlug || $[33] !== id || $[34] !== serverURL || $[35] !== setHasPublishedDoc || $[36] !== submit || $[37] !== uploadStatus) {
    t9 = locale => {
      if (uploadStatus === "uploading") {
        return;
      }
      const params = qs.stringify({
        publishSpecificLocale: locale
      });
      const action_0 = `${serverURL}${api}${globalSlug ? `/globals/${globalSlug}` : `/${collectionSlug}/${id ? `${"/" + id}` : ""}`}${params ? "?" + params : ""}`;
      submit({
        action: action_0,
        overrides: {
          _status: "published"
        }
      });
      setHasPublishedDoc(true);
    };
    $[30] = api;
    $[31] = collectionSlug;
    $[32] = globalSlug;
    $[33] = id;
    $[34] = serverURL;
    $[35] = setHasPublishedDoc;
    $[36] = submit;
    $[37] = uploadStatus;
    $[38] = t9;
  } else {
    t9 = $[38];
  }
  const publishSpecificLocale = t9;
  const publishAll = !localization || localization && localization.defaultLocalePublishOption !== "active";
  let t10;
  if ($[39] !== localeCode || $[40] !== localization) {
    t10 = localization && localization?.locales.find(locale_0 => typeof locale_0 === "string" ? locale_0 === localeCode : locale_0.code === localeCode);
    $[39] = localeCode;
    $[40] = localization;
    $[41] = t10;
  } else {
    t10 = $[41];
  }
  const activeLocale = t10;
  const activeLocaleLabel = activeLocale && (typeof activeLocale.label === "string" ? activeLocale.label : activeLocale.label?.[localeCode] ?? undefined);
  let t11;
  if ($[42] !== activeLocale || $[43] !== publish || $[44] !== publishAll || $[45] !== publishSpecificLocale) {
    t11 = publishAll ? publish : () => publishSpecificLocale(activeLocale.code);
    $[42] = activeLocale;
    $[43] = publish;
    $[44] = publishAll;
    $[45] = publishSpecificLocale;
    $[46] = t11;
  } else {
    t11 = $[46];
  }
  const defaultPublish = t11;
  let t12;
  if ($[47] !== activeLocaleLabel || $[48] !== label || $[49] !== publishAll || $[50] !== t) {
    t12 = publishAll ? label : t("version:publishIn", {
      locale: activeLocaleLabel
    });
    $[47] = activeLocaleLabel;
    $[48] = label;
    $[49] = publishAll;
    $[50] = t;
    $[51] = t12;
  } else {
    t12 = $[51];
  }
  const defaultLabel = t12;
  let t13;
  if ($[52] !== activeLocale || $[53] !== publish || $[54] !== publishAll || $[55] !== publishSpecificLocale) {
    t13 = publishAll ? () => publishSpecificLocale(activeLocale.code) : publish;
    $[52] = activeLocale;
    $[53] = publish;
    $[54] = publishAll;
    $[55] = publishSpecificLocale;
    $[56] = t13;
  } else {
    t13 = $[56];
  }
  const secondaryPublish = t13;
  let t14;
  let t15;
  if ($[57] !== activeLocaleLabel || $[58] !== canPublish || $[59] !== canSchedulePublish || $[60] !== defaultLabel || $[61] !== defaultPublish || $[62] !== drawerSlug || $[63] !== hasNewerVersions || $[64] !== hasPublishPermission || $[65] !== isModalOpen || $[66] !== label || $[67] !== localization || $[68] !== publishAll || $[69] !== secondaryPublish || $[70] !== t || $[71] !== toggleModal) {
    t15 = Symbol.for("react.early_return_sentinel");
    bb1: {
      const secondaryLabel = publishAll ? t("version:publishIn", {
        locale: activeLocaleLabel
      }) : t("version:publishAllLocales");
      if (!hasPublishPermission) {
        t15 = null;
        break bb1;
      }
      t14 = _jsxs(React.Fragment, {
        children: [_jsx(FormSubmit, {
          buttonId: "action-save",
          disabled: !canPublish,
          enableSubMenu: canSchedulePublish,
          onClick: defaultPublish,
          size: "medium",
          SubMenuPopupContent: localization || canSchedulePublish ? t16 => {
            const {
              close
            } = t16;
            return _jsxs(React.Fragment, {
              children: [canSchedulePublish && _jsx(PopupList.ButtonGroup, {
                children: _jsx(PopupList.Button, {
                  id: "schedule-publish",
                  onClick: () => [toggleModal(drawerSlug), close()],
                  children: t("version:schedulePublish")
                })
              }, "schedule-publish"), localization && canPublish && _jsx(PopupList.ButtonGroup, {
                children: _jsx(PopupList.Button, {
                  id: "publish-locale",
                  onClick: secondaryPublish,
                  children: secondaryLabel
                })
              })]
            });
          } : undefined,
          type: "button",
          children: localization ? defaultLabel : label
        }), canSchedulePublish && isModalOpen(drawerSlug) && _jsx(ScheduleDrawer, {
          defaultType: !hasNewerVersions ? "unpublish" : "publish",
          slug: drawerSlug
        })]
      });
    }
    $[57] = activeLocaleLabel;
    $[58] = canPublish;
    $[59] = canSchedulePublish;
    $[60] = defaultLabel;
    $[61] = defaultPublish;
    $[62] = drawerSlug;
    $[63] = hasNewerVersions;
    $[64] = hasPublishPermission;
    $[65] = isModalOpen;
    $[66] = label;
    $[67] = localization;
    $[68] = publishAll;
    $[69] = secondaryPublish;
    $[70] = t;
    $[71] = toggleModal;
    $[72] = t14;
    $[73] = t15;
  } else {
    t14 = $[72];
    t15 = $[73];
  }
  if (t15 !== Symbol.for("react.early_return_sentinel")) {
    return t15;
  }
  return t14;
}
//# sourceMappingURL=index.js.map