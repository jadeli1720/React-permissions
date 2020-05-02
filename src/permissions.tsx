import React, {useState, useContext} from 'react';

/*
All of this is just for user experience. Your API should handle all of the authentication and permissions for security's sake.
 */

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
        /* delete either the write or read permissions to see the change if you are not using the login page. */
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

const checkMatch = (userPermissions: Permission[], canProps: CanProps) => {
    let match = false;
    const { permissions = [] } = canProps;

    const permissionsArr = Array.isArray(permissions) ? permissions : [permissions];
    if (permissionsArr.length === 0){
        match = true;
    }else {
        /*some() is the same as find() but it returns true or false */
        match = permissionsArr.some(p => userPermissions.includes(p));
    }
    return match;
}

export const Can: React.FC<CanProps> = (props) => {
    const { children} = props
    const { permissions: userPermissions } = usePermissions();
    const match = checkMatch(userPermissions, props);
    if (match){
        return<>{children}</>;
    } else {
        return null;
    }
};

export const Switch: React.FC = ({children}) => {
    const { permissions: userPermissions } = usePermissions();

    let element: React.ReactNode = null;
    let match = false;

    React.Children.forEach(children, child => {
        if(!match && React.isValidElement(child) && child.type === Can){
            element = child;
            match = checkMatch(userPermissions, (child.props as CanProps));
        }
    });
    return match ? element : null;
}