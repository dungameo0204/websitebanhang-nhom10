import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectedOrderItems: (state, action) => {
      const {selectedItems} = action.payload;
      state.selectedOrderItems = selectedItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectedOrderItems } = orderSlice.actions;

export default orderSlice.reducer;
