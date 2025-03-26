import React from 'react';
import { Button, ButtonGroup, useTheme } from '@mui/material';

const FilterPanel = ({ onFilterChange }) => {
  const categories = ['Все','Штурмовые винтовки','Пистолеты', 'Автоматы', 'Снайперские винтовки', 'Ножи'];
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const bgColor = isDarkMode ? '#410f6c' : '#dab8fc';
  const hoverColor = isDarkMode ? '#5a2485' : '#c9a0fc';
  const textColor = isDarkMode ? 'white' : '#333';

  return (
    <ButtonGroup 
      variant="contained" 
      disableElevation
      sx={{ 
        my: 2, 
        backgroundColor: bgColor, 
        borderRadius: '4px',
        '& .MuiButton-root': {
          color: textColor,
          backgroundColor: bgColor,
          '&:hover': {
            backgroundColor: hoverColor,
          },
          border: 'none',
          borderRight: 'none',
          borderRadius: '4px',
          margin: '0 1px'
        },
        '& .MuiButtonGroup-grouped:not(:last-of-type)': {
          borderRight: 'none'
        }
      }}
    >
      {categories.map((category) => (
        <Button key={category} onClick={() => onFilterChange(category)}>
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterPanel;