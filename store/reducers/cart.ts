import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

export interface CartProduct extends Product { 
   selectedQuantity : number
}
export type CartState = {
  items: CartProduct[];
};
const initialState: CartState = { items: [] };
const CartSlice = createSlice({
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
        state.items.push(action.payload)
    },
    removeFromCart: (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload.id)
    },
    updateCart : (state,  { payload }) => { 
       const index = state.items.findIndex((product) => product.id === payload.id);
       if(index !== -1) { 
          state.items[index] = payload;
       }
    }
  },
  initialState,
});
export const { addToCart, removeFromCart, updateCart } = CartSlice.actions;
export default CartSlice.reducer;
