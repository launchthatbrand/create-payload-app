import { type CollectionSlug, type PayloadRequest } from 'payload';
export type CopyDataFromLocaleArgs = {
    collectionSlug?: CollectionSlug;
    docID?: number | string;
    fromLocale: string;
    globalSlug?: string;
    overrideData?: boolean;
    req: PayloadRequest;
    toLocale: string;
};
export declare const copyDataFromLocaleHandler: (args: CopyDataFromLocaleArgs) => Promise<import("payload").JsonObject | import("payload").ErrorResult>;
export declare const copyDataFromLocale: (args: CopyDataFromLocaleArgs) => Promise<import("payload").JsonObject>;
//# sourceMappingURL=copyDataFromLocale.d.ts.map