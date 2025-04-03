import type { UploadEdits } from 'payload';
import React from 'react';
export type UploadEditsContext = {
    resetUploadEdits: () => void;
    updateUploadEdits: (edits: UploadEdits) => void;
    uploadEdits: UploadEdits;
};
export declare const UploadEditsProvider: ({ children }: {
    children: any;
}) => React.JSX.Element;
export declare const useUploadEdits: () => UploadEditsContext;
//# sourceMappingURL=index.d.ts.map