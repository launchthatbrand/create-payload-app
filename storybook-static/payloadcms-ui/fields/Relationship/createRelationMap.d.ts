import type { Value } from './types.js';
type RelationMap = {
    [relation: string]: (number | string)[];
};
type CreateRelationMap = (args: {
    hasMany: boolean;
    relationTo: string | string[];
    value: null | Value | Value[];
}) => RelationMap;
export declare const createRelationMap: CreateRelationMap;
export {};
//# sourceMappingURL=createRelationMap.d.ts.map