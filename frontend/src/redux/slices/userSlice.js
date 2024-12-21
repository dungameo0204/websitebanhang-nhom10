import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', access_token = '', address = '', phone = '', avatar = '' } = action.payload
      if (name) {
        state.name = name;
      }
      if (phone) {
        state.phone = phone;
      }
      if (address) {
        state.address = address;
      }
      if (avatar) {
        state.avatar = avatar;
      }
      if (email) {
        state.email = email;
      }
      if (access_token) {
        state.access_token = access_token;
      }


    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.access_token = '';

    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
