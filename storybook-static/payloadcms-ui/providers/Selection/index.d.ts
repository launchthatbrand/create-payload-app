import type { ClientUser, Where } from 'payload';
import React from 'react';
export declare enum SelectAllStatus {
    AllAvailable = "allAvailable",
    AllInPage = "allInPage",
    None = "none",
    Some = "some"
}
type SelectionContext = {
    count: number;
    disableBulkDelete?: boolean;
    disableBulkEdit?: boolean;
    getQueryParams: (additionalParams?: Where) => string;
    selectAll: SelectAllStatus;
    selected: Map<number | string, boolean>;
    setSelection: (id: number | string) => void;
    toggleAll: (allAvailable?: boolean) => void;
    totalDocs: number;
};
type Props = {
    readonly children: React.ReactNode;
    readonly docs: any[];
    readonly totalDocs: number;
    user: ClientUser;
};
export declare const SelectionProvider: React.FC<Props>;
export declare const useSelection: () => SelectionContext;
export {};
//# sourceMappingURL=index.d.ts.map