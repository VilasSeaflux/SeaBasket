import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    "name": '',
    "email": '',
    "PhoneNo": '',
    "street": '',
    "street2": '',
    "city": '',
    "zip": '',
    "state": '',
    "country": ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {

    }
});

export default userSlice.reducer;
