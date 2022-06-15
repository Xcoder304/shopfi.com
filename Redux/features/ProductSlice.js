import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
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
          alert("This product is already in the cart");
        } else {
          state.cart.push(action.payload);
        }
      } else {
        state.cart.push(action.payload);
      }

      // console.log(Cookies.get(JSON.parse(Cookies.get("cart"))));
    },

    setproductQty: (state, action) => {
      state.productQty = action.payload;
    },
  },
});

export const { setproductQty, setTheCart } = ProductSlice.actions;
export const selecteproductQty = (state) => state.product.productQty;
export const selectecart = (state) => state.product.cart;
export default ProductSlice.reducer;
