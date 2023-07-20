import {configureStore,createAsyncThunk} from '@reduxjs/toolkit';
import authReducer from './Features/Auth';
import userReducer from './Features/userSlice';
import productReducer from './Features/productSlice'


export const store = configureStore({
    reducer: {
        "auth" :authReducer,
        "user" :userReducer,
        "product": productReducer,
    }
});

export default store;