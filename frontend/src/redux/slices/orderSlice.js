import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
      shippingAddress: {
      },
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
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = orderSlice.actions

export default orderSlice.reducer