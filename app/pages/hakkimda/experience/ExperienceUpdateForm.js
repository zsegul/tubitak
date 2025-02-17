'use client';
import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Autocomplete, InputAdornment, FormControlLabel, Checkbox, Tooltip, IconButton, Box } from '@mui/material';
import { ExperienceContext } from '../../../contexts/ExperienceContext';
import { axiosInstance } from '@/config/axios_config';
import { toast } from 'react-toastify';

const ExperienceUpdateForm = () => {
    const { experienceData,
        setExperienceData,
        openAddDialog,
        setOpenAddDialog,
        openUpdateDialog,
        setOpenUpdateDialog,
        experienceToUpdate,
        setExperienceToUpdate
    } = useContext(ExperienceContext);

    const handleSave = () => {
        const selectedDate = new Date(experienceToUpdate.startDate);
        const now = new Date();
        if (selectedDate >= now) {
            toast.error("Please select a past date.");
            return;
        }   
        axiosInstance.put(`/user/experience/update`,
            {
                id: experienceToUpdate.id,
                companyName: experienceToUpdate.companyName,
                title: experienceToUpdate.title,
                typeOfEmployment: experienceToUpdate.typeOfEmployment,
                startDate: experienceToUpdate.startDate,
                endDate: experienceToUpdate.ongoing ? null : experienceToUpdate.endDate,
                reasonForLeavingEmployment:  experienceToUpdate.ongoing ? null : experienceToUpdate.reasonForLeavingEmployment
            }
        ).then(response => {
            let updatedData = experienceData;
            updatedData = updatedData.map(e => {
                if (e.id === experienceToUpdate.id) {
                    return response.data;
                }
                return e;
            })
            setExperienceData([...updatedData]);
        })
            .catch(error => {
                console.log(error);
                toast.error("Bilgilerin doğruluğunu kontrol et");
            });
            setOpenUpdateDialog(false)
    };


    return (
        <Dialog aria-modal open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
            <DialogTitle>Yeni Deneyim Ekle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Çalıştığı Kurum Adı"
                    
                    fullWidth
                    value={experienceToUpdate.companyName}
                    onChange={(e) => setExperienceToUpdate({...experienceToUpdate, companyName : e.target.value})}
                    margin="normal"
                    size="small"
                >
                </TextField>

                <TextField
                    label="Çalıştığı Pozisyon"
                    
                    fullWidth
                    value={experienceToUpdate.title}
                    onChange={(e) => setExperienceToUpdate({...experienceToUpdate, title : e.target.value})}
                    margin="normal"
                    size="small"
                >
                </TextField>

                <TextField
                    label="Çalışma Şekli"
                    select
                    fullWidth
                    value={experienceToUpdate.typeOfEmployment}
                    onChange={(e) => setExperienceToUpdate({...experienceToUpdate, typeOfEmployment : e.target.value})}
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
                    value={experienceToUpdate.startDate}
                    onChange={(e) => setExperienceToUpdate({...experienceToUpdate, startDate : e.target.value})}
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
                    value={experienceToUpdate.ongoing ? "" : (experienceToUpdate.endDate === null ? "" : experienceToUpdate.endDate)}
                    onChange={(e) => setExperienceToUpdate({...experienceToUpdate , endDate : e.target.value})}
                    margin="normal"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled={experienceToUpdate.ongoing}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={experienceToUpdate.ongoing}
                            onChange={(e) => setExperienceToUpdate({...experienceToUpdate, ongoing :e.target.checked})}
                        />
                    }
                    label="Devam Ediyor"
                />

                    <TextField
                        label="İşten Ayrılış Nedeni"
                        fullWidth
                        multiline
                        rows={4}
                        value={experienceToUpdate.ongoing ? "" : (experienceToUpdate.reasonForLeavingEmployment === null ? "" : experienceToUpdate.reasonForLeavingEmployment)}
                        onChange={(e) => {
                            if (e.target.value.length <= 250) {
                                setExperienceToUpdate({...experienceToUpdate, reasonForLeavingEmployment : e.target.value});
                            }
                        }}
                        margin="normal"
                        size="small"
                        inputProps={{
                            maxLength: 250,
                        }}
                        disabled={experienceToUpdate.ongoing}
                        helperText={`${experienceToUpdate.ongoing ? 0 : (experienceToUpdate.reasonForLeavingEmployment === null ? 0 : experienceToUpdate.reasonForLeavingEmployment?.length)}/250`}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpenUpdateDialog(false)}} color="primary">
                    İptal
                </Button>
                <Button onClick={handleSave} color="primary">
                    Kaydet
                </Button>
            </DialogActions>
        </Dialog>
    );
    

}
export default ExperienceUpdateForm;