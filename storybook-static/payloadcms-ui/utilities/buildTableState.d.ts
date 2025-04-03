import type { BuildTableStateArgs, ClientConfig, Column, ErrorResult, ListPreferences, PaginatedDocs } from 'payload';
type BuildTableStateSuccessResult = {
    clientConfig?: ClientConfig;
    data: PaginatedDocs;
    errors?: never;
    preferences: ListPreferences;
    renderedFilters: Map<string, React.ReactNode>;
    state: Column[];
    Table: React.ReactNode;
};
type BuildTableStateErrorResult = {
    data?: any;
    renderedFilters?: never;
    state?: never;
    Table?: never;
} & ({
    message: string;
} | ErrorResult);
export type BuildTableStateResult = BuildTableStateErrorResult | BuildTableStateSuccessResult;
export declare const buildTableStateHandler: (args: BuildTableStateArgs) => Promise<BuildTableStateResult>;
export declare const buildTableState: (args: BuildTableStateArgs) => Promise<BuildTableStateSuccessResult>;
export {};
//# sourceMappingURL=buildTableState.d.ts.map