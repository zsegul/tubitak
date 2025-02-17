'use client';
import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Autocomplete, InputAdornment, FormControlLabel, Checkbox, Tooltip, IconButton, Box } from '@mui/material';
import { ExperienceContext } from '../../../contexts/ExperienceContext';
import { axiosInstance } from '@/config/axios_config';
import {toast} from "react-toastify";
import { useSearchParams } from "next/navigation";

const ExperienceAddForm = () => {
    const { experienceData,
        setExperienceData,
        openAddDialog,
        setOpenAddDialog,
        openUpdateDialog,
        setOpenUpdateDialog,
        experienceToUpdate,
        setExperienceToUpdate
    } = useContext(ExperienceContext);


    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [typeOfEmployment, setTypeOfEmployment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ongoing, setOngoing] = useState(false);
    const [reasonForLeavingEmployment, setReasonForLeavingEmployment] = useState('');


    const searchParams = useSearchParams();
  const userId = searchParams.get("id");
    const handleSave = () => {
        console.log( userId, companyName,
             title,
             typeOfEmployment,
             startDate,
             ongoing ? null : endDate,
              ongoing ? null : reasonForLeavingEmployment);
        const selectedDate = new Date(startDate);
        const now = new Date();
        if (selectedDate >= now) {
            toast.error("Please select a past date.");
            return;
        }

        axiosInstance.post(`/user/experience/${userId}/add`,
            {
                companyName: companyName,
                title: title,
                typeOfEmployment: typeOfEmployment,
                startDate: startDate,
                endDate: ongoing ? null : endDate,
                reasonForLeavingEmployment:  ongoing ? null : reasonForLeavingEmployment
            }
        ).then(response => {
            setExperienceData([...experienceData, response.data]);
        })
            .catch(error => {
                console.log(error);
                toast.error("Bilgilerin doğruluğunu kontrol et");
            });
            setOpenAddDialog(false)
    };

    return (
        <Dialog aria-modal open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Yeni Deneyim Ekle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Çalıştığı Kurum Adı"
                    
                    fullWidth
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    margin="normal"
                    size="small"
                >
                </TextField>

                <TextField
                    label="Çalıştığı Pozisyon"
                    
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    size="small"
                >
                </TextField>

                <TextField
                    label="Çalışma Şekli"
                    select
                    fullWidth
                    value={typeOfEmployment}
                    onChange={(e) => setTypeOfEmployment(e.target.value)}
                    margin="normal"
                    size="small"
                >
                    <MenuItem value="Yüz yüze">Yüz yüze</MenuItem>
                    <MenuItem value="Hibrit">Hibrit</MenuItem>
                    <MenuItem value="Uzaktan">Uzaktan</MenuItem>
                </TextField>

                <TextField
                    label="İşe Başlama Tarihi"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    margin="normal"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="İşten Çıkış Tarihi"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    margin="normal"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled={ongoing}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={ongoing}
                            onChange={(e) => setOngoing(e.target.checked)}
                        />
                    }
                    label="Devam Ediyor"
                />

                    <TextField
                        label="İşten Ayrılış Nedeni"
                        fullWidth
                        multiline
                        rows={4}
                        value={reasonForLeavingEmployment}
                        onChange={(e) => {
                            if (e.target.value.length <= 250) {
                                setReasonForLeavingEmployment(e.target.value);
                            }
                        }}
                        margin="normal"
                        size="small"
                        inputProps={{
                            maxLength: 250,
                        }}
                        disabled={ongoing}
                        helperText={`${reasonForLeavingEmployment.length}/250`}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpenAddDialog(false)}} color="primary">
                    İptal
                </Button>
                <Button onClick={handleSave} color="primary">
                    Kaydet
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ExperienceAddForm;