import React from 'react';
import { Paper, IconButton, Typography, Avatar, Grid } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const ImageUpload = ({ image, onImageChange }) => {
  return (
    <Grid item xs={12} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <Paper
        style={{
          width: '50vh',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #1976d2',
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
          position: 'relative'
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={onImageChange}
        />
        <label htmlFor="icon-button-file" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <IconButton color="primary" component="span" style={{ width: 48, height: 48 }}>
            <PhotoCamera style={{ fontSize: 36 }} />
          </IconButton>
          <Typography variant="caption" style={{ marginTop: '8px' }}>
            Profil Fotoğrafı Yükle
          </Typography>
        </label>
        {image && <Avatar src={image} sx={{ width: 196, height: 196, margin: '30px' }} />}
      </Paper>
    </Grid>
  );
};

export default ImageUpload;
