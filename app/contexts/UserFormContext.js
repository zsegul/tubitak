import React, { createContext, useContext, useState } from 'react';

const UserFormContext = createContext(undefined);

export const UserFormProvider = ({ children }) => {
    const [userFormData, setUserFormData] = useState({
        ad: '',
        soyad: '',
        tcKimlikNo: '',
        cinsiyet: '',
        akademikUnvan: '',
        email: '',
        dogumTarihi: '',
        kanGrubu: '',
        telefon: '',
        aracPlakasi: '',
        acilDurumKisi: '',
        acilDurumKisiTelefon: '',
        ikametgahAdresi: ''
    });

    return (
        <UserFormContext.Provider value={{ userFormData, setUserFormData }}>
            {children}
        </UserFormContext.Provider>
    );
};

export const useUserFrom = () => useContext(UserFormContext);