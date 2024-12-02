import { configureStore, createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const userSlice = createSlice({
  name: 'user', 
  initialState: {
    id:null
  }, 
  reducers: {
    setUser: (state, action) => 
      {
        if(!state) return action.payload
        if (state.id !== action.payload.id) return action.payload
        return state
      },
    clearUser: () => null, 
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Создаем и экспортируем хранилище
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});