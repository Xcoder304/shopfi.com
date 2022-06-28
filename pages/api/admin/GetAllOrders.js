import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).sort({
    createdAt: -1,
  });
  res.send({ success: true, orders, message: "fetched the orders" });
});

export default handler;
