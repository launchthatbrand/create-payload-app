import type { BuildFormStateArgs, BuildTableStateArgs, Data, DocumentSlots, ErrorResult, Locale, ServerFunctionClient } from 'payload';
import React from 'react';
import type { buildFormStateHandler } from '../../utilities/buildFormState.js';
import type { buildTableStateHandler } from '../../utilities/buildTableState.js';
import type { CopyDataFromLocaleArgs } from '../../utilities/copyDataFromLocale.js';
import type { schedulePublishHandler, SchedulePublishHandlerArgs } from '../../utilities/schedulePublishHandler.js';
type GetFormStateClient = (args: {
    signal?: AbortSignal;
} & Omit<BuildFormStateArgs, 'clientConfig' | 'req'>) => ReturnType<typeof buildFormStateHandler>;
type SchedulePublishClient = (args: {
    signal?: AbortSignal;
} & Omit<SchedulePublishHandlerArgs, 'clientConfig' | 'req'>) => ReturnType<typeof schedulePublishHandler>;
type GetTableStateClient = (args: {
    signal?: AbortSignal;
} & Omit<BuildTableStateArgs, 'clientConfig' | 'req'>) => ReturnType<typeof buildTableStateHandler>;
type RenderDocument = (args: {
    collectionSlug: string;
    disableActions?: boolean;
    docID?: number | string;
    drawerSlug?: string;
    initialData?: Data;
    locale?: Locale;
    overrideEntityVisibility?: boolean;
    redirectAfterCreate?: boolean;
    redirectAfterDelete?: boolean;
    redirectAfterDuplicate?: boolean;
    signal?: AbortSignal;
}) => Promise<{
    data: Data;
    Document: React.ReactNode;
} | ({
    data: never;
    Document: never;
} & ErrorResult)>;
type CopyDataFromLocaleClient = (args: {
    signal?: AbortSignal;
} & Omit<CopyDataFromLocaleArgs, 'req'>) => Promise<{
    data: Data;
}>;
type GetDocumentSlots = (args: {
    collectionSlug: string;
    signal?: AbortSignal;
}) => Promise<DocumentSlots>;
type ServerFunctionsContextType = {
    copyDataFromLocale: CopyDataFromLocaleClient;
    getDocumentSlots: GetDocumentSlots;
    getFormState: GetFormStateClient;
    getTableState: GetTableStateClient;
    renderDocument: RenderDocument;
    schedulePublish: SchedulePublishClient;
    serverFunction: ServerFunctionClient;
};
export declare const ServerFunctionsContext: React.Context<ServerFunctionsContextType>;
export declare const useServerFunctions: () => ServerFunctionsContextType;
export declare const ServerFunctionsProvider: React.FC<{
    children: React.ReactNode;
    serverFunction: ServerFunctionClient;
}>;
export {};
//# sourceMappingURL=index.d.ts.map