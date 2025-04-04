import type { Data, Field, PayloadRequest, SelectMode, SelectType, TabAsField, User } from 'payload';
type Args<T> = {
    data: T;
    field: Field | TabAsField;
    id?: number | string;
    locale: string | undefined;
    req: PayloadRequest;
    select?: SelectType;
    selectMode?: SelectMode;
    siblingData: Data;
    user: User;
};
export declare const defaultValuePromise: <T>({ id, data, field, locale, req, select, selectMode, siblingData, user, }: Args<T>) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map