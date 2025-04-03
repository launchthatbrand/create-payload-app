'use client';

import { c as _c } from "react/compiler-runtime";
import { useEffect, useRef } from 'react';
import { useFormFields } from '../../../forms/Form/context.js';
import { useDocumentInfo } from '../../../providers/DocumentInfo/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { formatDocTitle } from '../../../utilities/formatDocTitle/index.js';
export const SetDocumentTitle = props => {
  const $ = _c(13);
  const {
    collectionConfig,
    config,
    fallback,
    globalConfig
  } = props;
  const useAsTitle = collectionConfig?.admin?.useAsTitle;
  let t0;
  if ($[0] !== useAsTitle) {
    t0 = t1 => {
      const [fields] = t1;
      return useAsTitle && fields && fields?.[useAsTitle] || null;
    };
    $[0] = useAsTitle;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const field = useFormFields(t0);
  const hasInitialized = useRef(false);
  const {
    i18n
  } = useTranslation();
  const {
    setDocumentTitle
  } = useDocumentInfo();
  const dateFormatFromConfig = config?.admin?.dateFormat;
  let t1;
  if ($[2] !== collectionConfig || $[3] !== dateFormatFromConfig || $[4] !== fallback || $[5] !== field || $[6] !== globalConfig || $[7] !== i18n) {
    t1 = formatDocTitle({
      collectionConfig,
      data: {
        id: ""
      },
      dateFormat: dateFormatFromConfig,
      fallback: typeof field === "string" ? field : typeof field === "number" ? String(field) : field?.value || fallback,
      globalConfig,
      i18n
    });
    $[2] = collectionConfig;
    $[3] = dateFormatFromConfig;
    $[4] = fallback;
    $[5] = field;
    $[6] = globalConfig;
    $[7] = i18n;
    $[8] = t1;
  } else {
    t1 = $[8];
  }
  const title = t1;
  let t2;
  let t3;
  if ($[9] !== setDocumentTitle || $[10] !== title) {
    t2 = () => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        return;
      }
      setDocumentTitle(title);
    };
    t3 = [setDocumentTitle, title];
    $[9] = setDocumentTitle;
    $[10] = title;
    $[11] = t2;
    $[12] = t3;
  } else {
    t2 = $[11];
    t3 = $[12];
  }
  useEffect(t2, t3);
  return null;
};
//# sourceMappingURL=index.js.map