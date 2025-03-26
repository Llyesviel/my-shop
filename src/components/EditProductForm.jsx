import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Box, 
  Grid,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { editProduct } from '../features/productsSlice';
import SaveIcon from '@mui/icons-material/Save';

const EditProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Фиолетовая цветовая схема
  const bgColor = isDarkMode ? '#410f6c' : '#dab8fc';
  const hoverColor = isDarkMode ? '#5a2485' : '#c9a0fc';
  const textColor = isDarkMode ? 'white' : '#333';
  const cardBgColor = isDarkMode ? '#2c2c2c' : 'white';
  
  const [editedProduct, setEditedProduct] = useState(product);
  
  useEffect(() => {
    // Обновляем локальное состояние, если пропсы изменились
    setEditedProduct(product);
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) || 0 : value
    });
  };
  
  const handleSubmit = () => {
    if (editedProduct.title.trim() === '' || editedProduct.price === '') {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }
    
    dispatch(editProduct(editedProduct));
    if (onClose) onClose();
  };
  
  const categories = ['Штурмовые винтовки', 'Пистолеты', 'Автоматы', 'Снайперские винтовки', 'Ножи'];
  
  if (!product) return null;
  
  return (
    <Card sx={{ 
      maxWidth: '100%', 
      margin: 2, 
      boxShadow: 3,
      backgroundColor: cardBgColor
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: isDarkMode ? 'white' : '#410f6c', fontWeight: 'bold' }}>
          Редактировать товар
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Название товара"
              name="title"
              value={editedProduct.title}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Цена (VP)"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Категория</InputLabel>
              <Select
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                label="Категория"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL изображения"
              name="image"
              value={editedProduct.image}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Описание"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              variant="outlined"
              size="small"
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Рейтинг (0-5)"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={editedProduct.rating}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: isDarkMode ? '#ffcccb' : '#cd5c5c',
              mr: 1
            }}
          >
            Отмена
          </Button>
          <Button 
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            sx={{ 
              color: textColor,
              backgroundColor: bgColor,
              '&:hover': {
                backgroundColor: hoverColor,
              }
            }}
          >
            Сохранить изменения
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditProductForm; 