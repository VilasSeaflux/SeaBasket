import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state){
            state.isAuth = true;
        }
    }
});

export default authSlice.reducer;
export const {setIsAuth} = authSlice.actions;