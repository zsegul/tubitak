import React, { createContext, useContext, useState } from 'react';

const AvatarContext = createContext(undefined);

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

export const useAvatar = () => useContext(AvatarContext);