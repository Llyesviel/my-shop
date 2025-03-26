import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Фиолетовая цветовая схема, согласованная с остальными компонентами
  const bgColor = isDarkMode ? '#410f6c' : '#dab8fc';
  const hoverColor = isDarkMode ? '#5a2485' : '#c9a0fc';
  const textColor = isDarkMode ? 'white' : '#333';
  const cardBgColor = isDarkMode ? '#2c2c2c' : 'white';

  return (
    <Card sx={{ 
      maxWidth: '100%', 
      margin: 2, 
      boxShadow: 3,
      backgroundColor: cardBgColor
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: isDarkMode ? 'white' : '#410f6c', fontWeight: 'bold' }}>Корзина</Typography>
        <List>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ color: isDarkMode ? 'white' : '#333' }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: isDarkMode ? '#c9a0fc' : '#5a2485' }}>
                      {`${item.quantity} x ${item.price} VP`}
                    </Typography>
                  }
                />
                <Button 
                  onClick={() => dispatch(removeFromCart(item))}
                  sx={{ 
                    color: textColor,
                    backgroundColor: bgColor,
                    '&:hover': {
                      backgroundColor: hoverColor,
                    }
                  }}
                >
                  УДАЛИТЬ
                </Button>
              </ListItem>
            </motion.div>
          ))}
        </List>
        <Typography variant="h6" sx={{ my: 2, color: isDarkMode ? 'white' : '#410f6c', fontWeight: 'bold' }}>
          Общая стоимость: {total} VP
        </Typography>
        <Button 
          onClick={() => dispatch(clearCart())} 
          variant="contained" 
          fullWidth
          sx={{ 
            mt: 2,
            backgroundColor: bgColor,
            color: textColor,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: hoverColor,
            }
          }}
        >
          ОЧИСТИТЬ КОРЗИНУ
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;