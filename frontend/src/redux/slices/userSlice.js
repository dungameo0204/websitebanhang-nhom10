import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  id: '',
  isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', access_token = '', address = '', phone = '', avatar = '', _id = '', isAdmin } = action.payload
      state.name = name;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.email = email;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    // updateUser: (state, action) => {
    //   const {name, email, access_token} = action.payload
    //   state.name = name || email;
    //   state.email = email;
    //   state.access_token = access_token;
    // },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
