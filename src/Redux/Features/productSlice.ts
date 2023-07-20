import { CATEGORIES, PRODUCT,FILTER } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProductsData: any = createAsyncThunk("get/Products", async (token) => {
    const res = await axios.get(
        PRODUCT,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    const data = await res.data;
    console.log(data);
    return data;
})
const initialState = {
    products: [],
    categories: [],
    category: []
}

export const getCategories: any = createAsyncThunk("get/categories",async(token) => {
    const res = await axios.get(
        CATEGORIES,
        {
            headers: { Authorization: `bearer ${token}` }
        }
    )
    const data = await res.data;
    console.log(data);
    return data.categories;
});

export const getCategoryProduct: any = createAsyncThunk('get/categoryProducts',async(query:string,token) => {
    const res = await axios.get(
        `${FILTER}?category=${query}`,
        {
            headers: {Authorization: `bearer ${token}`}
        }
    );
    const data = await res.data;
    console.log(data);
    return data;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getProductsData.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getCategories.fulfilled, (state,action) => {
                state.categories = action.payload;
            })
            .addCase(getCategoryProduct.fulfilled, (state,action) => {
                state.category = action.payload;
            })
    }
});

export default productsSlice.reducer;