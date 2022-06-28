import nc from "next-connect";
import db from "../../../utils/db";
import Cart from "../../../modals/Cart";
var jwt = require("jsonwebtoken");

// const handler = nc();

const handler = async (req, res) => {
  await db.connect();
  const token = req.body.token;
  const tokenRes = jwt.verify(token, process.env.JWT_SECRET);
  const items = await Cart.find({ userID: tokenRes.id });
  res.send({ success: true, items, message: "data fetched" });
};
export default handler;
