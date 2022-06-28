import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../modals/Product";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const update = await Product.findOneAndUpdate({ _id: req.body.id }, req.body);
  res.send({ success: true, message: " Product Update Successfully" });
});

export default handler;
