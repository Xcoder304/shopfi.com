import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
import { data } from "../../../utils/data";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  await User.insertMany(data.user);
  await db.disconnect();

  res.send({ message: "user added" });
});

export default handler;
