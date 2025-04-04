import type { Data, DocumentSlots, SanitizedDocumentPermissions } from 'payload';
import React from 'react';
import type { State } from './reducer.js';
type FormsManagerContext = {
    readonly activeIndex: State['activeIndex'];
    readonly addFiles: (filelist: FileList) => Promise<void>;
    readonly bulkUpdateForm: (updatedFields: Record<string, unknown>, afterStateUpdate?: () => void) => Promise<void>;
    readonly collectionSlug: string;
    readonly docPermissions?: SanitizedDocumentPermissions;
    readonly documentSlots: DocumentSlots;
    readonly forms: State['forms'];
    getFormDataRef: React.RefObject<() => Data>;
    readonly hasPublishPermission: boolean;
    readonly hasSavePermission: boolean;
    readonly hasSubmitted: boolean;
    readonly isInitializing: boolean;
    readonly removeFile: (index: number) => void;
    readonly saveAllDocs: ({ overrides }?: {
        overrides?: Record<string, unknown>;
    }) => Promise<void>;
    readonly setActiveIndex: (index: number) => void;
    readonly setFormTotalErrorCount: ({ errorCount, index, }: {
        errorCount: number;
        index: number;
    }) => void;
    readonly thumbnailUrls: string[];
    readonly totalErrorCount?: number;
};
type FormsManagerProps = {
    readonly children: React.ReactNode;
};
export declare function FormsManagerProvider({ children }: FormsManagerProps): React.JSX.Element;
export declare function useFormsManager(): FormsManagerContext;
export {};
//# sourceMappingURL=index.d.ts.map