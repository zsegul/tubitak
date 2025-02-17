import React, { createContext, useState } from 'react';

const FilesContext = createContext();

const FilesProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <FilesContext.Provider value={{ data, setData }}>
            {children}
        </FilesContext.Provider>
    );
};

export { FilesContext, FilesProvider };