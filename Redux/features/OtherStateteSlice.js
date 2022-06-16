import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  openLoginModal: false,
};

export const OtherStatesSlice = createSlice({
  name: "otherStates",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setOpenLoginModal: (state, action) => {
      state.openLoginModal = action.payload;
    },
  },
});

export const { setOpenLoginModal } = OtherStatesSlice.actions;

export const selecteUser = (state) => state.otherStates.user;

export const selecteOpenLoginModal = (state) =>
  state.otherStates.openLoginModal;

export default OtherStatesSlice.reducer;
