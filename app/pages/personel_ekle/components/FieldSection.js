import React from 'react';
import { Grid, Paper, Typography, Divider } from '@mui/material';
import TextFieldComp from './TextFieldComp';
import SelectFieldComp from './SelectFieldComp';
import ImageUpload from './ImageUpload';

const FieldSection = ({ title, fields, formValues, handleChange, errors, dropDownEnumTypes, selectedProject, teams, side, image, handleImageChange }) => {
    const isRightSide = side === 'right';
  return (
    <Grid item xs={12} md={6}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Paper style={{ padding: '8px' }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            {fields.map((field, index) => (
              <React.Fragment key={field}>
                {dropDownEnumTypes[field] ? (
                  <SelectFieldComp
                    field={field}
                    formValues={formValues}
                    handleChange={handleChange}
                    errors={errors}
                    options={field === 'Takım' ? teams : dropDownEnumTypes[field]}
                    disabled={field === 'Takım' && !selectedProject}
                  />
                ) : (
                  <TextFieldComp
                    field={field}
                    formValues={formValues}
                    handleChange={handleChange}
                    errors={errors}
                  />
                )}
                {(index === 5 || index === 12) && <Divider style={{ margin: '16px 0', backgroundColor: 'red', height: '2px' }} />}
              </React.Fragment>
            ))}
          </Paper>
        </Grid>
        {isRightSide && <ImageUpload image={image} onImageChange={handleImageChange} />}
      </Grid>
    </Grid>
  );
};

export default FieldSection;
