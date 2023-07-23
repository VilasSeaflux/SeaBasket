import {configureStore,createAsyncThunk} from '@reduxjs/toolkit';
import authReducer from './Features/authSlice';
import userReducer from './Features/userSlice';
import productReducer from './Features/productSlice'
import cartReducer from './Features/cartSlice';

export const store = configureStore({
    reducer: {
        "auth" :authReducer,
        "user" :userReducer,
        "product": productReducer,
        "cart" : cartReducer,
    }
});

export default store;