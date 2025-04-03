import type { ClientUser, SanitizedPermissions, User } from 'payload';
import React from 'react';
export type UserWithToken<T = ClientUser> = {
    exp: number;
    token: string;
    user: T;
};
export type AuthContext<T = ClientUser> = {
    fetchFullUser: () => Promise<null | User>;
    logOut: () => Promise<boolean>;
    permissions?: SanitizedPermissions;
    refreshCookie: (forceRefresh?: boolean) => void;
    refreshCookieAsync: () => Promise<ClientUser>;
    refreshPermissions: () => Promise<void>;
    setPermissions: (permissions: SanitizedPermissions) => void;
    setUser: (user: null | UserWithToken<T>) => void;
    strategy?: string;
    token?: string;
    tokenExpiration?: number;
    user?: null | T;
};
type Props = {
    children: React.ReactNode;
    permissions?: SanitizedPermissions;
    user?: ClientUser | null;
};
export declare function AuthProvider({ children, permissions: initialPermissions, user: initialUser, }: Props): React.JSX.Element;
export declare const useAuth: <T = ClientUser>() => AuthContext<T>;
export {};
//# sourceMappingURL=index.d.ts.map