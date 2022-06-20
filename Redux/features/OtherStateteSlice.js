import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  openLoginModal: false,
  ActivePaymentSection: 1,
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

    NextPaymentStep: (state, action) => {
      state.ActivePaymentSection =
        state.ActivePaymentSection < 4
          ? state.ActivePaymentSection + 1
          : state.ActivePaymentSection;
    },

    PrevPaymentSection: (state, action) => {
      state.ActivePaymentSection =
        state.ActivePaymentSection > 0
          ? state.ActivePaymentSection - 1
          : state.ActivePaymentSection;
    },
  },
});

export const {
  setOpenLoginModal,
  setUser,
  NextPaymentStep,
  PrevPaymentSection,
} = OtherStatesSlice.actions;

export const selecteUser = (state) => state.otherStates.user;

export const selecteOpenLoginModal = (state) =>
  state.otherStates.openLoginModal;

export const selecteActivePaymentSection = (state) =>
  state.otherStates.ActivePaymentSection;

export default OtherStatesSlice.reducer;
