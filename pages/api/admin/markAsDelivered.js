import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const updateOrder = await Order.findOneAndUpdate(
    { _id: req.body.id },
    {
      delivery: req.body.deliveryVal,
    }
  );
  res.send({ success: true, updateOrder, message: "fetched the orders" });
  await db.disconnect();
});

export default handler;
