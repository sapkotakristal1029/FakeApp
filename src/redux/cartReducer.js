import { configureStore, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        selected: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIncart = state.cart.find((item)=> item.id == action.payload.id);
            if (itemIncart){
                itemIncart.quantity ++
            }else{
                state.cart.push({...action.payload, quantity:1});
            }
            
        },
        removeFromCart:(state,action)=>{
            const removeFromCart = state.cart.filter((item)=> item.id !== action.payload.id)
            state.cart = removeFromCart
        },
        incrementQuantity:(state,action)=>{
            const itemIncart = state.cart.find((item)=> item.id == action.payload.id);
            itemIncart.quantity ++;

        },
        decrementQuantity:(state,action) =>{
            const itemIncart = state.cart.find((item)=> item.id == action.payload.id);
            if (itemIncart.quantity == 1){
                const removeFromCart = state.cart.filter((item)=> item.id !== action.payload.id)
                state.cart = removeFromCart
            }else{
                itemIncart.quantity --;
            }
        },
        toogleSelected:(state)=>{
            state.selected = !state.selected
        },
    },
});
  
export const { addToCart,removeFromCart,incrementQuantity,decrementQuantity, toogleSelected, emptyCart  } = cartSlice.actions;

export default cartSlice.reducer;

