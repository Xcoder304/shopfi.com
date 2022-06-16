import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  errorMsg: { status: false, message: "" },
  productQty: 0,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTheCart: (state, action) => {
      if (state.cart.length > 0) {
        // check if the product exit or not in the cart
        if (state.cart.find((product) => product._id === action.payload._id)) {
          state.errorMsg = {
            status: true,
            message: "Product already exist in the cart",
          };
        } else {
          state.cart.push(action.payload);
          state.errorMsg = {
            status: false,
            message: "",
          };
        }
      } else {
        state.cart.push(action.payload);
        state.errorMsg = {
          status: false,
          message: "",
        };
      }

      // console.log(Cookies.get(JSON.parse(Cookies.get("cart"))));
    },
    ChangeCartValue: (state, action) => {
      state.cart = action.payload;
    },

    setproductQty: (state, action) => {
      state.productQty = action.payload;
    },
  },
});

export const { setproductQty, setTheCart, ChangeCartValue } =
  ProductSlice.actions;
export const selecteproductQty = (state) => state.product.productQty;
export const selectecart = (state) => state.product.cart;
export const selecteErrorMsgVal = (state) => state.product.errorMsg;
export default ProductSlice.reducer;
