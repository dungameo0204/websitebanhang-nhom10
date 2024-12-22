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
    addOrderProduct: (state, action) => {

        const orderItem = action.payload;
        console.log("orderItem", orderItem);
        const itemOrder = state?.orderItems?.find(x => x?.product === orderItem.product);
        console.log("itemOrder", itemOrder);
        if (itemOrder){
            itemOrder.amount += orderItem.amount;
        } else {
            state.orderItems.push(orderItem);
        }
      },
      removeOrderProduct: (state, action) => {
        const idProduct = action.payload;
        const itemOrder = state?.orderItems?.find(x => x?.product !== idProduct);
        state.orderItems = itemOrder;
      },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct } = orderSlice.actions

export default orderSlice.reducer