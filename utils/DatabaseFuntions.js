import db from "./db";
import axios from "axios";
import Product from "../modals/Product";
import Cart from "../modals/Cart";

// fetchProducts
export const fetchProductsData = async () => {
  db.connect();
  const product = await Product.find({}).lean();

  const res = product.map((data) => db.convertDocToString(data));

  db.disconnect();

  return res;
};

// fetching the product for the Product Page
export const fetchTheProduct = async (slug) => {
  db.connect();
  const fetchData = await Product.findOne({ slug }).lean();
  const product = db.convertDocToString(fetchData);
  db.disconnect();

  return product;
};

// ***************cart functions**********************

// fetching the cart data with api
export const fetchCartDataWithApi = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/getCartProduct`
  );

  return data;
};

// fetching the cart data without api and its fast
export const fetchCartData = async () => {
  db.connect();
  const f = await Cart.find({}).lean();

  const res = f.map((data) => db.convertDocToString(data));
  // const res = db.convertDocToString(f.data);
  db.disconnect();

  return res;
};

// saving the product to the cart
export const AddProductToCart = async (data) => {
  const send = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/addToCart`,
    data
  );
};

// remove the singal product from the cart
export const RemoveProductFromCart = async (data) => {
  let rm = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/removeCartProduct`,
    data
  );
};
