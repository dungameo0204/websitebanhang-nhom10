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
    updateUser: (state,action) => {
      const {name, email, access_token} = action.payload

      if(name){
        state.name = name || email;
      }
      if(email){
        state.email = email;
      }
      if(access_token){
        state.access_token = access_token;
      }
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
