'use client';
import React, {useContext, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from '@mui/material';
import { axiosInstance } from '@/config/axios_config';
import { EnumContext } from '@/app/contexts/EnumContext';
import {ContributionContext} from '../../../contexts/ContributionContext';

import {toast} from "react-toastify";

const ContributionAddForm = ({ open, handleClose }) => {
    const [eventType, setEventType] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [attachment, setAttachment] = useState([]);
    const { data, setData } = useContext(ContributionContext);
    const { enumTypes } = useContext(EnumContext);

    const handleSave = () => {
        const userId = localStorage.getItem('id');
        const formData = new FormData();
        formData.append("eventType", eventType);
        formData.append("description", description);
        formData.append("link", link);
        if (attachment && attachment.length > 0) {
            attachment.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });
        }

        axiosInstance.post(`/contribution/upload/${userId}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
            .then(response => {
                const newDataList = [...data, response.data];
                setData(newDataList);
                toast.success("Katkı başarıyla eklendi!");
            })
            .catch(error => {
                console.log(error);
                toast.error("Bilgilerin doğruluğunu kontrol et");
            });

        handleClose();
    };

    const handleSelectedFile = (event) => {
        const files = Array.from(event.target.files);
        setAttachment(files);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Yeni Katkı Ekle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Etkinlik Türü"
                    select
                    fullWidth
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    margin="normal"
                    size="small"
                >
                    {enumTypes["Etkinlik Türü"].map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Açıklama"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin='normal'
                    size='small'
                />

                <TextField
                    label="Link"
                    fullWidth
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    margin='normal'
                    size='small'
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
                        <input type="file" onChange={handleSelectedFile} hidden multiple />
                    </Button>
                    <span style={{ marginLeft: '8px', color: 'gray', fontSize: "12px" }}>
                        (Maksimum 100MB)
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

export default ContributionAddForm;
