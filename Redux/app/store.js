import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductSlice";
import OtherStateteReducer from "../features/OtherStateteSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    otherStates: OtherStateteReducer,
  },
});
