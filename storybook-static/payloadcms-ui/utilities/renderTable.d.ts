import type { ClientCollectionConfig, ClientConfig, CollectionConfig, Field, ImportMap, ListPreferences, PaginatedDocs, Payload, SanitizedCollectionConfig } from 'payload';
import { type I18nClient } from '@payloadcms/translations';
import type { Column } from '../exports/client/index.js';
export declare const renderFilters: (fields: Field[], importMap: ImportMap) => Map<string, React.ReactNode>;
export declare const renderTable: ({ clientCollectionConfig, clientConfig, collectionConfig, collections, columnPreferences, columns: columnsFromArgs, customCellProps, docs, enableRowSelections, i18n, payload, renderRowTypes, tableAppearance, useAsTitle, }: {
    clientCollectionConfig?: ClientCollectionConfig;
    clientConfig?: ClientConfig;
    collectionConfig?: SanitizedCollectionConfig;
    collections?: string[];
    columnPreferences: ListPreferences["columns"];
    columns?: ListPreferences["columns"];
    customCellProps?: Record<string, any>;
    docs: PaginatedDocs["docs"];
    drawerSlug?: string;
    enableRowSelections: boolean;
    i18n: I18nClient;
    payload: Payload;
    renderRowTypes?: boolean;
    tableAppearance?: "condensed" | "default";
    useAsTitle: CollectionConfig["admin"]["useAsTitle"];
}) => {
    columnState: Column[];
    Table: React.ReactNode;
};
//# sourceMappingURL=renderTable.d.ts.map