import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { requiredFields } from '../constants';

const SelectFieldComp = ({ field, formValues, handleChange, errors, options, disabled }) => {
  return (
    <FormControl fullWidth margin="dense" required={requiredFields.includes(field)} disabled={disabled}>
      <InputLabel id={`${field}-label`}>{field}</InputLabel>
      <Select
        labelId={`${field}-label`}
        name={field}
        value={formValues[field]}
        onChange={handleChange}
        size="small"
        error={Boolean(errors[field])}
      >
        <MenuItem key="" value="">...</MenuItem>
        {options.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
      {errors[field] && <FormHelperText error>{errors[field]}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFieldComp;
