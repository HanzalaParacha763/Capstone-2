import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartList';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;