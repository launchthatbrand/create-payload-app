'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../elements/Button/index.js';
import { EmailAndUsernameFields } from '../../../elements/EmailAndUsername/index.js';
import { CheckboxField } from '../../../fields/Checkbox/index.js';
import { ConfirmPasswordField } from '../../../fields/ConfirmPassword/index.js';
import { PasswordField } from '../../../fields/Password/index.js';
import { useFormFields, useFormModified } from '../../../forms/Form/context.js';
import { useAuth } from '../../../providers/Auth/index.js';
import { useConfig } from '../../../providers/Config/index.js';
import { useDocumentInfo } from '../../../providers/DocumentInfo/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { APIKey } from './APIKey.js';
import './index.scss';
const baseClass = 'auth-fields';
export const Auth = props => {
  const $ = _c(57);
  const {
    className,
    collectionSlug,
    disableLocalStrategy,
    email,
    loginWithUsername,
    operation,
    readOnly,
    requirePassword,
    setValidateBeforeSubmit,
    useAPIKey,
    username,
    verify
  } = props;
  const {
    permissions
  } = useAuth();
  const [changingPassword, setChangingPassword] = useState(requirePassword);
  const enableAPIKey = useFormFields(_temp);
  const dispatchFields = useFormFields(_temp2);
  const modified = useFormModified();
  const {
    i18n,
    t
  } = useTranslation();
  const {
    docPermissions,
    isEditing,
    isInitializing
  } = useDocumentInfo();
  const {
    config: t0
  } = useConfig();
  const {
    routes: t1,
    serverURL
  } = t0;
  const {
    api
  } = t1;
  const enableFields = !disableLocalStrategy || typeof disableLocalStrategy === "object" && disableLocalStrategy.enableFields === true;
  const disabled = readOnly || isInitializing;
  const apiKeyPermissions = docPermissions?.fields === true ? true : docPermissions?.fields?.enableAPIKey;
  const apiKeyReadOnly = readOnly || apiKeyPermissions === true || apiKeyPermissions && typeof apiKeyPermissions === "object" && !apiKeyPermissions?.update;
  const enableAPIKeyReadOnly = readOnly || apiKeyPermissions !== true && !apiKeyPermissions?.update;
  const canReadApiKey = apiKeyPermissions === true || apiKeyPermissions?.read;
  let t2;
  bb0: {
    const collection = permissions?.collections?.[collectionSlug];
    if (collection) {
      t2 = Boolean("unlock" in collection ? collection.unlock : undefined);
      break bb0;
    }
    t2 = false;
  }
  const hasPermissionToUnlock = t2;
  let t3;
  if ($[0] !== dispatchFields || $[1] !== setValidateBeforeSubmit || $[2] !== t) {
    t3 = showPasswordFields => {
      if (showPasswordFields) {
        setValidateBeforeSubmit(true);
        dispatchFields({
          type: "UPDATE",
          errorMessage: t("validation:required"),
          path: "password",
          valid: false
        });
        dispatchFields({
          type: "UPDATE",
          errorMessage: t("validation:required"),
          path: "confirm-password",
          valid: false
        });
      } else {
        setValidateBeforeSubmit(false);
        dispatchFields({
          type: "REMOVE",
          path: "password"
        });
        dispatchFields({
          type: "REMOVE",
          path: "confirm-password"
        });
      }
      setChangingPassword(showPasswordFields);
    };
    $[0] = dispatchFields;
    $[1] = setValidateBeforeSubmit;
    $[2] = t;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  const handleChangePassword = t3;
  let t4;
  if ($[4] !== api || $[5] !== collectionSlug || $[6] !== email || $[7] !== i18n.language || $[8] !== loginWithUsername || $[9] !== serverURL || $[10] !== t || $[11] !== username) {
    t4 = async () => {
      const url = `${serverURL}${api}/${collectionSlug}/unlock`;
      const response = await fetch(url, {
        body: loginWithUsername && username ? JSON.stringify({
          username
        }) : JSON.stringify({
          email
        }),
        credentials: "include",
        headers: {
          "Accept-Language": i18n.language,
          "Content-Type": "application/json"
        },
        method: "post"
      });
      if (response.status === 200) {
        toast.success(t("authentication:successfullyUnlocked"));
      } else {
        toast.error(t("authentication:failedToUnlock"));
      }
    };
    $[4] = api;
    $[5] = collectionSlug;
    $[6] = email;
    $[7] = i18n.language;
    $[8] = loginWithUsername;
    $[9] = serverURL;
    $[10] = t;
    $[11] = username;
    $[12] = t4;
  } else {
    t4 = $[12];
  }
  const unlock = t4;
  let t5;
  let t6;
  if ($[13] !== modified) {
    t5 = () => {
      if (!modified) {
        setChangingPassword(false);
      }
    };
    t6 = [modified];
    $[13] = modified;
    $[14] = t5;
    $[15] = t6;
  } else {
    t5 = $[14];
    t6 = $[15];
  }
  useEffect(t5, t6);
  if (disableLocalStrategy && !enableFields && !useAPIKey) {
    return null;
  }
  let t7;
  if ($[16] !== className) {
    t7 = [baseClass, className].filter(Boolean);
    $[16] = className;
    $[17] = t7;
  } else {
    t7 = $[17];
  }
  const t8 = t7.join(" ");
  let t9;
  if ($[18] !== apiKeyReadOnly || $[19] !== canReadApiKey || $[20] !== changingPassword || $[21] !== collectionSlug || $[22] !== disableLocalStrategy || $[23] !== disabled || $[24] !== docPermissions?.fields || $[25] !== enableAPIKey?.value || $[26] !== enableAPIKeyReadOnly || $[27] !== enableFields || $[28] !== handleChangePassword || $[29] !== hasPermissionToUnlock || $[30] !== isEditing || $[31] !== loginWithUsername || $[32] !== operation || $[33] !== readOnly || $[34] !== requirePassword || $[35] !== t || $[36] !== t8 || $[37] !== unlock || $[38] !== useAPIKey || $[39] !== verify) {
    let t10;
    if ($[41] !== apiKeyReadOnly || $[42] !== canReadApiKey || $[43] !== collectionSlug || $[44] !== disabled || $[45] !== enableAPIKey?.value || $[46] !== enableAPIKeyReadOnly || $[47] !== t || $[48] !== useAPIKey) {
      t10 = useAPIKey && _jsx("div", {
        className: `${baseClass}__api-key`,
        children: canReadApiKey && _jsxs(Fragment, {
          children: [_jsx(CheckboxField, {
            field: {
              name: "enableAPIKey",
              admin: {
                disabled,
                readOnly: enableAPIKeyReadOnly
              },
              label: t("authentication:enableAPIKey")
            },
            path: "enableAPIKey",
            schemaPath: `${collectionSlug}.enableAPIKey`
          }), _jsx(APIKey, {
            enabled: !!enableAPIKey?.value,
            readOnly: apiKeyReadOnly
          })]
        })
      });
      $[41] = apiKeyReadOnly;
      $[42] = canReadApiKey;
      $[43] = collectionSlug;
      $[44] = disabled;
      $[45] = enableAPIKey?.value;
      $[46] = enableAPIKeyReadOnly;
      $[47] = t;
      $[48] = useAPIKey;
      $[49] = t10;
    } else {
      t10 = $[49];
    }
    let t11;
    if ($[50] !== collectionSlug || $[51] !== disabled || $[52] !== isEditing || $[53] !== readOnly || $[54] !== t || $[55] !== verify) {
      t11 = verify && isEditing && _jsx(CheckboxField, {
        field: {
          name: "_verified",
          admin: {
            disabled,
            readOnly
          },
          label: t("authentication:verified")
        },
        path: "_verified",
        schemaPath: `${collectionSlug}._verified`
      });
      $[50] = collectionSlug;
      $[51] = disabled;
      $[52] = isEditing;
      $[53] = readOnly;
      $[54] = t;
      $[55] = verify;
      $[56] = t11;
    } else {
      t11 = $[56];
    }
    t9 = _jsxs("div", {
      className: t8,
      children: [enableFields && _jsxs(React.Fragment, {
        children: [_jsx(EmailAndUsernameFields, {
          loginWithUsername,
          operation,
          permissions: docPermissions?.fields,
          readOnly,
          t
        }), (changingPassword || requirePassword) && (!disableLocalStrategy || !enableFields) && _jsxs("div", {
          className: `${baseClass}__changing-password`,
          children: [_jsx(PasswordField, {
            autoComplete: "new-password",
            field: {
              name: "password",
              label: t("authentication:newPassword"),
              required: true
            },
            indexPath: "",
            parentPath: "",
            parentSchemaPath: "",
            path: "password",
            schemaPath: "password"
          }), _jsx(ConfirmPasswordField, {
            disabled: readOnly
          })]
        }), _jsxs("div", {
          className: `${baseClass}__controls`,
          children: [changingPassword && !requirePassword && _jsx(Button, {
            buttonStyle: "secondary",
            disabled,
            onClick: () => handleChangePassword(false),
            size: "medium",
            children: t("general:cancel")
          }), !changingPassword && !requirePassword && !disableLocalStrategy && _jsx(Button, {
            buttonStyle: "secondary",
            disabled,
            id: "change-password",
            onClick: () => handleChangePassword(true),
            size: "medium",
            children: t("authentication:changePassword")
          }), operation === "update" && hasPermissionToUnlock && _jsx(Button, {
            buttonStyle: "secondary",
            disabled,
            onClick: () => void unlock(),
            size: "medium",
            children: t("authentication:forceUnlock")
          })]
        })]
      }), t10, t11]
    });
    $[18] = apiKeyReadOnly;
    $[19] = canReadApiKey;
    $[20] = changingPassword;
    $[21] = collectionSlug;
    $[22] = disableLocalStrategy;
    $[23] = disabled;
    $[24] = docPermissions?.fields;
    $[25] = enableAPIKey?.value;
    $[26] = enableAPIKeyReadOnly;
    $[27] = enableFields;
    $[28] = handleChangePassword;
    $[29] = hasPermissionToUnlock;
    $[30] = isEditing;
    $[31] = loginWithUsername;
    $[32] = operation;
    $[33] = readOnly;
    $[34] = requirePassword;
    $[35] = t;
    $[36] = t8;
    $[37] = unlock;
    $[38] = useAPIKey;
    $[39] = verify;
    $[40] = t9;
  } else {
    t9 = $[40];
  }
  return t9;
};
function _temp(t0) {
  const [fields] = t0;
  return fields && fields?.enableAPIKey || null;
}
function _temp2(reducer) {
  return reducer[1];
}
//# sourceMappingURL=index.js.map