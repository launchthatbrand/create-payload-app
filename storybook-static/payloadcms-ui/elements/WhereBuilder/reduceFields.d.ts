import type { I18nClient } from '@payloadcms/translations';
import type { ClientField } from 'payload';
import type { ReducedField } from './types.js';
type ReduceFieldOptionsArgs = {
    fields: ClientField[];
    i18n: I18nClient;
    labelPrefix?: string;
    pathPrefix?: string;
};
/**
 * Reduces a field map to a flat array of fields with labels and values.
 * Used in the WhereBuilder component to render the fields in the dropdown.
 */
export declare const reduceFields: ({ fields, i18n, labelPrefix, pathPrefix, }: ReduceFieldOptionsArgs) => ReducedField[];
export {};
//# sourceMappingURL=reduceFields.d.ts.map