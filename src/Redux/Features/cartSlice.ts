import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[],
    message: '',
    warning: '',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state:any,action:any){
            const product = state.cart.find((item:any) => item.id === action.payload.id);
            if(product){
                state.warning = "Product is already In the cart";
                setTimeout(() => {
                    state.warning = '';
                },2000);
                
            }else{
                state.cart.push(action.payload);
                state.message = "Cart Updated."
            }
        },
        removeFromCart(state,action){
            state.cart = state.cart.filter((product:any) => product.id === action.payload.id);
            state.message = "Item removed successfully"
            setTimeout(() => {
                state.message = '';
            },2000);
        }
    }
});

export default cartSlice.reducer;
export const {addToCart,removeFromCart} = cartSlice.actions;