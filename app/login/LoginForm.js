"use client";
import React, {Fragment, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import useForm from "@/app/hooks/useForm";
import {axiosInstance} from "@/config/axios_config";
import {toast, ToastContainer} from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import "./page.css"

import {useRouter} from 'next/navigation';

const LoginForm = () => {

    const {values, errors, handleChange, handleSubmit, handleRememberMe, resetForm} = useForm({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('id')) {
            setAuthenticated(true);
            router.push('/pages/ana_ekran');
        } else {
            setLoading(false);
        }
      }, [router]);

    const onSubmit = () => {
        axiosInstance.post('/auth/login', {
            username: values.email,
            password: values.password
        })
            .then(response => {
                toast.success("Giriş Başarılı!");
                localStorage.setItem('fullName', response.data.name + ' ' + response.data.surname);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('authority', response.data.authorities);
                router.push('/pages/ana_ekran');
            })
            .catch(error => {
                toast.error("Giriş Başarısız!");
            });
        resetForm();
    };

    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
    }

    if (authenticated) {
        return null;
    }

    return (<Fragment>
            <ToastContainer/>
            <Card className="card">
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                >
                    <CardMedia
                        component="img"
                        height="80%"
                        width="80%"
                        image="/images/yte.png"
                        alt=""

                    />
                </Stack>


                <CardContent>

                    <Box>
                        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                            Personel Bilgi Sistemi
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={(e) => handleSubmit(e, onSubmit)} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email/ Kullanıcı Adı"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Parola"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.rememberMe}
                                    onChange={handleRememberMe}
                                    name="rememberMe"
                                    color="primary"
                                />
                            }
                            label="Beni Hatırla"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2}}
                        >
                            GİRİŞ
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </Fragment>
    );
};

export default LoginForm;
