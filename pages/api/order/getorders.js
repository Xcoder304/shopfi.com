import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";
var jwt = require("jsonwebtoken");
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const token = req.body.token;
  const tokenRes = jwt.verify(token, process.env.JWT_SECRET);
  const orders = await Order.find({ "userDatils.userId": tokenRes.id }).sort({
    createdAt: -1,
  });
  res.send({ success: true, orders, message: "fetched the orders" });
});

export default handler;
