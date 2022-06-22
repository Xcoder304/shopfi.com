import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  userDetails: null,
  openLoginModal: false,
  ActivePaymentSection: 1,
};

export const OtherStatesSlice = createSlice({
  name: "otherStates",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userToken = action.payload;
    },

    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
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

    setPaymentSection: (state, action) => {
      state.ActivePaymentSection = action.payload;
    },
  },
});

export const {
  setUser,
  setUserDetails,
  setOpenLoginModal,
  NextPaymentStep,
  PrevPaymentSection,
  setPaymentSection,
} = OtherStatesSlice.actions;

export const selecteUser = (state) => state.otherStates.userToken;
export const selectUserDetails = (state) => state.otherStates.userDetails;

export const selecteOpenLoginModal = (state) =>
  state.otherStates.openLoginModal;

export const selecteActivePaymentSection = (state) =>
  state.otherStates.ActivePaymentSection;

export default OtherStatesSlice.reducer;
