import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
var jwt = require("jsonwebtoken");

const handler = nc();

handler.post(async (req, res) => {
  db.connect();
  let token = req.body.token;
  let tokenRes = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: tokenRes.email });
  res.send(user);
});

export default handler;
