import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../modals/Product";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.find({});
  await db.disconnect();

  res.send(product);
});

export default handler;
