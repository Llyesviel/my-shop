import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const bgColor = isDarkMode ? '#410f6c' : '#dab8fc';
  const hoverColor = isDarkMode ? '#5a2485' : '#c9a0fc';
  const textColor = isDarkMode ? 'white' : '#333';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 400, margin: 2, boxShadow: 3, height: 430, display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ 
            objectFit: 'contain', 
            padding: '10px',
            backgroundColor: isDarkMode ? '#2c2c2c' : '#f5f5f5'
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </div>
          <div>
            <Typography variant="h5" sx={{ my: 1 }}>{product.price}$</Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(addToCart(product))}
              sx={{ 
                mt: 1,
                backgroundColor: bgColor,
                color: textColor,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: hoverColor,
                }
              }}
            >
              Добавить в корзину
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;