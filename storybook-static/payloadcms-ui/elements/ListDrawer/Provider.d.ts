import type { CollectionSlug, Data, ListQuery } from 'payload';
import type { useSelection } from '../../providers/Selection/index.js';
import type { UseDocumentDrawer } from '../DocumentDrawer/types.js';
import type { Option } from '../ReactSelect/index.js';
export type ListDrawerContextProps = {
    readonly allowCreate?: boolean;
    readonly createNewDrawerSlug?: string;
    readonly DocumentDrawerToggler?: ReturnType<UseDocumentDrawer>[1];
    readonly drawerSlug?: string;
    readonly enabledCollections?: CollectionSlug[];
    readonly onBulkSelect?: (selected: ReturnType<typeof useSelection>['selected']) => void;
    readonly onQueryChange?: (query: ListQuery) => void;
    readonly onSelect?: (args: {
        collectionSlug: CollectionSlug;
        doc: Data;
        /**
         * @deprecated
         * The `docID` property is deprecated and will be removed in the next major version of Payload.
         * Use `doc.id` instead.
         */
        docID: string;
    }) => void;
    readonly selectedOption?: Option<string>;
    readonly setSelectedOption?: (option: Option<string>) => void;
};
export type ListDrawerContextType = {
    isInDrawer: boolean;
} & ListDrawerContextProps;
export declare const ListDrawerContext: import("react").Context<ListDrawerContextType>;
export declare const ListDrawerContextProvider: React.FC<{
    children: React.ReactNode;
} & ListDrawerContextProps>;
export declare const useListDrawerContext: () => ListDrawerContextType;
//# sourceMappingURL=Provider.d.ts.map