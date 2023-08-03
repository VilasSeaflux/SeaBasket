import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

const combinedReducer = combineReducers({
    auth :authReducer,
    user :userReducer,
    product: productReducer,
    myCart : cartReducer,
})
const persistedReducer = persistReducer(persistConfig,combinedReducer);

export const store = configureStore({
    reducer: persistedReducer, 
});

export default store;
export const persistedStore = persistStore(store);