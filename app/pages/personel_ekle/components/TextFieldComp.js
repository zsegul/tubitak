import React from 'react';
import { TextField } from '@mui/material';
import { requiredFields } from '../constants';

const TextFieldComp = ({ field, formValues, handleChange, errors }) => {
  const chooseTextFieldType = (field) => {
    if (field === 'E-Posta') return 'email';
    if (field === 'İşe Giriş Tarihi' || field === 'Doğum Tarihi') return 'date';
    return 'text';
  };

  const chooseShrink = (field) => {
    if (field === 'İşe Giriş Tarihi' || field === 'Doğum Tarihi') return { shrink: true };
    return {};
  };

  return (
    <TextField
      id={field}
      fullWidth
      name={field}
      label={field}
      type={chooseTextFieldType(field)}
      value={formValues[field]}
      onChange={handleChange}
      margin="dense"
      size="small"
      required={requiredFields.includes(field)}
      helperText={errors[field]}
      error={Boolean(errors[field])}
      InputLabelProps={chooseShrink(field)}
    />
  );
};

export default TextFieldComp;
