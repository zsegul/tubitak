import React, {createContext, useState} from 'react';

const EducationContext = createContext();

const EducationProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <EducationContext.Provider value={{ data, setData }}>
            {children}
        </EducationContext.Provider>
    );
};

export { EducationContext, EducationProvider };
