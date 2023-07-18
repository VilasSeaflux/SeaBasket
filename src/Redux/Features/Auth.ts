import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state,action){
            state.isLoggedIn = !state.isLoggedIn;
        },
        removeIsAuth(state){
            state.isLoggedIn = !state.isLoggedIn;
        }

    }
});

export default authSlice.reducer;
export const {setIsAuth,removeIsAuth} = authSlice.actions;