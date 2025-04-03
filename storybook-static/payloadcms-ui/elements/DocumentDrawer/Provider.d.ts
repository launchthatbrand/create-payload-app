import type { ClientCollectionConfig, Data, FormState, TypeWithID } from 'payload';
export type DocumentDrawerContextProps = {
    readonly clearDoc?: () => void;
    readonly drawerSlug: string;
    readonly onDelete?: (args: {
        collectionConfig?: ClientCollectionConfig;
        id: string;
    }) => Promise<void> | void;
    readonly onDuplicate?: (args: {
        collectionConfig?: ClientCollectionConfig;
        doc: TypeWithID;
    }) => Promise<void> | void;
    readonly onSave?: (args: {
        collectionConfig?: ClientCollectionConfig;
        doc: TypeWithID;
        operation: 'create' | 'update';
        result: Data;
    }) => Promise<FormState | void> | void;
};
export type DocumentDrawerContextType = DocumentDrawerContextProps;
export declare const DocumentDrawerCallbacksContext: import("react").Context<DocumentDrawerContextProps>;
export declare const DocumentDrawerContextProvider: React.FC<{
    children: React.ReactNode;
} & DocumentDrawerContextProps>;
export declare const useDocumentDrawerContext: () => DocumentDrawerContextType;
//# sourceMappingURL=Provider.d.ts.map