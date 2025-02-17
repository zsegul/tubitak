import React, { createContext, useState } from 'react';

const ExperienceContext = createContext();


const ExperienceProvider = ({ children }) => {
    const [experienceData, setExperienceData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [experienceToUpdate, setExperienceToUpdate] = useState(
        "",
        "",
        "",
        "",
        "",
        false,
        ""
      );

    return (
        <ExperienceContext.Provider value={{
            experienceData, 
            setExperienceData, 
            openAddDialog,
            setOpenAddDialog,
            openUpdateDialog,
            setOpenUpdateDialog,
            experienceToUpdate, 
            setExperienceToUpdate
        }}>
            {children}
        </ExperienceContext.Provider>
    );
};

export { ExperienceContext, ExperienceProvider };