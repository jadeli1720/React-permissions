import React, {useState, useContext} from 'react';

type Permission = "user:write" | "user:read" | "user:admin";

type PermissionsContextValue = {
    permissions: Permission[],
}

export const PermissionsContext = React.createContext<PermissionsContextValue | null> (null);

/*Below is a custom hook. Custom hooks have three rules:
    1. Their names start with lowercase 'use...'
    2. They are a function
    3. They can use other hooks inside of them
*/
export const usePermissions = () => {
    const pc = useContext(PermissionsContext);
    if (pc === null){
        throw new Error("usePermissions must be inside of PermissionsProvider")
    }
    return pc;
}

/* FC means Function Component */
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

/*interface works the same as type up above */
interface CanProps {
    permissions?: Permission |  Permission[],
}

export const Can: React.FC<CanProps> = ({ children, permissions = [] }) => {
    let match = false;
    const permissionsArr = Array.isArray(permissions) ? permissions : [permissions];
    if (permissionsArr.length == 0){
        match = true;
    }else {
        
    }
    if (match){
        return<>{children}</>;
    } else {
        return null;
    }
};