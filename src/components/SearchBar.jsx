import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearchChange }) => {
  return (
    <TextField
      fullWidth
      label="Поиск товаров"
      variant="outlined"
      sx={{ 
        my: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#965FBB',
          },
          '&:hover fieldset': {
            borderColor: '#965FBB',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#965FBB',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#965FBB',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#965FBB',
        }
      }}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;