import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/authSlice';
import userReducer from './Features/userSlice';
import productReducer from './Features/productSlice'
import cartReducer from './Features/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig,cartReducer);

export const store = configureStore({
    reducer: {
        "auth" :authReducer,
        "user" :userReducer,
        "product": productReducer,
        "cart" : persistedReducer,
    }
});

export default store;
export const persistedStore = persistStore(store);