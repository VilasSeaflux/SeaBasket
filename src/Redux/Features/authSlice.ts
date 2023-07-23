import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state){
            return{
                ...state,
                isLoggedIn: true,
            }
        },
        removeIsAuth(state){
            return{
                ...state,
                isLoggedIn: false,
            }
        }

    }
});

export default authSlice.reducer;
export const {setIsAuth,removeIsAuth} = authSlice.actions;