import React from 'react';


const PermissionsContext = React.createContext(undefined);

export const PermissionsProvider: React.FC = ({ children }) => {
    return (
        <PermissionsContext.Provider value={undefined}>
            {children}
        </PermissionsContext.Provider>
    )
};