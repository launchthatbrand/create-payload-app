import type { FormState, SanitizedCollectionConfig } from 'payload';
import React from 'react';
import './index.scss';
export declare const editDrawerSlug = "edit-upload";
export declare const sizePreviewSlug = "preview-sizes";
type UploadActionsArgs = {
    readonly customActions?: React.ReactNode[];
    readonly enableAdjustments: boolean;
    readonly enablePreviewSizes: boolean;
    readonly mimeType: string;
};
export declare const UploadActions: ({ customActions, enableAdjustments, enablePreviewSizes, mimeType, }: UploadActionsArgs) => React.JSX.Element;
export type UploadProps = {
    readonly collectionSlug: string;
    readonly customActions?: React.ReactNode[];
    readonly initialState?: FormState;
    readonly onChange?: (file?: File) => void;
    readonly uploadConfig: SanitizedCollectionConfig['upload'];
};
export declare const Upload: React.FC<UploadProps>;
export {};
//# sourceMappingURL=index.d.ts.map