import type { Option } from '../../elements/ReactSelect/types.js';
import type { OptionGroup, Value } from './types.js';
type Args = {
    allowEdit: boolean;
    options: OptionGroup[];
    value: Value | Value[];
};
export declare const findOptionsByValue: ({ allowEdit, options, value }: Args) => Option | Option[];
export {};
//# sourceMappingURL=findOptionsByValue.d.ts.map