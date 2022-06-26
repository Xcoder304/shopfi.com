import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({ MainAdmin: false }).select([
    "-password",
    "-address",
    "-phonenumber",
  ]);
  res.send({ success: true, users, message: "fetched the orders" });
  await db.disconnect();
});

export default handler;
