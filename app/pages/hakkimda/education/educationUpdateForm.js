'use client';
import React, {useContext} from 'react';
import {
    Autocomplete,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    TextField
} from '@mui/material';
import {EducationContext} from '../../../contexts/educationContext';
import {toast} from "react-toastify";
import {departments, universities, highschools} from './universities';
import { axiosInstance } from '@/config/axios_config';
import handleErrors from '@/app/util/handleErrors';


const EducationUpdateForm = ({ open, handleClose, education, setEducation }) => {

    const { data, setData } = useContext(EducationContext);

    const handleSave = () => {
        const userId = localStorage.getItem('id');
        axiosInstance.put(`/user/${userId}/education/${education.id}/update`,
            {
                userId: userId,
                type: education.type,
                university: education.university,
                department: education.department,
                startDate: education.startDate,
                graduationDate: education.ongoing ? null : education.graduationDate,
                explanation: education.explanation
            }
        ).then(response => {
            let updatedData = data;
            updatedData = updatedData.map(e => {
                if (e.id === education.id) {
                    return response.data;
                }
                return e;
            })
            setData([...updatedData]);
        })
            .catch(error => {
                handleErrors(error);
            });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Eğitimi düzenle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Eğitim Türü"
                    select
                    fullWidth
                    value={education.type}
                    onChange={(e) => {
                        if(e?.target?.value === "Lise")

                            setEducation({ ...education,university : "",type: e?.target?.value ,department: "Lise Eğitimi"});
                        if(education.department === "Lise Eğitimi" && e?.target?.value !== "Lise")
                            setEducation({ ...education,university: "",type: e?.target?.value, department: "" })
                    }




                    }
                    margin="normal"
                    size="small"
                >
                    <MenuItem value="Lise">Lise</MenuItem>
                    <MenuItem value="Lisans">Lisans</MenuItem>
                    <MenuItem value="Yüksek Lisans">Yüksek Lisans</MenuItem>
                    <MenuItem value="Doktora">Doktora</MenuItem>
                </TextField>
                <Autocomplete
                    options={education?.type === "Lise" ? highschools : universities}
                    value={
                        education?.university?.split(":")[0]
                    }
                    size="small"
                    onChange={(event, newValue) => {
                        setEducation({ ...education, university: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} margin="normal" label="Üniversite Seçin" />}
                    disableClearable={!education?.university}
                />
                {education?.university?.split(":")[0] === 'Diğer' && (
                    <TextField
                        label="Üniversite/okul (diğer)"
                        fullWidth
                        value={education?.university?.split(":").length === 2 ? education?.university?.split(":")[1] : education?.university?.split(":")[0]}
                        onChange={(e) => setEducation({ ...education, university: "Diğer:" + e.target.value })}
                        margin="normal"
                        size="small"
                    />
                )}
                <Autocomplete
                    options={departments}
                    size="small"
                    margin="normal"
                    disabled = {education?.type === "Lise"}
                    value={education.department}
                    onChange={(event, newValue) => {
                        setEducation({ ...education, department: newValue })
                    }}
                    renderInput={(params) => <TextField {...params} margin="normal" label="Bölüm" />}
                    disableClearable={!education?.department}
                />
                <TextField
                    label="Başlangıç Tarihi"
                    type="date"
                    fullWidth
                    value={education.startDate}
                    onChange={(e) => setEducation({ ...education, startDate: e?.target?.value })}
                    margin="normal"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Mezuniyet Tarihi"
                    type="date"
                    fullWidth

                    value={education.ongoing ? "" : (education.graduationDate === null ? "" : education.graduationDate)}
                    onChange={(e) => setEducation({ ...education, graduationDate: e?.target?.value })}
                    margin="normal"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled={education.ongoing}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={education.ongoing}
                            onChange={(e) => setEducation({ ...education, ongoing: e.target.checked })}
                        />
                    }
                    label="Devam Ediyor"
                />
                <TextField
                    label="Açıklama"
                    fullWidth
                    multiline
                    rows={4}
                    value={education.explanation}
                    onChange={(e) => setEducation({ ...education, explanation: e?.target?.value })}
                    margin="normal"
                    size="small"
                />
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

export default EducationUpdateForm;
