import nc from "next-connect";
import db from "../../../utils/db";
import Cart from "../../../modals/Cart";

const handler = nc();

handler.post(async (req, res) => {
  console.log(req.body);
  await db.connect();
  const items = await new Cart(req.body);
  items.save();
  await db.disconnect();

  res.send("Done");
});

export default handler;
