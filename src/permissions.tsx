import React, {useState} from 'react';

type Permission = "user:write" | "user:read" | "user:admin";

type PermissionsContextValue = {
    permissions: Permission[],
}

const PermissionsContext = React.createContext<PermissionsContextValue | null> (null);

export const PermissionsProvider: React.FC = ({ children }) => {
    /*using state to mock out what an actual authentication system communicating with our backend or Auth0 would look like that contains the token or json that contains the proper permissions*/
    const [permissions, setPermissions] = 
        useState<Permission[]>(['user:write', 'user:read']);
        
    return (
        <PermissionsContext.Provider value={{ permissions }}>
            {children}
        </PermissionsContext.Provider>
    )
};