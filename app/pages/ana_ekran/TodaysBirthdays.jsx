"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios_config";
import { Avatar, Box, Card, CardContent, Divider, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';

const BirthdaysOfThisMonth = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        axiosInstance.get('/birthday/todays-birthdays')
            .then(response => {
                setBirthdays(response.data);
                if (response.data.length > 0) {
                    const urls = response.data.map(person => createImageUrl(person.image));
                    setImageUrls(urls);
                }
            })
            .catch(error => console.error('Error fetching birthdays:', error));
    }, []);

    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: mimeType });
    };

    const createImageUrl = (base64Image) => {
        const blob = base64ToBlob(base64Image, 'image/jpeg'); // Adjust MIME type if necessary
        return URL.createObjectURL(blob);
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? birthdays.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === birthdays.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextClick();
        }, 5000); // Change image every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [birthdays.length]); // Dependency array ensures the interval resets if the length of birthdays changes

    if (birthdays.length === 0) {
        return <div>Loading...</div>;
    }

    let currentPerson = birthdays[currentIndex];

    return (
        <Box display="flex" flexDirection="column" alignItems="center" >
            <Card sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '10px',
                borderBottom: '5px solid red',

                paddingLeft: '10px',
                paddingRight: '10px',
                width: '55%',
                position: 'relative'
            }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <CakeIcon sx={{ color: 'red', fontSize: { xs: 24, sm: 32 } }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: 24, sm: 32 }, textAlign: "center" }}>BU AY DOĞANLAR</Typography>
                    </Stack>
                    <Divider sx={{ margin: '16px 0' }} />
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 200, sm: 240 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                transition: 'transform 1s ease',
                                transform: `translateX(-${currentIndex * 100}%)`

                            }}
                        >
                            {birthdays.map((person, index) => (
                                <Box key={index} sx={{ flex: '0 0 100%', textAlign: 'center' }}>
                                    <Avatar
                                        alt={person.name}
                                        src={imageUrls[index]}
                                        sx={{ width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 }, margin: '0 auto 16px auto' }}
                                    />
                                    <Typography variant="h6" component="div" sx={{ fontSize: { xs: 20, sm: 20 }, fontWeight: "bold" }}>
                                        İyi ki Doğdun!
                                    </Typography>
                                    <Typography variant="h5" component="div" color="red" sx={{ fontSize: { xs: 25, sm: 25 }, fontWeight: "bold" }}>
                                        {person.fullName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: 20, sm: 20 } }}>
                                        Nice mutlu, sağlıklı günler dileriz!
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: { xs: 15, sm: 20 } }}>
                                        {new Date(person.birthDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
                <Box display="flex" justifyContent="space-between">
                    <IconButton onClick={handlePrevClick} sx={{ fontSize: { xs: 20, sm: 24 } }}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton onClick={handleNextClick} sx={{ fontSize: { xs: 20, sm: 24 }, zIndex: '1' }}>
                        <ArrowForward />
                    </IconButton>
                </Box>
                <CakeIcon
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        fontSize: 300,
                        color: 'rgba(0, 0, 0, 0.05)',
                        zIndex: '0'
                    }}
                />
            </Card>
        </Box>
    );
};

export default BirthdaysOfThisMonth;
