import React from 'react';
export type SearchFilterProps = {
    fieldName?: string;
    handleChange?: (search: string) => void;
    initialParams?: ParsedQs;
    label: string;
    setValue?: (arg: string) => void;
    value?: string;
};
import type { ParsedQs } from 'qs-esm';
import './index.scss';
export declare const SearchFilter: React.FC<SearchFilterProps>;
//# sourceMappingURL=index.d.ts.map