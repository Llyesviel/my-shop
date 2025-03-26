import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  List, 
  ListItem, 
  IconButton, 
  ListItemText, 
  Box,
  useTheme,
  Collapse
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion, AnimatePresence } from 'framer-motion';

const StateManager = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Фиолетовая цветовая схема
  const bgColor = isDarkMode ? '#410f6c' : '#dab8fc';
  const hoverColor = isDarkMode ? '#5a2485' : '#c9a0fc';
  const textColor = isDarkMode ? 'white' : '#333';
  const cardBgColor = isDarkMode ? '#2c2c2c' : 'white';

  // Добавление нового элемента
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject = {
        id: Date.now(),
        value: newItem
      };
      setItems([...items, newItemObject]);
      setNewItem('');
    }
  };

  // Удаление элемента
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Начало редактирования
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.value);
  };

  // Сохранение отредактированного элемента
  const handleSaveEdit = () => {
    if (editValue.trim() !== '') {
      setItems(items.map(item => 
        item.id === editingId ? { ...item, value: editValue } : item
      ));
      setEditingId(null);
    }
  };

  // Отмена редактирования
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Обработка нажатия Enter при редактировании
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Обработка нажатия Enter при добавлении
  const handleAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <Card sx={{ 
      maxWidth: '100%', 
      margin: 2, 
      boxShadow: 3,
      backgroundColor: cardBgColor
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: isDarkMode ? 'white' : '#410f6c', fontWeight: 'bold' }}>
          Управление состоянием (useState)
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleAddKeyPress}
            placeholder="Введите новый элемент"
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          />
          <IconButton 
            onClick={handleAddItem}
            sx={{ 
              color: textColor,
              backgroundColor: bgColor,
              '&:hover': {
                backgroundColor: hoverColor,
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem sx={{ 
                  mb: 1, 
                  borderRadius: 1,
                  boxShadow: 1,
                  backgroundColor: (editingId === item.id) ? (isDarkMode ? '#352149' : '#f0e6ff') : 'transparent'
                }}>
                  {editingId === item.id ? (
                    // Редактируемое поле
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        variant="outlined"
                        size="small"
                        autoFocus
                        sx={{ mr: 1 }}
                      />
                      <IconButton 
                        onClick={handleSaveEdit}
                        size="small"
                        sx={{ 
                          color: isDarkMode ? '#90ee90' : '#2e8b57',
                          mr: 0.5
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton 
                        onClick={handleCancelEdit}
                        size="small"
                        sx={{ 
                          color: isDarkMode ? '#ffcccb' : '#cd5c5c'
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    // Обычное отображение
                    <>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: isDarkMode ? 'white' : '#333' }}>
                            {item.value}
                          </Typography>
                        }
                      />
                      <IconButton 
                        edge="end" 
                        aria-label="edit" 
                        onClick={() => handleStartEdit(item)}
                        size="small"
                        sx={{ 
                          color: isDarkMode ? '#c9a0fc' : '#5a2485',
                          mr: 0.5
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleDeleteItem(item.id)}
                        size="small"
                        sx={{ 
                          color: isDarkMode ? '#ffcccb' : '#cd5c5c'
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        {items.length === 0 && (
          <Typography sx={{ color: isDarkMode ? '#999' : '#666', textAlign: 'center', mt: 2 }}>
            Список пуст. Добавьте новые элементы.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StateManager; 