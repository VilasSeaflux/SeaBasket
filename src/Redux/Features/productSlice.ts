import { CATEGORIES, PRODUCT, FILTER, TRENDING, SORTED_PRODUCTS } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    categories: [],
    categoryProduct: [],
    trending: [],
}

export const getProductsData: any = createAsyncThunk("get/Products", async (token) => {
    try {
        const res = await axios.get(
            PRODUCT,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        const data = await res.data;
        return data;
    } catch (err) {
        console.log(err);
    }
})

export const getCategories: any = createAsyncThunk("get/categories", async (token) => {
    const res = await axios.get(
        CATEGORIES,
        {
            headers: { Authorization: `bearer ${token}` }
        }
    )
    const data = await res.data;
    return data.categories;
});

export const getCategoryProduct: any = createAsyncThunk('get/categoryProducts', async (query: string, token) => {
    try {
        const res = await axios.get(
            `${FILTER}?category=${query}`,
            {
                headers: { Authorization: `bearer ${token}` }
            }
        );
        const data = await res.data;
        return data;
    } catch (err) {
        console.log(err);
    }
});

export const getTrendingProducts: any = createAsyncThunk('get/Trending_products', async (token) => {
    try {
        const res = await axios.get(
            TRENDING,
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        );
        const data = await res.data;
        return data;
    } catch (err) {
        console.log(err);
    }
});

export const sortBy: any = createAsyncThunk('get/Sorted_products', async ({ token, sort, order }: any) => {
    try {
        const res = await axios.get(
            `${SORTED_PRODUCTS}?sort=${sort}&order=${order}`,
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        );
        const data = await res.data;
        return data;
    }catch(err){
        console.log(err);
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearCategory(state) {
            state.categoryProduct = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductsData.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(getCategoryProduct.fulfilled, (state, action) => {
                state.categoryProduct = action.payload;
            })
            .addCase(getTrendingProducts.fulfilled, (state, action) => {
                state.trending = action.payload;
            })
            .addCase(sortBy.fulfilled, (state, action) => {
                state.products = action.payload;
                // state.categoryProduct = action.payload;
            })
    }
});

export default productsSlice.reducer;
export const { clearCategory } = productsSlice.actions;