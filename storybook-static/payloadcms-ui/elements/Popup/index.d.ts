import type { CSSProperties } from 'react';
export * as PopupList from './PopupButtonList/index.js';
import React from 'react';
import './index.scss';
export type PopupProps = {
    backgroundColor?: CSSProperties['backgroundColor'];
    boundingRef?: React.RefObject<HTMLElement>;
    button?: React.ReactNode;
    buttonClassName?: string;
    buttonSize?: 'large' | 'medium' | 'small';
    buttonType?: 'custom' | 'default' | 'none';
    caret?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    forceOpen?: boolean;
    horizontalAlign?: 'center' | 'left' | 'right';
    id?: string;
    initActive?: boolean;
    noBackground?: boolean;
    onToggleOpen?: (active: boolean) => void;
    render?: (any: any) => React.ReactNode;
    showOnHover?: boolean;
    showScrollbar?: boolean;
    size?: 'fit-content' | 'large' | 'medium' | 'small';
    verticalAlign?: 'bottom' | 'top';
};
export declare const Popup: React.FC<PopupProps>;
//# sourceMappingURL=index.d.ts.map