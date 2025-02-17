import React, { createContext, useState } from 'react';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <ProjectsContext.Provider value={{ data, setData }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export { ProjectsContext, ProjectsProvider };