import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ _id: req.body.id }).select("-MainAdmin");
  res.send({
    success: true,
    user: user,
    message: "user fetched",
  });
});

export default handler;
