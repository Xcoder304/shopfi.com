import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../modals/Product";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const del = await Product.findOneAndRemove({ _id: req.body.id });
  res.send({ success: true, message: "Product Removed Successfully" });
});

export default handler;
