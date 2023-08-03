import { ORDER, PROFILE } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
    cancelledOrders: []
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
        return returnedData;
    } catch (err) {
        console.log(err);
    }
});

export const getOrders:any = createAsyncThunk('get/Orders', async(token) => {
    try{
        const res = await axios.get(
            ORDER,
            {
                headers: {"Authorization": `bearer ${token}`}
            });
        const data = await res.data;
        return data.orders;
    }catch(err){
        console.log(err);
    }
});

export const CancelOrder:any = createAsyncThunk('post/cancelOrder',async ({token,params}:any) => {
    try {
        const res = await axios.post(
            `${ORDER}/${params.id}`,
            {},
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        );
        const data = await res.data;
        toast.success("Order Canceled!!");
        return data.orders;
    }catch(err){
        console.log(err);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.profile = action.payload;
        },
        updateAddress(state, action) {
            state.address = action.payload;
        },
        clearUser(state){
            state.profile = initialState.profile;
            state.address = initialState.address;
            state.orders = initialState.orders;
            state.cancelledOrders = initialState.cancelledOrders;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.address = action.payload.addresses[0];
                state.orders = action.payload.orders;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
            })
            // .addCase(getOrders.fulfilled, (state,action) => {
            //     state.orders = action.payload;
            // })
            .addCase(CancelOrder.fulfilled, (state:any,action:any) => {
                state.cancelledOrders.push({...action.payload});
            })
    }
});

export default userSlice.reducer;
export const { updateProfile, updateAddress,clearUser } = userSlice.actions;
