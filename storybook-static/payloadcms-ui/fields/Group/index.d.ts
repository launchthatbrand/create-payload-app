import type { GroupFieldClientComponent } from 'payload';
import React from 'react';
import './index.scss';
import { GroupProvider, useGroup } from './provider.js';
export declare const GroupFieldComponent: GroupFieldClientComponent;
export { GroupProvider, useGroup };
export declare const GroupField: React.FC<import("payload").FieldPaths & {
    readonly field: Omit<import("payload").GroupFieldClient, "type"> & Partial<Pick<import("payload").GroupFieldClient, "type">>;
} & Omit<import("payload").ClientComponentProps, "field" | "customComponents">>;
//# sourceMappingURL=index.d.ts.map