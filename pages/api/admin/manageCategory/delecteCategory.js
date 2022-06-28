import nc from "next-connect";
import db from "../../../../utils/db";
import Categories from "../../../../modals/Categories";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const del = await Categories.findOneAndRemove({ _id: req.body.id });
  res.send({ success: true, message: "Category Delecte Successfully" });
});

export default handler;
