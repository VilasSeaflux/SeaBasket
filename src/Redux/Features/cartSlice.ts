import { CART } from "@/Helper/CONSTANTS";
import axios from "@/Helper/axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cart:[],
    // message: '',
    // warning: '',
}

// export const addToCart:any = createAsyncThunk('post/addToCart',async (token,data) => {
//     const res = await axios.post(
//         CART,
//         JSON.stringify(data),
//         {
//             headers:{Authorization : `bearer ${token}`}
//         }
//     );
//     const productData = await res.data;
//     console.log(productData);
//     return productData;
// });

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state:any,action:any){
            const product = state.cart.find((item:any) => item.id === action.payload.id);
            // let quantity = 1;
            if(product){
                    toast.error("Product is already in the cart.");
                    action.quantity++;
            }else{
                state.cart.push(action.payload);
                toast.success("Product is added in the cart.");
            }
        },
        removeFromCart(state,action){
            state.cart = state.cart.filter((product:any) => product.id === action.payload.id);
        }
    },
    // extraReducers(builder){
    //     builder.addCase(addToCart.fulfilled,(state:any,action:any) => {
    //         const isProduct = state.cart.find((item:any) => item.id === action.payload.id);
    //         if(isProduct){
    //             alert("Product already in the cart.");
    //         }else{
    //             state.cart.push(action.payload);
    //         }
    //     });
    // }
});

export default cartSlice.reducer;
export const {addToCart,removeFromCart} = cartSlice.actions;