import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortPanel = ({ onSortChange }) => {
  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'priceAsc', label: 'По цене (возрастание)' },
    { value: 'priceDesc', label: 'По цене (убывание)' },
    { value: 'rating', label: 'По рейтингу' },
  ];

  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel sx={{ color: '#965FBB' }}>Сортировка</InputLabel>
      <Select
        label="Сортировка"
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue="default"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#965FBB',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#965FBB',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#965FBB',
          },
          '& .MuiSvgIcon-root': {
            color: '#965FBB',
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: '#B19BD7D9',
          },
          '& .MuiMenuItem-root.Mui-selected': {
            backgroundColor: '#B19BD7D9',
          }
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortPanel;