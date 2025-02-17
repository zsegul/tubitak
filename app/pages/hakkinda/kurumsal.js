"use client"
import React, { useState, useEffect } from 'react';
import {TextField, Box, Typography, Button, Grid, Card} from '@mui/material';
import {Portrait} from "@mui/icons-material";


const CompInfoForm = ({formData, setFormData}) => {




    const [editableFields, setEditableFields] = useState({
        iseGirisTarihi: false,
        sicilNo: false,
        kadro: false,
        unvan: false,
        birim: false,
        calisilanProje: false,
        gorev: false,
        mentor: false,
        personelTuru: false,
        calismaTuru: false,
        calismaDurumu: false,
        servisKullanimi: false,
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
                                name="iseGirisTarihi"
                                onChange={handleChange}
                                fullWidth
                                label="İşe Giriş Tarihi"
                                value={formData.iseGirisTarihi}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="sicilNo"
                                onChange={handleChange}
                                fullWidth
                                label="Sicil No"
                                value={formData.sicilNo}
                                //InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="kadro"
                                onChange={handleChange}
                                fullWidth
                                label="Kadro"
                                value={formData.kadro}

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="unvan"
                                onChange={handleChange}
                                fullWidth
                                label="Unvan"
                                value={formData.unvan}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="birim"
                                onChange={handleChange}
                                fullWidth
                                label="Birim"
                                value={formData.birim}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="calisilanProje"
                                onChange={handleChange}
                                fullWidth
                                label="Çalışılan Proje"
                                value={formData.calisilanProje}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="gorev"
                                onChange={handleChange}
                                fullWidth
                                label="Görevi"
                                value={formData.gorev}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="mentor"
                                onChange={handleChange}
                                fullWidth
                                label="Mentor"
                                value={formData.mentor}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="personelTuru"
                                onChange={handleChange}
                                fullWidth
                                label="Personel Türü"
                                value={formData.personelTuru}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="calismaTuru"
                                onChange={handleChange}
                                fullWidth
                                label="Çalışma Türü"
                                value={formData.calismaTuru}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="calismaDurumu"
                                onChange={handleChange}
                                fullWidth
                                label="Çalışma Durumu"
                                value={formData.calismaDurumu}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="servisKullanimi"
                                onChange={handleChange}
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
                                onChange={handleChange}
                                value={formData.odaNumara}

                            />
                        </Grid>
                    </Grid>

                </Box>

        </Card>
    </>
    );
};

export default CompInfoForm;
