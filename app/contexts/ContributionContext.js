import React, {createContext, useState} from 'react';

const ContributionContext = createContext();

const ContributionProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <ContributionContext.Provider value={{ data, setData }}>
            {children}
        </ContributionContext.Provider>
    );
};

export { ContributionContext, ContributionProvider };
