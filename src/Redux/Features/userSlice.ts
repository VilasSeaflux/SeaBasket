import { PROFILE } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        "name": '',
        "email": '',
        "phoneNo": '',
    },
    addresses: {
        "address": '',
        "city": '',
        "zip": '',
        "state": ''
    },
    orders: [],
}


export const getUserData:any = createAsyncThunk('get/UserData', async (token) => {
    const res = await axios.get(
        PROFILE,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    const data = await res.data;
    // console.log(res);
    // console.log(data);
    return data;
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProfile(state,action){
            if(action.payload.name){
                state.profile.name = action.payload.name
            }
            if(action.payload.email){
                state.profile.email = action.payload.email
            }
            if( action.payload.phoneNo){
                state.profile.phoneNo = action.payload.phoneNo
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserData.fulfilled, (state,action) => {
                // console.log(action.payload.profile)
                const {name,email,phoneNo} = action.payload.profile
                state.profile = {name,email,phoneNo};
            })
    }
});

export default userSlice.reducer;
export const {updateProfile} = userSlice.actions;
