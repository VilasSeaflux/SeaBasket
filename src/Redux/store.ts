import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Features/Auth';
export const store = configureStore({
    reducer: {
        authReducer,
    }
});

export default store;