"use client"
import React, { useState, useEffect } from 'react';
import {TextField, Box, Typography, Button, Grid, Card} from '@mui/material';
import {Portrait} from "@mui/icons-material";


const CompInfoForm = ({formData, setFormData}) => {

    const [editableFields, setEditableFields] = useState({
        iseGirisTarihi: true,
        sicilNo: true,
        kadro: true,
        unvan: true,
        birim: true,
        calisilanProje: true,
        gorev: true,
        mentor: true,
        personelTuru: true,
        calismaTuru: true,
        calismaDurumu: true,
        servisKullanimi: true,
        dahiliNumara: false,
        odaNumara: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (field) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
    <>
        <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px',marginBottom: '20px'}}>

            <Box direction='row' sx={{padding: '30px', display: 'flex', alignItems: 'center'}}>

                    <Portrait sx={{color: 'red', width: '40px', height: '40px', marginRight: '25px', marginBottom: '10px', marginTop: '10px'}} />

                    <Typography variant="h6" sx={{fontSize: '18px', flexGrow: 1, fontWeight: 'bold'}}>KURUMSAL</Typography>

            </Box>

            <Box sx={{margin: '10px'}}>
                    <Grid container spacing={'20px'}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled={editableFields.iseGirisTarihi}
                                fullWidth
                                label="İşe Giriş Tarihi"
                                value={formData.iseGirisTarihi}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.sicilNo}
                                fullWidth
                                label="Sicil No"
                                value={formData.sicilNo}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.kadro}
                                fullWidth
                                label="Kadro"
                                value={formData.kadro}

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.unvan}
                                fullWidth
                                label="Unvan"
                                value={formData.unvan}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.birim}
                                fullWidth
                                label="Birim"
                                value={formData.birim}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.calisilanProje}
                                fullWidth
                                label="Çalışılan Proje"
                                value={formData.calisilanProje}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.gorev}
                                fullWidth
                                label="Görevi"
                                value={formData.gorev}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.mentor}
                                fullWidth
                                label="Mentor"
                                value={formData.mentor}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.personelTuru}
                                fullWidth
                                label="Personel Türü"
                                value={formData.personelTuru}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.calismaTuru}
                                fullWidth
                                label="Çalışma Türü"
                                value={formData.calismaTuru}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.calismaDurumu}
                                fullWidth
                                label="Çalışma Durumu"
                                value={formData.calismaDurumu}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled = {editableFields.servisKullanimi}
                                fullWidth
                                label="Servis Kullanımı"
                                value={formData.servisKullanimi}
                            />
                        </Grid>

                        {/* Editable fields */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label = "Dahili Numara"
                                name="dahiliNumara"
                                value={formData.dahiliNumara}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label = "Oda Numarası"
                                name="odaNumara"
                                value={formData.odaNumara}
                                onChange={handleChange}

                            />
                        </Grid>
                    </Grid>

                </Box>

        </Card>
    </>
    );
};

export default CompInfoForm;
