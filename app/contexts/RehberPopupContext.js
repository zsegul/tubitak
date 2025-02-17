import React, { createContext, useState } from 'react';

const RehberPopupContext = createContext();


const RehberPopupProvider = ({ children }) => {
    const [rehberData, setRehberData] = useState(null);


    return (
        <RehberPopupContext.Provider value={{
            rehberData
        }}>
            {children}
        </RehberPopupContext.Provider>
    );
};

export { RehberPopupContext, RehberPopupProvider };