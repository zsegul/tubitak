import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { axiosInstance } from "@/config/axios_config";
import { toast } from 'react-toastify';

const EnumContext = createContext();

const EnumProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [dropDownEnumTypes, setDropDownEnumTypes] = useState({});
    const [enumTypes, setEnumTypes] = useState({
        "Birim": [],
        "Unvan": [],
        "Personel Türü": [],
        "Akademik Unvan": [],
        "Kadro": [],
        "Çalışılan Proje": [],
        "Çalışma Türü": [],
        "Çalışma Durumu": [],
        "Görev": [],
        "Servis Kullanımı": [],
        "Eğitim Türü": [],
        "Üniversite/Okul": [],
        "Bölüm": [],
        "Etkinlik Türü": [],
        "Dosya Türü": [],
        "Dosya Adı": [],
        "Yükleme Tarihi": [],
    });
    
    useEffect(() => {
        axiosInstance.get('/team/distinctTeamNames', { withCredentials: true })
            .then(res => {
                setTeams(res.data);
            })
            .catch(error => {
                toast.error("Takımlar getirilirken bir hata oluştu");
            });
    }, []);

    useEffect(() => {
        axiosInstance.get('/enumTypes/withEnums')
            .then(res => {
                const transformedData = res.data.reduce((acc, item) => {
                    const key = item.enumTypeName;
                    if (acc[key] !== undefined) {
                        acc[key] = item.customEnums.map(enumItem => enumItem.name);
                    }
                    return acc;
                    }, { ...enumTypes }
                );
            
                setEnumTypes(transformedData);
                setLoading(false);
            })
            .catch(error => {
                toast.error("Alan adları getirilirken bir hata oluştu");
            });
    }
    , [setEnumTypes]);

    useEffect(() => {
        if (Object.keys(enumTypes).length > 0) {
            setDropDownEnumTypes(prevState => ({
                "Cinsiyet": ["Erkek", "Kadın", "Diğer"],
                "Kan Grubu": ["0 Rh+", "0 Rh-", "A Rh+", "A Rh-", "B Rh+", "B Rh-", "AB Rh+", "AB Rh-"],
                "Takım": [...teams],
                ...enumTypes
            }));
        }
    }, [enumTypes, teams]);

    return (
        <EnumContext.Provider value={{ enumTypes, setEnumTypes, dropDownEnumTypes, loading }}>
            {children}
        </EnumContext.Provider>
    );
}
    
export { EnumContext, EnumProvider };