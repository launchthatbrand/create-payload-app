import type { DefaultDocumentIDType, Payload, PayloadRequest } from 'payload';
export declare const getPreferences: <T>(key: string, payload: Payload, userID: DefaultDocumentIDType, userSlug: string) => Promise<{
    id: DefaultDocumentIDType;
    value: T;
}>;
/**
 * Will update the given preferences by key, creating a new record if it doesn't already exist, or merging existing preferences with the new value.
 * This is not possible to do with the existing `db.upsert` operation because it stores on the `value` key and does not perform a deep merge beyond the first level.
 * I.e. if you have a preferences record with a `value` key, `db.upsert` will overwrite the existing value. In the future if this supported we should use that instead.
 * @param req - The PayloadRequest object
 * @param key - The key of the preferences to update
 * @param value - The new value to merge with the existing preferences
 */
export declare const upsertPreferences: <T extends Record<string, unknown> | string>({ customMerge, key, req, value: incomingValue, }: {
    key: string;
    req: PayloadRequest;
} & ({
    customMerge: (existingValue: T) => T;
    value?: never;
} | {
    customMerge?: never;
    value: T;
})) => Promise<T>;
//# sourceMappingURL=upsertPreferences.d.ts.map