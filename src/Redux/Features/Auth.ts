import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state){
            state.isAuth = !state.isAuth;
        },
        removeIsAuth(state){
            state.isAuth = !state.isAuth;
        }

    }
});

export default authSlice.reducer;
export const {setIsAuth,removeIsAuth} = authSlice.actions;