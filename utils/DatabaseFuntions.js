import db from "./db";
import axios from "axios";
import Product from "../modals/Product";

// for fetching the products for Home Page
export const fetchTheProducts = async () => {
  db.connect();
  const f = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/getProducts`
  );
  const res = f.data;
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

// saving the product to the cart
export const AddProductToCart = async (data) => {
  const send = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/product/addToCart`,
    data
  );

  console.log("send", send);
};
