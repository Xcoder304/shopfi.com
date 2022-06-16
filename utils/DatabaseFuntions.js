import db from "./db";
import axios from "axios";
import Product from "../modals/Product";
import Cart from "../modals/Cart";

// getProducts

//fetching the data from api
export const fetchApiData = async (apiName) => {
  const f = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/${apiName}`
  );
  const res = f.data;

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

// saving the product to the cart
export const AddProductToCart = async (data) => {
  const send = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/addToCart`,
    data
  );
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
