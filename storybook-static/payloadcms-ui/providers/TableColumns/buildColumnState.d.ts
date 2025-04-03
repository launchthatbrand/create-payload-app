import type { I18nClient } from '@payloadcms/translations';
import type { ClientCollectionConfig, Column, DefaultCellComponentProps, ListPreferences, PaginatedDocs, Payload, SanitizedCollectionConfig } from 'payload';
import type { SortColumnProps } from '../../elements/SortColumn/index.js';
type Args = {
    beforeRows?: Column[];
    clientCollectionConfig: ClientCollectionConfig;
    collectionConfig: SanitizedCollectionConfig;
    columnPreferences: ListPreferences['columns'];
    columns?: ListPreferences['columns'];
    customCellProps: DefaultCellComponentProps['customCellProps'];
    docs: PaginatedDocs['docs'];
    enableRowSelections: boolean;
    enableRowTypes?: boolean;
    i18n: I18nClient;
    payload: Payload;
    sortColumnProps?: Partial<SortColumnProps>;
    useAsTitle: SanitizedCollectionConfig['admin']['useAsTitle'];
};
export declare const buildColumnState: (args: Args) => Column[];
export {};
//# sourceMappingURL=buildColumnState.d.ts.map