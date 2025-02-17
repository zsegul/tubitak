import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import {Celebration, Logout} from '@mui/icons-material';
import { axiosInstance } from "@/config/axios_config";
import {useAvatar} from "@/app/contexts/AvatarContext";

const AdminNavbar = ({ years, months, days, mentor}) => {

  const {avatar} = useAvatar();
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    localStorage.removeItem('authority');
    navigateTo('/login');
  }

  const navigateTo = (path) => {
    router.push(path);
  };

  const fullName = typeof window !== 'undefined' ? localStorage.getItem('fullName') : '';



  return (
      <AppBar position="static" sx={{  backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <img src="/images/bilgem.png" alt="bilgem_Logo" style={{ height: 64 }} />
            <Box sx={{ backgroundColor: 'lightgray', height: 40, width: 2, marginLeft: '20px' }} />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Personel Bilgi Sistemi
          </Typography>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/ana_ekran')}>Genel</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/rehber')}>Rehber</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/raporlar')}>Raporlar</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/panel')}>Panel</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/hakkimda')}>Hakkımda</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/yetkilendirme')}>Yetkilendirme</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => navigateTo('/pages/organizasyon_semasi')}>Organizasyon Şeması</Button>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', marginLeft: 0 }}>
            <Box sx={{ backgroundColor: 'lightgray', height: 40, width: 2, marginLeft: '10px', marginRight: '10px' }} />
            <IconButton onClick={() => navigateTo('/pages/hakkimda')}>
              <Avatar
                  alt={fullName}
                  src={avatar}
                  sx={{ width: '40px', height: '40px' }}
              />
            </IconButton>
            <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
              {fullName}
            </Typography>
            <Box sx={{ backgroundColor: 'lightgray', height: 40, width: 2, marginLeft: '15px', marginRight: '15px' }} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="primary" onClick={logoutHandler}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ backgroundColor: 'red', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {mentor && (
              <Typography variant="h6" sx={{ fontSize: "15px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}>
                Mentor: {mentor}
              </Typography>
          )}

          <Typography variant="h6" sx={{ fontSize: "15px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}>
            <span><strong>{years}</strong> Yıl <strong>{months}</strong> Ay <strong>{days}</strong> Gündür birlikteyiz.</span>
            <Celebration sx={{ marginLeft: '10px' }} />
          </Typography>

        </Box>
      </AppBar>
  );
};

export default AdminNavbar;