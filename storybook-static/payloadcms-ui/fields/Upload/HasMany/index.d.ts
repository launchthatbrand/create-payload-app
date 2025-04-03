import type { JsonObject } from 'payload';
import React from 'react';
import type { ReloadDoc } from '../types.js';
import './index.scss';
type Props = {
    readonly className?: string;
    readonly displayPreview?: boolean;
    readonly fileDocs: {
        relationTo: string;
        value: JsonObject;
    }[];
    readonly isSortable?: boolean;
    readonly onRemove?: (value: any) => void;
    readonly onReorder?: (value: any) => void;
    readonly readonly?: boolean;
    readonly reloadDoc: ReloadDoc;
    readonly serverURL: string;
};
export declare function UploadComponentHasMany(props: Props): React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map