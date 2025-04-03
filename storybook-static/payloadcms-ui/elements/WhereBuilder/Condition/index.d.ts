import React from 'react';
import type { AddCondition, ReducedField, RemoveCondition, UpdateCondition } from '../types.js';
export type Props = {
    readonly addCondition: AddCondition;
    readonly andIndex: number;
    readonly fieldName: string;
    readonly filterOptions: ResolvedFilterOptions;
    readonly operator: Operator;
    readonly orIndex: number;
    readonly reducedFields: ReducedField[];
    readonly removeCondition: RemoveCondition;
    readonly RenderedFilter: React.ReactNode;
    readonly updateCondition: UpdateCondition;
    readonly value: string;
};
import type { Operator, ResolvedFilterOptions } from 'payload';
import './index.scss';
export declare const Condition: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map