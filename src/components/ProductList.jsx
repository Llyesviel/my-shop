import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory, setSortBy, setSearchQuery } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortPanel from './SortPanel';
import SearchBar from './SearchBar';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { Box, Dialog, DialogContent, Fab, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category, sortBy, searchQuery } = useSelector((state) => state.products);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => product.category === category);

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleCloseEdit = () => {
    setEditProduct(null);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading products.</div>;

  return (
    <div>
      <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
      <SortPanel onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} />
      <SearchBar onSearchChange={(query) => dispatch(setSearchQuery(query))} />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={handleEditProduct} 
          />
        ))}
      </div>

      {/* Мобильная кнопка для добавления товаров */}
      <Fab 
        color="primary" 
        aria-label="add"
        onClick={() => setShowAddForm(true)}
        sx={{ 
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: isDarkMode ? '#410f6c' : '#dab8fc',
          '&:hover': {
            backgroundColor: isDarkMode ? '#5a2485' : '#c9a0fc',
          }
        }}
      >
        <AddIcon />
      </Fab>

      {/* Диалог для добавления нового товара */}
      <Dialog 
        open={showAddForm} 
        onClose={() => setShowAddForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <AddProductForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Диалог для редактирования товара */}
      <Dialog 
        open={editProduct !== null} 
        onClose={handleCloseEdit}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {editProduct && (
            <EditProductForm 
              product={editProduct} 
              onClose={handleCloseEdit} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;