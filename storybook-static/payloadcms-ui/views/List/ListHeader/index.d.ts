import type { I18nClient, TFunction } from '@payloadcms/translations';
import type { ClientCollectionConfig } from 'payload';
import React from 'react';
import './index.scss';
export type ListHeaderProps = {
    className?: string;
    collectionConfig: ClientCollectionConfig;
    Description?: React.ReactNode;
    disableBulkDelete?: boolean;
    disableBulkEdit?: boolean;
    hasCreatePermission: boolean;
    i18n: I18nClient;
    isBulkUploadEnabled: boolean;
    newDocumentURL: string;
    openBulkUpload: () => void;
    smallBreak: boolean;
    t: TFunction;
};
export declare const ListHeader: React.FC<ListHeaderProps>;
//# sourceMappingURL=index.d.ts.map