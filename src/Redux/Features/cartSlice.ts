import { CART } from "@/Helper/CONSTANTS";
import axios from "@/Helper/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const initialState = {
    cart: [],
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
    reducers: {
        addToCart(state: any, action: any) {
            const product = state.cart.find((item: any) => item.id === action.payload.id);
            // let quantity = 1;
            if (product) {
                toast.error("Product is already in the cart.");
                action.quantity++;
            } else {
                state.cart.push(action.payload);
                toast.success("Product is added in the cart.");
            }
        },
        plusQuantity(state, action): any {
            const product = state.cart.find((item: any) => item.id === action.payload.id);
            if (product) {
                return {
                    ...state,
                    cart: state.cart.map((item: any) => item.id === action.payload.id ? {
                        ...item,
                        quantity: item.quantity + 1,
                    } : item)
                }
            }
        },
        minusQuantity(state, action):any {
            const product:any = state.cart.find((item: any) => item.id === action.payload.id);
            if(product?.quantity < 1){
                removeFromCart(product);
            }else if (product) {
                return {
                    ...state,
                    cart: state.cart.map((item: any) => item.id === action.payload.id ? {
                        ...item,
                        quantity: item.quantity - 1,
                    } : item)
                }
            }
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter((product: any) => product.id !== action.payload.id);
        },
        emptyCart(state) {
            state.cart = [];
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
export const { addToCart, removeFromCart, emptyCart,plusQuantity,minusQuantity } = cartSlice.actions;