'use client';
import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from '@mui/material';
import { axiosInstance } from '@/config/axios_config';
import {ContributionContext} from '../../../contexts/ContributionContext';
import { EnumContext } from '@/app/contexts/EnumContext';
import { useSearchParams } from "next/navigation";

import {toast} from "react-toastify";


const ContributionUpdateForm = ({ open, handleClose, contribution, setContribution }) => {

    const { data, setData } = useContext(ContributionContext);
    const { enumTypes } = useContext(EnumContext);
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const handleSave = () => {
        const formData = new FormData();
        formData.append("eventType", contribution.eventType);
        formData.append("description", contribution.description);
        formData.append("link", contribution.link);
        if (contribution.attachment && contribution.attachment.length > 0) {
            contribution.attachment.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });
        }

        axiosInstance.put(`/contribution/update/${contribution.id}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                setData([...response.data]);
                toast.success("Katkı başarıyla güncellendi!");
            })
            .catch(error => {
                console.log(error);
                toast.error("Bilgilerin doğruluğunu kontrol et");
            });

        handleClose();
    };

    const handleSelectedFile = (event) => {
        const files = Array.from(event.target.files);
        setContribution({ ...contribution, attachment: files });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Katkıyı düzenle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Etkinlik Türü"
                    select
                    fullWidth
                    value={contribution.eventType}
                    onChange={(e) => setContribution({ ...contribution, eventType: e?.target?.value })}
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
                    value={contribution.description}
                    onChange={(e) => setContribution({ ...contribution, description: e?.target?.value })}
                    margin="normal"
                    size="small"
                />
                <TextField
                    label="Link"
                    fullWidth
                    value={contribution.link}
                    onChange={(e) => setContribution({ ...contribution, link: e?.target?.value })}
                    margin="normal"
                    size="small"
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

export default ContributionUpdateForm;
