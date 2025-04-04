import React from 'react';
type NavContextType = {
    hydrated: boolean;
    navOpen: boolean;
    navRef: React.RefObject<HTMLDivElement | null>;
    setNavOpen: (value: boolean) => void;
    shouldAnimate: boolean;
};
export declare const NavContext: React.Context<NavContextType>;
export declare const useNav: () => NavContextType;
export declare const NavProvider: React.FC<{
    children: React.ReactNode;
    initialIsOpen?: boolean;
}>;
export {};
//# sourceMappingURL=context.d.ts.map