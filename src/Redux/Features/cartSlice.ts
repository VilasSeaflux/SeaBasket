import { CART } from "@/Helper/CONSTANTS";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cart: [],
    totalPrice: 0,
}


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
            const product: any = state.cart.find((item: any) => item.id === action.payload.id);
            if (product) {
                product.quantity = product.quantity + 1
            }
        },
        minusQuantity(state, action): any {
            const product: any = state.cart.find((item: any) => item.id === action.payload.id);
            if (product) {
                product.quantity = product.quantity - 1
            }
            if (product.quantity <= 0) {
                state.cart = state.cart.filter((item: any) => item.id !== action.payload.id);
            }
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter((product: any) => product.id !== action.payload.id);
        },
        emptyCart(state) {
            state.cart = [];
            state.totalPrice = 0;
        },
        setTotal(state,action){
            state.totalPrice = action.payload;
        }

    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, emptyCart, plusQuantity, minusQuantity,setTotal } = cartSlice.actions;