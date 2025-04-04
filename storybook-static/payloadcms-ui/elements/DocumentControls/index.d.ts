import type { ClientUser, SanitizedCollectionConfig, SanitizedCollectionPermission, SanitizedGlobalPermission } from 'payload';
import React from 'react';
import type { DocumentDrawerContextType } from '../DocumentDrawer/Provider.js';
import './index.scss';
export declare const DocumentControls: React.FC<{
    readonly apiURL: string;
    readonly customComponents?: {
        readonly PreviewButton?: React.ReactNode;
        readonly PublishButton?: React.ReactNode;
        readonly SaveButton?: React.ReactNode;
        readonly SaveDraftButton?: React.ReactNode;
    };
    readonly data?: any;
    readonly disableActions?: boolean;
    readonly disableCreate?: boolean;
    readonly hasPublishPermission?: boolean;
    readonly hasSavePermission?: boolean;
    readonly id?: number | string;
    readonly isAccountView?: boolean;
    readonly isEditing?: boolean;
    readonly onDelete?: DocumentDrawerContextType['onDelete'];
    readonly onDrawerCreateNew?: () => void;
    readonly onDuplicate?: DocumentDrawerContextType['onDuplicate'];
    readonly onSave?: DocumentDrawerContextType['onSave'];
    readonly onTakeOver?: () => void;
    readonly permissions: null | SanitizedCollectionPermission | SanitizedGlobalPermission;
    readonly readOnlyForIncomingUser?: boolean;
    readonly redirectAfterDelete?: boolean;
    readonly redirectAfterDuplicate?: boolean;
    readonly slug: SanitizedCollectionConfig['slug'];
    readonly user?: ClientUser;
}>;
//# sourceMappingURL=index.d.ts.map