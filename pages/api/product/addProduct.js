import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../modals/Product";
import { data } from "../../../utils/data";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.newProducts);
  await db.disconnect();

  res.send({ message: "success" });
});

export default handler;
