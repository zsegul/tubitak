'use client';
import React, {useContext, useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    TextField,
    Tooltip
} from '@mui/material';
import {EducationContext} from '../../../contexts/educationContext';
import InfoIcon from '@mui/icons-material/Info';
import {departments, universities,highschools} from './universities';
import {axiosInstance} from '@/config/axios_config';
import handleErrors from '@/app/util/handleErrors';


const EducationAddForm = ({ open, handleClose }) => {
    const [educationType, setEducationType] = useState('');
    const [university, setUniversity] = useState('');
    const [otherUniversity, setOtherUniversity] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [graduationDate, setGraduationDate] = useState('');
    const [ongoing, setOngoing] = useState(false);
    const [explanation, setExplanation] = useState('');
    const { data, setData } = useContext(EducationContext);


    const handleSave = () => {
        const userId = localStorage.getItem('id');
        axiosInstance.post(`/user/${userId}/education/add`,
            {
                type: educationType,
                university: university === "Diğer" ? (university + ":" + otherUniversity) : university,
                department: department,
                startDate: startDate,
                graduationDate: ongoing ? null : graduationDate,
                explanation: explanation
            }
        ).then(response => {
            setData([...data, response.data]);
        })
            .catch(error => {
                handleErrors(error);
            });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Yeni Eğitim Ekle</DialogTitle>
            <DialogContent>
                <TextField
                    label="Eğitim Türü"
                    select
                    fullWidth
                    value={educationType}
                    onChange={(e) => {
                        setEducationType(e.target.value)
                        if(e.target.value === "Lise")
                            setUniversity("")
                            setDepartment("Lise Eğitimi");
                        if(department === "Lise Eğitimi" && e.target.value !== "Lise")
                            setDepartment("")
                            setUniversity("")

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
                    select
                    options={universities}
                    size="small"
                    margin="normal"
                    value={university}
                    onChange={(event, newValue) => {
                        setUniversity(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} margin="normal" label="Üniversite/Okul" />}
                />

                {university === 'Diğer' && (
                    <TextField
                        label="Üniversite/Okul (diğer)"
                        fullWidth
                        value={otherUniversity}
                        onChange={(e) => setOtherUniversity(e.target.value)}
                        margin="normal"
                        size="small"
                    />
                )}

                <Autocomplete
                    options={departments}
                    size="small"
                    margin="normal"
                    value={department}
                    disabled = {educationType === "Lise"}
                    onChange={(event, newValue) => {
                        setDepartment(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} margin="normal" label="Bölüm" />}
                />
                <TextField
                    label="Başlangıç Tarihi"
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
                    label="Mezuniyet Tarihi"
                    type="date"
                    fullWidth
                    value={graduationDate}
                    onChange={(e) => setGraduationDate(e.target.value)}
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
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>

                    <Tooltip title="Tez danışmanınız - Tez konunuzu girebilirsiniz" arrow>
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>

                    <TextField
                        label="Açıklama"
                        fullWidth
                        multiline
                        rows={4}
                        value={explanation}
                        onChange={(e) => {
                            if (e.target.value.length <= 250) {
                                setExplanation(e.target.value);
                            }
                        }}
                        margin="normal"
                        size="small"
                        inputProps={{
                            maxLength: 250,
                        }}
                        helperText={`${explanation.length}/250`}
                    />
                </Box>
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

export default EducationAddForm;
