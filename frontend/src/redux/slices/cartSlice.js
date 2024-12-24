import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  user: ''
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.user = action.payload.user;
    },
    addCartProduct: (state, action) => {
      const {cartItem} = action.payload;
      const itemAdded = state?.cartItems?.find((item) => item?.product === cartItem?.product);
      if(itemAdded){
        itemAdded.amount += cartItem.amount;
      }else{
        state?.cartItems.push(cartItem);
      }
    },
    removeCartProducts: (state, action) => {
      const { idProductList } = action.payload;
      state.cartItems = state?.cartItems?.filter((item) => !idProductList.includes(item.product));
    },
    increaseAmount : (state, action) => {
        const {idProduct} = action.payload;
        const itemOrdered = state?.cartItems?.find((item) => item?.product === idProduct);
        if(itemOrdered){
          itemOrdered.amount ++;
        }
    },
    decreaseAmount : (state, action) => {
      const {idProduct} = action.payload;
      const itemOrdered = state?.cartItems?.find((item) => item?.product === idProduct);
      if(itemOrdered){
        itemOrdered.amount --;
      }
    },
    resetCart : (state) => {
      state.cartItems= [];
      state.user= ''
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetCart, fetchCart,addCartProduct, removeCartProducts, removeMultipleCartProduct, increaseAmount, decreaseAmount} = cartSlice.actions;

export default cartSlice.reducer;
