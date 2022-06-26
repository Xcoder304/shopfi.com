import db from "./db";
import axios from "axios";
import Product from "../modals/Product";
import Cart from "../modals/Cart";
import TempData from "../modals/TempData";
import Order from "../modals/Order";
import Categories from "../modals/Categories";
import Cookies from "js-cookie";

// fetchProducts
export const fetchProductsData = async () => {
  db.connect();
  const product = await Product.find({}).lean();

  const res = product.map((data) => db.convertDocToString(data));

  db.disconnect();

  return res;
};

// fetching the singal product for the Product Page
export const fetchTheProduct = async (slug) => {
  db.connect();
  const fetchData = await Product.findOne({ slug }).lean();
  const product = db.convertDocToString(fetchData);
  db.disconnect();

  return product;
};

// ***************cart functions**********************

// fetching the cart data with api
export const fetchCartDataWithApi = async (info) => {
  const { data } = await axios.post(
    "http://localhost:3000/api/cart/getCartProduct",
    info
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
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/cart/addToCart`,
    data
  );
};

// remove the singal product from the cart
export const RemoveProductFromCart = async (data) => {
  let rm = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/cart/removeCartProduct`,
    data
  );
};

// clear the cart
export const ClearTheCart = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/cart/clearTheCart`
  );
};

// adding the temp data
export const AddTempData = async (data) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/tempdata/addTempData`,
    data
  );
};

// fetching the temp data products
export const fetchTempData = async () => {
  db.connect();
  const f = await TempData.find({}).lean();
  const res = f.map((data) => db.convertDocToString(data));
  db.disconnect();

  return res;
};

// add order
export const AddOrder = async (data) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/order/addOrder`,
    data
  );
};

// getTheOrderDetails
export const GetTheOrderDetails = async (id) => {
  await db.connect();
  const fetch = await Order.findOne({ _id: id }).lean();
  const res = db.convertDocToString(fetch);
  await db.disconnect();

  return res;
};

//**************************************************Admin************************************************************

// get all orders
export const GetAllOrders = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/GetAllOrders`
  );

  return data;
};

// mark as delivered
export const MarkAsDelivered = async (itemId, deliveryStaus) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/markAsDelivered`,
    { id: itemId, deliveryVal: deliveryStaus }
  );

  return data;
};

export const AddCategorie = async (name) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/manageCategory/AddCategories`,
    name
  );

  return data;
};

export const GetAllCategories = async () => {
  await db.connect();
  const f = await Categories.find({}).lean();
  const res = f.map((data) => db.convertDocToString(data));

  await db.disconnect();

  return res;
};

export const DelecteTheCategories = async (id) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/manageCategory/delecteCategory`,
    { id: id }
  );

  return data;
};

export const UpdateTheCategories = async (id, categoryName) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/manageCategory/updateCategory`,
    { id: id, name: categoryName }
  );

  return data;
};
