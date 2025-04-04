import type { JoinFieldClient } from 'payload';
import React from 'react';
export declare const JoinField: React.FC<{
    readonly path: string;
} & {
    readonly field: Omit<JoinFieldClient, "type"> & Partial<Pick<JoinFieldClient, "type">>;
} & Omit<import("payload").ClientComponentProps, "field" | "customComponents">>;
//# sourceMappingURL=index.d.ts.map