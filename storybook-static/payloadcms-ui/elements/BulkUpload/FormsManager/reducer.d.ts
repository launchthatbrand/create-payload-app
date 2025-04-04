import type { FormState } from 'payload';
export type State = {
    activeIndex: number;
    forms: {
        errorCount: number;
        formState: FormState;
    }[];
    totalErrorCount: number;
};
type Action = {
    count: number;
    index: number;
    type: 'UPDATE_ERROR_COUNT';
} | {
    errorCount: number;
    formState: FormState;
    index: number;
    type: 'UPDATE_FORM';
    updatedFields?: Record<string, unknown>;
} | {
    files: FileList;
    initialState: FormState | null;
    type: 'ADD_FORMS';
} | {
    index: number;
    type: 'REMOVE_FORM';
} | {
    index: number;
    type: 'SET_ACTIVE_INDEX';
} | {
    state: Partial<State>;
    type: 'REPLACE';
};
export declare function formsManagementReducer(state: State, action: Action): State;
export {};
//# sourceMappingURL=reducer.d.ts.map