import {configureStore,createAsyncThunk} from '@reduxjs/toolkit';
import authReducer from './Features/Auth';
import userReducer from './Features/userSlice';
import axios from '@/Helper/axios';

// export const GetUserData = createAsyncThunk("get/UserData", async () => {
//     const res = await axios.get()
// });

export const store = configureStore({
    reducer: {
        "auth" :authReducer,
        "user" :userReducer,
    }
});

export default store;