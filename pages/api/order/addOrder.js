import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../modals/Order";

const handler = nc();

handler.post(async (req, res) => {
  console.log(req.body);

  await db.connect();
  const neworder = new Order(req.body);
  neworder.save();
  await db.disconnect();

  res.send({ message: "success" });
});

export default handler;
