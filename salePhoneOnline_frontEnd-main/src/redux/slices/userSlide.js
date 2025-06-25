import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  id: '',
  isAdmin: false,
  city:'',
  role: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', access_token = '',phone = '',address = '',avatar = '',_id = '', isAdmin, city = '', role = '' } = action.payload
      state.name = name;
      state.email=email;
      state.phone=phone;
      state.address=address;
      state.avatar=avatar;
      state.id = _id;
      state.access_token=access_token;
      state.isAdmin=isAdmin;
      state.city=city;
      state.role= role
    },
    resetUser: (state) => {
      state.name = '';
      state.email='';
      state.phone='';
      state.address='';
      state.avatar='';
      state.id = '';
      state.access_token='';
      state.isAdmin= false;
      state.city= '';
      state.role='';
    },
  },
})

export const { updateUser,resetUser } = userSlide.actions

export default userSlide.reducer
