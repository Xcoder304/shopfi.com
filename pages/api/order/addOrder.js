import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";
import Product from "../../../modals/Product";
import { RemoveProductFromCart } from "../../../utils/DatabaseFuntions";

const handler = nc();

handler.post(async (req, res) => {
  let products = req.body.products;

  // adding a new order
  await db.connect();
  const neworder = new Order(req.body);
  neworder.save();

  for (let item in products) {
    // removing the product from the stock
    await Product.findOneAndUpdate(
      { slug: products[item].slug },
      { $inc: { inStock: -products[item].userSelectedQty } }
    );
    // adding the product to the in sold
    await Product.findOneAndUpdate(
      { slug: products[item].slug },
      { $inc: { sold: +products[item].userSelectedQty } }
    );

    let id = products[item]._id;

    await RemoveProductFromCart({ id });
  }

  await db.disconnect();

  res.send({ message: "success" });
});

export default handler;
