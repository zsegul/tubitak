import React from 'react';
import { Paper, Grid, Button } from '@mui/material';

const FormContainer = ({ children, onSubmit }) => {
  return (
    <Paper style={{ padding: '10px', margin: '10px' }}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {children}
          <Grid item xs={12} style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FormContainer;
