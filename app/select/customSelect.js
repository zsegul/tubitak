import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {axiosInstance} from "@/config/axios_config";

const CustomSelect = ({ type, url, onDataFetch }) => {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching select items:', error);
      }
    };
    fetchData();
  }, [type, url]);

  const handleChange = async (event) => {
    setSelectedType(event.target.value);
    onDataFetch(event.target.value);
  };

  return (
    <FormControl style={{ width: '200px' }} fullWidth>
      <InputLabel id="custom-select-label" shrink={false}>
        {type}
      </InputLabel>
      <Select
        labelId="custom-select-label"
        value={selectedType}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Type
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;