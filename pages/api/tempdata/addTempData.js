import nc from "next-connect";
import db from "../../../utils/db";
import TempData from "../../../modals/TempData";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  await TempData.deleteMany();
  await TempData.insertMany(req.body);
  await db.disconnect();

  res.send({ message: "success" });
});

export default handler;
