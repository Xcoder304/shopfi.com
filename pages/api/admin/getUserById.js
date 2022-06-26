import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ _id: req.body.id });
  res.send({
    success: true,
    user: user,
    message: "user fetched",
  });

  await db.disconnect();
});

export default handler;
