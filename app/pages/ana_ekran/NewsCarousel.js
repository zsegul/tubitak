"use client";
import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import BirthdaysOfThisMonth from "@/app/pages/ana_ekran/TodaysBirthdays";

const NewsCarousel = ({ news }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [offset, setOffset] = useState(0);

    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex(prevIndex => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
    };

    const handleClickOnNewsCard = () => {
        window.open(news[activeIndex].url, '_blank');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [handleNext, news.length]);

    useEffect(() => {
        const newOffset = -activeIndex * 100;
        setOffset(newOffset);
    }, [activeIndex]);

    return (

        <Box position = "absolute" height='calc(48vh)' display="flex" flexDirection={isMdDown ? 'column' : 'row'} justifyContent="space-between" alignItems="stretch" sx ={{background: 'white'}}>
            <Box display="flex" flexDirection="column" position = "start" alignItems="start" width="32%" paddingLeft={3}>
                <Grid container spacing={0} style={{ width: '75%', position: 'relative', overflow: 'hidden' }}>
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: '10px', borderBottom: '5px solid red', paddingTop: '5px' }}>
                            <Box
                                display="flex"
                                style={{
                                    transform: `translateX(${offset}%)`,
                                    transition: 'transform 0.5s ease-in-out',
                                    width: `${news.length * 16.67}%`,
                                    display: 'flex'
                                }}
                            >
                                {news.map((item, index) => (
                                    <Box key={index} sx={{ flex: '0 0 100%' }}>
                                        <CardMedia
                                            onClick={() => handleClickOnNewsCard()}
                                            component="img"
                                            height="400"
                                            width="400"
                                            image={item.imageSrc}
                                            alt="YeniHaber"
                                            style={{ objectFit: 'fill' }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="center"
                                position="absolute"
                                bottom={8}
                                left={0}
                                right={0}
                                zIndex={1}
                            >
                                <IconButton onClick={handlePrev} sx={{ color: 'white' }}>
                                    <ArrowBack />
                                </IconButton>
                                {news.map((item, index) => (
                                    <IconButton
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        sx={{ color: index === activeIndex ? 'white' : 'gray', mx: 0.5 }}
                                    >
                                        {index === activeIndex ? (
                                            <span>&#9679;</span>
                                        ) : (
                                            <span>&#9675;</span>
                                        )}
                                    </IconButton>
                                ))}
                                <IconButton onClick={handleNext} sx={{ color: 'white' }}>
                                    <ArrowForward />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box  justifyContent="center" position="center" >
                <img src="/images/bilgem.png" alt="bilgem_Logo" style={{ height: '50%', paddingLeft: "50" }} />

            </Box>
            <Box width="30%">
                <BirthdaysOfThisMonth />
            </Box>
        </Box>
    );
};

export default NewsCarousel;
