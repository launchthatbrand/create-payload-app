import type { I18nClient } from '@payloadcms/translations';
import type { ClientField, Column, DefaultCellComponentProps, ListPreferences, PaginatedDocs, Payload, SanitizedCollectionConfig } from 'payload';
import type { SortColumnProps } from '../../elements/SortColumn/index.js';
type Args = {
    beforeRows?: Column[];
    columnPreferences: ListPreferences['columns'];
    columns?: ListPreferences['columns'];
    customCellProps: DefaultCellComponentProps['customCellProps'];
    docs: PaginatedDocs['docs'];
    enableRowSelections: boolean;
    enableRowTypes?: boolean;
    fields: ClientField[];
    i18n: I18nClient;
    payload: Payload;
    sortColumnProps?: Partial<SortColumnProps>;
    useAsTitle: SanitizedCollectionConfig['admin']['useAsTitle'];
};
export declare const buildPolymorphicColumnState: (args: Args) => Column[];
export {};
//# sourceMappingURL=buildPolymorphicColumnState.d.ts.map