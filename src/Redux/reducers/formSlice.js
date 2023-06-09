import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.formData = [...state.formData, action.payload];
      // console.log(state, action);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.formData.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state.formData[userIndex] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.formData = state.formData.filter((user) => user.id !== userId);
    },
    deleteTable: (state, action) => {
      state.formData = [];
    },
  }
});

export const { setUserData, updateUser, deleteUser, deleteTable } = userSlice.actions;
export default userSlice.reducer;