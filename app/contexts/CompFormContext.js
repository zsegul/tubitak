import React, { createContext, useContext, useState } from 'react';

const CompFormContext = createContext(undefined);

export const CompFormProvider = ({ children }) => {
    const [compFormData, setCompFormData] = useState({
        iseGirisTarihi: '',
        sicilNo: '',
        kadro: '',
        unvan: '',
        birim: '',
        calisilanProje: '',
        gorev: '',
        mentor: '',
        personelTuru: '',
        calismaTuru: '',
        calismaDurumu: '',
        servisKullanimi: '',
        dahiliNumara: '',
        odaNumara: ''
    });

    return (
        <CompFormContext.Provider value={{ compFormData, setCompFormData }}>
            {children}
        </CompFormContext.Provider>
    );
};

export const useCompForm = () => useContext(CompFormContext);