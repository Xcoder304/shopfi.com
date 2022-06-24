import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";
var jwt = require("jsonwebtoken");
const handler = nc();

handler.post(async (req, res) => {
  console.log("body", req.body);
  await db.connect();
  const token = req.body.token;
  const tokenRes = jwt.verify(token, process.env.JWT_SECRET);
  console.log("token res", tokenRes);
  const orders = await Order.find({ "userDatils.userId": tokenRes.id });
  res.send({ success: true, orders, message: "fetched the orders" });
  await db.disconnect();
});

export default handler;
