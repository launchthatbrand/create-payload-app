import type { JsonObject } from 'payload';
import React from 'react';
export type BulkUploadProps = {
    readonly children: React.ReactNode;
};
export declare function BulkUploadDrawer(): React.JSX.Element;
type BulkUploadContext = {
    collectionSlug: string;
    currentActivePath: string;
    drawerSlug: string;
    initialFiles: FileList;
    maxFiles: number;
    onCancel: () => void;
    onSuccess: (newDocs: JsonObject[], errorCount: number) => void;
    setCollectionSlug: (slug: string) => void;
    setCurrentActivePath: (path: string) => void;
    setInitialFiles: (files: FileList) => void;
    setMaxFiles: (maxFiles: number) => void;
    setOnCancel: (onCancel: BulkUploadContext['onCancel']) => void;
    setOnSuccess: (path: string, onSuccess: BulkUploadContext['onSuccess']) => void;
};
export declare function BulkUploadProvider({ children }: {
    readonly children: React.ReactNode;
}): React.JSX.Element;
export declare const useBulkUpload: () => BulkUploadContext;
export declare function useBulkUploadDrawerSlug(): string;
export {};
//# sourceMappingURL=index.d.ts.map