'use client';
import React, {useContext, useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {axiosInstance} from '@/config/axios_config';
import {departments} from '../education/universities';
import {FilesContext} from '../../../contexts/FilesContext';
import { useSearchParams } from "next/navigation";

import {toast} from "react-toastify";


const FilesAddForm = ({ open, handleClose }) => {
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [department, setDepartment] = useState('');
    const [file, setFile] = useState();
    const [uploadDate, setUploadDate] = useState('');
    const { data, setData } = useContext(FilesContext);
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const handleSave = () => {
        const formData = new FormData();
        formData.append("fileType", fileType);
        formData.append("fileName", fileName);
        formData.append("uploadDate", "");
        formData.append("fileUri", "");
        formData.append("department", department);
        formData.append("multipartFile", file);

        axiosInstance.post(`/file/upload/${userId}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
            .then(response => {
                const newDataList = [...data, response.data];
                setData(newDataList);
                toast.success("Dosya başarıyla oluşturuldu!");
            })
            .catch(error => {
                console.log(error);
                toast.error("Bilgilerin doğruluğunu kontrol et");
            });

        handleClose();
    };

    const handleSelectedFile = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        setFileName(newFile.name);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Yeni Dosya Ekle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Dosya Türü"
                    fullWidth
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    margin="normal"
                    size="small"
                />
                <TextField
                    label="Dosya Adı"
                    fullWidth
                    disabled
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    margin='normal'
                    size='small'
                />

                <Autocomplete
                    options={departments}
                    size="small"
                    margin="normal"
                    value={department}
                    onChange={(event, newValue) => {
                        setDepartment(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} margin="normal" label="Bölüm" />}
                    disableClearable={!department}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        color="primary"
                        component="label"
                    >
                        Dosya Seç
                        <input type="file" onChange={handleSelectedFile} hidden />
                    </Button>
                    <span style={{ marginLeft: '8px', color: 'gray', fontSize: "12px" }}>
                        (Sadece 1 dosya, maksimum 100MB)
                    </span>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    İptal
                </Button>
                <Button onClick={handleSave} color="primary">
                    Kaydet
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default FilesAddForm;