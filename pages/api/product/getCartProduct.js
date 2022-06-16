import nc from "next-connect";
import db from "../../../utils/db";
import Cart from "../../../modals/Cart";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const items = await Cart.find({});
  await db.disconnect();

  res.send(items);
});

export default handler;
