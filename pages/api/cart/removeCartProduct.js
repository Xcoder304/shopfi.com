import nc from "next-connect";
import db from "../../../utils/db";
import Cart from "../../../modals/Cart";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const remove = await Cart.findByIdAndRemove(req.body.id, req.body);
  await db.disconnect();

  res.send("removed");
});

export default handler;
