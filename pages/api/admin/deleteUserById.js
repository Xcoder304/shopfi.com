import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOneAndRemove({ _id: req.body.id });
  res.send({
    success: true,
    message: "user Delecte successfully",
  });

  await db.disconnect();
});

export default handler;
