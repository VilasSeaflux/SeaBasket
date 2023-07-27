import { PROFILE } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        "name": '',
        "email": '',
        "phoneNo": '',
    },
    address: {
        "address": '',
        "city": '',
        "zip": '',
        "state": ''
    },
    orders: [],
}


export const getUserData: any = createAsyncThunk('get/UserData', async (token) => {
    const res = await axios.get(
        PROFILE,
        {
            headers: {
                "Authorization": `bearer ${token}`
            }
        }
    );
    const data = await res.data;
    return data;
});

export const updateUserProfile: any = createAsyncThunk('put/UserData', async ({ token, data }: any) => {
    try {
        const res = await axios.put(
            PROFILE,
            data,
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        );
        const returnedData = await res.data;
        console.log(returnedData);
        return returnedData;
    } catch (err) {
        console.log(err);
    }
});




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProfile(state, action) {
            if (action.payload.name) {
                state.profile.name = action.payload.name
            }
            if (action.payload.email) {
                state.profile.email = action.payload.email
            }
            if (action.payload.phoneNo) {
                state.profile.phoneNo = action.payload.phoneNo
            }
        },
        updateAddress(state, action) {
            if (action.payload.address) {
                state.address.address = action.payload.address;
            }
            if (action.payload.city) {
                state.address.city = action.payload.city;
            }
            if (action.payload.zip) {
                state.address.zip = action.payload.zip;
            }
            if (action.payload.state) {
                state.address.state = action.payload.state;
            }
        },
        clearUser(state){
            state.profile = initialState.profile;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
            })
    }
});

export default userSlice.reducer;
export const { updateProfile, updateAddress,clearUser } = userSlice.actions;
