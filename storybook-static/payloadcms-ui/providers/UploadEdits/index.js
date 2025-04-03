'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Context = /*#__PURE__*/React.createContext({
  resetUploadEdits: undefined,
  updateUploadEdits: undefined,
  uploadEdits: undefined
});
export const UploadEditsProvider = t0 => {
  const $ = _c(5);
  const {
    children
  } = t0;
  const [uploadEdits, setUploadEdits] = React.useState(undefined);
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = () => {
      setUploadEdits({});
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const resetUploadEdits = t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = edits => {
      setUploadEdits(prevEdits => ({
        ...(prevEdits || {}),
        ...(edits || {})
      }));
    };
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const updateUploadEdits = t2;
  let t3;
  if ($[2] !== children || $[3] !== uploadEdits) {
    t3 = _jsx(Context, {
      value: {
        resetUploadEdits,
        updateUploadEdits,
        uploadEdits
      },
      children
    });
    $[2] = children;
    $[3] = uploadEdits;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  return t3;
};
export const useUploadEdits = () => React.use(Context);
//# sourceMappingURL=index.js.map