import React, { useEffect, useState } from 'react';
import {
    TextField, Box, Typography, Button, Grid, IconButton, Avatar, Dialog,
    DialogTitle, DialogContent, DialogActions, MenuItem, Card, Stack
} from '@mui/material';
import { Portrait } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { axiosInstance } from '@/config/axios_config';


const UserInfoForm = ({ userId, newAvatar, setNewAvatar, isNewAvatarUploaded, setIsNewAvatarUploaded, avatar, selectedFile, setSelectedFile, formData, setFormData }) => {
    const [rehberData, setRehberData] = useState({});
    /*
        useEffect(() => {
            console.log(userId);
            axiosInstance.get(`/user/rehber/${userId}`)
                .then(response => {
                    setRehberData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, [userId]);
    */

    const [editableFields, setEditableFields] = useState({
        ad: false,
        soyad: false,
        tcKimlikNo: false,
        cinsiyet: false,
        akademikUnvan: false,
        email: false,
        dogumTarihi: false,
        kanGrubu: false,
        telefon: false,
        aracPlakasi: false,
        acilDurumKisi: false,
        acilDurumKisiTelefon: false,
        ikametgahAdresi: false
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const [onScreenAvatar, setOnScreenAvatar] = useState(avatar);

    const avatarSize = '84px';

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({
            ...prev,
            telefon: value
        }));
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setPreviewURL(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreviewURL(URL.createObjectURL(file));
        } else {
            setPreviewURL(null);
        }
    };

    const handleAvatarUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result);
                setIsNewAvatarUploaded(true);
            };
            reader.readAsDataURL(selectedFile);
            handleModalClose();
        } else {
            console.error('No file selected.');
        }
    };

    useEffect(() => {
        if (isNewAvatarUploaded) {
            setOnScreenAvatar(newAvatar);
        }
        else {
            setOnScreenAvatar(avatar)
        }
    }, [avatar, newAvatar, isNewAvatarUploaded]);

    return (

        <>
            <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px', marginBottom: '20px' }}>

                <Box direction='row' sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>

                    <Portrait sx={{ color: 'red', width: '40px', height: '40px', marginRight: '25px' }} />

                    <Typography variant="h6" sx={{ fontSize: '18px', flexGrow: 1, fontWeight: 'bold' }}>KİŞİSEL</Typography>

                    <IconButton sx={{ height: '100%' }} onClick={handleModalOpen}>
                        {onScreenAvatar && <Avatar
                            alt={rehberData.fullName}
                            src={rehberData?.image ? `data:image/jpg;base64,${rehberData?.image}` : undefined}
                            sx={{ width: 60, height: 60 }}
                        />}
                    </IconButton>



                </Box>

                <Box sx={{ margin: '10px' }}>
                    <Grid container spacing={'20px'}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="ad"
                                onChange={handleChange}
                                fullWidth

                                label="Ad"
                                value={formData.ad}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="soyad"
                                onChange={handleChange}
                                fullWidth
                                label="Soyad"
                                value={formData.soyad}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="tcKimlikNo"
                                onChange={handleChange}
                                fullWidth
                                label="T.C. Kimlik Numarası"
                                value={formData.tcKimlikNo}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="cinsiyet"
                                onChange={handleChange}
                                fullWidth
                                label="Cinsiyet"
                                value={formData.cinsiyet}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="akademikUnvan"
                                onChange={handleChange}
                                fullWidth
                                label="Akademik Ünvan"
                                value={formData.akademikUnvan}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth

                                type="email"
                                label="E-posta"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Editable fields */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Doğum Tarihi"
                                name="dogumTarihi"
                                value={formData.dogumTarihi}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Kan Grubu"
                                name="kanGrubu"
                                value={formData.kanGrubu}
                                onChange={handleChange}
                            >
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">0+</MenuItem>
                                <MenuItem value="O-">0-</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PhoneInput
                                country={'tr'}
                                value={formData.telefon}
                                onChange={handlePhoneChange}
                                inputStyle={{ width: '100%' }}
                            />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Araç Plakası"
                                name="aracPlakasi"
                                value={formData.aracPlakasi}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Acil Durumda Ulaşılacak Kişi"
                                name="acilDurumKisi"
                                value={formData.acilDurumKisi}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PhoneInput
                                country={'tr'}
                                value={formData.acilDurumKisiTelefon}
                                onChange={handlePhoneChange}
                                inputStyle={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="İkametgah Adresi"
                                name="ikametgahAdresi"
                                value={formData.ikametgahAdresi}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Modal for Avatar Upload */}
                <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Profil Fotoğrafını Yükle</DialogTitle>
                    <DialogContent>
                        {previewURL ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                <img src={previewURL} alt="Preview" style={{ width: '100%', maxHeight: '400px' }} />
                            </Box>
                        ) : (
                            <Typography>Lütfen bir dosya seçin.</Typography>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleModalClose} color="primary">
                            Kapat
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAvatarUpload}
                            color="primary"
                            disabled={!selectedFile}
                        >
                            Yükle
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
};

export default UserInfoForm;
